import { StackProps } from "@mui/material";
import { SX } from "./sx";

/**
 * For detailed documentation please refer to https://mui.com/api/stack/
 */
export type SolaceStackProps = Omit<StackProps, "sx"> & {
	sx?: SX;
};
