import React, { useState } from "react";
import { SolaceStepper, DeleteIcon, StepsProps, Box } from "@SolaceDev/maas-react-components";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SolaceStepper> = {
	title: "Forms/SolaceStepper",
	component: SolaceStepper,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/FsVh1zud1IAaXHRn9oIkB7/DATAGOMILE-154---Connector-Flows-Phase-1?type=design&node-id=1096-6315&mode=design&t=IlWw05RJHzNzB8Mi-0"
		}
	}
};

export default meta;

type Story = StoryObj<typeof SolaceStepper>;

const initialSteps: StepsProps = [
	{ label: "Details", icon: <DeleteIcon /> },
	{ label: "Source Connection", icon: <DeleteIcon />, subText: "(optional)" },
	{ label: "Target Header Mapping", icon: <DeleteIcon /> }
];

const getStepText = (activeStep: number, stepsLength: number) => {
	if (activeStep >= 0 && activeStep < stepsLength) {
		return <Box height="100px">{`Step ${activeStep + 1}`}</Box>;
	}
	return "";
};

const onCloseAlert = () => alert("onClose event fired!");
const onSubmitAlert = () => alert("onSubmit event fired!");

/**
 * Renders a simple component with a SolaceStepper.
 * @returns JSX.Element
 */
const Simple = () => {
	const [activeStep, setActiveStep] = useState(0);

	return (
		<Box border="1px solid grey" borderRadius="4px">
			<SolaceStepper
				steps={initialSteps}
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

export const Primary: Story = {
	render: () => <Simple />
};

const errorAndSuccess: StepsProps = [
	{ label: "Details", icon: <DeleteIcon /> },
	{ label: "Error", icon: <DeleteIcon />, subText: "(optional)", error: true },
	{ label: "Success", icon: <DeleteIcon />, completed: true }
];

const WithErrorsAndSuccess = () => {
	const [activeStep, setActiveStep] = useState(0);

	return (
		<Box border="1px solid grey" borderRadius="4px">
			<SolaceStepper
				steps={errorAndSuccess}
				activeStep={activeStep}
				setActiveStep={setActiveStep}
				onClose={onCloseAlert}
				onSubmit={onSubmitAlert}
				submitLabel="Submit"
			>
				{getStepText(activeStep, errorAndSuccess.length)}
			</SolaceStepper>
		</Box>
	);
};

export const ErrorAndSuccess: Story = {
	render: () => <WithErrorsAndSuccess />
};

const errorOnCurrentStep: StepsProps = [
	{ label: "Details", icon: <DeleteIcon />, error: true },
	{ label: "Step 2", icon: <DeleteIcon />, subText: "(some sub text)" },
	{ label: "Step 3", icon: <DeleteIcon />, completed: true },
	{ label: "Step 4", icon: <DeleteIcon />, completed: true }
];

const RenderErrorOnCurrentStep = () => {
	const [activeStep, setActiveStep] = useState(0);

	return (
		<Box border="1px solid grey" borderRadius="4px">
			<SolaceStepper
				steps={errorOnCurrentStep}
				activeStep={activeStep}
				setActiveStep={setActiveStep}
				onClose={onCloseAlert}
				onSubmit={onSubmitAlert}
				submitLabel="Submit"
				disableSubmit={true}
			>
				{getStepText(activeStep, errorOnCurrentStep.length)}
			</SolaceStepper>
		</Box>
	);
};

export const ErrorOnCurrentStepAndSubmitDisabled: Story = {
	render: () => <RenderErrorOnCurrentStep />
};
