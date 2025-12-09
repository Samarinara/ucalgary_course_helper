import React from "react";
import type { RequirementProgress } from "../data/types";
import { ALL_COURSES } from "../data/courses";

interface RequirementSectionProps {
	title: string;
	progress: RequirementProgress;
	onSectionClick?: () => void;
}

const RequirementSection: React.FC<RequirementSectionProps> = ({
	title,
	progress,
	onSectionClick,
}) => {
	// Calculate overall progress for this section
	const totalRequired = progress.requirementGroups.reduce(
		(sum, group) => sum + group.requiredValue,
		0,
	);
	const totalCompleted = progress.requirementGroups.reduce(
		(sum, group) => sum + group.completedValue,
		0,
	);
	const percentage =
		totalRequired > 0 ? (totalCompleted / totalRequired) * 100 : 0;

	// Get all courses for this section
	const allCourses = progress.requirementGroups.flatMap(
		(group) => group.courses.required,
	);
	const uniqueCourses = Array.from(new Set(allCourses));

	return (
		<div className="relative">
			{/* Progress Bar */}
			<div
				className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
				onClick={onSectionClick}
			>
				<div className="flex items-center justify-between mb-3">
					<h3 className="font-semibold text-slate-800">{title}</h3>
					<span className="text-sm text-slate-600">
						{totalCompleted} / {totalRequired} units
					</span>
				</div>

				<div className="mb-3">
					<div className="w-full bg-slate-200 rounded-full h-3">
						<div
							className="h-3 rounded-full transition-all duration-500 ease-out"
							style={{
								width: `${Math.min(percentage, 100)}%`,
								backgroundColor: "#FCCA00",
							}}
						/>
					</div>
				</div>

				<div className="text-xs text-slate-500">
					{Math.round(percentage)}% complete
				</div>
			</div>
		</div>
	);
};

export default RequirementSection;
