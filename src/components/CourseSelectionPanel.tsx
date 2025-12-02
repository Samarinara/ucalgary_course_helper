import React from "react";
import type { CourseNode, CourseProgress } from "../data/types";

interface CourseSelectionPanelProps {
	selectedCourse: CourseNode | null;
	courseProgress: Map<string, CourseProgress>;
	onCourseStatusChange: (
		courseId: string,
		status: CourseProgress["status"],
	) => void;
}

const CourseSelectionPanel: React.FC<CourseSelectionPanelProps> = ({
	selectedCourse,
	courseProgress,
	onCourseStatusChange,
}) => {
	if (!selectedCourse) {
		return (
			<div className="flex flex-col items-center justify-center h-32 text-slate-400 text-center">
				<svg
					className="w-12 h-12 mb-2 opacity-50"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<p className="text-sm">Select a course to manage its status</p>
			</div>
		);
	}

	const currentProgress = courseProgress.get(selectedCourse.id);
	const currentStatus = currentProgress?.status || "planned";

	const StatusButton: React.FC<{
		status: CourseProgress["status"];
		label: string;
		color: string;
		isActive: boolean;
	}> = ({ status, label, color, isActive }) => (
		<button
			onClick={() => onCourseStatusChange(selectedCourse.id, status)}
			className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
				isActive
					? `${color} text-white shadow-md`
					: "bg-slate-100 text-slate-600 hover:bg-slate-200"
			}`}
		>
			{label}
		</button>
	);

	const statusConfig = [
		{ status: "planned" as const, label: "Planned", color: "bg-blue-500" },
		{
			status: "in_progress" as const,
			label: "In Progress",
			color: "bg-yellow-500",
		},
		{ status: "completed" as const, label: "Completed", color: "bg-green-500" },
	];

	return (
		<div className="space-y-4">
			{/* Course Header */}
			<div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
				<h3 className="font-bold text-lg text-slate-800 mb-1">
					{selectedCourse.id}
				</h3>
				<p className="text-sm text-slate-600 mb-2">
					{selectedCourse.name || selectedCourse.label}
				</p>
				{selectedCourse.units && (
					<div className="inline-flex items-center px-2 py-1 bg-slate-100 rounded text-xs font-medium text-slate-700">
						{selectedCourse.units} units
					</div>
				)}
			</div>

			{/* Status Selection */}
			<div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
				<h4 className="font-semibold text-slate-800 mb-3">Course Status</h4>
				<div className="grid grid-cols-3 gap-2">
					{statusConfig.map(({ status, label, color }) => (
						<StatusButton
							key={status}
							status={status}
							label={label}
							color={color}
							isActive={currentStatus === status}
						/>
					))}
				</div>
			</div>

			{/* Prerequisites */}
			{selectedCourse.prerequisites.length > 0 && (
				<div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
					<h4 className="font-semibold text-slate-800 mb-3">Prerequisites</h4>
					<div className="space-y-2">
						{selectedCourse.prerequisites.map((prereqId) => {
							const prereqProgress = courseProgress.get(prereqId);
							const isCompleted = prereqProgress?.status === "completed";

							return (
								<div
									key={prereqId}
									className="flex items-center justify-between p-2 bg-slate-50 rounded"
								>
									<span className="text-sm font-medium text-slate-700">
										{prereqId}
									</span>
									<span
										className={`text-xs px-2 py-1 rounded-full ${
											isCompleted
												? "bg-green-100 text-green-800"
												: "bg-red-100 text-red-800"
										}`}
									>
										{isCompleted ? "Completed" : "Not Completed"}
									</span>
								</div>
							);
						})}
					</div>
				</div>
			)}

			{/* Additional Info */}
			{selectedCourse.description && (
				<div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
					<h4 className="font-semibold text-slate-800 mb-2">Description</h4>
					<p className="text-sm text-slate-600 leading-relaxed">
						{selectedCourse.description}
					</p>
				</div>
			)}

			{/* Progress Details */}
			{currentProgress && (
				<div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
					<h4 className="font-semibold text-slate-800 mb-3">
						Progress Details
					</h4>
					<div className="space-y-2 text-sm">
						{currentProgress.grade && (
							<div className="flex justify-between">
								<span className="text-slate-600">Grade:</span>
								<span className="font-medium text-slate-800">
									{currentProgress.grade}
								</span>
							</div>
						)}
						{currentProgress.semester && (
							<div className="flex justify-between">
								<span className="text-slate-600">Semester:</span>
								<span className="font-medium text-slate-800">
									{currentProgress.semester}
								</span>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default CourseSelectionPanel;
