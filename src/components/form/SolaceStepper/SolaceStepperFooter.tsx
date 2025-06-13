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

import { Box, Divider, styled, useTheme } from "@mui/material";
import { ArrowLeft24Icon, ArrowRight24Icon } from "@SolaceDev/maas-icons";
import { SolaceStepperFooterProps } from "../../../types";
import SolaceButton from "../SolaceButton";

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
const StyledButtonBox = styled(Box, {
	shouldForwardProp: (prop) => prop !== "onLastStep" && prop !== "direction"
})<{ direction: "left" | "right"; onLastStep?: boolean }>(({ theme, direction, onLastStep }) => ({
	marginRight: direction === "left" ? theme.spacing(1) : 0,
	".MuiButtonBase-root": {
		padding: (() => {
			if (direction === "left") return "0 16px 0 0";
			if (!onLastStep) return "0 0 0 16px";
			return undefined;
		})()
	}
}));

const ButtonContent = styled("span")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(1)
}));

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

	const theme = useTheme();

	const handleNext = () => {
		if (onLastStep) {
			onSubmit();
			return;
		}
		setActiveStep(activeStep + 1);
	};

	const handleSecondaryNext = () => {
		onSecondarySubmit?.();
	};

	const handleBack = () => {
		if (onFirstStep) return;
		setActiveStep(activeStep - 1);
	};

	return (
		<Box minHeight="69px">
			<Divider />
			<StyledButtonGroupBox>
				<StyledButtonBox direction="left">
					{!onFirstStep && (
						<SolaceButton variant="text" onClick={handleBack}>
							<ButtonContent>
								<ArrowLeft24Icon fill={theme.palette.ux.primary.wMain} sx={{ padding: "4px 0px 4px 4px" }} />
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
								<ArrowRight24Icon fill={theme.palette.ux.primary.text.w10} sx={{ padding: "4px 4px 4px 0px" }} />
							</ButtonContent>
						)}
					</SolaceButton>
				</StyledButtonBox>
			</StyledButtonGroupBox>
		</Box>
	);
}
