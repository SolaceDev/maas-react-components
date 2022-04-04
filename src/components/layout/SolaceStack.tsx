import { Stack } from "@mui/material";
import { SolaceStackProps } from "../../types/solaceStack";

export default function SolaceStack(props: SolaceStackProps): JSX.Element {
	const { children, ...rest } = props;

	return <Stack {...rest}>{children}</Stack>;
}

SolaceStack.defaultProps = {
	spacing: 2
};
