import { Grid } from "@mui/material";
import clsx from "clsx";
export interface SolaceSelectAutocompleteItemProps {
	name: string;
	value: string;
	subText?: string;
	supplementalText?: string;
	divider?: boolean;
	categoryHeading?: string;
}

export const getOptionLabel = (option: SolaceSelectAutocompleteItemProps): string => option?.name;

export const getShowOptionDivider = (option: SolaceSelectAutocompleteItemProps): boolean => option?.divider ?? false;

export const isOptionEqual = (
	option: SolaceSelectAutocompleteItemProps,
	value: SolaceSelectAutocompleteItemProps
): boolean => {
	return option?.value === value?.value;
};

export const getGroupBy = (option: SolaceSelectAutocompleteItemProps): string => option?.categoryHeading ?? "";

function SolaceSelectAutocompleteItem({
	name,
	subText,
	supplementalText
}: SolaceSelectAutocompleteItemProps): JSX.Element {
	const sizeOfColumn = supplementalText ? 8 : 12;
	const middlePadding = supplementalText ? "16px" : "0px";
	return (
		<Grid container direction={"column"} className={clsx({ multiline: !!subText })} py={0.5}>
			<Grid container justifyContent={"space-between"} direction={"row"} alignItems={"flex-start"}>
				<Grid item xs={sizeOfColumn} zeroMinWidth style={{ wordBreak: "break-word", paddingRight: middlePadding }}>
					{name}
				</Grid>
				{supplementalText && (
					<Grid
						container
						className="supplementalText"
						item
						xs={4}
						direction="column"
						alignItems="flex-end"
						justifyContent="flex-start"
						style={{ marginLeft: "0px" }}
					>
						{supplementalText}
					</Grid>
				)}
			</Grid>
			{subText && (
				<Grid className="subtext" item>
					<span className="subtext">{subText}</span>
				</Grid>
			)}
		</Grid>
	);
}

export default SolaceSelectAutocompleteItem;
