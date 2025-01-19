import { Box, Divider, styled } from "@mui/material";
import SolaceButton from "../SolaceButton";
import { SolaceStepperFooterProps } from "../../../types";
import { ArrowLeftIcon } from "../../../resources/icons/ArrowLeft";
import { ArrowRightIcon } from "../../../resources/icons/ArrowRight";

const buttonStrings = {
	cancel: "Cancel",
	next: "Next",
	back: "Back"
};

/**
 * Renders the footer component for the SolaceStepper.
 *
 * @param {SolaceStepperFooterProps} props - The props for the SolaceStepperFooter component.
 * @returns {JSX.Element} The rendered SolaceStepperFooter component.
 * @example
 * return (
 *   <SolaceStepperFooter
 *     steps={steps}
 *     onClose={handleClose}
 *     onSubmit={handleSubmit}
 *     onSecondarySubmit={handleSecondarySubmit}
 *     setActiveStep={setActiveStep}
 *     activeStep={activeStep}
 *     submitLabel="Submit"
 *     secondarySubmitLabel="Secondary Submit"
 *     disableSubmit={false}
 *   />
 * );
 */

const StyledButtonGroupBox = styled(Box)(({ theme }) => ({
	paddingTop: theme.spacing(2),
	paddingLeft: theme.spacing(3),
	paddingRight: theme.spacing(2),
	display: "flex",
	flexDirection: "row"
}));

// left and right directions have different padding
// right direction only has padding when onLastStep is false
const StyledButtonBox = styled(Box)<{ direction: "left" | "right"; onLastStep?: boolean }>(
	({ theme, direction, onLastStep }) => ({
		marginRight: direction === "left" ? theme.spacing(1) : 0,
		".MuiButtonBase-root": {
			padding: direction === "left" ? "0 16px 0 0" : !onLastStep ? "0 0 0 16px" : undefined
		}
	})
);

// left and right icons have different padding
const IconPadding = {
	left: styled(ArrowLeftIcon)({
		padding: "4px 0px 4px 4px"
	}),
	right: styled(ArrowRightIcon)({
		padding: "4px 4px 4px 0px"
	})
};

export default function SolaceStepperFooter(props: SolaceStepperFooterProps) {
	const {
		steps,
		onClose,
		onSubmit,
		onSecondarySubmit,
		setActiveStep,
		activeStep,
		submitLabel,
		secondarySubmitLabel,
		disableSubmit
	} = props;
	const onLastStep = activeStep === steps.length - 1;
	const onFirstStep = activeStep === 0;

	const handleNext = () => {
		if (onLastStep) {
			onSubmit();
			return;
		}
		setActiveStep(activeStep + 1);
	};

	const handleSecondaryNext = () => {
		if (onLastStep) {
			onSecondarySubmit?.();
			return;
		}
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		if (onFirstStep) return;
		setActiveStep(activeStep - 1);
	};

	const ButtonContent = styled("span")(({ theme }) => ({
		display: "flex",
		alignItems: "center",
		gap: theme.spacing(1)
	}));

	return (
		<Box minHeight="69px">
			<Divider />
			<StyledButtonGroupBox>
				<StyledButtonBox direction="left">
					{!onFirstStep && (
						<SolaceButton variant="text" onClick={handleBack}>
							<ButtonContent>
								<IconPadding.left />
								{`${buttonStrings.back}: ${steps[activeStep - 1].label}`}
							</ButtonContent>
						</SolaceButton>
					)}
				</StyledButtonBox>
				<Box sx={{ flex: "1 1 auto" }} />
				<Box sx={{ mr: 1 }}>
					<SolaceButton variant="text" onClick={onClose}>
						{buttonStrings.cancel}
					</SolaceButton>
				</Box>
				{secondarySubmitLabel && (
					<Box sx={{ mr: 1 }}>
						<SolaceButton variant="outline" onClick={handleSecondaryNext} isDisabled={onLastStep && disableSubmit}>
							{secondarySubmitLabel}
						</SolaceButton>
					</Box>
				)}
				<StyledButtonBox direction="right" onLastStep={onLastStep}>
					<SolaceButton variant="call-to-action" onClick={handleNext} isDisabled={onLastStep && disableSubmit}>
						{onLastStep ? (
							submitLabel
						) : (
							<ButtonContent>
								{`${buttonStrings.next}: ${steps[activeStep + 1]?.label}`}
								<IconPadding.right />
							</ButtonContent>
						)}
					</SolaceButton>
				</StyledButtonBox>
			</StyledButtonGroupBox>
		</Box>
	);
}
