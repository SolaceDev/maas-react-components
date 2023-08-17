import { LinearProgress } from "@mui/material";
import { PROGRESS_HEIGHT, SolaceLinearProgressProps } from "../types/solaceProgress";

export default function SolaceLinearProgress(props: SolaceLinearProgressProps): JSX.Element {
	const { variant, height, value, color } = props;
	return (
		<LinearProgress
			variant={variant}
			value={variant === "determinate" ? value : undefined}
			className={color ?? "default"}
			sx={{
				height: PROGRESS_HEIGHT[height ?? "md"]
			}}
		/>
	);
}
