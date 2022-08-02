import { v1 as uuid } from 'uuid';
import patients from '../../data/patient';
import { PatientEntry, NonSensitivePatient, NewPatientEntry } from '../types';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
	const id: string = uuid();
	const newPatientEntry = {
		id,
		...entry,
	};

	patients.push(newPatientEntry);
	return newPatientEntry;
};

export default {
	getNonSensitivePatients,
	addPatient,
};
