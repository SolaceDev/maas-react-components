import { SolaceButtonProps } from "../components/form/SolaceButton";

export type SolaceLearningButtonProps = Omit<SolaceButtonProps, "variant" | "href" | "dense" | "underline"> & {
	variant: "learning" | "learning-light" | "learning-light-outlined" | "learning-icon";
};
