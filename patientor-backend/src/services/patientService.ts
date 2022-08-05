import { v1 as uuid } from 'uuid';
import patients from '../../data/patient';
import { Patient, PublicPatient, NewPatient } from '../types';

const getPublicPatients = (): PublicPatient[] => {
	return patients.map(
		({ id, name, dateOfBirth, gender, occupation }) => ({
			id,
			name,
			dateOfBirth,
			gender,
			occupation,
		})
	);
};

const addPatient = (entry: NewPatient): Patient => {
	const id: string = uuid();
	const newPatientEntry = {
		id,
		...entry,
	};

	patients.push(newPatientEntry);
	return newPatientEntry;
};

const getPatient = (id: string): Patient | undefined => {
	const patient = patients.find((patient) => patient.id === id);
	if (!patient) {
		return undefined;
	}

	return patient;
};

export default {
	getPublicPatients,
	addPatient,
	getPatient,
};
