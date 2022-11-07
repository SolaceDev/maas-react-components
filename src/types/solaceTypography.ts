import { TypographyProps } from "@mui/material";

export type SolaceVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "body1" | "body2";

/**
 * All of the supported props related to SolaceTypoGraphy can be found at https://mui.com/material-ui/api/typography/
 * All props provided by mui have been extended, to provide more flexibility for developers while using these layout components.
 */
export type SolaceTypographyProps = Omit<TypographyProps, "variant"> & {
	variant?: SolaceVariant;
};
