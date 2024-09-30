import { SolaceButtonProps } from "../components/form/SolaceButton";

export type SolaceLearningButtonProps = Omit<SolaceButtonProps, "variant" | "href" | "dense" | "underline"> & {
	variant: "call-to-action" | "dark-call-to-action" | "dark-outline" | "icon";
};
