/*
 * @Author: Summer Lee
 * @Date: 2022-07-25 18:06:31
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-25 18:14:35
 */
const calculateBmi = (height: number, weight: number): string => {
	height = height / 100;
	const bmi: number = weight / (height * height);

	if (bmi < 16.0) {
		return 'Underweight (Severe thinness)';
	} else if (bmi >= 16.0 && bmi < 17.0) {
		return 'Underweight (Moderate thinness)';
	} else if (bmi >= 17.0 && bmi < 18.5) {
		return 'Underweight (Mild thinness)';
	} else if (bmi >= 18.5 && bmi < 25.0) {
		return 'Normal (healthy weight)';
	} else if (bmi >= 25.0 && bmi < 30.0) {
		return 'Overweight (Pre-obese)';
	} else if (bmi >= 30.0 && bmi < 35.0) {
		return 'Obese (Class I)';
	} else if (bmi >= 35.0 && bmi < 40.0) {
		return 'Obese (Class II)';
	} else {
		return 'Obese (Class III)';
	}
};

console.log(calculateBmi(180, 74));
