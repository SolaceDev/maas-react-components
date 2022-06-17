import ReactDOMServer from "react-dom/server";
import SplitPane, { Pane } from "react-split-pane";
import SolaceComponentProps from "../SolaceComponentProps";
import { VerticalDotsIcon } from "../../resources/icons/VerticalDotsIcon";
import { EllipsisIcon } from "../../resources/icons/EllipsisIcon";
import { useMemo } from "react";
import { useTheme } from "@mui/material";

interface SolaceSplitPaneProps extends SolaceComponentProps {
	minSize?: number;
	defaultSize?: number | string;
	maxSize?: number;
	split?: "vertical" | "horizontal";
	allowedResize?: boolean;
	children: Array<JSX.Element>;
	onDragFinished?: (newSize: number) => void;
}

function SolaceSplitPane({
	minSize = 0,
	defaultSize = "50%",
	maxSize = -8,
	split = "vertical",
	allowedResize = true,
	children,
	onDragFinished
}: SolaceSplitPaneProps): JSX.Element {
	const theme = useTheme();
	const borderColor = theme.palette.ux.secondary.w40;
	const dotsColor = theme.palette.ux.secondary.wMain;

	const getWidth = useMemo(() => {
		if (split === "vertical") {
			return allowedResize ? "8px" : "0px";
		} else {
			return "100%";
		}
	}, [allowedResize, split]);

	const getHeight = useMemo(() => {
		if (split === "horizontal") {
			return allowedResize ? "8px" : "0px";
		} else {
			return "100%";
		}
	}, [allowedResize, split]);

	const getCursor = useMemo(() => {
		if (allowedResize) {
			return split === "vertical" ? "ew-resize" : "ns-resize";
		} else {
			return "default";
		}
	}, [allowedResize, split]);

	const getVerticalSplitBorder = useMemo(() => {
		if (split === "vertical") {
			return `solid 1px ${borderColor}`;
		} else {
			return "";
		}
	}, [borderColor, split]);

	const getHorizontalSplitBorder = useMemo(() => {
		if (split === "horizontal") {
			return `solid 1px ${borderColor}`;
		} else {
			return "";
		}
	}, [borderColor, split]);

	const getBackgroundImage = useMemo(() => {
		if (allowedResize) {
			return split === "vertical"
				? `url("data:image/svg+xml;base64,${btoa(
						ReactDOMServer.renderToStaticMarkup(<VerticalDotsIcon fill={dotsColor} />)
				  )}")`
				: `url("data:image/svg+xml;base64,${btoa(
						ReactDOMServer.renderToStaticMarkup(<EllipsisIcon fill={dotsColor} />)
				  )}")`;
		} else {
			return "none";
		}
	}, [allowedResize, dotsColor, split]);

	const handleDragFinish = (newSize: number) => {
		if (onDragFinished) {
			onDragFinished(newSize);
		}
	};

	return (
		<SplitPane
			split={split}
			minSize={minSize}
			maxSize={maxSize}
			defaultSize={defaultSize}
			allowResize={allowedResize}
			onDragFinished={handleDragFinish}
			resizerStyle={{
				width: getWidth,
				height: getHeight,
				cursor: getCursor,
				borderLeft: getVerticalSplitBorder,
				borderRight: getVerticalSplitBorder,
				borderTop: getHorizontalSplitBorder,
				borderBottom: getHorizontalSplitBorder,
				backgroundImage: getBackgroundImage,
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat"
			}}
			style={{
				border: `solid 1px ${borderColor}`
			}}
		>
			{children &&
				children.map((content: JSX.Element, index: number) => {
					return (
						<Pane key={`pane${index}`} size="100%" style={{ overflow: "auto" }} className="">
							{content}
						</Pane>
					);
				})}
		</SplitPane>
	);
}

export default SolaceSplitPane;
