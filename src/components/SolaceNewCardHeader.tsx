import { styled } from "@mui/material";
import SolaceTypography from "./SolaceTypography";
import { SolaceNewCardHeaderProps } from "../types";

/**
 * Styled container for the card header
 */
const CardHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	gap: theme.spacing(1),
	width: "100%",
	boxSizing: "border-box"
}));

const CardHeaderContent = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(1)
}));

/**
 * Styled container for the icon
 */
const IconContainer = styled("div")(() => ({
	display: "flex",
	alignSelf: "flex-start",
	justifyContent: "center",
	alignItems: "center"
}));

/**
 * Styled container for the title and subheader
 */
const CardHeaderText = styled("div")(() => ({
	flex: 1,
	display: "flex",
	flexDirection: "column"
}));

/**
 * Styled container for the action elements
 */
const CardHeaderActions = styled("div")(({ theme }) => ({
	display: "flex",
	alignSelf: "flex-start",
	alignItems: "center",
	marginTop: theme.spacing(-0.5)
}));

/**
 * SolaceNewCardHeader component
 *
 * A custom card header component that doesn't wrap the title in a Typography element,
 * allowing for direct use of custom Typography components.
 */
function SolaceNewCardHeader({
	icon,
	title,
	subTitle,
	actionElements = null,
	dataQa,
	dataTags
}: SolaceNewCardHeaderProps): JSX.Element {
	return (
		<CardHeader data-qa={dataQa} data-tags={dataTags}>
			<CardHeaderContent>
				{icon && <IconContainer>{icon}</IconContainer>}
				{title && (
					<CardHeaderText>
						<SolaceTypography variant="h3">{title}</SolaceTypography>
						{subTitle && <SolaceTypography variant="body1">{subTitle}</SolaceTypography>}
					</CardHeaderText>
				)}
			</CardHeaderContent>
			{actionElements && <CardHeaderActions>{actionElements}</CardHeaderActions>}
		</CardHeader>
	);
}

export default SolaceNewCardHeader;
