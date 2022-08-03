export interface CoursePartBase {
	name: string;
	exerciseCount: number;
	type: string;
}

export interface CourseDescriptionProperty extends CoursePartBase {
	description: string;
}

export interface CourseNormalPart extends CourseDescriptionProperty {
	type: 'normal';
}

export interface CourseProjectPart extends CoursePartBase {
	groupProjectCount: number;
	type: 'groupProject';
}

export interface CourseSubmissionPart extends CourseDescriptionProperty {
	exerciseSubmissionLink: string;
	type: 'submission';
}

export interface CourseSpecialPart extends CourseDescriptionProperty {
	requirements: Array<string>;
	type: 'special';
}

export type CoursePart =
	| CourseNormalPart
	| CourseProjectPart
	| CourseSubmissionPart
	| CourseSpecialPart;
