import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	const { height, weight } = req.query;
	if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
		return res.json({
			weight,
			height,
			bmi: calculateBmi(Number(height), Number(weight)),
		});
	} else {
		return res.status(400).json({
			error: 'malformatted parameters',
		});
	}
});

app.post('/exercises', (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { daily_exercises, target } = req.body;

	if (!daily_exercises || !target) {
		return res.status(400).json({
			error: 'parameters missing',
		});
	}

	if (
		!Array.isArray(daily_exercises) ||
		daily_exercises.length === 0 ||
		daily_exercises.some((time) => isNaN(Number(time)))
	) {
		return res.status(400).json({
			error: 'malformatted parameters',
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const result = calculateExercises(daily_exercises, Number(target));
	return res.json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
