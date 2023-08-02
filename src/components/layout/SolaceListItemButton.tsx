import { ListItemButton } from "@mui/material";
import { solaceListItemButtonProps } from "../../types";

// Converts a list item into a button
function SolaceListItemButton({ children, ...rest }: solaceListItemButtonProps) {
	return <ListItemButton {...rest}>{children}</ListItemButton>;
}

export default SolaceListItemButton;
