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
import React, { useState } from "react";
import { SolaceStepper, DeleteIcon, StepsProps, Box, StepContentOverflow } from "@SolaceDev/maas-react-components";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import React, { ReactNode, useMemo, useState } from "react";

(SolaceStepper as React.FC & { displayName?: string }).displayName = "SolaceStepper";
(SolaceConfirmationDialog as React.FC & { displayName?: string }).displayName = "SolaceConfirmationDialog";
(SolaceButton as React.FC & { displayName?: string }).displayName = "SolaceButton";
(Box as React.FC & { displayName?: string }).displayName = "Box";

const meta: Meta<typeof SolaceStepper> = {
	title: "Navigation/Step Form",
	component: SolaceStepper,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/FsVh1zud1IAaXHRn9oIkB7/DATAGOMILE-154---Connector-Flows-Phase-1?type=design&node-id=1096-6315&mode=design&t=IlWw05RJHzNzB8Mi-0"
		}
	},
	args: {
		steps: [],
		activeStep: 0,
		setActiveStep: undefined,
		onClose: undefined,
		onSubmit: undefined,
		submitLabel: "Submit",
		stepContentOverflow: StepContentOverflow.Auto,
		disableSubmit: false,
		onSecondarySubmit: undefined,
		secondarySubmitLabel: ""
	},
	argTypes: {
		steps: {
			control: "object",
			description: "Array of step objects",
			table: {
				defaultValue: { summary: "[]" }
			}
		},
		activeStep: {
			control: "number",
			description: "Index of the current active step",
			table: {
				defaultValue: { summary: "0" }
			}
		},
		setActiveStep: {
			action: "setActiveStep",
			description: "Function to set the active step"
		},
		onClose: {
			action: "onClose",
			description: "Function called when stepper is closed"
		},
		onSubmit: {
			action: "onSubmit",
			description: "Function called when stepper is submitted"
		},
		submitLabel: {
			control: "text",
			description: "Label for the submit button",
			table: {
				defaultValue: { summary: '"Submit"' }
			}
		},
		stepContentOverflow: {
			control: "select",
			options: Object.values(StepContentOverflow),
			description:
				"Controls how content overflows within each step. Uses StepContentOverflow enum from https://github.com/SolaceDev/maas-react-components/blob/main/src/types/solaceStepper.ts",
			table: {
				defaultValue: { summary: "StepContentOverflow.Auto" }
			}
		},
		disableSubmit: {
			control: "boolean",
			description: "Whether to disable the submit button",
			table: {
				defaultValue: { summary: "false" }
			}
		},
		onSecondarySubmit: {
			action: "onSecondarySubmit",
			description: "Function called for secondary submit action"
		},
		secondarySubmitLabel: {
			control: "text",
			description: "Label for the secondary submit button",
			table: {
				defaultValue: { summary: '""' }
			}
		}
	}
};

export default meta;

type Story = StoryObj<typeof SolaceStepper>;

function DeleteIconWithColor() {
	const theme = useTheme();

	return <Delete24Icon fill={theme.palette.ux.secondary.wMain} />;
}

const DETAILS_STEP = "Details";
const SOURCE_CONNECTION_STEP = "Source Connection";
const TARGET_HEADER_MAPPING_STEP = "Target Header Mapping";
const SUBTEXT_OPTIONAL = "(Optional)";
const SUBTEXT_DISABLED = "(Disabled)";

const initialSteps: StepsProps = [
	{ label: DETAILS_STEP, icon: <DeleteIconWithColor /> },
	{ label: SOURCE_CONNECTION_STEP, icon: <DeleteIconWithColor />, subText: SUBTEXT_OPTIONAL },
	{ label: TARGET_HEADER_MAPPING_STEP, icon: <DeleteIconWithColor /> }
];

