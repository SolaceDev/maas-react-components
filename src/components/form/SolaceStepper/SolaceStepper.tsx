/*
 * Copyright 2023-2025 Solace Systems. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Box, Step, StepButton, StepLabel, Stepper, Tooltip, useTheme } from "@mui/material";
import { SolaceStepperProps, StepProp } from "../../../types";
import SolaceTypography from "../../SolaceTypography";
import SolaceStepIcon from "./SolaceStepIcon";
import SolaceStepperFooter from "./SolaceStepperFooter";

/**
 * SolaceStepper component.
 * Renders a stepper component with customizable steps and content.
 *
 * @param {SolaceStepperProps} props - The component props.
 * @returns {JSX.Element} The SolaceStepper component.
 */
export default function SolaceStepper(props: SolaceStepperProps) {
	const { activeStep, steps, setActiveStep, children, stepContentOverflow, ...rest } = props;
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
						activeStep === index
							? theme.palette.ux.primary.text.wMain
							: theme.palette.ux.deprecated.secondary.text.wMain;
					const stepButton = (
						<StepButton
							optional={
								step.hideOptionalLabel ? undefined : (
									<SolaceTypography sx={{ color: labelColor }} variant="caption">
										{`Step ${index + 1} ${step?.subText ?? ""}`}
									</SolaceTypography>
								)
							}
							color="inherit"
							onClick={step.disabled ? undefined : handleStep(index)}
							sx={{
								textAlign: "left",
								opacity: step.disabled ? 0.35 : 1,
								cursor: step.disabled ? "default" : "pointer",
								"&:hover .MuiTypography-root": {
									color: step.disabled ? undefined : theme.palette.ux.primary.text.wMain
								}
							}}
						>
							<StepLabel StepIconComponent={() => getSolaceIconComponent(step, activeStep === index)}>
								<SolaceTypography variant="h5" sx={{ color: labelColor }}>
									{step.label}
								</SolaceTypography>
							</StepLabel>
						</StepButton>
					);

					return (
						<Step key={step.label}>
							{step.disabled && step.disabledReason ? (
								<Tooltip
									title={step.disabledReason}
									placement="bottom-start"
									slotProps={{
										popper: {
											modifiers: [
												{
													name: "offset",
													options: {
														offset: [0, -24]
													}
												}
											]
										}
									}}
								>
									{stepButton}
								</Tooltip>
							) : (
								stepButton
							)}
						</Step>
					);
				})}
			</Stepper>
			<Box pl={3} pr={3} flexGrow={1} overflow={stepContentOverflow ?? "auto"}>
				{children}
			</Box>
			<SolaceStepperFooter activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} {...rest} />
		</Box>
	);
}
