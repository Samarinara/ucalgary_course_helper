import React, { useState } from "react";

interface AboutMenuProps {
	className?: string;
}

const AboutMenu: React.FC<AboutMenuProps> = ({ className = "" }) => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);

	return (
		<>
			{/* About Button */}
			<button
				onClick={openModal}
				className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
				style={{
					backgroundColor: "#CF0722",
					color: "white",
					boxShadow: "0 2px 4px rgba(207, 7, 34, 0.3)",
				}}
			>
				ℹ️ About
			</button>

			{/* Modal Overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
					onClick={closeModal}
				>
					{/* Modal Content */}
					<div
						className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Header */}
						<div className="sticky top-0 bg-white border-b border-slate-200 p-6">
							<div className="flex items-center justify-between">
								<h2 className="text-2xl font-bold text-slate-800">
									About Course Planner
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
							{/* Developer Info */}
							<section>
								<h3 className="text-lg font-semibold text-slate-800 mb-3">
									Developer
								</h3>
								<div className="space-y-2 text-slate-600">
									<p>
										<strong>Created by:</strong> [Your Name]
									</p>
									<div className="flex items-center space-x-4">
										<a
											href="https://github.com/yourusername"
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
										>
											<svg
												className="w-5 h-5 mr-1"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957 2.345 1.833 3.294 1.833 1.833 0 3.294-1.833 3.294-1.833 0-2.051-1.23-3.301-1.23-.645 1.653.242 2.874.118 3.176.774.656 1.283 1.427 1.283 2.909v2.234c0 .316.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
											</svg>
											GitHub
										</a>
										<a
											href="https://yourwebsite.com"
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
										>
											<svg
												className="w-5 h-5 mr-1"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
											</svg>
											Website
										</a>
									</div>
								</div>
							</section>

							{/* Project Info */}
							<section>
								<h3 className="text-lg font-semibold text-slate-800 mb-3">
									Project
								</h3>
								<div className="space-y-2 text-slate-600">
									<p>
										<strong>Version:</strong> 1.0.0
									</p>
									<p>
										<strong>Technology:</strong> Next.js, React, TypeScript,
										D3.js
									</p>
									<p>
										<strong>Purpose:</strong> University of Calgary Engineering
										Course Planning Tool
									</p>
								</div>
							</section>

							{/* Personal Message */}
							<section>
								<h3 className="text-lg font-semibold text-slate-800 mb-3">
									Message
								</h3>
								<div className="bg-slate-50 rounded-lg p-4 text-slate-600">
									<p className="text-sm leading-relaxed">
										This course planner was designed to help engineering
										students visualize their academic journey and make informed
										decisions about course selection. Built with modern web
										technologies and a focus on user experience and
										accessibility.
									</p>
								</div>
							</section>
						</div>

						{/* Footer */}
						<div className="border-t border-slate-200 p-4 bg-slate-50">
							<div className="flex justify-between items-center">
								<p className="text-sm text-slate-500">
									© 2024 University of Calgary Engineering Course Planner
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
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default AboutMenu;
