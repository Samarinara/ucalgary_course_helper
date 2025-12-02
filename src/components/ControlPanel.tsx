import React from "react";
import { MAJORS, MINORS, PROGRAM_HIERARCHY } from "../data/courses";

interface ControlPanelProps {
	selectedMajorId: string;
	selectedMinorId: string | null;
	onMajorChange: (majorId: string) => void;
	onMinorChange: (minorId: string | null) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
	selectedMajorId,
	selectedMinorId,
	onMajorChange,
	onMinorChange,
}) => {
	return (
		<div className="p-4 bg-white rounded-lg shadow-md border border-slate-200 mb-4 space-y-4">
			<div>
				<label className="block text-sm font-semibold text-slate-700 mb-1">
					Select Major
				</label>
				<select
					value={selectedMajorId}
					onChange={(e) => onMajorChange(e.target.value)}
					className="w-full p-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
				>
					{MAJORS.map((major) => (
						<option key={major.id} value={major.id}>
							{major.label}
						</option>
					))}
				</select>
			</div>

			<div>
				<label className="block text-sm font-semibold text-slate-700 mb-1">
					Select Minor (Optional)
				</label>
				<select
					value={selectedMinorId || ""}
					onChange={(e) => onMinorChange(e.target.value || null)}
					className="w-full p-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
				>
					<option value="">None</option>
					{MINORS.filter((minor) => {
						const validMinors = PROGRAM_HIERARCHY[selectedMajorId] || [];
						return validMinors.includes(minor.id);
					}).map((minor) => (
						<option key={minor.id} value={minor.id}>
							{minor.label}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default ControlPanel;
