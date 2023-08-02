import { List } from "@mui/material";
import { solaceListProps } from "../../types";

// Component to layout a list of items
function SolaceList({ children, ...rest }: solaceListProps) {
	return <List {...rest}>{children}</List>;
}

// export component SolaceList
export default SolaceList;
