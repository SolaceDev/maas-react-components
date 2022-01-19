import { Drawer, styled, Box } from "@material-ui/core";
import { useState, useCallback, useRef } from "react";
import { VerticalDotsIcon } from "../resources/icons/VerticalDotsIcon";

export enum ANCHOR {
	LEFT = "left",
	RIGHT = "right"
}

const BORDER_STYLE = "1px solid rgba(0, 0, 0, 0.2)";

const Dragger = styled("div", { shouldForwardProp: (prop) => prop !== "anchor" })<{
	anchor: ANCHOR;
}>(({ anchor, theme }) => ({
	width: "8px",
	cursor: "ew-resize",
	...(anchor === ANCHOR.LEFT && { borderLeft: BORDER_STYLE }),
	...(anchor === ANCHOR.RIGHT && { borderRight: BORDER_STYLE }),
	position: "absolute",
	top: 0,
	bottom: 0,
	...(anchor === ANCHOR.LEFT && { right: 0 }),
	...(anchor === ANCHOR.RIGHT && { left: 0 }),
	backgroundColor: `${theme.palette.background.default}`,
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
	 * Optional value to control the range of drawer width. Needs resizable to be true. default is set to 100.
	 */
	minWidth?: number;
	/**
	 * Optional value to control the range of the drawer width. Needs resizable to be true. default is set to 800.
	 */
	maxWidth?: number;
	/**
	 * 	Side from which the drawer will appear.
	 */
	anchor?: ANCHOR;
	/**
	 * The content that is in the drawer.
	 */
	children?: JSX.Element;
}

function SolaceDrawer({
	open,
	width = 320,
	resizable = false,
	minWidth = 100,
	maxWidth = 800,
	anchor = ANCHOR.RIGHT,
	children
}: SolaceDrawerProps): JSX.Element {
	const initialClientX = useRef<number>(0);
	const [drawerWidth, setDrawerWidth] = useState(width);

	const handleMouseMove = useCallback(
		(e) => {
			const newWidth =
				anchor === ANCHOR.RIGHT
					? drawerWidth + initialClientX.current - e.clientX
					: drawerWidth + e.clientX - initialClientX.current;
			if (newWidth > minWidth && newWidth < maxWidth) {
				setDrawerWidth(newWidth);
			}
		},
		[maxWidth, minWidth, anchor, drawerWidth]
	);

	const handleMouseUp = useCallback(() => {
		document.removeEventListener("mouseup", handleMouseUp, true);
		document.removeEventListener("mousemove", handleMouseMove, true);
		initialClientX.current = 0;
	}, [handleMouseMove]);

	const handleMouseDown = useCallback(
		(e) => {
			if (initialClientX.current === 0) {
				initialClientX.current = e.clientX;
			}
			document.addEventListener("mouseup", handleMouseUp, true);
			document.addEventListener("mousemove", handleMouseMove, true);
		},
		[handleMouseMove, handleMouseUp]
	);

	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: drawerWidth,
					boxSizing: "border-box",
					borderRadius: "2px",
					border: BORDER_STYLE,
					boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)"
				}
			}}
			variant="persistent"
			anchor={anchor}
			open={open}
		>
			{resizable && (
				<Dragger anchor={anchor} onMouseDown={handleMouseDown}>
					<VerticalDotsIcon />
				</Dragger>
			)}
			<Box sx={{ marginLeft: "8px", overflow: "auto" }}>{children}</Box>
		</Drawer>
	);
}
export default SolaceDrawer;
