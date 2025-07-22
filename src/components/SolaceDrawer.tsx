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

import { Drawer, styled, Box, useTheme } from "@mui/material";
import { useState, useCallback, useRef, useEffect } from "react";
import { VerticalDotsIcon } from "../resources/icons/VerticalDotsIcon";

enum ANCHOR {
	LEFT = "left",
	RIGHT = "right"
}

const Dragger = styled("div", { shouldForwardProp: (prop) => prop !== "anchor" })<{
	anchor: "left" | "right";
}>(({ anchor, theme }) => ({
	width: "8px",
	cursor: "ew-resize",
	...(anchor === ANCHOR.LEFT && { borderLeft: `1px solid ${theme.palette.ux.secondary.w40}` }),
	...(anchor === ANCHOR.RIGHT && { borderRight: `1px solid ${theme.palette.ux.secondary.w40}` }),
	position: "absolute",
	top: 0,
	bottom: 0,
	...(anchor === ANCHOR.LEFT && { right: 0 }),
	...(anchor === ANCHOR.RIGHT && { left: 0 }),
	backgroundColor: `${theme.palette.ux.background.w20}`,
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-around",
	alignItems: "center"
}));

export interface SolaceDrawerProps {
	/**
	 * Flag signifying if the drawer is opened or closed.
	 */
	open: boolean;
	/**
	 * The initial width of the drawer. Default to 320.
	 */
	width?: number;
	/**
	 * Optional flag to have the drawer resizable in width. default is set to false.
	 */
	resizable?: boolean;
	/**
	 * Optional callback to pass new width back after the action of resizing is completed.
	 */
	onResizeDone?: (newWidth: number) => void;
	/**
	 * Optional value to control the range of drawer width. Needs resizable to be true. default is set to 100.
	 */
	minWidth?: number;
	/**
	 * Optional value to control the range of the drawer width. Needs resizable to be true. default is set to 1000.
	 */
	maxWidth?: number;
	/**
	 * 	Side from which the drawer will appear.
	 */
	anchor?: "left" | "right";
	/**
	 * 	CSS property of position top.
	 */
	top?: string;
	/**
	 * 	CSS property of position height.
	 */
	height?: string;
	/**
	 * 	CSS property of position left or right, relative to border, depends on anchor.
	 */
	offset?: string;
	/**
	 * The content that is in the drawer.
	 */
	children?: JSX.Element;
}

function SolaceDrawer({
	open,
	width = 320,
	resizable = false,
	onResizeDone,
	minWidth = 100,
	maxWidth = 1000,
	anchor = ANCHOR.RIGHT,
	top = "0",
	offset,
	height = "100%",
	children
}: SolaceDrawerProps): JSX.Element {
	const theme = useTheme();
	const initialClientX = useRef<number>(0);
	const [drawerWidth, setDrawerWidth] = useState(width);
	// Create ref to track the value of drawerWidth state, as the state will be stale in callback function handleMouseUp().
	const widthRef = useRef<number>(width);
	widthRef.current = drawerWidth;

	// If prop maxWidth is changed and is smaller than the current width, set width to the new maxWidth
	useEffect(() => {
		if (drawerWidth > maxWidth) {
			setDrawerWidth(maxWidth);
		}
	}, [drawerWidth, maxWidth]);

	const handleMouseMove = useCallback(
		(e) => {
			e.preventDefault();
			const delta = e.clientX - initialClientX.current;
			const newWidth = anchor === ANCHOR.RIGHT ? drawerWidth - delta : drawerWidth + delta;
			if (newWidth >= minWidth && newWidth <= maxWidth) {
				setDrawerWidth(newWidth);
			} else if (newWidth < minWidth) {
				setDrawerWidth(minWidth);
			} else {
				setDrawerWidth(maxWidth);
			}
		},
		[maxWidth, minWidth, anchor, drawerWidth]
	);

	const handleMouseUp = useCallback(() => {
		document.removeEventListener("mouseup", handleMouseUp, true);
		document.removeEventListener("mousemove", handleMouseMove, true);
		initialClientX.current = 0;
		// Pass the new width back only after mouse up. Using ref to get the latest state.
		onResizeDone?.(widthRef.current);
	}, [handleMouseMove, onResizeDone]);

	const handleMouseDown = useCallback(
		(e) => {
			e.preventDefault();
			if (initialClientX.current === 0) {
				initialClientX.current = e.clientX;
			}
			document.addEventListener("mouseup", handleMouseUp, true);
			document.addEventListener("mousemove", handleMouseMove, true);
		},
		[handleMouseMove, handleMouseUp]
	);

	const getStyle = () => {
		if (anchor === ANCHOR.LEFT && offset) {
			return { top, height, left: offset };
		} else if (anchor === ANCHOR.RIGHT && offset) {
			return { top, height, right: offset };
		} else {
			return { top, height };
		}
	};

	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: drawerWidth,
					boxSizing: "border-box",
					borderRadius: "2px",
					border: `1px solid ${theme.palette.ux.secondary.w40}`,
					boxShadow: `0px 2px 4px ${theme.palette.ux.deprecated.secondary.w8040}`
				}
			}}
			PaperProps={{ style: getStyle() }}
			BackdropProps={{ style: getStyle() }}
			variant="persistent"
			anchor={anchor}
			open={open}
		>
			{resizable && (
				<Dragger anchor={anchor} onMouseDown={handleMouseDown}>
					<VerticalDotsIcon />
				</Dragger>
			)}
			<Box
				sx={anchor === ANCHOR.LEFT ? { marginRight: "8px", overflow: "auto" } : { marginLeft: "8px", overflow: "auto" }}
			>
				{children}
			</Box>
		</Drawer>
	);
}
export default SolaceDrawer;
