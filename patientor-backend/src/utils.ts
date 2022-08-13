import {
	BaseEntry,
	Diagnose,
	Discharge,
	Gender,
	HealthCheckRating,
	NewEntry,
	NewPatient,
	SickLeave,
} from './types';

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

const parseString = (value: unknown, fieldName: string): string => {
	if (!value || !isString(value)) {
		throw new Error(`Incorrect or missing ${fieldName}: ${value}`);
	}

	return value;
};

const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing date: ' + date);
	}

	return date;
};

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isGender(gender)) {
		throw new Error('Incorrect or missing gender: ' + gender);
	}

	return gender;
};

type NewPatientFields = {
	name: unknown;
	dateOfBirth: unknown;
	ssn: unknown;
	gender: unknown;
	occupation: unknown;
};

export const toNewPatient = ({
	name,
	dateOfBirth,
	ssn,
	gender,
	occupation,
}: NewPatientFields): NewPatient => {
	const newPatient: NewPatient = {
		name: parseString(name, 'name'),
		dateOfBirth: parseDate(dateOfBirth),
		ssn: parseString(ssn, 'ssn'),
		gender: parseGender(gender),
		occupation: parseString(occupation, 'occupation'),
		entries: [],
	};

	return newPatient;
};

const isDiagnosisCodes = (
	diagnosisCodes: unknown
): diagnosisCodes is Array<Diagnose['code']> => {
	if (!diagnosisCodes || !Array.isArray(diagnosisCodes)) {
		return false;
	} else {
		return diagnosisCodes.every((code: unknown) => {
			return isString(code);
		});
	}
};

const parseDiagnosisCodes = (
	diagnosisCodes: unknown
): Array<Diagnose['code']> | undefined => {
	if (!diagnosisCodes || !isDiagnosisCodes(diagnosisCodes)) {
		return undefined;
	}

	return diagnosisCodes;
};

const isDischarge = (discharge: unknown): discharge is Discharge => {
	if (
		!discharge ||
		!(typeof discharge === 'object') ||
		!('date' in discharge) ||
		!('criteria' in discharge)
	) {
		return false;
	}

	return true;
};

const parseDischarge = (discharge: unknown): Discharge => {
	if (!discharge || !isDischarge(discharge)) {
		throw new Error('Incorrect or missing discharge: ' + discharge);
	}

	if (!discharge.date || !isString(discharge.date)) {
		throw new Error('Incorrect or missing discharge.date: ' + discharge.date);
	}

	if (!discharge.criteria || !isString(discharge.criteria)) {
		throw new Error(
			'Incorrect or missing discharge.criteria: ' + discharge.criteria
		);
	}

	return discharge;
};

const isSickLeave = (sickLeave: unknown): sickLeave is SickLeave => {
	if (
		!sickLeave ||
		!(typeof sickLeave === 'object') // ||
		// !('startDate' in sickLeave) ||
		// !('endDate' in sickLeave)
	) {
		return false;
	}

	return true;
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
	if (!sickLeave) {
		return undefined;
	}

	if (!isSickLeave(sickLeave)) {
		throw new Error('Incorrect or missing sickLeave: ' + sickLeave);
	}

	// if (!sickLeave.startDate || !isString(sickLeave.startDate)) {
	// 	throw new Error(
	// 		'Incorrect or missing sickLeave.startDate: ' + sickLeave.startDate
	// 	);
	// }
 //
	// if (!sickLeave.endDate || !isString(sickLeave.endDate)) {
	// 	throw new Error(
	// 		'Incorrect or missing sickLeave.endDate: ' + sickLeave.endDate
	// 	);
	// }

	return sickLeave;
};

const isInt = (num: unknown): num is number => {
	return !Number.isNaN(num) && Number.isInteger(num);
};

const isRating = (rating: number): rating is HealthCheckRating => {
	return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
	// when rating is 0, !0 is ture, so we don't need to check this
	if (!isInt(rating) || !isRating(rating)) {
		throw new Error('Incorrect or missing healthCheckRating: ' + rating);
	}

	return rating;
};

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

type NewEntryBaseFields = {
	type: unknown;
	date: unknown;
	specialist: unknown;
	description: unknown;
	diagnosisCodes?: unknown;
	discharge?: {
		date: unknown;
		criteria: unknown;
	};
	employerName?: unknown;
	sickLeave?: {
		startDate: unknown;
		endDate: unknown;
	};
	healthCheckRating?: unknown;
};

export const toNewEntry = ({
	type,
	date,
	specialist,
	description,
	diagnosisCodes,
	...fields
}: NewEntryBaseFields): NewEntry => {
	const newBaseEntry: Omit<BaseEntry, 'id'> = {
		date: parseDate(date),
		specialist: parseString(specialist, 'specialist'),
		description: parseString(description, 'description'),
		diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
	};

	let newEntry: NewEntry;

	const parsedType = parseString(type, 'type');
	switch (parsedType) {
		case 'Hospital':
			newEntry = {
				type: parsedType,
				...newBaseEntry,
				discharge: parseDischarge(fields.discharge),
			};
			break;
		case 'OccupationalHealthcare':
			newEntry = {
				type: parsedType,
				...newBaseEntry,
				employerName: parseString(fields.employerName, 'employerName'),
				sickLeave: parseSickLeave(fields.sickLeave),
			};
			break;
		case 'HealthCheck':
			newEntry = {
				type: parsedType,
				...newBaseEntry,
				healthCheckRating: parseHealthCheckRating(fields.healthCheckRating),
			};
			break;
		default:
			return assertNever(type as never);
	}

	return newEntry;
};
