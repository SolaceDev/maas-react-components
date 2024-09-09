import { Stack } from "@mui/material";
import { SolaceStackProps } from "../../types/solaceStack";

export default function SolaceStack(props: SolaceStackProps): JSX.Element {
	const { children, spacing = 2, ...rest } = props;

	return (
		<Stack spacing={spacing} {...rest}>
			{children}
		</Stack>
	);
}
