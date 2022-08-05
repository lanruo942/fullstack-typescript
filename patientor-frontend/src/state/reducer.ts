/*
 * @Author: Summer Lee
 * @Date: 2022-08-02 10:19:26
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-08-05 01:06:37
 */
import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT_ENTRY";
      payload: Patient;
    };

export const setPatientList = (patientList: Patient[]): Action => ({
  type: "SET_PATIENT_LIST",
  payload: patientList,
});

export const addPatient = (patient: Patient): Action => ({
	type: "ADD_PATIENT",
	payload: patient,
});

export const setPatientEntry = (patient: Patient): Action => ({
	type: "SET_PATIENT_ENTRY",
	payload: patient,
});

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_PATIENT_ENTRY":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};
