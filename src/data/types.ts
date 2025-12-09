export type CourseShape = "square" | "circle" | "squircle";

export interface Course {
	id: string; // e.g., "ENSF 337"
	label: string; // e.g., "ENSF 337"
	name?: string; // e.g., "Programming Fundamentals for Software Engineers"
	prerequisites: string[]; // List of course IDs
	description?: string;
	units?: number; // Credit units for the course
}

export interface CourseNode extends Course {
	status: "completed" | "in_progress" | "required" | "optional" | "group";
	shape: CourseShape;
	isPrereqSatisfied?: boolean;
	requirementType?: "major" | "minor" | "common" | "elective";
}

export interface RequirementGroup {
	id: string;
	label: string;
	type: "courses" | "credits" | "mixed";
	courses: string[];
	requiredCourses?: number; // For course-based requirements
	requiredUnits?: number; // For credit-based requirements
	minCourses?: number; // For mixed type
	minUnits?: number; // For mixed type
}

export interface Major {
	id: string;
	label: string;
	requiredCourses: string[]; // List of Course IDs
	requirementGroups: RequirementGroup[];
	validMinors?: string[];
}

export interface Minor {
	id: string;
	label: string;
	requiredCourses: string[]; // Courses required by this minor
	requirementGroups: RequirementGroup[];
}

// Progress tracking types
export interface CourseProgress {
	status: "completed" | "in_progress" | "planned";
	grade?: string;
	semester?: string;
}

export interface RequirementProgress {
	type: "major" | "minor" | "common" | "elective";
	requirementGroups: {
		id: string;
		label: string;
		type: "courses" | "credits" | "mixed";
		requiredValue: number; // Either courses or units
		completedValue: number;
		courses: {
			required: string[];
			completed: string[];
			inProgress: string[];
			planned: string[];
		};
	}[];
	totalRequiredUnits: number;
	totalCompletedUnits: number;
}

export interface ProgramHierarchy {
	[majorId: string]: string[]; // majorId -> [minorIds]
}

export interface StudentProgress {
	completedCourses: Set<string>;
	inProgressCourses: Set<string>;
	plannedCourses: Set<string>;
	totalCredits: number;
	majorProgress: RequirementProgress;
	minorProgress?: RequirementProgress;
}
