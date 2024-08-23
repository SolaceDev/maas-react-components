import { styled } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { CHIP_VARIANT } from "../../types/solaceChip";
import SolaceChip from "../SolaceChip";
import SolaceResponsiveItemList from "../SolaceResponsiveItemList";

const Container = styled("div")(() => ({
	paddingRight: "6px"
}));

export interface SolaceSelectAutocompleteResponsiveTagsProps {
	containerWidth: number | undefined;
	tags: { id: string; label: string }[];
	tagMaxWidth?: string;
	numOfRowsToShow?: number;
	overflowIndicatorLabel?: string;
	overflowIndicatorLabelSingular?: string;
	overflowIndicatorLabelWidth?: number;
	onDelete?: (id: string) => void;
	dataQa?: string;
}

function SolaceSelectAutocompleteResponsiveTags({
	containerWidth,
	tags,
	tagMaxWidth = "160px",
	numOfRowsToShow = 1,
	overflowIndicatorLabel,
	overflowIndicatorLabelSingular,
	overflowIndicatorLabelWidth,
	onDelete,
	dataQa = "autocompleteTags"
}: SolaceSelectAutocompleteResponsiveTagsProps) {
	const handleDelete = useCallback(
		(id: string) => {
			onDelete?.(id);
		},
		[onDelete]
	);

	const tagChips = useMemo(() => {
		return tags?.map((tag) => {
			return {
				id: tag.id,
				content: (
					<SolaceChip
						clickable
						key={`${dataQa}-${tag.id}`}
						variant={CHIP_VARIANT.FILLED}
						maxWidth={tagMaxWidth}
						label={tag.label}
						onDelete={() => handleDelete(tag.id)}
					/>
				)
			};
		});
	}, [dataQa, handleDelete, tagMaxWidth, tags]);

	return tagChips?.length > 0 ? (
		<Container>
			<SolaceResponsiveItemList
				containerWidth={containerWidth !== undefined ? containerWidth - 120 : containerWidth} // 120px is dropdown arrow + delete icon + input text area for search string
				items={tagChips}
				showAll={false}
				numOfRowsToShow={numOfRowsToShow}
				columnGap={0}
				componentToShowOverflowItems={null}
				overflowIndicatorLabel={overflowIndicatorLabel}
				overflowIndicatorLabelSingular={overflowIndicatorLabelSingular}
				overflowIndicatorLabelWidth={overflowIndicatorLabelWidth}
				dataQa={dataQa}
			/>
		</Container>
	) : null;
}

export default React.memo(SolaceSelectAutocompleteResponsiveTags);
