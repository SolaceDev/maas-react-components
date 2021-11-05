import { Chip } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

export interface SolaceChipProps {
	label?: string;
	variant?: "filled" | "outlined";
	disabled?: boolean;
}

export default function SolaceChip({ label, variant = "filled", disabled = false }: SolaceChipProps): JSX.Element {
	return <Chip label={label} variant={variant} size="small" disabled={disabled} deleteIcon={<CloseIcon />} />;
}
