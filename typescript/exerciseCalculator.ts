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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
