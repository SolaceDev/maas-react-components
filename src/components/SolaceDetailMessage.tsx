import { styled } from "@mui/material";

import SolaceButton, { SolaceButtonProps } from "./form/SolaceButton";
import { BASE_COLORS } from "../resources/colorPallette";
import { BASE_FONT_PX_SIZES } from "../resources/typography";

export interface SolaceDetailMessageProps {
	/**
	 * An image to display above the message title
	 */
	msgImg?: JSX.Element;
	/**
	 * Title associated with the message
	 */
	title?: string;
	/**
	 * Detailed message to display
	 */
	details?: string | JSX.Element;
	/**
	 * An array of actions to display as SolaceButtons
	 */
	actions?: SolaceButtonProps[];
}

const Container = styled("div")(({ theme }) => ({
	// need to move this styled componet definition into the theme file once we figure out how
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	fontFamily: theme.typography.fontFamily
}));

const ImgContainer = styled("div")(() => ({
	// need to move this styled componet definition into the theme file once we figure out how
	margin: "0px 0px 40px 0px"
}));

const TitleText = styled("p")(() => ({
	// need to move this styled componet definition into the theme file once we figure out how
	margin: "0px 0px 14px 0px",
	fontSize: BASE_FONT_PX_SIZES.xl,
	color: BASE_COLORS.greys.grey14,
	textAlign: "center"
}));

const DetailsContainer = styled("div")(() => ({
	// need to move this styled componet definition into the theme file once we figure out how
	margin: "0px 0px 14px 0px",
	fontSize: BASE_FONT_PX_SIZES.sm,
	color: BASE_COLORS.greys.grey14
}));

const ButtonGroup = styled("div")(() => ({
	// need to move this styled componet definition into the theme file once we figure out how
	display: "flex",
	flexDirection: "row",
	alignItems: "center"
}));

function SolaceDetailMessage({ msgImg, title, details, actions }: SolaceDetailMessageProps): JSX.Element {
	const buildActionButtons = () => {
		const buttons: JSX.Element[] = [];
		actions?.forEach((action: SolaceButtonProps) =>
			buttons.push(<SolaceButton data-qa={action.id} key={action.id} {...action} />)
		);
		return buttons;
	};

	return (
		<Container>
			{msgImg && <ImgContainer>{msgImg}</ImgContainer>}
			{title && <TitleText>{title}</TitleText>}
			{details && <DetailsContainer>{details}</DetailsContainer>}
			{actions && <ButtonGroup>{buildActionButtons()}</ButtonGroup>}
		</Container>
	);
}

export default SolaceDetailMessage;
