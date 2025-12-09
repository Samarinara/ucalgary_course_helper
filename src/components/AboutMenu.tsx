import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Info, X, Github, Globe, Code, Heart, Coffee } from "lucide-react";

interface AboutMenuProps {
	className?: string;
}

const TECH_STACK = ["Next.js", "React", "TypeScript", "Tailwind"];

const AboutModalContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
	const navigateToGithub = () => {
		window.open("https://github.com/samarinara/ucalgary-courses", "_blank");
	};

	const navigateToWebsite = () => {
		window.open("https://samkatevatis.usernametaken.net/home", "_blank");
	};

	return (
		<motion.div
			initial={{ scale: 0.9, opacity: 0, y: 20 }}
			animate={{ scale: 1, opacity: 1, y: 0 }}
			exit={{ scale: 0.9, opacity: 0, y: 20 }}
			transition={{ type: "spring", damping: 25, stiffness: 300 }}
			className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden flex flex-col"
			onClick={(e) => e.stopPropagation()}
		>
			{/* Header */}
			<div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
				<div className="flex items-center gap-3">
					<div className="p-2 bg-red-100 rounded-lg text-[#CF0722]">
						<Info size={24} />
					</div>
					<h2 className="text-xl font-bold text-slate-800">About</h2>
				</div>
				<button
					onClick={onClose}
					className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
				>
					<X size={20} />
				</button>
			</div>

			{/* Content */}
			<div className="p-6 space-y-6">
				{/* Project Info */}
				<div className="space-y-4">
					<div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
						<div className="flex-1">
							<h3 className="font-bold text-slate-900">Ucalgary Courseweb</h3>
							<p className="text-sm text-slate-500">Version 1.0.0</p>
						</div>
						<button className="flex gap-2" onClick={navigateToGithub}>
							<div
								className="p-2 bg-white rounded-lg text-slate-600 hover:text-[#CF0722] hover:shadow-md transition-all"
								title="View Source"
							>
								<Github size={20} />
							</div>
						</button>
						<button className="flex gap-2" onClick={navigateToWebsite}>
							<div
								className="p-2 bg-white rounded-lg text-slate-600 hover:text-[#CF0722] hover:shadow-md transition-all"
								title="View Website"
							>
								<Globe size={20} />
							</div>
						</button>
					</div>

					<p className="text-slate-600 text-sm leading-relaxed">
						A visual course planning tool for University of Calgary students.
						Designed to simplify degree planning through interactive
						visualization.
					</p>
				</div>

				{/* Tech Stack */}
				<div>
					<h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
						<Code size={14} />
						Built With
					</h3>
					<div className="flex flex-wrap gap-2">
						{TECH_STACK.map((tech) => (
							<span
								key={tech}
								className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full"
							>
								{tech}
							</span>
						))}
					</div>
				</div>

				{/* Credits */}
				<div className="pt-6 border-t border-slate-100">
					<div className="flex items-center justify-center gap-2 text-sm text-slate-500">
						<span>Made with</span>
						<Heart size={14} className="text-red-500 fill-red-500" />
						<span>and</span>
						<Coffee size={14} className="text-amber-700" />
						<span>for UCalgary</span>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

const AboutMenu: React.FC<AboutMenuProps> = ({ className = "" }) => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);

	return (
		<>
			{/* About Button */}
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onClick={openModal}
				className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full shadow-md transition-colors bg-[#CF0722] text-white ${className}`}
			>
				<Info size={18} />
				<span>About</span>
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
						<AboutModalContent onClose={closeModal} />
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default AboutMenu;
