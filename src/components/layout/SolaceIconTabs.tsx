import { MouseEventHandler, useMemo } from "react";
import { styled } from "@mui/material";
import SolaceTooltip from "../SolaceToolTip";

const shouldForwardProp = (prop: PropertyKey) => prop !== "active";

const ViewsContainer = styled("div")(
	({ theme }) => `
	display: flex;
	flex-direction: row;
	height: ${theme.spacing(5)};`
);

const ViewButton = styled("a", { shouldForwardProp })<{ active?: boolean }>(({ theme, active }) =>
	active
		? `
	background-color: ${theme.palette.ux.background.w10};
	border-inline: 1px solid ${theme.palette.ux.secondary.w20};
	box-sizing: border-box;
	color: ${theme.palette.ux.primary.text.wMain};
	cursor: default;
	fill: ${theme.palette.ux.primary.text.wMain};
	position: relative;`
		: `
	background-color: ${theme.palette.ux.background.w20};
	border-bottom: 1px solid ${theme.palette.ux.secondary.w40};
	box-sizing: border-box;
	color: ${theme.palette.ux.secondary.wMain};
	cursor: pointer;
	fill: ${theme.palette.ux.secondary.wMain};
	position: relative;
	&:hover {
		background-color: ${theme.palette.ux.secondary.w10};
		color: ${theme.palette.ux.primary.text.wMain};
	}`
);

const ViewActive = styled("div")(
	({ theme }) => `
	background-color: ${theme.palette.ux.accent.n2.wMain};
	height: 2px;
	position: absolute;
	width: 100%;`
);

const ViewIcon = styled("div")(
	({ theme }) => `
	padding: ${theme.spacing(1, 1)};
	> svg {
		vertical-align: top;
	}`
);

export type SolaceIconTabsButton = {
	/**
	 * Icon of the view
	 */
	icon: JSX.Element;
	/**
	 * Unique identifier of the view
	 */
	value: string;
	/**
	 * Tooltip of the view
	 */
	tooltip: string;
};

export interface SolaceIconTabsProps {
	/**
	 * Array of views (typical is 2 views but could be more)
	 */
	views: SolaceIconTabsButton[];
	/**
	 * The value of the active view
	 */
	activeViewValue: string;
	/**
	 * Callback fired when the value changes.
	 */
	onViewClick: (value: string) => void;
}

export default function SolaceIconTabs({ views, activeViewValue, onViewClick }: SolaceIconTabsProps): JSX.Element {
	const handleClick = useMemo(
		() =>
			views.map<MouseEventHandler<HTMLAnchorElement>>(
				({ value }) =>
					() =>
						onViewClick(value)
			),
		[onViewClick, views]
	);

	return (
		<ViewsContainer role="tablist">
			{views.map(({ icon, tooltip, value }, index) => (
				<SolaceTooltip key={`tooltip-${value}`} title={tooltip} placement="bottom-start">
					<ViewButton
						key={value}
						active={value === activeViewValue}
						tabIndex={0}
						onClick={handleClick[index]}
						role="tab"
					>
						{value === activeViewValue && <ViewActive />}
						<ViewIcon>{icon}</ViewIcon>
					</ViewButton>
				</SolaceTooltip>
			))}
		</ViewsContainer>
	);
}
