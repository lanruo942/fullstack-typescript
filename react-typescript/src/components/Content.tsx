interface ContentProp {
	name: string;
	exerciseCount: number;
}

const SingleContent = ({ course }: { course: ContentProp }) => {
	return (
		<p>
			{course.name} {course.exerciseCount}
		</p>
	);
};

const Content = ({ courseParts }: { courseParts: ContentProp[] }) => {
	return (
		<>
			{courseParts.map((course: ContentProp) => (
				<SingleContent key={course.name} course={course} />
			))}
		</>
	);
};

export default Content;
