"use client";

import React, { useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import type { CourseNode } from "../data/types";
import type { ForceGraphMethods } from "react-force-graph-2d";
import { MAJORS } from "../data/courses";
import { useDimensions } from "../hooks/useDimensions";
import { drawNode } from "../utils/graphUtils";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
	ssr: false,
	loading: () => <div className="p-4">Loading Graph...</div>,
});

interface CourseGraphProps {
	nodes: CourseNode[];
	links: { source: string; target: string }[];
	onNodeClick?: (node: CourseNode) => void;
	onNodeRightClick?: (node: CourseNode) => void;
	onCourseStatusChange?: (
		courseId: string,
		status: "completed" | "in_progress" | "planned",
	) => void;
	focusedCourseId?: string | null;
	selectedMajorId?: string;
}

const CourseGraph: React.FC<CourseGraphProps> = ({
	nodes,
	links,
	onNodeClick,
	onNodeRightClick,
	onCourseStatusChange,
	focusedCourseId,
	selectedMajorId,
}) => {
	const fgRef = useRef<ForceGraphMethods | undefined>(undefined);
	const containerRef = useRef<HTMLDivElement>(null);
	const dimensions = useDimensions(containerRef);

	// Configure force simulation for denser layout
	useEffect(() => {
		if (fgRef.current) {
			// Reduce charge force for tighter packing
			fgRef.current.d3Force("charge")?.strength(-30);
			// Shorten link distance for closer nodes
			fgRef.current.d3Force("link")?.distance(18);
			// Add centering force for better layout
			fgRef.current.d3Force("center")?.strength(0.6);
		}
	}, []);

	// Focus on specific course when focusedCourseId changes
	useEffect(() => {
		if (fgRef.current && focusedCourseId) {
			const targetNode = nodes.find((node) => node.id === focusedCourseId);
			if (targetNode) {
				// Use a different approach - highlight the node and let the user see it
				setTimeout(() => {
					// For now, we'll just zoom in slightly to make the course more visible
					fgRef.current?.zoom(1.8, 1000);
				}, 100);
			}
		}
	}, [focusedCourseId, nodes]);

	// Create requirement group links for visual grouping (major-specific)
	const requirementGroupLinks = useMemo(() => {
		const links: any[] = [];

		// Only get requirement groups for the selected major
		if (!selectedMajorId) return links;

		const selectedMajor = MAJORS.find((major) => major.id === selectedMajorId);
		if (!selectedMajor) return links;

		selectedMajor.requirementGroups.forEach((group) => {
			if (group.courses.length > 1) {
				// Create invisible links between courses in the same requirement group
				for (let i = 0; i < group.courses.length; i++) {
					for (let j = i + 1; j < group.courses.length; j++) {
						const sourceNode = nodes.find((n) => n.id === group.courses[i]);
						const targetNode = nodes.find((n) => n.id === group.courses[j]);

						if (sourceNode && targetNode) {
							links.push({
								source: group.courses[i],
								target: group.courses[j],
								type: "requirement-group",
								groupId: group.id,
								groupLabel: group.label,
								// Make these links completely invisible but keep force
								distance: 30,
								strength: 0.05,
								color: "transparent",
								width: 0,
								visible: false,
							});
						}
					}
				}
			}
		});

		return links;
	}, [nodes, selectedMajorId]);

	const allLinks = [...links, ...requirementGroupLinks];

	return (
		<div
			ref={containerRef}
			className="w-full h-full min-h-[600px] border rounded-lg overflow-hidden bg-slate-50"
		>
			<ForceGraph2D
				ref={fgRef}
				width={dimensions.width}
				height={dimensions.height}
				graphData={{ nodes, links: allLinks }}
				nodeLabel="label"
				nodeCanvasObject={drawNode}
				linkDirectionalArrowLength={3.5}
				linkDirectionalArrowRelPos={1}
				cooldownTicks={100}
				onNodeClick={onNodeClick as any}
				linkColor={(link: any) =>
					link.visible === false ? "transparent" : link.color || "#999"
				}
				linkWidth={(link: any) =>
					(link.visible === false ? 0 : link.width || 1)
				}
				linkDirectionalParticles={(link: any) =>
					link.type === "requirement-group" ? 0 : 0
				}
				onNodeRightClick={(node: any) => {
					if (onNodeRightClick) {
						onNodeRightClick(node);
					}
					// Toggle completion status on right-click
					if (onCourseStatusChange) {
						const currentStatus = node.status;
						if (currentStatus === "completed") {
							onCourseStatusChange(node.id, "planned");
						} else {
							onCourseStatusChange(node.id, "completed");
						}
					}
				}}
			/>
		</div>
	);
};

export default React.memo(CourseGraph);
