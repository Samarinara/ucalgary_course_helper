import type {
	CourseProgress,
	StudentProgress,
	RequirementProgress,
} from "../data/types";

const STORAGE_KEY = "ucalgary-course-progress";

export interface StoredData {
	courseProgress: Record<string, CourseProgress>;
	lastUpdated: string;
}

// Save course progress to local storage
export const saveCourseProgress = (
	courseId: string,
	progress: CourseProgress,
): void => {
	if (typeof window === "undefined") return;

	try {
		const existingData = loadStoredData();
		existingData.courseProgress[courseId] = progress;
		existingData.lastUpdated = new Date().toISOString();

		localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));
	} catch (error) {
		console.error("Failed to save course progress:", error);
	}
};

// Load all stored data from local storage
export const loadStoredData = (): StoredData => {
	if (typeof window === "undefined") {
		return { courseProgress: {}, lastUpdated: "" };
	}

	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			return JSON.parse(stored);
		}
	} catch (error) {
		console.error("Failed to load stored data:", error);
	}

	return { courseProgress: {}, lastUpdated: "" };
};

// Load course progress as a Map for easier usage
export const loadCourseProgress = (): Map<string, CourseProgress> => {
	const data = loadStoredData();
	return new Map(Object.entries(data.courseProgress));
};

// Clear all stored data
export const clearStoredData = (): void => {
	if (typeof window === "undefined") return;

	try {
		localStorage.removeItem(STORAGE_KEY);
	} catch (error) {
		console.error("Failed to clear stored data:", error);
	}
};

// Export progress data as JSON for sharing/backup
export const exportProgressData = (): string => {
	const data = loadStoredData();
	return JSON.stringify(data, null, 2);
};

// Import progress data from JSON
export const importProgressData = (jsonData: string): boolean => {
	if (typeof window === "undefined") return false;

	try {
		const data = JSON.parse(jsonData);

		// Validate the data structure
		if (!data.courseProgress || typeof data.courseProgress !== "object") {
			throw new Error("Invalid data structure");
		}

		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
		return true;
	} catch (error) {
		console.error("Failed to import progress data:", error);
		return false;
	}
};

// Calculate student progress from course progress data
export const calculateStudentProgress = (
	courseProgress: Map<string, CourseProgress>,
	majorRequiredCourses: string[],
	minorRequiredCourses: string[] = [],
	allCourses: Record<string, any>,
): StudentProgress => {
	const completedCourses = new Set<string>();
	const inProgressCourses = new Set<string>();
	const plannedCourses = new Set<string>();

	// Categorize courses by status
	courseProgress.forEach((progress, courseId) => {
		switch (progress.status) {
			case "completed":
				completedCourses.add(courseId);
				break;
			case "in_progress":
				inProgressCourses.add(courseId);
				break;
			case "planned":
				plannedCourses.add(courseId);
				break;
		}
	});

	// Calculate total credits
	let totalCredits = 0;
	completedCourses.forEach((courseId) => {
		const course = allCourses[courseId];
		if (course?.units) {
			totalCredits += course.units;
		}
	});

	// Calculate major progress with flexible requirement groups
	const calculateRequirementProgress = (
		requiredCourses: string[],
		type: "major" | "minor",
	) => {
		const completed = requiredCourses.filter((id) => completedCourses.has(id));
		const inProgress = requiredCourses.filter((id) =>
			inProgressCourses.has(id),
		);
		const planned = requiredCourses.filter((id) => plannedCourses.has(id));

		const completedUnits = completed.reduce((sum, courseId) => {
			const course = allCourses[courseId];
			return sum + (course?.units || 0);
		}, 0);

		const requiredUnits = requiredCourses.reduce((sum, courseId) => {
			const course = allCourses[courseId];
			return sum + (course?.units || 0);
		}, 0);

		return {
			type,
			requirementGroups: [
				{
					id: "core_requirements",
					label: "Core Requirements",
					type: "courses" as const,
					requiredValue: requiredCourses.length,
					completedValue: completed.length,
					courses: {
						required: requiredCourses,
						completed,
						inProgress,
						planned,
					},
				},
			],
			totalRequiredUnits: requiredUnits,
			totalCompletedUnits: completedUnits,
		};
	};

	const majorProgress = calculateRequirementProgress(
		majorRequiredCourses,
		"major",
	);

	// Calculate minor progress (if applicable)
	let minorProgress;
	if (minorRequiredCourses.length > 0) {
		minorProgress = calculateRequirementProgress(minorRequiredCourses, "minor");
	}

	return {
		completedCourses,
		inProgressCourses,
		plannedCourses,
		totalCredits,
		majorProgress,
		minorProgress,
	};
};
