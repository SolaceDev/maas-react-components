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

import { FormLabel, useTheme, styled } from "@mui/material";
import { Box } from "@mui/system";
import SolaceComponentProps from "../SolaceComponentProps";
import { WarnIcon } from "../../resources/icons/WarnIcon";
import { BASE_FONT_PX_SIZES } from "../../resources/typography";
import { CSSProperties } from "@mui/styled-engine";

const WarningTextContainer = styled(Box)(({ theme }) => ({
	...(theme.mixins.formComponent_WarningText.container as CSSProperties)
}));

const WarningTextLabel = styled(FormLabel)(({ theme }) => ({
	...(theme.mixins.formComponent_WarningText.label as CSSProperties)
}));

export interface WarningTextProps extends SolaceComponentProps {
	children: string | JSX.Element;
}

function WarningText({ children }: WarningTextProps): JSX.Element {
	const theme = useTheme();
	const size = theme.typography.subtitle1.fontSize?.toString();
	return (
		<WarningTextContainer>
			<WarnIcon size={size ? parseInt(size) : BASE_FONT_PX_SIZES.md} fill={theme.palette.ux.warning.w100}></WarnIcon>
			<WarningTextLabel>{children}</WarningTextLabel>
		</WarningTextContainer>
	);
}

export default WarningText;
