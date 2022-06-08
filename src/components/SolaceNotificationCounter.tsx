import { keyframes } from "@emotion/react";
import { styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import SolaceTooltip from "./SolaceToolTip";
import SolaceComponentProps from "./SolaceComponentProps";
import { CSSProperties } from "@mui/styled-engine";

export interface SolaceNotificationCounterProps extends SolaceComponentProps {
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
	 * Font size of the text value
	 */
	fontSize?: number;
	/**
	 * Tooltip
	 */
	title?: string;
	/**
	 * Badge animation duration in milliseconds. If set to 0, then no animation.
	 */
	animationDuration?: number;
	/**
	 * The number of animation repeats when making the text visible
	 */
	animationRepeatsInitialCount?: number;
	/**
	 * The number of animation repeats when the text is updated
	 */
	animationRepeatsUpdateCount?: number;
}

const Badge = styled("div", { shouldForwardProp: (prop) => prop !== "size" && prop !== "fontSize" })<{
	size: number;
	fontSize: number;
}>(({ theme, size, fontSize }) => ({
	...(theme.mixins.component_NotificationCounter.container as CSSProperties),
	width: `${size}px`,
	height: `${size}px`,
	fontSize: `${fontSize ? fontSize : (size / 3) * 2}px`,
	lineHeight: `${size + 1}px`
}));

const Value = styled("span")(({ theme }) => ({
	...(theme.mixins.component_NotificationCounter.value as CSSProperties)
}));

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

function SolaceNotificationCounter({
	value,
	show = true,
	size = 21,
	fontSize = 14,
	title,
	animationDuration = 1000,
	animationRepeatsInitialCount = 1,
	animationRepeatsUpdateCount = 3,
	dataQa,
	dataTags
}: SolaceNotificationCounterProps): JSX.Element {
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
				if (animationDuration > 0 && !showTimer.current) {
					setShowing(true);
					setPulsing(true);
					showTimer.current = setTimeout(
						() => {
							setShowing(false);
							setPulsing(false);
							showTimer.current = null;
						},
						animationRepeatsInitialCount > 0 ? animationRepeatsInitialCount * animationDuration : animationDuration
					);
				} else {
					setShowing(false);
				}
			}
			setShowState(show);
		}
	}, [animationDuration, show, animationRepeatsInitialCount, showState]);

	useEffect(() => {
		if (value !== lastValue) {
			// if the timer started, then no need to start another timer
			if (value && animationDuration > 0 && !changeTimer.current) {
				setPulsing(true);
				changeTimer.current = setTimeout(
					() => {
						setPulsing(false);
						changeTimer.current = null;
					},
					animationRepeatsUpdateCount > 0 ? animationRepeatsUpdateCount * animationDuration : animationDuration
				);
			}
			setLastValue(value);
		}
	}, [animationDuration, animationRepeatsUpdateCount, lastValue, value]);

	if (!showState) {
		return <></>;
	}
	return (
		<>
			<SolaceTooltip title={title}>
				<Badge
					data-qa={dataQa ? dataQa + "-counterBadge" : "counterBadge"}
					data-tags={dataTags}
					size={size}
					fontSize={fontSize}
					sx={pulsing && animationDuration > 0 ? { animation: `${pulse} ${animationDuration}ms ease infinite;` } : {}}
				>
					<Value
						sx={{ opacity: showing ? 0 : 1 }}
						data-qa={dataQa ? dataQa + "-counterValue" : "counterValue"}
						data-tags={dataTags}
					>
						{value}
					</Value>
				</Badge>
			</SolaceTooltip>
		</>
	);
}

export default SolaceNotificationCounter;
