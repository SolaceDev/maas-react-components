/*
 * Copyright 2023-2025 Solace Systems. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
	disabled?: boolean;
	readOnly?: boolean;
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
	dataQa = "autocompleteTags",
	disabled = false,
	readOnly = false
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
						clickable={!readOnly}
						key={`${dataQa}-${tag.id}`}
						variant={CHIP_VARIANT.FILLED}
						maxWidth={tagMaxWidth}
						label={tag.label}
						disabled={disabled}
						onDelete={readOnly ? undefined : () => handleDelete(tag.id)}
					/>
				)
			};
		});
	}, [dataQa, handleDelete, tagMaxWidth, tags, disabled, readOnly]);

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
