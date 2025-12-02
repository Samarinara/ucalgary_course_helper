import React from "react";
import type { StudentProgress, RequirementProgress } from "../data/types";

interface CreditTrackerProps {
	progress: StudentProgress;
	majorName: string;
	minorName?: string;
}

const CreditTracker: React.FC<CreditTrackerProps> = ({
	progress,
	majorName,
	minorName,
}) => {
	const ProgressRing: React.FC<{
		percentage: number;
		size?: number;
		strokeWidth?: number;
		color?: string;
	}> = ({ percentage, size = 120, strokeWidth = 8, color = "#3b82f6" }) => {
		const radius = (size - strokeWidth) / 2;
		const circumference = radius * 2 * Math.PI;
		const offset = circumference - (percentage / 100) * circumference;

		return (
			<div className="relative inline-flex items-center justify-center">
				<svg className="transform -rotate-90" width={size} height={size}>
					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						stroke="#e5e7eb"
						strokeWidth={strokeWidth}
						fill="none"
					/>
					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						stroke={color}
						strokeWidth={strokeWidth}
						fill="none"
						strokeDasharray={circumference}
						strokeDashoffset={offset}
						className="transition-all duration-500 ease-out"
					/>
				</svg>
				<div className="absolute inset-0 flex items-center justify-center">
					<span className="text-2xl font-bold text-slate-800">
						{Math.round(percentage)}%
					</span>
				</div>
			</div>
		);
	};

	const RequirementCard: React.FC<{
		title: string;
		progress: RequirementProgress;
		color: string;
	}> = ({ title, progress, color }) => {
		const percentage =
			progress.totalRequiredUnits > 0
				? (progress.totalCompletedUnits / progress.totalRequiredUnits) * 100
				: 0;

		return (
			<div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
				<div className="flex items-center justify-between mb-3">
					<h3 className="font-semibold text-slate-800">{title}</h3>
					<span className="text-sm text-slate-600">
						{progress.totalCompletedUnits} / {progress.totalRequiredUnits} units
					</span>
				</div>

				<div className="mb-3">
					<div className="w-full bg-slate-200 rounded-full h-2">
						<div
							className="h-2 rounded-full transition-all duration-500 ease-out"
							style={{
								width: `${Math.min(percentage, 100)}%`,
								backgroundColor: color,
							}}
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-2 text-xs">
					{progress.requirementGroups.map((group) => (
						<div key={group.id} className="flex items-center">
							<div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
							<span className="text-slate-600">
								{group.label}: {group.completedValue}/{group.requiredValue}
							</span>
						</div>
					))}
				</div>
			</div>
		);
	};

	const totalRequiredUnits =
		progress.majorProgress.totalRequiredUnits +
		(progress.minorProgress?.totalRequiredUnits || 0);
	const totalCompletedUnits =
		progress.majorProgress.totalCompletedUnits +
		(progress.minorProgress?.totalCompletedUnits || 0);
	const overallPercentage =
		totalRequiredUnits > 0
			? (totalCompletedUnits / totalRequiredUnits) * 100
			: 0;

	return (
		<div className="space-y-6">
			{/* Overall Progress */}
			<div className="text-center">
				<h2 className="text-xl font-bold text-slate-800 mb-4">
					Overall Progress
				</h2>
				<div className="flex justify-center mb-4">
					<ProgressRing percentage={overallPercentage} color="#3b82f6" />
				</div>
				<div className="text-sm text-slate-600">
					{totalCompletedUnits} / {totalRequiredUnits} total units
				</div>
			</div>

			{/* Major Progress */}
			<RequirementCard
				title={`${majorName} Major`}
				progress={progress.majorProgress}
				color="#3b82f6"
			/>

			{/* Minor Progress (if applicable) */}
			{progress.minorProgress && minorName && (
				<RequirementCard
					title={`${minorName} Minor`}
					progress={progress.minorProgress}
					color="#8b5cf6"
				/>
			)}

			{/* Course Status Summary */}
			<div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
				<h3 className="font-semibold text-slate-800 mb-3">
					Course Status Summary
				</h3>
				<div className="space-y-2">
					<div className="flex justify-between text-sm">
						<span className="text-slate-600">Completed Courses:</span>
						<span className="font-medium text-green-600">
							{progress.completedCourses.size}
						</span>
					</div>
					<div className="flex justify-between text-sm">
						<span className="text-slate-600">In Progress:</span>
						<span className="font-medium text-yellow-600">
							{progress.inProgressCourses.size}
						</span>
					</div>
					<div className="flex justify-between text-sm">
						<span className="text-slate-600">Planned:</span>
						<span className="font-medium text-blue-600">
							{progress.plannedCourses.size}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreditTracker;
