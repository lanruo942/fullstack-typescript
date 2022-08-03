/*
 * @Author: Summer Lee
 * @Date: 2022-08-03 02:03:33
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-08-03 14:32:59
 */
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';
import { CoursePart } from './types';

const App = () => {
	const courseName = 'Half Stack application development';
	const courseParts: CoursePart[] = [
		{
			name: 'Fundamentals',
			exerciseCount: 10,
			description: 'This is an awesome course part',
			type: 'normal',
		},
		{
			name: 'Advanced',
			exerciseCount: 7,
			description: 'This is the harded course part',
			type: 'normal',
		},
		{
			name: 'Using props to pass data',
			exerciseCount: 7,
			groupProjectCount: 3,
			type: 'groupProject',
		},
		{
			name: 'Deeper type usage',
			exerciseCount: 14,
			description: 'Confusing description',
			exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
			type: 'submission',
		},
		{
			name: 'Backend development',
			exerciseCount: 21,
			description: 'Typing the backend',
			requirements: ['nodejs', 'jest'],
			type: 'special',
		},
	];

	return (
		<div>
			<Header name={courseName} />
			<Content courseParts={courseParts} />
			<Total
				exercisesCount={courseParts.reduce(
					(carry, part) => carry + part.exerciseCount,
					0
				)}
			/>
		</div>
	);
};

export default App;
