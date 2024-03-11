import { Box, Divider } from "@mui/material";
import SolaceButton from "../SolaceButton";
import { SolaceStepperFooterProps } from "../../../types";

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
 *     setActiveStep={setActiveStep}
 *     activeStep={activeStep}
 *     submitLabel="Submit"
 *     disableSubmit={false}
 *   />
 * );
 */

export default function SolaceStepperFooter(props: SolaceStepperFooterProps) {
	const { steps, onClose, onSubmit, setActiveStep, activeStep, submitLabel, disableSubmit } = props;
	const onLastStep = activeStep === steps.length - 1;
	const onFirstStep = activeStep === 0;

	const handleNext = () => {
		if (onLastStep) {
			onSubmit();
			return;
		}
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		if (onFirstStep) return;
		setActiveStep(activeStep - 1);
	};
	return (
		<Box height="69px">
			<Divider />
			<Box pl={3} pr={2} sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
				<Box sx={{ mr: 1 }}>
					{!onFirstStep && (
						<SolaceButton variant="text" onClick={handleBack}>
							{`< ${buttonStrings.back}: ${steps[activeStep - 1].label}`}
						</SolaceButton>
					)}
				</Box>
				<Box sx={{ flex: "1 1 auto" }} />
				<Box sx={{ mr: 1 }}>
					<SolaceButton variant="text" onClick={onClose}>
						{buttonStrings.cancel}
					</SolaceButton>
				</Box>

				<SolaceButton variant="call-to-action" onClick={handleNext} isDisabled={onLastStep && disableSubmit}>
					{onLastStep ? submitLabel : `${buttonStrings.next}: ${steps[activeStep + 1].label} >`}
				</SolaceButton>
			</Box>
		</Box>
	);
}
