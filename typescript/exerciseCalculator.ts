/*
 * @Author: Summer Lee
 * @Date: 2022-07-31 01:12:51
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-31 01:30:33
 */
interface ExercisesResults {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

interface TrainData {
	trainTimes: Array<number>;
	target: number;
}

const parseArguments = (args: Array<string>): TrainData => {
	if (args.length < 4) throw new Error('Not enough arguments');

	const trainTimes = args.slice(3).map((time) => {
		if (isNaN(Number(time))) {
			throw new Error('Provided values were not numbers!');
		}
		return Number(time);
	});
	const target = isNaN(Number(args[2])) ? 0 : Number(args[2]);

	return {
		trainTimes,
		target,
	};
};

const calculateExercises = (
	trainTimes: Array<number>,
	target: number
): ExercisesResults => {
	const periodLength = trainTimes.length;
	const trainingDays = trainTimes.filter((time) => time > 0).length;
	const average =
		trainTimes.reduce((acc, curr) => acc + curr, 0) / periodLength;
	const success = average >= target;
	const rating = success ? 3 : average >= target * 0.8 ? 2 : 1;
	const ratingDescription = success
		? 'good'
		: average >= target * 0.8
		? 'not too bad but could be better'
		: 'bad';

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average,
	};
};

try {
	const { trainTimes, target } = parseArguments(process.argv);
	const result = calculateExercises(trainTimes, target);
	console.log(result);
} catch (error: unknown) {
	let errorMessage = 'Something went wrong!';
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}

export {};
