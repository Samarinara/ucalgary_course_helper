import React, { useState } from "react";
import type { Major, Minor, StudentProgress } from "../data/types";
import { ALL_COURSES } from "../data/courses";
import RequirementSection from "./RequirementSection";
import SectionPopup from "./SectionPopup";

interface RequirementsDashboardProps {
	major: Major;
	minor?: Minor;
	progress: StudentProgress;
	onCourseClick?: (courseId: string) => void;
}

const CourseRequirementRow: React.FC<{
	courseId: string;
	isRequired: boolean;
	requirementType: string;
	progress: StudentProgress;
	onCourseClick?: (courseId: string) => void;
}> = ({ courseId, isRequired, requirementType, progress, onCourseClick }) => {
	const course = ALL_COURSES[courseId];
	const courseProgress = progress.completedCourses.has(courseId)
		? "completed"
		: progress.inProgressCourses.has(courseId)
			? "in_progress"
			: "not_started";

	const getStatusColor = (status: string) => {
		switch (status) {
			case "completed":
				return "bg-blue-100 text-blue-800 border-blue-200";
			case "in_progress":
				return "bg-yellow-100 text-yellow-800 border-yellow-200";
			default:
				return "bg-slate-100 text-slate-600 border-slate-200";
		}
	};

	const getStatusLabel = (status: string) => {
		switch (status) {
			case "completed":
				return "Completed";
			case "in_progress":
				return "In Progress";
			default:
				return "Not Started";
		}
	};

	return (
		<div
			className="flex items-center justify-between p-2 border rounded cursor-pointer hover:bg-slate-50 transition-colors"
			onClick={() => onCourseClick?.(courseId)}
		>
			<span className="text-sm font-medium">
				{courseId}: {course?.name || course?.label}
			</span>
			<div className="flex items-center gap-2">
				<span
					className={`px-2 py-1 rounded text-xs border ${getStatusColor(courseProgress)}`}
				>
					{getStatusLabel(courseProgress)}
				</span>
				{isRequired && (
					<svg
						className="w-4 h-4 text-red-500"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
							clipRule="evenodd"
						/>
					</svg>
				)}
				<span className="text-xs text-slate-600">{requirementType}</span>
			</div>
		</div>
	);
};

const OptionalGroupSection: React.FC<{
	groupLabel: string;
	courses: string[];
	requiredUnits: number;
	progress: StudentProgress;
}> = ({ groupLabel, courses, requiredUnits, progress }) => {
	const completedUnits = courses
		.filter((courseId) => progress.completedCourses.has(courseId))
		.reduce((sum, courseId) => {
			const course = ALL_COURSES[courseId];
			return sum + (course?.units || 0);
		}, 0);

	const inProgressUnits = courses
		.filter((courseId) => progress.inProgressCourses.has(courseId))
		.reduce((sum, courseId) => {
			const course = ALL_COURSES[courseId];
			return sum + (course?.units || 0);
		}, 0);

	const percentage =
		requiredUnits > 0 ? (completedUnits / requiredUnits) * 100 : 0;

	return (
		<div className="border rounded p-3">
			<h4 className="font-semibold text-slate-700 mb-3">{groupLabel}</h4>
			<div className="text-sm text-slate-600 mb-2">
				{completedUnits} / {requiredUnits} units
			</div>
			<div className="w-full bg-slate-200 rounded-full h-2 mb-1">
				<div
					className="h-2 rounded-full transition-all duration-500 ease-out"
					style={{
						width: `${Math.min(percentage, 100)}%`,
						backgroundColor: "#FCCA00",
					}}
				/>
			</div>
			<div className="text-xs text-slate-600">
				{completedUnits} of {requiredUnits} units ({Math.round(percentage)}%)
			</div>
		</div>
	);
};

const RequirementsDashboard: React.FC<RequirementsDashboardProps> = ({
	major,
	minor,
	progress,
	onCourseClick,
}) => {
	const [selectedSection, setSelectedSection] = useState<{
		type: "major" | "minor";
		progress: any;
		title: string;
	} | null>(null);

	const handleSectionClick = (
		type: "major" | "minor",
		title: string,
		progressData: any,
	) => {
		setSelectedSection({ type, title, progress: progressData });
	};

	const closeSectionPopup = () => {
		setSelectedSection(null);
	};
	return (
		<>
			<div className="space-y-6">
				{/* Major Requirements */}
				<div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
					<h3 className="font-bold text-lg text-slate-800 mb-4">
						{major.label} Major Requirements
					</h3>

					<div className="space-y-4">
						<RequirementSection
							title={`${major.label} Major`}
							progress={progress.majorProgress}
							onSectionClick={() =>
								handleSectionClick(
									"major",
									`${major.label} Major`,
									progress.majorProgress,
								)
							}
						/>
					</div>
				</div>

				{/* Minor Requirements */}
				{minor && (
					<div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm mt-6">
						<h3 className="font-bold text-lg text-slate-800 mb-4">
							{minor.label} Minor Requirements
						</h3>

						<div className="space-y-4">
							<RequirementSection
								title={`${minor.label} Minor`}
								progress={progress.minorProgress!}
								onSectionClick={() =>
									handleSectionClick(
										"minor",
										`${minor.label} Minor`,
										progress.minorProgress!,
									)
								}
							/>
						</div>
					</div>
				)}
			</div>

			{/* Section Popup */}
			{selectedSection && (
				<SectionPopup
					isOpen={true}
					onClose={closeSectionPopup}
					title={selectedSection.title}
					progress={selectedSection.progress}
				/>
			)}
		</>
	);
};

export default RequirementsDashboard;
