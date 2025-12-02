"use client";

import React, { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
	ALL_COURSES,
	MAJORS,
	MINORS,
	PROGRAM_HIERARCHY,
} from "../data/courses";
import type {
	CourseNode,
	CourseProgress,
	StudentProgress,
} from "../data/types";
import ControlPanel from "../components/ControlPanel";
import CreditTracker from "../components/CreditTracker";
import CourseSelectionPanel from "../components/CourseSelectionPanel";
import RequirementsDashboard from "../components/RequirementsDashboard";
import {
	loadCourseProgress,
	saveCourseProgress,
	calculateStudentProgress,
} from "../utils/progressStorage";

const CourseGraph = dynamic(() => import("../components/CourseGraph"), {
	ssr: false,
	loading: () => (
		<div className="flex items-center justify-center h-full">
			Loading Graph...
		</div>
	),
});

export default function Home() {
	const [selectedNode, setSelectedNode] = useState<CourseNode | null>(null);
	const [selectedMajorId, setSelectedMajorId] = useState<string>(
		MAJORS.length > 0 ? MAJORS[0]!.id : "",
	);
	const [selectedMinorId, setSelectedMinorId] = useState<string | null>(null);
	const [courseProgress, setCourseProgress] = useState<
		Map<string, CourseProgress>
	>(new Map());
	const [activeTab, setActiveTab] = useState<
		"overview" | "requirements" | "selection"
	>("overview");
	const [focusedCourseId, setFocusedCourseId] = useState<string | null>(null);

	// Load course progress from local storage on mount
	useEffect(() => {
		setCourseProgress(loadCourseProgress());
	}, []);

	// Calculate student progress
	const studentProgress = useMemo(() => {
		const major = MAJORS.find((m) => m.id === selectedMajorId);
		const minor = selectedMinorId
			? MINORS.find((m) => m.id === selectedMinorId)
			: undefined;

		if (!major) return null;

		return calculateStudentProgress(
			courseProgress,
			major.requiredCourses,
			minor?.requiredCourses || [],
			ALL_COURSES,
		);
	}, [courseProgress, selectedMajorId, selectedMinorId]);

	// Calculate visible nodes based on selection
	const { nodes, links } = useMemo(() => {
		const activeCourseIds = new Set<string>();

		// 1. Add Common Year courses (all courses with common year prefixes)
		Object.values(ALL_COURSES)
			.filter(
				(course) =>
					course.id.startsWith("ENGG") ||
					course.id.startsWith("ENDG") ||
					course.id.startsWith("MATH") ||
					course.id.startsWith("PHYS"),
			)
			.forEach((c) => activeCourseIds.add(c.id));

		// 2. Add Major Courses
		const major = MAJORS.find((m) => m.id === selectedMajorId);
		if (major) {
			major.requiredCourses.forEach((id) => activeCourseIds.add(id));
			// Add courses from requirement groups
			major.requirementGroups.forEach((group) => {
				group.courses.forEach((id) => activeCourseIds.add(id));
			});
		}

		// 3. Add Minor Courses
		if (selectedMinorId) {
			const minor = MINORS.find((m) => m.id === selectedMinorId);
			if (minor) {
				minor.requiredCourses.forEach((id) => activeCourseIds.add(id));
				// Add courses from requirement groups
				minor.requirementGroups.forEach((group) => {
					group.courses.forEach((id) => activeCourseIds.add(id));
				});
			}
		}

		// Create Nodes
		const computedNodes: CourseNode[] = [];
		activeCourseIds.forEach((id) => {
			const course = ALL_COURSES[id];
			if (course) {
				const progress = courseProgress.get(id);
				let status: CourseNode["status"] = "required";

				if (progress) {
					status =
						progress.status === "completed"
							? "completed"
							: progress.status === "in_progress"
								? "in_progress"
								: "required";
				}

				// Check if prerequisites are satisfied
				const isPrereqSatisfied = course.prerequisites.every(
					(prereqId) => courseProgress.get(prereqId)?.status === "completed",
				);

				computedNodes.push({
					...course,
					status,
					shape: "circle",
					isPrereqSatisfied,
					requirementType: "major", // This could be enhanced to differentiate major/minor/common
				});
			}
		});

		// Create Links (only if both source and target are active)
		const computedLinks: { source: string; target: string }[] = [];
		computedNodes.forEach((course) => {
			course.prerequisites.forEach((prereqId) => {
				if (activeCourseIds.has(prereqId)) {
					computedLinks.push({ source: prereqId, target: course.id });
				}
			});
		});

		return { nodes: computedNodes, links: computedLinks };
	}, [selectedMajorId, selectedMinorId, courseProgress]);

	const handleNodeClick = React.useCallback((node: CourseNode) => {
		setSelectedNode(node);
	}, []);

	const handleCourseStatusChange = React.useCallback(
		(courseId: string, status: CourseProgress["status"]) => {
			const newProgress = new Map(courseProgress);
			const progressData = { status };
			newProgress.set(courseId, progressData);
			setCourseProgress(newProgress);
			saveCourseProgress(courseId, progressData);
		},
		[courseProgress],
	);

	return (
		<main className="flex h-screen flex-row overflow-hidden bg-slate-100">
			{/* Main Graph Area */}
			<div className="flex-1 flex flex-col p-4">
				<h1 className="text-2xl font-bold mb-4 text-slate-800">
					Engineering Course Graph
				</h1>
				<div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
					<CourseGraph
						nodes={nodes}
						links={links}
						onNodeClick={handleNodeClick}
						onCourseStatusChange={handleCourseStatusChange}
						focusedCourseId={focusedCourseId}
						selectedMajorId={selectedMajorId}
					/>
				</div>
			</div>

			{/* Sidebar */}
			<div className="w-96 bg-white border-l border-slate-200 shadow-xl p-6 flex flex-col overflow-y-auto">
				<h2 className="text-xl font-bold mb-6 text-slate-800">Configuration</h2>

				<ControlPanel
					selectedMajorId={selectedMajorId}
					selectedMinorId={selectedMinorId}
					onMajorChange={setSelectedMajorId}
					onMinorChange={setSelectedMinorId}
				/>

				{/* Tab Navigation */}
				<div className="flex space-x-1 mb-6 bg-slate-100 p-1 rounded-lg">
					{[
						{ id: "overview", label: "Overview" },
						{ id: "requirements", label: "Requirements" },
						{ id: "selection", label: "Course Selection" },
					].map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id as any)}
							className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
								activeTab === tab.id
									? "bg-white text-slate-900 shadow-sm"
									: "text-slate-600 hover:text-slate-900"
							}`}
						>
							{tab.label}
						</button>
					))}
				</div>

				{/* Tab Content */}
				<div className="flex-1 overflow-y-auto">
					{activeTab === "overview" && studentProgress && (
						<CreditTracker
							progress={studentProgress}
							majorName={
								MAJORS.find((m) => m.id === selectedMajorId)?.label || ""
							}
							minorName={
								selectedMinorId
									? MINORS.find((m) => m.id === selectedMinorId)?.label
									: undefined
							}
						/>
					)}

					{activeTab === "requirements" && studentProgress && (
						<RequirementsDashboard
							major={MAJORS.find((m) => m.id === selectedMajorId)!}
							minor={
								selectedMinorId
									? MINORS.find((m) => m.id === selectedMinorId)
									: undefined
							}
							progress={studentProgress}
							onCourseClick={(courseId) => {
								setFocusedCourseId(courseId);
								setActiveTab("overview");
							}}
						/>
					)}

					{activeTab === "selection" && (
						<CourseSelectionPanel
							selectedCourse={selectedNode}
							courseProgress={courseProgress}
							onCourseStatusChange={handleCourseStatusChange}
						/>
					)}
				</div>
			</div>
		</main>
	);
}
