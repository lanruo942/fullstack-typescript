import patientData from '../../data/patient.json';
import { Patient, NonSensitivePatient } from '../types';

const patients: Patient[] = patientData as Patient[];

const getNonSensitivePatients = (): NonSensitivePatient[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

export default {
	getNonSensitivePatients,
};
