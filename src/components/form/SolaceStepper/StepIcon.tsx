import { Badge, Box, useTheme } from "@mui/material";
import { CheckFilled16Icon, Error16Icon } from "@SolaceDev/maas-icons";
const shapeStyles = { width: 48, height: 48 };
const shapeCircleStyles = { borderRadius: "50%" };

export type StepIconProps = {
	active?: boolean;
	completed?: boolean;
	icon: React.ReactNode;
	error?: boolean;
};

/**
 * Renders a StepIcon component in a stepper.
 *
 * @param {StepIconProps} props - The props for the StepIcon component.
 * @returns {JSX.Element} The rendered StepIcon component.
 */
export default function StepIcon(props: StepIconProps) {
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
		<CheckFilled16Icon fill={theme.palette.ux.brand.wMain} sx={{ background: theme.palette.ux.background.w10 }} />
	) : (
		<Error16Icon fill={theme.palette.ux.error.wMain} sx={{ background: theme.palette.ux.background.w10 }} />
	);

	return (
		<Badge overlap="circular" badgeContent={error || completed ? badgeContent : null}>
			{circle}
		</Badge>
	);
}
