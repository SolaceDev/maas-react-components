export type SolaceStepperProps = SolaceStepperFooterProps & {
	children: React.ReactNode;
};

export type SolaceStepperFooterProps = {
	steps: StepsProps;
	activeStep: number;
	setActiveStep: React.Dispatch<React.SetStateAction<number>>;
	onClose: () => void;
	onSubmit: () => void;
	submitLabel: string;
	disableSubmit?: boolean;
};

export type StepProp = {
	label: string;
	icon: JSX.Element;
	subText?: string;
	error?: boolean;
	completed?: boolean;
};

export type StepsProps = StepProp[];
