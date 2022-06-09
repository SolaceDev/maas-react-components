import { Grid } from "@mui/material";
import clsx from "clsx";
export interface SolaceSelectAutocompleteItemProps {
	name: string;
	value: string;
	subText?: string;
	supplementalText?: string;
}

export const getOptionLabel = (option: SolaceSelectAutocompleteItemProps): string => option?.name;

export const isOptionEqual = (
	option: SolaceSelectAutocompleteItemProps,
	value: SolaceSelectAutocompleteItemProps
): boolean => {
	return option?.value === value?.value;
};

function SolaceSelectAutocompleteItem({
	name,
	subText,
	supplementalText
}: SolaceSelectAutocompleteItemProps): JSX.Element {
	const sizeOfColumn = supplementalText ? 8 : 12;
	const middlePadding = supplementalText ? "16px" : "0px";
	return (
		<Grid container className={clsx({ multiline: !!subText })}>
			<Grid item xs={sizeOfColumn} zeroMinWidth style={{ wordBreak: "break-word", paddingRight: middlePadding }} py={1}>
				{name}
				{subText && (
					<span className="subtext">
						<br />
						{subText}
					</span>
				)}
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
					py={1}
				>
					{supplementalText}
				</Grid>
			)}
		</Grid>
	);
}

export default SolaceSelectAutocompleteItem;