const getStepText = (activeStep: number, stepsLength: number) => {
	if (activeStep >= 0 && activeStep < stepsLength) {
		if (activeStep === 1) {
			return (
				<>
					{[...Array(20)].map((_, i) => (
						<Box key={i} height="50px">{`Step ${activeStep + 1} Line ${i}`}</Box>
					))}
				</>
			);
		}
		return <Box height="100px">{`Step ${activeStep + 1}`}</Box>;
	}
	return "";
};

const onCloseAlert = () => alert("onClose event fired!");
const onSubmitAlert = () => alert("onSubmit event fired!");
const onSecondarySubmitAlert = () => alert("onSecondarySubmit event fired!");

/**
 * Renders a simple component with a SolaceStepper.
 * @returns JSX.Element
 */
const Component = ({ ...args }) => {
	const [activeStep, setActiveStep] = useState(0);

	return (
		<Box display="flex" border="1px solid grey" borderRadius="4px" height="300px">
			<SolaceStepper
				steps={initialSteps}
				{...args}
				activeStep={activeStep}
				setActiveStep={setActiveStep}
				onClose={onCloseAlert}
				onSubmit={onSubmitAlert}
				submitLabel="Submit"
			>
				{getStepText(activeStep, initialSteps.length)}
			</SolaceStepper>
		</Box>
	);
};

const ComponentWithSecondaryButtonOnLastStep = ({ ...args }) => {
	const [activeStep, setActiveStep] = useState(0);

	return (
		<Box display="flex" border="1px solid grey" borderRadius="4px" height="300px">
			<SolaceStepper
				steps={initialSteps}
				{...args}
				activeStep={activeStep}
				setActiveStep={setActiveStep}
				onClose={onCloseAlert}
				onSubmit={onSubmitAlert}
				onSecondarySubmit={onSecondarySubmitAlert}
				submitLabel="Submit"
				secondarySubmitLabel={activeStep === initialSteps.length - 1 ? "Secondary Submit" : undefined}
			>
				{getStepText(activeStep, initialSteps.length)}
			</SolaceStepper>
		</Box>
	);
};

<<<<<<< HEAD:storybook/src/stories/navigation/stepper/SolaceStepper.stories.tsx
=======
const ComponentWithSecondaryButtonOnNonLastStep = ({ ...args }) => {
	const [activeStep, setActiveStep] = useState(0);

	return (
		<Box display="flex" border="1px solid grey" borderRadius="4px" height="300px">
			<SolaceStepper
				steps={initialSteps}
				{...args}
				activeStep={activeStep}
				setActiveStep={setActiveStep}
				onClose={onCloseAlert}
				onSubmit={onSubmitAlert}
				onSecondarySubmit={onSecondarySubmitAlert}
				submitLabel="Submit"
				secondarySubmitLabel={activeStep < initialSteps.length - 1 ? "Secondary Submit" : undefined}
			>
				{getStepText(activeStep, initialSteps.length)}
			</SolaceStepper>
		</Box>
	);
};

>>>>>>> main:storybook/src/stories/navigation/SolaceStepper.stories.tsx
export const Primary: Story = {
	render: Component,
	args: {
		steps: initialSteps,
		activeStep: 0,
		setActiveStep: undefined,
		onClose: undefined,
		onSubmit: undefined,
		submitLabel: "Submit",
		stepContentOverflow: StepContentOverflow.Auto,
		disableSubmit: false,
		onSecondarySubmit: undefined,
		secondarySubmitLabel: undefined
	}
};

const errorAndSuccess: StepsProps = [
	{ label: DETAILS_STEP, icon: <DeleteIconWithColor /> },
	{ label: "Error", icon: <DeleteIconWithColor />, subText: SUBTEXT_OPTIONAL, error: true },
	{ label: "Success", icon: <DeleteIconWithColor />, completed: true }
];

export const ErrorAndSuccess: Story = {
	render: Component,
	args: {
		steps: errorAndSuccess,
		activeStep: 0,
		setActiveStep: () => {},
		onClose: onCloseAlert,
		onSubmit: onSubmitAlert,
		submitLabel: "Submit",
		stepContentOverflow: StepContentOverflow.Auto,
		disableSubmit: false,
		onSecondarySubmit: undefined,
		secondarySubmitLabel: undefined
	}
};

