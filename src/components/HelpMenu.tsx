import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
	HelpCircle,
	X,
	MousePointerClick,
	ZoomIn,
	CheckCircle2,
	Circle,
	Ban,
	Layers,
	Settings,
	Lightbulb,
} from "lucide-react";

interface HelpMenuProps {
	className?: string;
}

const HelpMenu: React.FC<HelpMenuProps> = ({ className = "" }) => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);

	return (
		<>
			{/* Help Button */}
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onClick={openModal}
				className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full shadow-md transition-colors ${className}`}
				style={{
					backgroundColor: "#FFCD00",
					color: "#1f2937",
				}}
			>
				<HelpCircle size={18} />
				<span>Help</span>
			</motion.button>

			{/* Modal Overlay */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
						onClick={closeModal}
					>
						{/* Modal Content */}
						<motion.div
							initial={{ scale: 0.9, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.9, opacity: 0, y: 20 }}
							transition={{ type: "spring", damping: 25, stiffness: 300 }}
							className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Header */}
							<div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
								<div className="flex items-center gap-3">
									<div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
										<HelpCircle size={24} />
									</div>
									<h2 className="text-xl font-bold text-slate-800">
										Course Planner Guide
									</h2>
								</div>
								<button
									onClick={closeModal}
									className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
								>
									<X size={20} />
								</button>
							</div>

							{/* Content */}
							<div className="p-6 overflow-y-auto space-y-8 custom-scrollbar">
								{/* Course Selection */}
								<section>
									<h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
										<MousePointerClick size={16} className="text-red-600" />
										Interactions
									</h3>
									<div className="grid gap-3 text-slate-600 text-sm">
										<div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
											<div className="mt-0.5 font-bold text-slate-900">
												Left Click
											</div>
											<div>Select a course to view details and prerequisites</div>
										</div>
										<div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
											<div className="mt-0.5 font-bold text-slate-900">
												Right Click
											</div>
											<div>Toggle course completion status</div>
										</div>
										<div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
											<div className="mt-0.5 font-bold text-slate-900">
												Zoom/Pan
											</div>
											<div>Use mouse wheel to zoom, drag to move around</div>
										</div>
									</div>
								</section>

								{/* Course Status Colors */}
								<section>
									<h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
										<Layers size={16} className="text-red-600" />
										Status Legend
									</h3>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
										<div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-white">
											<div className="w-4 h-4 rounded-full bg-[#CF0722]" />
											<span className="text-sm font-medium text-slate-700">
												Required
											</span>
										</div>
										<div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-white">
											<div className="w-4 h-4 rounded-full bg-[#FCCA00]" />
											<span className="text-sm font-medium text-slate-700">
												In Progress
											</span>
										</div>
										<div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-white">
											<div className="w-4 h-4 rounded-full bg-blue-500" />
											<span className="text-sm font-medium text-slate-700">
												Completed
											</span>
										</div>
										<div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-white">
											<div className="w-4 h-4 rounded-full bg-slate-400" />
											<span className="text-sm font-medium text-slate-700">
												Locked
											</span>
										</div>
									</div>
								</section>

								{/* Features Grid */}
								<div className="grid md:grid-cols-2 gap-6">
									{/* Requirement Groups */}
									<section>
										<h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
											<CheckCircle2 size={16} className="text-red-600" />
											Requirements
										</h3>
										<ul className="space-y-2 text-sm text-slate-600 list-disc list-inside marker:text-slate-300">
											<li>Grouped nodes share requirements</li>
											<li>Large circles show credit totals</li>
											<li>Check "Requirements" tab for details</li>
										</ul>
									</section>

									{/* Program Configuration */}
									<section>
										<h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
											<Settings size={16} className="text-red-600" />
											Configuration
										</h3>
										<ul className="space-y-2 text-sm text-slate-600 list-disc list-inside marker:text-slate-300">
											<li>Select Major & Minor in sidebar</li>
											<li>Track credits in "Overview"</li>
											<li>Manage courses in "Selection"</li>
										</ul>
									</section>
								</div>

								{/* Pro Tips */}
								<section className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
									<h3 className="text-sm font-bold text-yellow-800 uppercase tracking-wider mb-2 flex items-center gap-2">
										<Lightbulb size={16} />
										Pro Tips
									</h3>
									<ul className="space-y-1 text-sm text-yellow-700">
										<li>• Progress is saved automatically to your browser</li>
										<li>• Completed courses show a cross pattern for accessibility</li>
									</ul>
								</section>
							</div>

							{/* Footer */}
							<div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={closeModal}
									className="px-6 py-2.5 bg-[#CF0722] text-white font-medium rounded-xl shadow-lg shadow-red-900/20 hover:bg-[#b5061c] transition-colors"
								>
									Got it, thanks!
								</motion.button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default HelpMenu;
