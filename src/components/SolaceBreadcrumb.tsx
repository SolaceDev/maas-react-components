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

import { Breadcrumbs, Link, LinkProps, styled } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import SolaceComponentProps from "./SolaceComponentProps";
import { useMemo } from "react";
import SolaceTooltip from "./SolaceToolTip";
import SolaceCircularProgress from "./SolaceCircularProgress";

const SolaceLink = styled(Link)<LinkProps<typeof Link | RouterLink>>(() => ({
	maxWidth: "200px",
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap"
}));

const RouteContainer = styled("div")(({ theme }) => ({
	alignItems: "center",
	columnGap: theme.spacing(0.5),
	display: "flex",
	flexDirection: "row"
}));

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
	/**
	 * Optional progress indicator
	 */
	progress?: boolean;
	/**
	 * Optional progress indicator tooltip
	 */
	progressTooltip?: string;
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
			{paths.map(({ title, link, current, tooltip, progress, progressTooltip }, index) =>
				current ? (
					<RouteContainer key={link}>
						<SolaceLink underline="none" component="span" data-qa={link}>
							{title}
						</SolaceLink>
						{progress && (
							<SolaceTooltip title={progressTooltip}>
								<div>
									<SolaceCircularProgress size="xs" />
								</div>
							</SolaceTooltip>
						)}
					</RouteContainer>
				) : (
					<RouteContainer key={link}>
						<SolaceTooltip title={tooltip} variant="overflow">
							{onRouteClick ? (
								<SolaceLink underline="hover" component={"button"} onClick={handleRouteClick[index]} data-qa={link}>
									{title}
								</SolaceLink>
							) : (
								<SolaceLink underline="hover" component={RouterLink} to={link} data-qa={link}>
									{title}
								</SolaceLink>
							)}
						</SolaceTooltip>
						{progress && (
							<SolaceTooltip title={progressTooltip}>
								<div>
									<SolaceCircularProgress size="xs" />
								</div>
							</SolaceTooltip>
						)}
					</RouteContainer>
				)
			)}
		</Breadcrumbs>
	);
}

export default SolaceBreadcrumb;
