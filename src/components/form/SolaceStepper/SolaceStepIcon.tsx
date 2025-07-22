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

import { Badge, Box, useTheme } from "@mui/material";
import { Error16Icon } from "../../../resources/icons/Error16Icon";
import { CheckFilled16Icon } from "../../../resources/icons/CheckFilled16Icon";
const shapeStyles = { width: 48, height: 48 };
const shapeCircleStyles = { borderRadius: "50%" };

export type SolaceStepIconProps = {
	active?: boolean;
	completed?: boolean;
	icon: React.ReactNode;
	error?: boolean;
};

/**
 * Renders a SolaceStepIcon component in a stepper.
 *
 * @param {SolaceStepIconProps} props - The props for the SolaceStepIcon component.
 * @returns {JSX.Element} The rendered SolaceStepIcon component.
 */
export default function SolaceStepIcon(props: SolaceStepIconProps) {
	const { active, completed, icon, error } = props;
	const theme = useTheme();

	const borderColor = active
		? theme.palette.ux.brand.wMain
		: error
		  ? theme.palette.ux.error.wMain
		  : theme.palette.ux.secondary.w40;

	const borderStyles = {
		border: `${active ? "2px" : "1px"} solid ${borderColor}`
	};

	const circle = (
		<Box
			component="span"
			sx={{ border: borderStyles, ...shapeStyles, ...shapeCircleStyles }}
			display="flex"
			alignItems="center"
			justifyContent="center"
		>
			{icon}
		</Box>
	);

	const badgeContent = completed ? (
		<CheckFilled16Icon fill={theme.palette.ux.success.wMain} size={16} />
	) : (
		<Error16Icon fill={theme.palette.ux.error.wMain} size={16} />
	);

	return (
		<Badge overlap="circular" badgeContent={error || completed ? badgeContent : null}>
			{circle}
		</Badge>
	);
}
