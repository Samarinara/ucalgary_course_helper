import React, { useState } from "react";
import type { RequirementProgress, CourseProgress } from "../data/types";
import { ALL_COURSES } from "../data/courses";

interface SectionPopupProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	progress: RequirementProgress;
	onCourseStatusChange: (
		courseId: string,
		status: CourseProgress["status"],
	) => void;
	courseProgress: Map<string, CourseProgress>;
}

const SectionPopup: React.FC<SectionPopupProps> = ({
	isOpen,
	onClose,
	title,
	progress,
	onCourseStatusChange,
	courseProgress,
}) => {
	if (!isOpen) return null;

	// Get all courses for this section
	const allCourses = progress.requirementGroups.flatMap(
		(group) => group.courses.required,
	);
	const uniqueCourses = Array.from(new Set(allCourses));

	// Calculate totals
	const totalRequired = progress.requirementGroups.reduce(
		(sum, group) => sum + group.requiredValue,
		0,
	);
	const totalCompleted = progress.requirementGroups.reduce(
		(sum, group) => sum + group.completedValue,
		0,
	);

	// Status button component
	const StatusButton: React.FC<{
		status: CourseProgress["status"];
		label: string;
		color: string;
		isActive: boolean;
		courseId: string;
	}> = ({ status, label, color, isActive, courseId }) => (
		<button
			onClick={() => onCourseStatusChange(courseId, status)}
			className={`px-2 py-1 rounded text-xs font-medium transition-all ${
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
		<>
			{/* Modal Overlay */}
			<div
				className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
				onClick={onClose}
			>
				{/* Modal Content */}
				<div
					className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto"
					onClick={(e) => e.stopPropagation()}
				>
					{/* Header */}
					<div className="sticky top-0 bg-white border-b border-slate-200 p-6">
						<div className="flex items-center justify-between">
							<h2 className="text-2xl font-bold text-slate-800">
								{title} - Course Details
							</h2>
							<button
								onClick={onClose}
								className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
							>
								×
							</button>
						</div>
					</div>

					{/* Content */}
					<div className="p-6 space-y-6">
						{/* Summary */}
						<section className="bg-slate-50 rounded-lg p-4">
							<h3 className="text-lg font-semibold text-slate-800 mb-3">
								Summary
							</h3>
							<div className="grid grid-cols-2 gap-4 text-sm">
								<div className="flex justify-between">
									<span className="text-slate-600">Total Courses:</span>
									<span className="font-medium text-slate-800">
										{uniqueCourses.length}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-slate-600">Required Units:</span>
									<span className="font-medium text-slate-800">
										{totalRequired}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-slate-600">Completed Units:</span>
									<span className="font-medium text-green-600">
										{totalCompleted}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-slate-600">Progress:</span>
									<span className="font-medium text-blue-600">
										{totalRequired > 0
											? Math.round((totalCompleted / totalRequired) * 100)
											: 0}
										%
									</span>
								</div>
							</div>
						</section>

						{/* Requirement Groups */}
						<section>
							<h3 className="text-lg font-semibold text-slate-800 mb-3">
								Requirement Groups
							</h3>
							<div className="space-y-4">
								{progress.requirementGroups.map((group) => {
									const groupPercentage =
										group.requiredValue > 0
											? (group.completedValue / group.requiredValue) * 100
											: 0;

									return (
										<div
											key={group.id}
											className="bg-white rounded-lg border border-slate-200 p-4"
										>
											<div className="flex items-center justify-between mb-2">
												<h4 className="font-medium text-slate-700">
													{group.label}
												</h4>
												<span className="text-sm text-slate-600">
													{group.completedValue}/{group.requiredValue}
												</span>
											</div>

											<div className="w-full bg-slate-200 rounded-full h-2 mb-3">
												<div
													className="h-2 rounded-full transition-all duration-500 ease-out"
													style={{
														width: `${Math.min(groupPercentage, 100)}%`,
														backgroundColor:
															group.type === "credits" ? "#FCCA00" : "#CF0722",
													}}
												/>
											</div>

											{/* Course List */}
											<div className="space-y-2">
												<h5 className="text-sm font-medium text-slate-600">
													Courses:
												</h5>
												<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
													{group.courses.required.map((courseId) => {
														const course = ALL_COURSES[courseId];
														const currentProgress =
															courseProgress.get(courseId);
														const currentStatus =
															currentProgress?.status || "planned";
														const isCompleted =
															group.courses.completed.includes(courseId);
														const isInProgress =
															group.courses.inProgress.includes(courseId);

														return (
															<div
																key={courseId}
																className={`text-xs p-2 rounded border ${
																	isCompleted
																		? "bg-green-50 border-green-200 text-green-800"
																		: isInProgress
																			? "bg-yellow-50 border-yellow-200 text-yellow-800"
																			: "bg-slate-50 border-slate-200 text-slate-600"
																}`}
															>
																<div className="flex items-center justify-between mb-2">
																	<span className="font-medium">
																		{courseId}
																	</span>
																	<span className="text-slate-500">
																		{course?.units || 0} units
																	</span>
																</div>
																<div className="text-xs text-slate-500 mb-2">
																	{course?.name || course?.label}
																</div>
																<div className="flex gap-1">
																	{statusConfig.map(
																		({ status, label, color }) => (
																			<StatusButton
																				key={status}
																				status={status}
																				label={label}
																				color={color}
																				isActive={currentStatus === status}
																				courseId={courseId}
																			/>
																		),
																	)}
																</div>
															</div>
														);
													})}
												</div>
											</div>

											{group.type === "credits" && (
												<p className="text-xs text-slate-500 mt-2">
													Credit-based requirement: Complete{" "}
													{group.requiredValue} units from the listed courses
												</p>
											)}
										</div>
									);
								})}
							</div>
						</section>
					</div>

					{/* Footer */}
					<div className="border-t border-slate-200 p-4 bg-slate-50">
						<div className="flex justify-between items-center">
							<p className="text-sm text-slate-500">
								{title} Requirement Details
							</p>
							<button
								onClick={onClose}
								className="px-4 py-2 font-medium rounded-lg transition-colors"
								style={{
									backgroundColor: "#CF0722",
									color: "white",
								}}
								onMouseOver={(e) =>
									(e.currentTarget.style.backgroundColor = "#B5061C")
								}
								onMouseOut={(e) =>
									(e.currentTarget.style.backgroundColor = "#CF0722")
								}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SectionPopup;
