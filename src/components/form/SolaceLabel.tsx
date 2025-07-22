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

import { FormLabel } from "@mui/material";
import clsx from "clsx";

export interface SolaceLabelProps {
	/**
	 * Unique identifier of the label
	 */
	id: string;
	/**
	 * identifier used for specifying which form element this label is bound to
	 */
	htmlForId?: string;
	/**
	 * Boolean flag used to display an indicator of whether or not this `input` is mandatory
	 */
	required?: boolean;
	/**
	 * Boolean flag to disable the `input`
	 */
	disabled?: boolean;
	/**
	 * Boolean flag for readOnly labels, changes font color to 55% black
	 */
	readOnly?: boolean;
	/**
	 * Boolean flag to suppress line breaks (text wrapping) within the label
	 */
	noWrap?: boolean;
	/**
	 *
	 */
	children?: React.ReactNode;
}

function SolaceLabel({
	id,
	htmlForId,
	required = false,
	disabled = false,
	readOnly = false,
	noWrap = false,
	children
}: SolaceLabelProps): JSX.Element {
	return (
		<FormLabel
			id={id}
			htmlFor={htmlForId}
			required={required}
			disabled={disabled}
			sx={{
				display: "block",
				whiteSpace: noWrap ? "nowrap" : "normal"
			}}
			className={clsx({ "read-only": readOnly })}
		>
			{children}
		</FormLabel>
	);
}

export default SolaceLabel;
