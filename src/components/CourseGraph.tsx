"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import type { CourseNode, RequirementGroupCloud } from "../data/types";
import type { ForceGraphMethods } from "react-force-graph-2d";
import { MAJORS } from "../data/courses";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
	ssr: false,
	loading: () => <div className="p-4">Loading Graph...</div>,
});

interface GraphData {
	nodes: any[];
	links: any[];
}

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
	const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current) {
			setDimensions({
				width: containerRef.current.clientWidth,
				height: containerRef.current.clientHeight,
			});
		}

		// Resize observer
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				setDimensions({
					width: entry.contentRect.width,
					height: entry.contentRect.height,
				});
			}
		});

		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}

		return () => resizeObserver.disconnect();
	}, []);

	// Configure force simulation for denser layout
	useEffect(() => {
		if (fgRef.current) {
			// Reduce charge force for tighter packing
			fgRef.current.d3Force("charge")?.strength(-30);
			// Shorten link distance for closer nodes
			fgRef.current.d3Force("link")?.distance(18);
			// Add centering force for better layout
			fgRef.current.d3Force("center")?.strength(0.1);
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

	const paintNode = (
		node: any,
		ctx: CanvasRenderingContext2D,
		globalScale: number,
	) => {
		const label = node.label;
		const fontSize = 12 / globalScale;
		ctx.font = `${fontSize}px Sans-Serif`;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";

		// Check if this is a requirement group cloud
		if (node.id.startsWith("cloud-")) {
			// Draw large encompassing circle for requirement groups
			const size = node.size || 100;
			ctx.beginPath();
			ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);
			ctx.fillStyle = "rgba(59, 130, 246, 0.1)"; // Very light blue
			ctx.fill();
			ctx.strokeStyle = "rgba(59, 130, 246, 0.3)"; // Light blue border
			ctx.lineWidth = 2;
			ctx.setLineDash([5, 5]);
			ctx.stroke();
			ctx.setLineDash([]);

			// Draw label
			ctx.fillStyle = "rgba(59, 130, 246, 0.8)";
			ctx.font = `${fontSize * 1.2}px Sans-Serif`;
			ctx.fillText(label, node.x, node.y);
			return;
		}

		// Regular course node rendering
		const isPrereqSatisfied = node.isPrereqSatisfied;
		const nodeColor = getNodeColor(node.status, isPrereqSatisfied);

		// Draw node shape based on type
		const size = node.shape === "circle" ? 8 : 6;
		if (node.shape === "circle") {
			ctx.beginPath();
			ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);
			ctx.fillStyle = nodeColor;
			ctx.fill();
			// No border - clean look
		} else {
			// Square or squircle
			const halfSize = size;
			ctx.fillStyle = nodeColor;
			ctx.fillRect(
				node.x - halfSize,
				node.y - halfSize,
				halfSize * 2,
				halfSize * 2,
			);
			// No border - clean look
		}

		// Add pattern for colorblind users
		if (node.status === "completed") {
			ctx.strokeStyle = "#ffffff";
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(node.x - 3, node.y - 3);
			ctx.lineTo(node.x + 3, node.y + 3);
			ctx.moveTo(node.x + 3, node.y - 3);
			ctx.lineTo(node.x - 3, node.y + 3);
			ctx.stroke();
		} else if (node.status === "in_progress") {
			ctx.fillStyle = "#ffffff";
			ctx.beginPath();
			ctx.arc(node.x, node.y, 2, 0, 2 * Math.PI, false);
			ctx.fill();
		}

		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "#000"; // Text color
		// ctx.fillText(label, node.x, node.y);

		// Draw label below
		ctx.fillStyle = "#333";
		ctx.fillText(label, node.x, node.y + 10);
	};

	const getNodeColor = (status: string, isPrereqSatisfied?: boolean) => {
		// New color scheme with red (#CF0722) and yellow (#FCCA00) accents
		let baseColor = "#9ca3af"; // Gray default
		switch (status) {
			case "completed":
				baseColor = "#2563eb"; // Blue (unchanged for completed)
				break;
			case "in_progress":
				baseColor = "#FCCA00"; // Yellow accent
				break;
			case "required":
				baseColor = "#CF0722"; // Red accent
				break;
			case "optional":
				baseColor = "#2563eb"; // Blue (same as completed for simplicity)
				break;
			case "group":
				baseColor = "#6b7280"; // Gray
				break;
		}

		// Apply transparency to all nodes so arrows are visible
		const r = parseInt(baseColor.slice(1, 3), 16);
		const g = parseInt(baseColor.slice(3, 5), 16);
		const b = parseInt(baseColor.slice(5, 7), 16);

		// Apply 85% opacity for all nodes
		let opacity = 0.85;

		// Additional opacity reduction if prerequisites are not satisfied
		if (!isPrereqSatisfied && status !== "completed") {
			opacity = 0.5;
		}

		return `rgba(${r}, ${g}, ${b}, ${opacity})`;
	};

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

	// Create requirement group clouds for visualization
	const requirementGroupClouds = useMemo(() => {
		const clouds: RequirementGroupCloud[] = [];

		if (!selectedMajorId) return clouds;

		const selectedMajor = MAJORS.find((major) => major.id === selectedMajorId);
		if (!selectedMajor) return clouds;

		selectedMajor.requirementGroups.forEach((group) => {
			if (group.courses.length > 2 && group.requiredUnits) {
				// Only create clouds for groups with 3+ courses and credit requirements
				const groupNodes = nodes.filter((node) =>
					group.courses.includes(node.id),
				);

				if (groupNodes.length >= 3) {
					// Calculate cloud size based on number of courses
					const baseSize = 80;
					const sizeIncrement = 15;
					const cloudSize = baseSize + groupNodes.length * sizeIncrement;

					clouds.push({
						id: `cloud-${group.id}`,
						groupId: group.id,
						label: `${group.label} (${group.requiredUnits} credits)`,
						requiredUnits: group.requiredUnits,
						courseIds: group.courses,
						size: cloudSize,
					});
				}
			}
		});

		return clouds;
	}, [nodes, selectedMajorId]);

	// Combine regular nodes with cloud nodes
	const allNodes = [
		...nodes,
		...requirementGroupClouds.map((cloud) => ({
			...cloud,
			status: "group" as const,
			shape: "circle" as const,
			requirementType: "major" as const,
			id: cloud.id,
			label: cloud.label,
			prerequisites: [],
		})),
	];

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
				graphData={{ nodes: allNodes, links: allLinks }}
				nodeLabel="label"
				nodeCanvasObject={paintNode}
				linkDirectionalArrowLength={3.5}
				linkDirectionalArrowRelPos={1}
				cooldownTicks={100}
				onNodeClick={onNodeClick as any}
				linkColor={(link: any) =>
					link.visible === false ? "transparent" : link.color || "#999"
				}
				linkWidth={(link: any) =>
					link.visible === false ? 0 : link.width || 1
				}
				linkDirectionalParticles={(link: any) =>
					link.type === "requirement-group" ? 0 : 0
				}
				onNodeRightClick={(node: any) => {
					if (onNodeRightClick) {
						onNodeRightClick(node);
					}
					// Toggle completion status on right-click (only for actual courses, not clouds)
					if (onCourseStatusChange && !node.id.startsWith("cloud-")) {
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
