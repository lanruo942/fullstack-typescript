/*
 * @Author: Summer Lee
 * @Date: 2022-08-02 10:19:26
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-08-05 01:06:37
 */
import { Diagnose, Entry, Patient } from "../types";
import { State } from "./state";

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
    }
  | {
      type: "SET_DIAGNOSE_LIST";
      payload: Diagnose[];
    }
  | {
      type: "ADD_ENTRY";
      payload: {
        id: string;
        entry: Entry;
      };
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

export const setDiagnoseList = (diagnoseList: Diagnose[]): Action => ({
  type: "SET_DIAGNOSE_LIST",
  payload: diagnoseList,
});

export const addEntry = (id: string, entry: Entry): Action => ({
  type: "ADD_ENTRY",
  payload: {
    id,
    entry,
  },
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
    case "SET_PATIENT_ENTRY":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_DIAGNOSE_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnoses,
        },
      };
    case "ADD_ENTRY":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...state.patients[action.payload.id],
            entries: [
              ...state.patients[action.payload.id].entries || [],
              action.payload.entry,
            ],
          },
        },
      };
    default:
      return state;
  }
};
