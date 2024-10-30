import { styled } from "@mui/material";
import SolaceComponentProps from "./SolaceComponentProps";

export const ColoredBase = styled("div", {
	shouldForwardProp: (key: string) => key !== "bgColor" && key !== "fgColor"
})<{
	bgColor: string;
	fgColor: string;
}>(
	({ theme, bgColor = "#FFFFFF", fgColor = "#000000" }) => `
	align-items: center;
	background-color: ${bgColor};
	border-color: ${bgColor?.toUpperCase() === "#FFFFFF" ? theme.palette.ux.secondary.w100 : "transparent"};
	border-style: solid;
	border-width: 1px;
	border-radius: ${theme.spacing(0.5)};
	box-sizing: border-box;
	color: ${fgColor};
	cursor: default;
	display: inline-flex;
	fill: ${fgColor};
	height: ${theme.spacing(3)};`
);

const ColoredContainer = styled(ColoredBase)(
	({ theme }) => `
	column-gap: ${theme.spacing(1)};
	font-family: ${theme.typography.body1.fontFamily};
	font-size: ${theme.typography.body1.fontSize};
	font-weight: ${theme.typography.body1.fontWeight};
	padding: ${theme.spacing(0, 1, 0, 0.5)};
	max-width: 200px;`
);

const Icon = styled("span")(`
	display: flex;
`);

const Text = styled("span")(`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`);

export interface SolaceEnvironmentChipProps extends SolaceComponentProps {
	/**
	 * 	The text of the component
	 */
	label: string;
	/**
	 * Sets the fill color of the component (RGB like "#3C69E1")
	 */
	bgColor: string;
	/**
	 * Sets the text color of the label (RGB like "#FFFFFF")
	 */
	fgColor: string;
	/**
	 * Add a leading icon (from maas-icons) and ensure the size of the icon is 16x16 pixels
	 */
	icon: JSX.Element;
}

export default function SolaceEnvironmentChip({
	label,
	bgColor,
	fgColor,
	icon,
	dataQa,
	dataTags
}: SolaceEnvironmentChipProps): JSX.Element {
	return (
		<ColoredContainer bgColor={bgColor} fgColor={fgColor} data-qa={dataQa} data-tags={dataTags}>
			{icon && <Icon>{icon}</Icon>}
			{label && <Text>{label}</Text>}
		</ColoredContainer>
	);
}
