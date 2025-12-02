import React, { useState } from "react";

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
			<button
				onClick={openModal}
				className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
				style={{
					backgroundColor: "#FCCA00",
					color: "#1f2937",
					boxShadow: "0 2px 4px rgba(252, 202, 0, 0.3)",
				}}
			>
				❓ Help
			</button>

			{/* Modal Overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
					onClick={closeModal}
				>
					{/* Modal Content */}
					<div
						className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Header */}
						<div className="sticky top-0 bg-white border-b border-slate-200 p-6">
							<div className="flex items-center justify-between">
								<h2 className="text-2xl font-bold text-slate-800">
									🎓 Course Planner Guide
								</h2>
								<button
									onClick={closeModal}
									className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
								>
									×
								</button>
							</div>
						</div>

						{/* Content */}
						<div className="p-6 space-y-6">
							{/* Course Selection */}
							<section>
								<h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
									<span
										className="w-8 h-8 rounded-full flex items-center justify-center mr-3 text-white text-sm"
										style={{ backgroundColor: "#CF0722" }}
									>
										1
									</span>
									Selecting Courses
								</h3>
								<div className="ml-11 space-y-2 text-slate-600">
									<p>
										• <strong>Left-click</strong> any course node to select it
										and view details
									</p>
									<p>
										• <strong>Right-click</strong> any course to toggle
										completion status
									</p>
									<p>
										• <strong>Click courses in Requirements tab</strong> to zoom
										into them on the graph
									</p>
									<p>
										• Use mouse wheel to zoom in/out and drag to pan around the
										graph
									</p>
								</div>
							</section>

							{/* Course Status Colors */}
							<section>
								<h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
									<span
										className="w-8 h-8 rounded-full flex items-center justify-center mr-3 text-white text-sm"
										style={{ backgroundColor: "#CF0722" }}
									>
										2
									</span>
									Course Status Colors
								</h3>
								<div className="ml-11 space-y-2">
									<div className="flex items-center">
										<div
											className="w-6 h-6 rounded mr-3"
											style={{ backgroundColor: "#CF0722", opacity: 0.85 }}
										></div>
										<span className="text-slate-600">
											<strong>Required:</strong> Courses you must take for your
											program
										</span>
									</div>
									<div className="flex items-center">
										<div
											className="w-6 h-6 rounded mr-3"
											style={{ backgroundColor: "#FCCA00", opacity: 0.85 }}
										></div>
										<span className="text-slate-600">
											<strong>In Progress:</strong> Courses you're currently
											taking
										</span>
									</div>
									<div className="flex items-center">
										<div
											className="w-6 h-6 rounded mr-3 bg-blue-500"
											style={{ opacity: 0.85 }}
										></div>
										<span className="text-slate-600">
											<strong>Completed:</strong> Courses you've successfully
											finished
										</span>
									</div>
									<div className="flex items-center">
										<div
											className="w-6 h-6 rounded mr-3 bg-slate-400"
											style={{ opacity: 0.85 }}
										></div>
										<span className="text-slate-600">
											<strong>Unavailable:</strong> Courses with unmet
											prerequisites
										</span>
									</div>
								</div>
							</section>

							{/* Requirement Groups */}
							<section>
								<h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
									<span
										className="w-8 h-8 rounded-full flex items-center justify-center mr-3 text-white text-sm"
										style={{ backgroundColor: "#CF0722" }}
									>
										3
									</span>
									Requirement Groups
								</h3>
								<div className="ml-11 space-y-2 text-slate-600">
									<p>
										• <strong>Closely packed courses</strong> belong to the same
										requirement group
									</p>
									<p>
										• These groups represent flexible requirements (e.g.,
										"Choose 3 of 5 courses")
									</p>
									<p>
										• Large circles encompass groups and show credit
										requirements
									</p>
									<p>• Groups are specific to your selected major</p>
									<p>
										• Check the Requirements tab to see detailed progress for
										each group
									</p>
								</div>
							</section>

							{/* Program Configuration */}
							<section>
								<h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
									<span
										className="w-8 h-8 rounded-full flex items-center justify-center mr-3 text-white text-sm"
										style={{ backgroundColor: "#CF0722" }}
									>
										4
									</span>
									Program Configuration
								</h3>
								<div className="ml-11 space-y-2 text-slate-600">
									<p>
										• <strong>Major Selection:</strong> Choose your primary
										engineering discipline
									</p>
									<p>
										• <strong>Minor Selection:</strong> Add a complementary
										minor (valid combinations only)
									</p>
									<p>
										• <strong>Overview Tab:</strong> See overall progress and
										credit requirements
									</p>
									<p>
										• <strong>Requirements Tab:</strong> Detailed breakdown of
										major/minor requirements
									</p>
									<p>
										• <strong>Course Selection Tab:</strong> View and manage
										individual course status
									</p>
								</div>
							</section>

							{/* Tips */}
							<section>
								<h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
									<span
										className="w-8 h-8 rounded-full flex items-center justify-center mr-3 text-white text-sm"
										style={{ backgroundColor: "#FCCA00", color: "#1f2937" }}
									>
										💡
									</span>
									Pro Tips
								</h3>
								<div className="ml-11 space-y-2 text-slate-600">
									<p>• Your progress is automatically saved locally</p>
									<p>
										• Courses are semi-transparent so you can see prerequisite
										arrows
									</p>
									<p>
										• Completed courses show a cross pattern for colorblind
										accessibility
									</p>
									<p>• In-progress courses show a dot pattern</p>
									<p>
										• Use the Requirements tab to track complex credit-based
										requirements
									</p>
								</div>
							</section>
						</div>

						{/* Footer */}
						<div className="border-t border-slate-200 p-4 bg-slate-50">
							<div className="flex justify-between items-center">
								<p className="text-sm text-slate-500">
									University of Calgary Engineering Course Planner
								</p>
								<button
									onClick={closeModal}
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
									Got it!
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default HelpMenu;
