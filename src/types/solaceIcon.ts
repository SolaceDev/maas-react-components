import { SvgIconProps } from "@material-ui/core";

export type SolaceIconProps = Omit<SvgIconProps, "children"> & { name: string };
