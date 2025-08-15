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
import { ArrowLeftIcon } from "../../../resources/icons/ArrowLeft";
import { ArrowRightIcon } from "../../../resources/icons/ArrowRight";
import { useMemo } from "react";
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

	// The first step after activeStep in enabled state, if such step not found, return activeStep + 1
	const nextStepAllowed = useMemo(() => {
		if (activeStep === steps.length - 1) return activeStep;

		let nextEnabledStep = -1;
		for (let index = activeStep + 1; index < steps.length; index++) {
			if (!steps[index].disabled) {
				nextEnabledStep = index;
				break;
			}
		}

		return nextEnabledStep === -1 ? activeStep + 1 : nextEnabledStep;
	}, [steps, activeStep]);
	const previousStepAllowed = useMemo(() => {
		if (activeStep === 0) return activeStep;

		let previousEnabledStep = -1;
		for (let index = activeStep - 1; index >= 0; index--) {
			if (!steps[index].disabled) {
				previousEnabledStep = index;
				break;
			}
		}

		return previousEnabledStep === -1 ? activeStep - 1 : previousEnabledStep;
	}, [steps, activeStep]);

	const theme = useTheme();

	const handleNext = () => {
		if (onLastStep) {
			onSubmit();
			return;
		}
		setActiveStep(nextStepAllowed);
	};

	const handleSecondarySubmit = () => {
		onSecondarySubmit?.();
	};

	const handleBack = () => {
		if (onFirstStep) return;
		setActiveStep(previousStepAllowed);
	};

	return (
		<Box minHeight="69px">
			<Divider />
			<StyledButtonGroupBox>
				<StyledButtonBox direction="left">
					{!onFirstStep && (
						<SolaceButton variant="text" onClick={handleBack} isDisabled={steps[previousStepAllowed].disabled}>
							<ButtonContent>
								<ArrowLeftIcon
									className=""
								/>
								{`${buttonStrings.back}: ${steps[previousStepAllowed].label}`}
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
						<SolaceButton variant="outline" onClick={handleSecondarySubmit} isDisabled={onLastStep && disableSubmit}>
							{secondarySubmitLabel}
						</SolaceButton>
					</Box>
				)}
				<StyledButtonBox direction="right" onLastStep={onLastStep}>
					<SolaceButton
						variant="call-to-action"
						onClick={handleNext}
						isDisabled={(onLastStep && disableSubmit) || (!onLastStep && steps[nextStepAllowed].disabled)}
					>
						{onLastStep ? (
							submitLabel
						) : (
							<ButtonContent>
								{`${buttonStrings.next}: ${steps[nextStepAllowed]?.label}`}
								<ArrowRightIcon className="" />
							</ButtonContent>
						)}
					</SolaceButton>
				</StyledButtonBox>
			</StyledButtonGroupBox>
		</Box>
	);
}
