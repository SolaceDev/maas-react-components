import { Breadcrumbs, Link, LinkProps, styled } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import SolaceComponentProps from "./SolaceComponentProps";
import { useMemo } from "react";
import SolaceTooltip from "./SolaceToolTip";

const SolaceLink = styled(Link)<LinkProps<typeof Link | RouterLink>>`
	max-width: 200px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export type SolacePath = {
	/**
	 * Title of the path
	 */
	title: string | JSX.Element;
	/**
	 * Link's path to be use with react-router-dom's Link component
	 */
	link: string;
	/**
	 * Indicate if this path is the current one (typically the last path in paths)
	 */
	current?: boolean;
	/**
	 * Optional tooltip to display
	 */
	tooltip?: string;
};

export interface SolaceBreadcrumbProps extends SolaceComponentProps {
	/**
	 * Optional ID of this component
	 */
	id?: string;
	/**
	 * Array of Paths
	 */
	paths: SolacePath[];
	/**
	 * Maximum of displayed paths (to see ... when there's more)
	 */
	maxItems?: number;
	/**
	 * Optional click handler. When not set, it's assume a React Router's Link will be used.
	 * @param route link
	 * @returns
	 */
	onRouteClick?: (route: string) => void;
}

function SolaceBreadcrumb({
	id,
	paths,
	maxItems = 8,
	onRouteClick,
	dataQa = "breadcrumbs",
	dataTags
}: SolaceBreadcrumbProps): JSX.Element {
	const handleRouteClick = useMemo(
		() =>
			paths.map(({ link }) => () => {
				if (onRouteClick) {
					onRouteClick(link);
				}
			}),
		[onRouteClick, paths]
	);

	return (
		<Breadcrumbs
			id={id}
			separator={<NavigateNextIcon fontSize="small" />}
			maxItems={maxItems}
			data-qa={dataQa}
			data-tags={dataTags}
		>
			{paths.map(({ title, link, current, tooltip }, index) =>
				current ? (
					<SolaceLink key={link} underline="none" component="span" data-qa={link}>
						{title}
					</SolaceLink>
				) : (
					<SolaceTooltip key={link} title={tooltip} variant="overflow">
						{onRouteClick ? (
							<SolaceLink underline="hover" component={"button"} onClick={handleRouteClick[index]} data-qa={link}>
								{title}
							</SolaceLink>
						) : (
							<SolaceLink key={link} underline="hover" component={RouterLink} to={link} data-qa={link}>
								{title}
							</SolaceLink>
						)}
					</SolaceTooltip>
				)
			)}
		</Breadcrumbs>
	);
}

export default SolaceBreadcrumb;
