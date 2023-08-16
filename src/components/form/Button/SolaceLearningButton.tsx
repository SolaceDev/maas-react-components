import { Button, IconButton } from "@mui/material";
import SolaceTooltip from "../../SolaceToolTip";

import { LearningIconStyles, LearningLightStyles, LearningStyles } from "./buttonhelper";
import { SolaceLearningButtonProps } from "../../../types";

function SolaceLearningButton({
	id,
	variant = "learning",
	"aria-label": ariaLabel,
	"aria-labelledby": ariaLabelledby,
	isDisabled = false,
	title = "",
	component = "button",
	type = "button",
	startIcon,
	endIcon,
	onClick,
	dataQa,
	dataTags,
	children
}: SolaceLearningButtonProps): JSX.Element {
	const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		if (onClick) {
			onClick(event);
		}
	};

	if (variant === "learning-icon") {
		return (
			<SolaceTooltip title={title}>
				<IconButton
					aria-label={ariaLabel}
					aria-labelledby={ariaLabelledby}
					data-qa={dataQa}
					data-tags={dataTags}
					type={type}
					id={id}
					disabled={isDisabled}
					onClick={handleClick}
					size="large"
					sx={{ ...LearningIconStyles() }}
				>
					{children}
				</IconButton>
			</SolaceTooltip>
		);
	} else {
		enum MATERIAL_VARIANTS {
			contained = "contained"
		}
		const BUTTON_VARIANT_MAP = {
			learning: MATERIAL_VARIANTS.contained,
			"learning-light": MATERIAL_VARIANTS.contained
		};

		let additionalStyles = undefined;
		if (variant === "learning" || variant === "learning-light") {
			switch (variant) {
				case "learning":
					additionalStyles = LearningStyles();
					break;
				case "learning-light":
					additionalStyles = LearningLightStyles();
					break;
			}
		}

		return (
			<SolaceTooltip title={title}>
				<Button
					id={id}
					data-qa={dataQa}
					data-tags={dataTags}
					startIcon={startIcon}
					endIcon={endIcon}
					component={component}
					type={type}
					disabled={isDisabled}
					variant={BUTTON_VARIANT_MAP[variant]}
					onClick={handleClick}
					sx={{ ...additionalStyles }}
				>
					{children}
				</Button>
			</SolaceTooltip>
		);
	}
}

export default SolaceLearningButton;
