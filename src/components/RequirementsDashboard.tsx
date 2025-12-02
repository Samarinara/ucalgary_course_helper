import React from "react";
import type { Major, Minor, StudentProgress } from "../data/types";
import { ALL_COURSES } from "../data/courses";

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
				return "bg-green-100 text-green-800 border-green-200";
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
					className="h-2 rounded-full bg-blue-500 transition-all duration-500 ease-out"
					style={{ width: `${Math.min(percentage, 100)}%` }}
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
	return (
		<div className="space-y-6">
			{/* Major Requirements */}
			<div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
				<h3 className="font-bold text-lg text-slate-800 mb-4">
					{major.label} Major Requirements
				</h3>

				<div className="space-y-4">
					{/* Required Courses */}
					<div>
						<h4 className="font-semibold text-slate-700 mb-3">
							Required Courses
						</h4>
						<div className="space-y-2">
							{major.requiredCourses.map((courseId) => (
								<CourseRequirementRow
									key={courseId}
									courseId={courseId}
									isRequired={true}
									requirementType="Major Required"
									progress={progress}
									onCourseClick={onCourseClick}
								/>
							))}
						</div>
					</div>

					{/* Optional Groups */}
					{major.requirementGroups.map((group) => (
						<div key={group.id} className="border-t border-slate-200 pt-4">
							<OptionalGroupSection
								groupLabel={group.label}
								courses={group.courses}
								requiredUnits={group.requiredUnits || 0}
								progress={progress}
							/>
						</div>
					))}
				</div>
			</div>

			{/* Minor Requirements */}
			{minor && (
				<div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm mt-6">
					<h3 className="font-bold text-lg text-slate-800 mb-4">
						{minor.label} Minor Requirements
					</h3>

					<div className="space-y-4">
						{/* Required Courses */}
						<div>
							<h4 className="font-semibold text-slate-700 mb-3">
								Required Courses
							</h4>
							<div className="space-y-2">
								{minor.requiredCourses.map((courseId) => (
									<CourseRequirementRow
										key={courseId}
										courseId={courseId}
										isRequired={true}
										requirementType="Minor Required"
										progress={progress}
										onCourseClick={onCourseClick}
									/>
								))}
							</div>
						</div>

						{/* Optional Groups */}
						{minor.requirementGroups.map((group) => (
							<div key={group.id} className="border-t border-slate-200 pt-4">
								<OptionalGroupSection
									groupLabel={group.label}
									courses={group.courses}
									requiredUnits={group.requiredUnits || 0}
									progress={progress}
								/>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Summary Statistics */}
			<div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
				<h3 className="font-bold text-lg text-slate-800 mb-3">Summary</h3>
				<div className="grid grid-cols-2 gap-4 text-sm">
					<div className="flex justify-between">
						<span className="text-slate-600">Major Required Courses:</span>
						<span className="font-medium text-slate-800">
							{major.requiredCourses.length}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-slate-600">Completed Major Courses:</span>
						<span className="font-medium text-green-600">
							{
								major.requiredCourses.filter((id) =>
									progress.completedCourses.has(id),
								).length
							}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-slate-600">In Progress:</span>
						<span className="font-medium text-yellow-600">
							{
								major.requiredCourses.filter((id) =>
									progress.inProgressCourses.has(id),
								).length
							}
						</span>
					</div>
					{minor && (
						<>
							<div className="flex justify-between">
								<span className="text-slate-600">Minor Required Courses:</span>
								<span className="font-medium text-slate-800">
									{minor.requiredCourses.length}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-slate-600">Completed Minor Courses:</span>
								<span className="font-medium text-green-600">
									{
										minor.requiredCourses.filter((id) =>
											progress.completedCourses.has(id),
										).length
									}
								</span>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default RequirementsDashboard;
