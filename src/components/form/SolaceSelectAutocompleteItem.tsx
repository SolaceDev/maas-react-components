import { Grid } from "@material-ui/core";
import React from "react";

export interface SolaceSelectAutocompleteItemProps {
	name: string;
	value: string;
	subText?: string;
	supplementalText?: string;
}

export const getOptionLabel = (option: SolaceSelectAutocompleteItemProps): string => option?.name;

function SolaceSelectAutocompleteItem({
	name,
	subText,
	supplementalText
}: SolaceSelectAutocompleteItemProps): JSX.Element {
	return (
		<Grid container justifyContent="space-between">
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
				<Grid className="suplementalText" item>
					{supplementalText}
				</Grid>
			)}
		</Grid>
	);
}

export default SolaceSelectAutocompleteItem;