const errorOnCurrentStep: StepsProps = [
	{ label: DETAILS_STEP, icon: <DeleteIconWithColor />, error: true },
	{ label: "Step 2", icon: <DeleteIconWithColor />, subText: "(some sub text)" },
	{ label: "Step 3", icon: <DeleteIconWithColor />, completed: true },
	{ label: "Step 4", icon: <DeleteIconWithColor />, completed: true }
];

export const ErrorOnCurrentStepAndSubmitDisabled: Story = {
	render: Component,
	args: {
		steps: errorOnCurrentStep,
		activeStep: 0,
		setActiveStep: () => {},
		onClose: onCloseAlert,
		onSubmit: onSubmitAlert,
		submitLabel: "Submit",
		stepContentOverflow: StepContentOverflow.Auto,
		disableSubmit: true,
		onSecondarySubmit: undefined,
		secondarySubmitLabel: undefined
	}
};

<<<<<<< HEAD:storybook/src/stories/navigation/stepper/SolaceStepper.stories.tsx
export const SecondaryButtonEnabled: Story = {
	render: ComponentWithSecondaryButton,
	args: {
		steps: initialSteps,
		activeStep: 0,
		setActiveStep: () => {},
		onClose: onCloseAlert,
		onSubmit: onSubmitAlert,
		submitLabel: "Submit",
		stepContentOverflow: StepContentOverflow.Auto,
		disableSubmit: false,
		onSecondarySubmit: onSecondarySubmitAlert,
		secondarySubmitLabel: "Secondary Submit"
	}
=======
export const SecondaryButtonOnLastStep: Story = {
	render: ComponentWithSecondaryButtonOnLastStep,
	args: { steps: initialSteps }
>>>>>>> main:storybook/src/stories/navigation/SolaceStepper.stories.tsx
};

export const SecondaryButtonOnNonLastStep: Story = {
	render: ComponentWithSecondaryButtonOnNonLastStep,
	args: { steps: initialSteps }
};

const stepsWithHiddenOptionalLabels: StepsProps = [
	{ label: DETAILS_STEP, icon: <DeleteIconWithColor />, hideOptionalLabel: true },
	{ label: SOURCE_CONNECTION_STEP, icon: <DeleteIconWithColor />, subText: SUBTEXT_OPTIONAL, hideOptionalLabel: true },
	{ label: TARGET_HEADER_MAPPING_STEP, icon: <DeleteIconWithColor />, hideOptionalLabel: true }
];

export const HideOptionalLabels: Story = {
	render: Component,
	args: { steps: stepsWithHiddenOptionalLabels }
};

const stepsWithDisabled: StepsProps = [
	{ label: DETAILS_STEP, icon: <DeleteIconWithColor />, disabled: false },
	{ label: SOURCE_CONNECTION_STEP, icon: <DeleteIconWithColor />, subText: SUBTEXT_DISABLED, disabled: true },
	{ label: TARGET_HEADER_MAPPING_STEP, icon: <DeleteIconWithColor />, disabled: false }
];

const stepsWithDisabledReasons: StepsProps = [
	{ label: DETAILS_STEP, icon: <DeleteIconWithColor />, disabled: false, hideOptionalLabel: true },
	{
		label: SOURCE_CONNECTION_STEP,
		icon: <DeleteIconWithColor />,
		subText: SUBTEXT_DISABLED,
		disabled: true,
		disabledReason: "Complete the previous step before proceeding",
		hideOptionalLabel: true
	},
	{
		label: TARGET_HEADER_MAPPING_STEP,
		icon: <DeleteIconWithColor />,
		disabled: true,
		disabledReason: "Source connection must be configured first",
		hideOptionalLabel: true
	}
];

export const DisabledSteps: Story = {
	render: Component,
	args: { steps: stepsWithDisabled },
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Assert next button is step 3 since step 2 is disabled)
		const nextButton = canvas.getByRole("button", { name: /next/i });
		expect(nextButton).toBeEnabled();
		expect(nextButton).toHaveTextContent(stepsWithDisabled[2].label);

		// Click on Target Header Mapping to jump to step 3
		const targetHeaderMappingStep = canvas.getByText("Target Header Mapping");
		await userEvent.click(targetHeaderMappingStep);

		// Assert back button is step 1 since step 2 is disabled
		const backButton = canvas.getByRole("button", { name: /back/i });
		expect(backButton).toBeEnabled();
		expect(backButton).toHaveTextContent(stepsWithDisabled[0].label);
	}
};

