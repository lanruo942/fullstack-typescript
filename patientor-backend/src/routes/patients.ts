import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
	const patient = patientService.getPatient(req.params.id);
	if (!patient) {
		return res.status(404).send('Patient not found');
	}

	return res.send(patient);
});

router.post('/', (req, res) => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const newPatient = toNewPatient(req.body);

		const addedEntry = patientService.addPatient(newPatient);
		res.json(addedEntry);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += 'Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default router;
