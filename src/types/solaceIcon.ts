import { SvgIconProps } from "@mui/material";

export type SolaceIconProps = Omit<SvgIconProps, "children"> & { name: string };
