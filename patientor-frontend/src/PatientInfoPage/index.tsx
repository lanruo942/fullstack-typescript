/*
 * @Author: Summer Lee
 * @Date: 2022-08-05 01:18:21
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-08-05 02:24:27
 */
import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Female as FemaleIcon, Male as MaleIcon } from "@mui/icons-material";

const PatientInfoPage = () => {
  const [status, setStatus] = useState<boolean>(false);
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatientEntry = async () => {
      if (id) {
        try {
          const { data: patient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch({ type: "SET_PATIENT_ENTRY", payload: patient });
          setStatus(true);
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            console.error(e?.response?.data || "Unrecognized axios error");
          } else {
            console.error("Unknown error", e);
          }
          setStatus(false);
        }
      }
    };

    void fetchPatientEntry();
  }, [id]);

  const parsePatient = (patient: Patient | undefined): Patient => {
    if (!patient) {
      throw new Error("Incorrect or missing patient ");
    }

    return patient;
  };

  if (id && status) {
    const patient = parsePatient(
      Object.values(patients).find((p: Patient) => p.id === id)
    );
    return (
      <div>
        <h2>
          {patient.name}{" "}
          {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
        </h2>
        <div>
          <p>ssh: {patient?.ssn}</p>
          <p>occupation: {patient?.occupation}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>404 Not Found</h2>
    </div>
  );
};

export default PatientInfoPage;
