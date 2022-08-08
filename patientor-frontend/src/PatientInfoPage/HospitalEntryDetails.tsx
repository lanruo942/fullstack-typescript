import { useStateValue } from "../state";
import { Diagnose, HospitalEntry } from "../types";
import { LocalHospital as LocalHospitalIcon } from "@mui/icons-material";
import "./EntryDetails.css";

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <div className="entry">
      <p>
        {entry.date} <LocalHospitalIcon />
      </p>
      <p>{entry.description}</p>
      <p>
        discharge: {entry.discharge.date} {entry.discharge.criteria}
      </p>
      {entry?.diagnosisCodes && entry.diagnosisCodes.length !== 0 && (
        <ul>
          {entry.diagnosisCodes.map((code) => {
            const diagnoseName = Object.values(diagnoses).find(
              (d: Diagnose) => d.code === code
            )?.name;

            return (
              <li key={code}>
                {code} {diagnoseName}
              </li>
            );
          })}
        </ul>
      )}
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default HospitalEntryDetails;
