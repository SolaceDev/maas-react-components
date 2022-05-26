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
	return (
		<Grid container justifyContent="space-between" alignItems={"center"} className={clsx({ multiline: !!subText })}>
			<Grid item>
				{name}
				{subText && (
					<span className="subtext">
						<br />
						{subText}
					</span>
				)}
			</Grid>
			{supplementalText && (
				<Grid className="supplementalText" item>
					{supplementalText}
				</Grid>
			)}
		</Grid>
	);
}

export default SolaceSelectAutocompleteItem;
