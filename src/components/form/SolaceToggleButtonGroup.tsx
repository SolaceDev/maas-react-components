import { styled, ToggleButtonGroup, ToggleButton } from "@mui/material";
import SolaceComponentProps from "../SolaceComponentProps";

export interface SolaceToggleButtonGroupProps extends SolaceComponentProps {
	options: SolaceToggleButtonGroupOptionProps[];
	onChange: (event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => void;
	activeValue?: string;
	isDisabled?: boolean;
}

export interface SolaceToggleButtonGroupOptionProps extends SolaceComponentProps {
	label: string | JSX.Element;
	value: string;
}

const OutlineSolaceToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
	// override here to match specificity of default mui styles
	".MuiToggleButtonGroup-grouped:not(:first-of-type)": {
		marginLeft: 0,
		borderLeftColor: theme.palette.ux.secondary.w20,

		"&:focus-visible": {
			borderLeftColor: theme.palette.ux.accent.n2.wMain
		}
	},

	button: {
		height: theme.spacing(4),
		padding: theme.spacing(0, 2),

		color: theme.palette.ux.secondary.text.wMain,
		fontWeight: theme.typography.fontWeightRegular,
		textTransform: "none",
		backgroundColor: theme.palette.ux.background.w10,
		borderColor: theme.palette.ux.secondary.w20,

		"&:hover": {
			backgroundColor: theme.palette.ux.deprecated.secondary.w20,
			borderColor: theme.palette.ux.secondary.w20
		},

		"&.Mui-selected": {
			color: theme.palette.ux.accent.n2.wMain,
			fontWeight: theme.typography.fontWeightMedium,
			backgroundColor: theme.palette.ux.accent.n2.w10,

			"&:hover": {
				backgroundColor: theme.palette.ux.accent.n2.w10
			},

			"&.Mui-disabled": {
				backgroundColor: theme.palette.ux.deprecated.secondary.w20
			}
		},

		"&:focus-visible, &.Mui-selected:focus-visible": {
			borderColor: theme.palette.ux.accent.n2.wMain
		},

		"&.Mui-disabled, &.Mui-selected.Mui-disabled": {
			borderColor: theme.palette.ux.secondary.w20,
			color: theme.palette.ux.secondary.text.w50
		}
	}
}));

function SolaceToggleButtonGroup({
	onChange,
	options = [],
	activeValue = undefined,
	isDisabled = false
}: SolaceToggleButtonGroupProps): JSX.Element {
	return (
		<OutlineSolaceToggleButtonGroup exclusive={true} onChange={onChange} disabled={isDisabled} size={"small"}>
			{options.map((option) => (
				<ToggleButton
					key={option.value}
					value={option.value}
					disableRipple={true}
					disableFocusRipple={true}
					selected={activeValue === option.value}
				>
					{option.label}
				</ToggleButton>
			))}
		</OutlineSolaceToggleButtonGroup>
	);
}

export default SolaceToggleButtonGroup;
