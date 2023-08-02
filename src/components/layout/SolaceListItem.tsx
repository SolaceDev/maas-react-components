import { ListItem } from "@mui/material";
import { solaceListItemProps } from "../../types";

// component to properly layout a list item
function SolaceListItem({ children, ...rest }: solaceListItemProps) {
	return <ListItem {...rest}>{children}</ListItem>;
}

// export component SolaceListItem
export default SolaceListItem;
