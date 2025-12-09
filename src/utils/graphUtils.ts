import type { CourseNode } from "../data/types";

export const getNodeColor = (status: string, isPrereqSatisfied?: boolean) => {
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

export const drawNode = (
    node: any,
    ctx: CanvasRenderingContext2D,
    globalScale: number,
) => {
    const label = node.label;
    const fontSize = 12 / globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

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
    ctx.font = `600 ${fontSize}px Sans-Serif`;
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#ffffff";
    ctx.strokeText(label, node.x, node.y + 10);
    ctx.fillStyle = "#333";
    ctx.fillText(label, node.x, node.y + 10);
};
