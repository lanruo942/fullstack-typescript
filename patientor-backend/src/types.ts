// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BaseEntry {
	id: string;
	date: string;
	specialist: string;
	description: string;
	diagnosisCodes?: Array<Diagnose['code']>;
}

interface Discharge {
	date: string;
	criteria: string;
}

interface SickLeave {
	startDate: string;
	endDate: string;
}

export enum HealthCheckRating {
	'Healthy' = 0,
	'LowRisk' = 1,
	'HighRisk' = 2,
	'CriticalRisk' = 3,
}

interface HospitalEntry extends BaseEntry {
	type: 'Hospital';
	discharge: Discharge;
}

interface OccupationalHealthcareEntry extends BaseEntry {
	type: 'OccupationalHealthcare';
	employerName: string;
	sickLeave?: SickLeave;
}

interface HealthCheckEntry extends BaseEntry {
	type: 'HealthCheck';
	healthCheckRating: HealthCheckRating;
}

export type Entry =
	| HospitalEntry
	| OccupationalHealthcareEntry
	| HealthCheckEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

export interface Diagnose {
	code: string;
	name: string;
	latin?: string;
}

export interface Patient {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
	entries: Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;
