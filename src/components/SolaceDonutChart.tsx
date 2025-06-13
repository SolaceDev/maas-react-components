/*
 * Copyright 2023-2025 Solace Systems. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useRef, useState } from "react";
import { styled, useTheme } from "@mui/material";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import SolaceComponentProps from "./SolaceComponentProps";

interface DataItem {
	name: string;
	value: number;
	color?: string;
	label?: string;
}

interface SolaceDonutChartProps extends SolaceComponentProps {
	/**
	 * Unique identifier for the chart
	 */
	id?: string;
	/**
	 * Size of the chart: 'large', 'medium', or 'small'
	 */
	size?: "lg" | "md" | "sm";
	/**
	 * Icon to display in the center of the chart
	 */
	icon?: JSX.Element;
	/**
	 *  Width of the icon, 24px by default
	 */
	iconWidth?: number;
	/**
	 *  Height of the icon, 24px by default
	 */
	iconHeight?: number;
	/**
	 * Show tooltip on hover
	 */
	showTooltip?: boolean;
	/**
	 * Data to display in the chart
	 */
	data: DataItem[];
}

interface CustomTooltipProps {
	// these props are exposed by the recharts lib
	active?: boolean;
	payload?: { payload?: DataItem }[];
}

const ANIMATION_DELAY = 0;

const SIZES = {
	lg: { chartWidth: 160, chartHeight: 160, width: 24 },
	md: { chartWidth: 100, chartHeight: 100, width: 16 },
	sm: { chartWidth: 60, chartHeight: 60, width: 8 }
};

const TooltipContainer = styled("div")(({ theme }) => ({
	display: "flex",
	columnGap: theme.spacing(2),
	padding: theme.spacing(1),
	backgroundColor: theme.palette.ux.background.w10,
	boxShadow: `0px 1px 4px ${theme.palette.ux.secondary.w40}`,
	borderRadius: theme.spacing(0.5)
}));

const TooltipLabel = styled("div")(({ theme }) => ({
	flex: 1,
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	columnGap: theme.spacing(1),
	".tooltip-label": {
		whiteSpace: "nowrap"
	}
}));

const SquaredIcon = styled("div", { shouldForwardProp: (prop) => prop !== "bgColor" })<{ bgColor?: string }>(
	({ bgColor, theme }) => ({
		width: "16px",
		height: "16px",
		display: "inline-block",
		backgroundColor: bgColor ?? theme.palette.ux.secondary.w40
	})
);

const ChartContainer = styled("div", {
	shouldForwardProp: (prop) => prop !== "width" && prop !== "height"
})<{
	width?: number;
	height?: number;
}>(({ width, height }) => ({
	position: "relative", // needed to center the icon
	width: width,
	height: height
}));

const IconContainer = styled("div", {
	shouldForwardProp: (prop) => prop !== "width" && prop !== "height"
})<{
	width?: number;
	height?: number;
}>(({ width, height }) => ({
	position: "absolute",
	width: width,
	height: height,
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)"
}));

const CustomTooltip = React.forwardRef<HTMLDivElement, CustomTooltipProps>(({ active, payload }, ref) => {
	if (!active || !payload || !payload[0]?.payload) {
		return null;
	}
	const { name, color, label, value } = payload[0].payload;
	return (
		<TooltipContainer ref={ref}>
			<TooltipLabel>
				<SquaredIcon bgColor={color} />
				<div className="tooltip-label">{label ?? name}</div>
			</TooltipLabel>
			<div>{value}</div>
		</TooltipContainer>
	);
});

// When using React.forwardRef, the component's name might not be inferred correctly, leading to the need for an explicit displayName by eslint
CustomTooltip.displayName = "CustomTooltip";

const calculateTooltipPosition = (
	mouse: { x: number; y: number },
	chartWidth: number,
	chartHeight: number,
	tooltipWidth: number,
	tooltipHeight: number
) => {
	const offset = 10;
	let x, y;

	x = mouse.x + offset;
	y = mouse.y + offset;

	// Determine the quadrant of the cursor position
	const isTopHalf = mouse.y < chartHeight / 2;
	const isRightHalf = mouse.x > chartWidth / 2;

	if (isTopHalf && isRightHalf) {
		// Top Right: Display tooltip top right of the cursor
		x = mouse.x + offset;
		y = mouse.y - tooltipHeight - offset;
	} else if (!isTopHalf && isRightHalf) {
		// Bottom Right: Display tooltip bottom right
		x = mouse.x + offset;
		y = mouse.y + offset;
	} else if (isTopHalf && !isRightHalf) {
		// Top Left: Display tooltip top left, considering the width of it
		x = mouse.x - tooltipWidth - offset;
		y = mouse.y - tooltipHeight - offset;
	} else {
		// Bottom Left: Display tooltip bottom left, also considering the width of it
		x = mouse.x - tooltipWidth - offset;
		y = mouse.y + offset;
	}

	return { x, y };
};

function SolaceDonutChart({
	id,
	data,
	size = "sm",
	icon,
	iconWidth = 24,
	iconHeight = 24,
	showTooltip = false,
	dataQa,
	dataTags
}: SolaceDonutChartProps): JSX.Element {
	const theme = useTheme();
	const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const tooltipRef = useRef<HTMLDivElement>(null);

	const { chartWidth, chartHeight, width } = SIZES[size];
	const outerRadius = chartHeight / 2;
	const innerRadius = outerRadius - width;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleMouseMove = (e: any) => {
		const tooltipElement = tooltipRef.current;

		// If the tooltip element is available, use its dimensions
		const tooltipWidth = tooltipElement?.offsetWidth ?? 170; // give a default width
		const tooltipHeight = tooltipElement?.offsetHeight ?? 40; // give a default height

		const position = calculateTooltipPosition(
			{ x: e.tooltipPosition.x, y: e.tooltipPosition.y },
			chartWidth,
			chartHeight,
			tooltipWidth,
			tooltipHeight
		);

		setTooltipPosition(position);
	};

	return (
		<ChartContainer width={chartWidth} height={chartHeight} id={id} data-qa={dataQa} data-tags={dataTags}>
			<PieChart width={chartWidth} height={chartHeight}>
				<Pie
					nameKey="name"
					dataKey="value"
					data={data}
					cx="50%"
					cy="50%"
					innerRadius={innerRadius}
					outerRadius={outerRadius}
					isAnimationActive={true}
					animationBegin={ANIMATION_DELAY}
					paddingAngle={0}
					startAngle={90} // ensures the starting angle of the pie chart is always at 12 o’clock
					endAngle={-270} // ensures the pie chart reads clockwise from the starting point
					onMouseMove={handleMouseMove}
				>
					{data.map((entry, index) => (
						<Cell
							key={`cell-${index}`}
							fill={entry.color ?? theme.palette.ux.secondary.w40} // fallback to a default color if no color is provided in the data
							style={{ strokeWidth: 0.5, userSelect: "none", outline: "none" }}
						/>
					))}
				</Pie>
				{showTooltip && (
					<Tooltip
						content={<CustomTooltip ref={tooltipRef} />}
						position={tooltipPosition}
						isAnimationActive={false}
						allowEscapeViewBox={{ x: true, y: true }}
					/>
				)}
			</PieChart>
			{icon && (
				<IconContainer width={iconWidth} height={iconHeight}>
					{icon}
				</IconContainer>
			)}
		</ChartContainer>
	);
}

export default SolaceDonutChart;
