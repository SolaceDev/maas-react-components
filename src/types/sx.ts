export type Globals = "-moz-initial" | "inherit" | "initial" | "revert" | "unset";
export type SpacingValues = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type SX = {
	marginTop?: SpacingValues;
	marginBottom?: SpacingValues;
	margin?: SpacingValues;
	marginLeft?: SpacingValues;
	marginRight?: SpacingValues;

	paddingTop?: SpacingValues;
	paddingBottom?: SpacingValues;
	padding?: SpacingValues;
	paddingLeft?: SpacingValues;
	paddingRight?: SpacingValues;

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
