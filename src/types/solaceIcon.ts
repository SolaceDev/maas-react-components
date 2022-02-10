import { SvgIconProps } from "@material-ui/core";
import { Icons } from "@SolaceDev/maas-icons";

export type SolaceIconProps = Omit<SvgIconProps, "children"> & { name: Icons };
