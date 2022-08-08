import { v1 as uuid } from 'uuid';
import patients from '../../data/patient';
import { Entry, NewEntry, NewPatient, Patient, PublicPatient } from '../types';

const getPublicPatients = (): PublicPatient[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const addPatient = (patient: NewPatient): Patient => {
	const id: string = uuid();
	const newPatient = {
		id,
		...patient,
	};

	patients.push(newPatient);
	return newPatient;
};

const getPatient = (id: string): Patient | undefined => {
	const patient = patients.find((patient) => patient.id === id);
	if (!patient) {
		return undefined;
	}

	return patient;
};

const addEntry = (patient: Patient, entry: NewEntry): Entry => {
	const newEntry = {
		id: uuid(),
		...entry,
	};

	patient.entries.push(newEntry);
	return newEntry;
};

export default {
	getPublicPatients,
	addPatient,
	getPatient,
	addEntry,
};
