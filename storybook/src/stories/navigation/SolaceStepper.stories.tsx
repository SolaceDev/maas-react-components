import {
	Box,
	DeleteIcon,
	SolaceButton,
	SolaceConfirmationDialog,
	SolaceStepper,
	StepsProps
} from "@SolaceDev/maas-react-components";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import React, { ReactNode, useState } from "react";

(SolaceStepper as React.FC & { displayName?: string }).displayName = "SolaceStepper";
(SolaceConfirmationDialog as React.FC & { displayName?: string }).displayName = "SolaceConfirmationDialog";
(SolaceButton as React.FC & { displayName?: string }).displayName = "SolaceButton";
(Box as React.FC & { displayName?: string }).displayName = "Box";

const meta: Meta<typeof SolaceStepper> = {
	title: "Navigation/Step Form",
	component: SolaceStepper,
	parameters: {
		docs: {
			story: { height: "300px" },
			description: {
				component: "Code component name: SolaceStepper"
			}
		},
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
