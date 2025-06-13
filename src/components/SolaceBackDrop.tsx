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

import { Backdrop, BackdropProps, CircularProgress, styled } from "@mui/material";

const StyledBackDrop = styled(Backdrop)(({ theme }) => ({
	zIndex: theme.zIndex.drawer + 1,
	color: theme.palette.ux.primary.text.w10
}));

export default function SolaceBackDrop(props: BackdropProps): JSX.Element {
	return (
		<StyledBackDrop {...props}>
			<CircularProgress />
		</StyledBackDrop>
	);
}