const stepsWithMixedStates: StepsProps = [
	{ label: "Step 1", icon: <DeleteIconWithColor />, completed: true, disabled: false },
	{ label: "Step 2", icon: <DeleteIconWithColor />, completed: true, disabled: false },
	{ label: "Error Step 3", icon: <DeleteIconWithColor />, subText: "(Disabled)", error: true, disabled: true },
	{ label: "Step 4", icon: <DeleteIconWithColor />, disabled: false },
	{ label: "Step 5", icon: <DeleteIconWithColor />, disabled: true }
];

export const MixedStepStates: Story = {
	render: Component,
	args: { steps: stepsWithMixedStates },
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Assert initial state - should be on first step (Completed Step)
		const step1NextButton = canvas.getByRole("button", { name: /next/i });
		expect(step1NextButton).toBeEnabled();
		expect(step1NextButton).toHaveTextContent("Step 2");

		// Click next to go to Step 2
		await userEvent.click(step1NextButton);

		const step2NextButton = canvas.getByRole("button", { name: /next/i });
		expect(step2NextButton).toBeEnabled();
		expect(step2NextButton).toHaveTextContent("Step 4");

		// Assert back button shows correct previous enabled step
		const step2BackButton = canvas.getByRole("button", { name: /back/i });
		expect(step2BackButton).toBeEnabled();
		expect(step2BackButton).toHaveTextContent("Step 1");

		// Click next to go to Step 4
		await userEvent.click(step2NextButton);

		// Assert next button is disabled since step 4 is disabled
		const step4NextButton = canvas.getByRole("button", { name: /next/i });
		expect(step4NextButton).toBeDisabled();
		expect(step4NextButton).toHaveTextContent("Step 5");

		// Assert back button shows correct previous enabled step
		const step4BackButton = canvas.getByRole("button", { name: /back/i });
		expect(step4BackButton).toBeEnabled();
		expect(step4BackButton).toHaveTextContent("Step 2");
	}
};

export const DisabledStepsWithTooltips: Story = {
	render: Component,
	args: { steps: stepsWithDisabledReasons }
};

const ComponentWithToggleDisabled = () => {
	const [activeStep, setActiveStep] = useState(0);
	const initialSteps: StepProp[] = useMemo(
		() => [
			{ label: DETAILS_STEP, icon: <DeleteIconWithColor />, disabled: false },
			{
				label: SOURCE_CONNECTION_STEP,
				icon: <DeleteIconWithColor />,
				subText: SUBTEXT_DISABLED,
				disabled: true,
				disabledReason: "Complete the previous step before proceeding"
			},
			{
				label: TARGET_HEADER_MAPPING_STEP,
				icon: <DeleteIconWithColor />,
				disabled: true,
				disabledReason: "Source connection must be configured first"
			}
		],
		[]
	);

	const [dynamicSteps, setDynamicSteps] = useState<StepProp[]>(initialSteps);

	const handleToggleDisableRemainingSteps = () => {
		setDynamicSteps((prevSteps) =>
			prevSteps.map((step, index) => (index > 0 ? { ...step, disabled: !step.disabled } : step))
		);
	};

	const getStepContent = (step: number) => {
		if (step === 0) {
			return (
				<Box>
					<Box height="50px">Step 1 - Details</Box>
					<SolaceButton variant="outline" onClick={() => handleToggleDisableRemainingSteps()}>
						{"Toggle Remaining Steps"}
					</SolaceButton>
				</Box>
			);
		}
		return <Box height="100px">{`Step ${step + 1}`}</Box>;
	};

	return (
		<Box display="flex" border="1px solid grey" borderRadius="4px" height="300px">
			<SolaceStepper
				steps={dynamicSteps}
				activeStep={activeStep}
				setActiveStep={setActiveStep}
				onClose={onCloseAlert}
				onSubmit={onSubmitAlert}
				submitLabel="Submit"
			>
				{getStepContent(activeStep)}
			</SolaceStepper>
		</Box>
	);
};

