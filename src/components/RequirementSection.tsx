import React, { useState } from "react";
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
	const [isHovering, setIsHovering] = useState(false);

	const handleMouseEnter = () => setIsHovering(true);
	const handleMouseLeave = () => setIsHovering(false);

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
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
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

			{/* Hover Tooltip */}
			{isHovering && (
				<div className="absolute z-10 bg-slate-900 text-white p-3 rounded-lg shadow-xl border border-slate-700 -top-2 left-full ml-2 w-64">
					<h4 className="font-semibold mb-2 text-sm">
						Courses in this section:
					</h4>
					<div className="space-y-1 max-h-32 overflow-y-auto">
						{uniqueCourses.map((courseId) => {
							const course = ALL_COURSES[courseId];
							return (
								<div key={courseId} className="text-xs flex items-center">
									<span className="font-medium mr-2">{courseId}:</span>
									<span>{course?.name || course?.label}</span>
								</div>
							);
						})}
					</div>
					<div className="text-xs text-slate-300 mt-2 pt-2 border-t border-slate-700">
						{uniqueCourses.length} courses • {totalRequired} units required
					</div>
				</div>
			)}
		</div>
	);
};

export default RequirementSection;
