/*
 * @Author: Summer Lee
 * @Date: 2022-08-03 11:17:21
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-08-03 14:33:49
 */
import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
	return (
		<>
			{courseParts.map((course: CoursePart) => (
				<Part key={course.name} course={course} />
			))}
		</>
	);
};

export default Content;