export const InteractiveDisabledSteps: Story = {
	render: ComponentWithToggleDisabled,
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Assert next button is initially disabled (since remaining steps are disabled)
		const nextButton = canvas.getByRole("button", { name: /next/i });
		expect(nextButton).toBeDisabled();

		// Click on Toggle Remaining Steps button
		const toggleButton = canvas.getByRole("button", { name: /toggle remaining steps/i });
		await userEvent.click(toggleButton);

		// Assert next button is now enabled (since remaining steps are no longer disabled)
		expect(nextButton).toBeEnabled();
	}
};

// Dialog Wrapper Component to manage open state
interface DialogWrapperProps {
	children: (isOpen: boolean, handleClose: () => void) => ReactNode;
	buttonText?: string;
}

const DialogWrapper = ({ children, buttonText = "Open Dialog" }: DialogWrapperProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<>
			<SolaceButton onClick={handleOpen} variant="outline">
				{buttonText}
			</SolaceButton>

			{children(isOpen, handleClose)}
		</>
	);
};

const ComponentInDialog = ({ ...args }) => {
	const [activeStep, setActiveStep] = useState(0);

	return (
		<DialogWrapper>
			{(isOpen, handleClose) => (
				<SolaceConfirmationDialog
					maxWidth="lg"
					title={
						<Box paddingLeft={3} paddingRight={3} paddingTop={3}>
							Stepper in a dialog
						</Box>
					}
					isOpen={isOpen}
					contentLayout="contents"
					actions={[]}
					disableDefaultPadding
				>
					<Box overflow={"hidden"} display={"flex"} height={"300px"} width={"800px"}>
						<SolaceStepper
							steps={initialSteps}
							{...args}
							activeStep={activeStep}
							setActiveStep={setActiveStep}
							onClose={() => {
								onCloseAlert();
								handleClose();
							}}
							onSubmit={() => {
								onSubmitAlert();
								handleClose();
							}}
							onSecondarySubmit={() => {
								onSecondarySubmitAlert();
								handleClose();
							}}
							submitLabel="Submit"
							secondarySubmitLabel="Secondary Submit"
						>
							{getStepText(activeStep, initialSteps.length)}
						</SolaceStepper>
					</Box>
				</SolaceConfirmationDialog>
			)}
		</DialogWrapper>
	);
};

export const InDialog: Story = {
	render: ComponentInDialog,
	args: { steps: initialSteps }
};

InDialog.play = async ({ canvasElement }) => {
	// Starts querying the component from its root element
	const canvas = within(canvasElement);

	// Find the clear button using role and its accessible name (aria-label)
	const clearButton = canvas.getByRole("button");
	await userEvent.click(clearButton);
};

export const InDialogWithDisabledSteps: Story = {
	render: ComponentInDialog,
	args: { steps: stepsWithDisabledReasons }
};

InDialogWithDisabledSteps.play = async ({ canvasElement }) => {
	// Starts querying the component from its root element
	const canvas = within(canvasElement);

	// Find the clear button using role and its accessible name (aria-label)
	const clearButton = canvas.getByRole("button");
	await userEvent.click(clearButton);
};
