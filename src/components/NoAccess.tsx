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

import { Box, Grid, styled, Typography } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";

const StyledGrid = styled(Grid)(() => ({ minHeight: "calc(100vh - 108px)" }));

export default function NoAccess(props: { pageName: string }): JSX.Element {
	return (
		<StyledGrid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
			<Grid item>
				<Box display="flex" flexDirection="row">
					<BlockIcon color="error" fontSize="large" />
					<Typography variant="h4">Access Required</Typography>
				</Box>
			</Grid>
			<Grid item>
				<Typography variant="body1">
					{`You do not have access to ${props.pageName}. To request access, please contact your Solace account representative.`}
				</Typography>
			</Grid>
		</StyledGrid>
	);
}
