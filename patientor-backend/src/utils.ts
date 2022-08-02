import { NewPatientEntry, Gender } from './types';

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return Object.values(Gender).includes(param);
};

const parseName = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error('Incorrect or missing name: ' + name);
	}

	return name;
};

const parseDateOfBirth = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing date: ' + date);
	}

	return date;
};

const parseSsn = (ssn: unknown): string => {
	if (!ssn || !isString(ssn)) {
		throw new Error('Incorrect or missing ssn: ' + ssn);
	}

	return ssn;
};

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isGender(gender)) {
		throw new Error('Incorrect or missing gender: ' + gender);
	}

	return gender;
};

const parseOccupation = (occ: unknown): string => {
	if (!occ || !isString(occ)) {
		throw new Error('Incorrect or missing occupation: ' + occ);
	}

	return occ;
};

type Fields = {
	name: unknown;
	dateOfBirth: unknown;
	ssn: unknown;
	gender: unknown;
	occupation: unknown;
};
const toNewPatientEntry = ({
	name,
	dateOfBirth,
	ssn,
	gender,
	occupation,
}: Fields): NewPatientEntry => {
	const newEntry: NewPatientEntry = {
		name: parseName(name),
		dateOfBirth: parseDateOfBirth(dateOfBirth),
		ssn: parseSsn(ssn),
		gender: parseGender(gender),
		occupation: parseOccupation(occupation),
	};

	return newEntry;
};

export default toNewPatientEntry;
