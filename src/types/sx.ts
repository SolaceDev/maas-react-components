export type Globals = "-moz-initial" | "inherit" | "initial" | "revert" | "unset";

export type SX = {
	marginTop?: string | number;
	marginBottom?: string | number;
	margin?: string | number;
	marginLeft?: string | number;
	marginRight?: string | number;

	paddingTop?: string | number;
	paddingBottom?: string | number;
	padding?: string | number;
	paddingLeft?: string | number;
	paddingRight?: string | number;

	width?:
		| Globals
		| string
		| "-moz-fit-content"
		| "-moz-max-content"
		| "-moz-min-content"
		| "-webkit-fit-content"
		| "-webkit-max-content"
		| "auto"
		| "fit-content"
		| "intrinsic"
		| "max-content"
		| "min-content"
		| "min-intrinsic";
	height?:
		| Globals
		| string
		| "-moz-max-content"
		| "-moz-min-content"
		| "-webkit-fit-content"
		| "auto"
		| "fit-content"
		| "max-content"
		| "min-content";
};
