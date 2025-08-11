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

import { FormLabel, useTheme } from "@mui/material";
import SolaceComponentProps from "../SolaceComponentProps";

export interface HelperTextProps extends SolaceComponentProps {
	children: string | JSX.Element;
}

function HelperText({ children }: HelperTextProps): JSX.Element {
	const theme = useTheme();
	return (
		<FormLabel
			sx={{
				color: theme.palette.ux.secondary.text.wMain,
				fontSize: theme.typography.caption.fontSize,
				marginTop: "2px"
			}}
		>
			{children}
		</FormLabel>
	);
}

export default HelperText;
