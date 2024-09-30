import { Button, IconButton } from "@mui/material";
import SolaceTooltip from "../../SolaceToolTip";

import { SolaceLearningButtonProps } from "../../../types";

function SolaceLearningButton({
	id,
	variant = "call-to-action",
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

	if (variant === "icon") {
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
					className="icon-button"
					component="button"
				>
					{children}
				</IconButton>
			</SolaceTooltip>
		);
	} else {
		enum MATERIAL_VARIANTS {
			contained = "contained",
			outlined = "outlined"
		}
		const BUTTON_VARIANT_MAP = {
			learning: MATERIAL_VARIANTS.contained,
			"dark-call-to-action": MATERIAL_VARIANTS.contained,
			"dark-outline": MATERIAL_VARIANTS.outlined
		};

		let className = "";
		switch (variant) {
			case "dark-call-to-action":
				className = "dark-call-to-action-button";
				break;
			case "dark-outline":
				className = "dark-outline-button";
				break;
			default:
				className = "call-to-action-button";
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
					className={className}
				>
					{children}
				</Button>
			</SolaceTooltip>
		);
	}
}

export default SolaceLearningButton;
