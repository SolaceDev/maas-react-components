import { styled } from "@mui/material";
import SolaceComponentProps from "./SolaceComponentProps";

const FeatureTag = styled("span")(
	({ theme }) => `
	border: 2px solid ${theme.palette.ux.secondary.text.w50};
	border-radius: ${theme.spacing(0.5)};
	box-sizing: border-box;
	color: ${theme.palette.ux.secondary.text.w50};
	font-size: 10px;
	font-weight: 500;
	line-height: 10px;
	padding: ${theme.spacing(0.25, 1)};
	text-transform: uppercase;
	&.active {
		border-color: ${theme.palette.ux.primary.wMain};
		color: ${theme.palette.ux.primary.wMain};
	}`
);

export interface SolaceFeatureTagProps extends SolaceComponentProps {
	/**
	 * The feature's text (e.g. "BETA")
	 */
	text: string;
	/**
	 * When true, use the branding color
	 */
	active?: boolean;
}

export default function SolaceFeatureTag({ text, active, dataQa, dataTags }: SolaceFeatureTagProps): JSX.Element {
	return (
		<FeatureTag data-qa={dataQa} data-tags={dataTags} className={active ? "active" : ""}>
			{text}
		</FeatureTag>
	);
}
