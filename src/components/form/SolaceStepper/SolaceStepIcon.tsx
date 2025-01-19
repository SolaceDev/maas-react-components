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
