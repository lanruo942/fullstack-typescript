/*
 * @Author: Summer Lee
 * @Date: 2022-08-03 13:25:47
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-08-03 14:34:32
 */
import { CoursePart } from "../types";

const Part = ({ course }: { course: CoursePart }) => {
	/**
	 * Helper function for exhaustive type checking
	 */
	const assertNever = (value: never): never => {
		throw new Error(
			`Unhandled discriminated union member: ${JSON.stringify(value)}`
		);
	};

	switch (course.type) {
		case 'normal':
			return (
				<div>
					<h3>
						{course.name} {course.exerciseCount}
					</h3>
					<p>{course.description}</p>
				</div>
			);
		case 'groupProject':
			return (
				<div>
					<h3>
						{course.name} {course.exerciseCount}
					</h3>
					<p>project exercises {course.groupProjectCount}</p>
				</div>
			);
		case 'submission':
			return (
				<div>
					<h3>
						{course.name} {course.exerciseCount}
					</h3>
					<p>{course.description}</p>
					<p>{course.exerciseSubmissionLink}</p>
				</div>
			);
		case 'special':
			return (
				<div>
					<h3>
						{course.name} {course.exerciseCount}
					</h3>
					<p>{course.description}</p>
					<p>
						required skils:{' '}
						{course.requirements.join(', ')}
					</p>
				</div>
			);
		default:
			return assertNever(course);
	}
};

export default Part;
