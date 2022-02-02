import { keyframes } from "@emotion/react";
import { styled, Theme } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { SolaceTooltip } from "..";

export interface SolaceBadgeProps {
	/**
	 * Text inside the badge
	 */
	value: string | number;
	/**
	 * Whether to show text inside the badge
	 */
	show?: boolean;
	/**
	 * Size of the badge
	 */
	size?: number;
	/**
	 * Tooltip
	 */
	title?: string;
	/**
	 * Badge animation duration. If set to 0, then no animation.
	 */
	animationDurationInMs?: number;
	/**
	 * The number of animation repeats when making the text visible
	 */
	showAnimationRepeats?: number;
	/**
	 * The number of animation repeats when the text is updated
	 */
	changeAnimationRepeats?: number;
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
	transition: "opacity 300ms",
	cursor: "default"
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
	title,
	animationDurationInMs = 1000,
	showAnimationRepeats = 1,
	changeAnimationRepeats = 3
}: SolaceBadgeProps): JSX.Element {
	const [lastValue, setLastValue] = useState(value);
	const [showState, setShowState] = useState(show);
	const [showing, setShowing] = useState(false);
	const [pulsing, setPulsing] = useState(false);

	const showTimer = useRef<NodeJS.Timeout | null>(null);
	const changeTimer = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (show !== showState) {
			if (show) {
				// if the timer started, then no need to start another timer
				if (animationDurationInMs > 0 && !showTimer.current) {
					setShowing(true);
					setPulsing(true);
					showTimer.current = setTimeout(
						() => {
							setShowing(false);
							setPulsing(false);
							showTimer.current = null;
						},
						showAnimationRepeats > 0 ? showAnimationRepeats * animationDurationInMs : animationDurationInMs
					);
				} else {
					setShowing(false);
				}
			}
			setShowState(show);
		}
	}, [animationDurationInMs, show, showAnimationRepeats, showState]);

	useEffect(() => {
		if (value !== lastValue) {
			// if the timer started, then no need to start another timer
			if (value && animationDurationInMs > 0 && !changeTimer.current) {
				setPulsing(true);
				changeTimer.current = setTimeout(
					() => {
						setPulsing(false);
						changeTimer.current = null;
					},
					changeAnimationRepeats > 0 ? changeAnimationRepeats * animationDurationInMs : animationDurationInMs
				);
			}
			setLastValue(value);
		}
	}, [animationDurationInMs, changeAnimationRepeats, lastValue, value]);

	if (!showState) {
		return <></>;
	}
	return (
		<SolaceTooltip title={title}>
			<Badge
				size={size}
				sx={pulsing && animationDurationInMs ? { animation: `${pulse} ${animationDurationInMs}ms ease infinite;` } : {}}
			>
				<Value sx={{ opacity: showing ? 0 : 1 }}>{value}</Value>
			</Badge>
		</SolaceTooltip>
	);
}

export default SolaceBadge;
