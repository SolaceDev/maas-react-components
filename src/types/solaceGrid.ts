import { GridProps } from "@mui/material";
import { SX } from "./sx";

/**
 * All of the supported props related to SolaceGrid can be found at https://mui.com/api/grid/
 * All props provided by mui have been extended, to provide more flexibility for developers while using these layout components.
 */

export type SolaceGridProps = Omit<GridProps, "sx"> & { sx?: SX };
