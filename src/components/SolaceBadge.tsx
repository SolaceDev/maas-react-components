import { keyframes } from "@emotion/react";
import { styled, Theme } from "@material-ui/core";
import { useState } from "react";

export interface SolaceBadgeProps {
	value: string | number;
	show?: boolean;
	size?: number;
	showAnimationLengthInMs?: number;
	changeAnimationLengthInMs?: number;
}

const Badge = styled("div")(({ size }: { theme?: Theme; size: number }) => ({
	width: `${size}px`,
	height: `${size}px`,
	fontSize: `${(size / 3) * 2}px`,
	borderRadius: "50%",
	background: "#0079FF",
	color: "white",
	textAlign: "center",
	lineHeight: `${size + 1}px`,
	verticalAlign: "middle"
}));

const Value = styled("span")({
	transition: "opacity 300ms"
});

const pulse = keyframes`
	0% {
		transform: scale(1);
		box-shadow: 0 0 0 0 rgba(0, 128, 255, 0.3);
	}

	70% {
		transform: scale(1.05);
		box-shadow: 0 0 0 6px rgba(0, 128, 255, 0.2);
	}

	100% {
		transform: scale(1);
		box-shadow: 0 0 0 0 rgba(0, 128, 255, 0);
	}
`;

function SolaceBadge({
	value,
	show = true,
	size = 21,
	showAnimationLengthInMs = 1500,
	changeAnimationLengthInMs = 4500
}: SolaceBadgeProps): JSX.Element {
	const [lastValue, setLastValue] = useState(value);
	const [showState, setShowState] = useState(show);
	const [showing, setShowing] = useState(false);
	const [pulsing, setPulsing] = useState(false);

	if (show !== showState) {
		if (show) {
			setShowing(true);
			setPulsing(true);
			setTimeout(() => {
				setShowing(false);
				setPulsing(false);
			}, showAnimationLengthInMs);
		}
		setShowState(show);
	}

	if (value !== lastValue) {
		if (value) {
			setPulsing(true);
			setTimeout(() => {
				setPulsing(false);
			}, changeAnimationLengthInMs);
		}
		setLastValue(value);
	}
	if (!show) {
		return <></>;
	}
	return (
		<Badge size={size} sx={pulsing ? { animation: `${pulse} 1500ms ease infinite;` } : {}}>
			<Value sx={{ opacity: showing ? 0 : 1 }}>{value}</Value>
		</Badge>
	);
}

export default SolaceBadge;
