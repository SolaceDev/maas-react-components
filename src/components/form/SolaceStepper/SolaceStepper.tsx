import { Box, Step, StepButton, StepLabel, Stepper, useTheme } from "@mui/material";
import SolaceTypography from "../../SolaceTypography";
import SolaceStepperFooter from "./SolaceStepperFooter";
import { SolaceStepperProps, StepProp } from "../../../types";
import SolaceStepIcon from "./SolaceStepIcon";

/**
 * SolaceStepper component.
 * Renders a stepper component with customizable steps and content.
 *
 * @param {SolaceStepperProps} props - The component props.
 * @returns {JSX.Element} The SolaceStepper component.
 */
export default function SolaceStepper(props: SolaceStepperProps) {
	const { activeStep, steps, setActiveStep, children, ...rest } = props;
	const theme = useTheme();

	/**
	 * Handles the click event for a step button.
	 *
	 * @param {number} step - The index of the step.
	 */
	const handleStep = (step: number) => () => {
		setActiveStep(step);
	};

	const getSolaceIconComponent = (step: StepProp, active?: boolean) => {
		return <SolaceStepIcon icon={step.icon} completed={step.completed} error={step.error} active={active} />;
	};

	return (
		<Box display="flex" flexDirection="column" overflow="auto" flexGrow={1}>
			<Stepper nonLinear activeStep={activeStep}>
				{steps.map((step, index) => {
					const labelColor =
						activeStep === index ? theme.palette.ux.brand.wMain : theme.palette.ux.deprecated.secondary.text.wMain;
					return (
						<Step key={step.label}>
							<StepButton
								optional={
									<SolaceTypography sx={{ color: labelColor }} variant="caption">
										{`Step ${index + 1} ${step?.subText ?? ""}`}
									</SolaceTypography>
								}
								color="inherit"
								onClick={handleStep(index)}
								sx={{ textAlign: "left" }}
							>
								<StepLabel StepIconComponent={() => getSolaceIconComponent(step, activeStep === index)}>
									<SolaceTypography variant="h5" sx={{ color: labelColor }}>
										{step.label}
									</SolaceTypography>
								</StepLabel>
							</StepButton>
						</Step>
					);
				})}
			</Stepper>
			<Box pl={3} pr={3} flexGrow={1} overflow="auto">
				{children}
			</Box>
			<SolaceStepperFooter activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} {...rest} />
		</Box>
	);
}
