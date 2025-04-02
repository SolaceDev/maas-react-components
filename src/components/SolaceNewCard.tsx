import { Card, CardActions, CardContent, useTheme } from "@mui/material";
import SolaceNewCardHeader from "./SolaceNewCardHeader";
import { SolaceNewCardProps } from "../types";

/**
 * SolaceNewCard component
 *
 * A customizable card component for displaying learning resources with optional
 * icon, title, content, custom action elements, and menu.
 */
function SolaceNewCard({
	cardHeaderProps,
	cardContent,
	cardActions,
	width,
	height,
	minWidth = "250px",
	padding,
	readOnly = false,
	ariaLabel,
	dataQa,
	dataTags
}: SolaceNewCardProps): JSX.Element {
	const theme = useTheme();

	return (
		<Card
			className={`solaceNewCard ${readOnly ? "readOnly" : ""}`}
			sx={{
				width,
				height,
				minWidth,
				padding: padding ?? theme.spacing(2)
			}}
			data-qa={dataQa}
			data-tags={dataTags}
			aria-label={ariaLabel}
			role="article"
		>
			{cardHeaderProps && <SolaceNewCardHeader {...cardHeaderProps} />}

			{cardContent && (
				<CardContent
					sx={{
						"&.MuiCardContent-root:last-child": {
							paddingBottom: theme.spacing(0)
						},
						padding: theme.spacing(0)
					}}
				>
					{cardContent}
				</CardContent>
			)}

			{cardActions && (
				<CardActions
					sx={{
						padding: theme.spacing(0)
					}}
				>
					{cardActions}
				</CardActions>
			)}
		</Card>
	);
}

export default SolaceNewCard;
