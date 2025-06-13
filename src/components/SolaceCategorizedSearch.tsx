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

import SolaceToggleButtonGroup from "./form/SolaceToggleButtonGroup";

import { styled } from "@mui/material";
import SolaceSearchAndFilter from "./SolaceSearchAndFilter";
import { FIELD_TYPES, SolaceCategorizedSearchLayout, SolaceCategorizedSearchProps } from "../types";

const VerticalLayoutContainer = styled("div", { shouldForwardProp: (prop) => prop !== "equalButtonWidth" })<{
	equalButtonWidth?: boolean;
}>(({ theme, equalButtonWidth = false }) => ({
	display: "flex",
	flexDirection: "column",
	justifyContent: "stretch",
	rowGap: theme.spacing(1),
	".MuiToggleButtonGroup-root": {
		boxSizing: "border-box",
		display: "grid",
		gridAutoFlow: "column",
		gridAutoColumns: equalButtonWidth ? "1fr" : "minmax(0, auto)"
	}
}));

const HorizontalLayoutContainer = styled("div", { shouldForwardProp: (prop) => prop !== "equalButtonWidth" })<{
	equalButtonWidth?: boolean;
}>(({ theme, equalButtonWidth = false }) => ({
	display: "flex",
	flexDirection: "row",
	alignItems: "flex-start",
	columnGap: theme.spacing(3),
	rowGap: theme.spacing(1),
	flexWrap: "wrap",
	".MuiToggleButtonGroup-root": {
		boxSizing: "border-box",
		display: "grid",
		gridAutoFlow: "column",
		gridAutoColumns: equalButtonWidth ? "1fr" : "minmax(0, auto)"
	}
}));

const SolaceCategorizedSearch = ({
	id,
	name,
	categoryOptions,
	selectedCategoryValue,
	categoryOptionsWidth,
	onCategoryChange,
	helperText,
	searchValue,
	placeholder,
	searchInputWidth,
	disabled = false,
	autoFocus = false,
	hasErrors = false,
	onSearchValueChange,
	onSearchInputFocus,
	onSearchInputBlur,
	onClearAll,
	layout = SolaceCategorizedSearchLayout.vertical,
	equalButtonWidth = false,
	dataQa
}: SolaceCategorizedSearchProps): JSX.Element => {
	const renderContent = () => {
		return (
			<>
				{categoryOptions && categoryOptions.length > 0 && (
					<div style={{ width: categoryOptionsWidth ? categoryOptionsWidth : "fit-content" }}>
						<SolaceToggleButtonGroup
							options={categoryOptions}
							activeValue={selectedCategoryValue}
							onChange={onCategoryChange}
							isDisabled={disabled}
							dataQa={dataQa ? `${dataQa}-` : "" + "solaceCategorizedButtons"}
						></SolaceToggleButtonGroup>
					</div>
				)}
				<SolaceSearchAndFilter
					id={id}
					name={name}
					value={searchValue}
					onChange={onSearchValueChange}
					type={FIELD_TYPES.SEARCH}
					onFocus={onSearchInputFocus}
					onBlur={onSearchInputBlur}
					onClearAll={onClearAll}
					placeholder={placeholder}
					width={searchInputWidth}
					disabled={disabled}
					autoFocus={autoFocus}
					hasErrors={hasErrors}
					helperText={helperText}
					dataQa={dataQa ? `${dataQa}-` : "" + "solaceCategorizedSearchInput"}
				/>
			</>
		);
	};

	return layout === SolaceCategorizedSearchLayout.horizontal ? (
		<HorizontalLayoutContainer
			equalButtonWidth={equalButtonWidth}
			className="solaceCategorizedSearch horizontalLayoutContainer"
			data-qa={dataQa}
		>
			{renderContent()}
		</HorizontalLayoutContainer>
	) : (
		<VerticalLayoutContainer
			equalButtonWidth={equalButtonWidth}
			className="solaceCategorizedSearch verticalLayoutContainer"
			data-qa={dataQa}
		>
			{renderContent()}
		</VerticalLayoutContainer>
	);
};

export default SolaceCategorizedSearch;
