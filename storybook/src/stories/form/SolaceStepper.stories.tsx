import React, { useState } from "react";
import { SolaceStepper, DeleteIcon, StepsProps, Box } from "@SolaceDev/maas-react-components";
import type { Meta, StoryObj } from "@storybook/react";

(SolaceStepper as React.FC & { displayName?: string }).displayName = "SolaceStepper";
(Box as React.FC & { displayName?: string }).displayName = "Box";

const meta: Meta<typeof SolaceStepper> = {
	title: "Forms/SolaceStepper",
	component: SolaceStepper,
	parameters: {
		docs: { story: { height: "300px" } },
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
	{ label: "Source Connection", icon: <DeleteIcon />, subText: "(Optional)" },
	{ label: "Target Header Mapping", icon: <DeleteIcon /> }
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

const ComponentWithSecondaryButton = ({ ...args }) => {
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
				secondarySubmitLabel="Secondary Submit"
			>
				{getStepText(activeStep, initialSteps.length)}
			</SolaceStepper>
		</Box>
	);
};
export const Primary: Story = {
	render: Component,
	args: { steps: initialSteps }
};

const errorAndSuccess: StepsProps = [
	{ label: "Details", icon: <DeleteIcon /> },
	{ label: "Error", icon: <DeleteIcon />, subText: "(optional)", error: true },
	{ label: "Success", icon: <DeleteIcon />, completed: true }
];

export const ErrorAndSuccess: Story = {
	render: Component,
	args: { steps: errorAndSuccess }
};

const errorOnCurrentStep: StepsProps = [
	{ label: "Details", icon: <DeleteIcon />, error: true },
	{ label: "Step 2", icon: <DeleteIcon />, subText: "(some sub text)" },
	{ label: "Step 3", icon: <DeleteIcon />, completed: true },
	{ label: "Step 4", icon: <DeleteIcon />, completed: true }
];

export const ErrorOnCurrentStepAndSubmitDisabled: Story = {
	render: Component,
	args: { steps: errorOnCurrentStep, disableSubmit: true }
};

export const SecondaryButtonEnabled: Story = {
	render: ComponentWithSecondaryButton,
	args: { steps: initialSteps }
};
