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

import { Box, Theme, useTheme, styled } from "@mui/material";
import SolaceTypography from "./SolaceTypography";
import SolaceLearningButton from "./form/Button/SolaceLearningButton";
import SolaceStack from "./layout/SolaceStack";
import { SolaceEmptyStateBannerProps } from "../types";

const ImageContainer = styled("div")(({ theme }: { theme: Theme }) => ({
	padding: `${theme.spacing(3)} ${theme.spacing(3)} 0px ${theme.spacing(3)}`,
	borderRadius: `${theme.spacing(1.25)} ${theme.spacing(1.25)} 0 0`,
	marginBottom: "-6px",
	border: `solid 1px ${theme.palette.ux.learning.w20}`,
	width: "100%",
	backgroundColor: theme.palette.ux.learning.w10,
	boxSizing: "border-box"
}));

export default function SolaceEmptyStateBanner(props: SolaceEmptyStateBannerProps) {
	const theme = useTheme();
	const { bannerImage, subtitle, title, description, primaryButton, secondaryButton, dataQa } = props;
	const invertTextColor = theme.palette.ux.primary.text.w10;

	const onPrimaryButtonClick = () => {
		primaryButton.onClick();
	};

	return (
		<Box
			width={"100%"}
			height={"100%"}
			display={"flex"}
			justifyContent={"center"}
			alignItems={"center"}
			data-qa={"emptyStateBannerWrapper"}
		>
			<Box data-qa={dataQa ?? "emptyStateBanner"} width={825}>
				{bannerImage && <ImageContainer>{bannerImage}</ImageContainer>}
				<SolaceStack spacing={3}>
					<Box
						boxSizing="border-box"
						padding={5}
						height={261}
						borderRadius={2.5}
						display={"flex"}
						justifyContent={"space-between"}
						sx={{
							background: `radial-gradient(75.04% 70.41% at 20.32% 70.41%, ${theme.palette.ux.learning.wMain} 0%, ${theme.palette.ux.learning.w100} 100%)`
						}}
					>
						<Box>
							<SolaceTypography variant={"caption"} fontWeight={600} sx={{ color: theme.palette.ux.brand.w30 }}>
								{subtitle}
							</SolaceTypography>
							<SolaceStack>
								<SolaceTypography variant="h2" width={600} sx={{ fontSize: "1.5rem", color: invertTextColor }}>
									{title}
								</SolaceTypography>

								<SolaceTypography width={"100%"} sx={{ color: invertTextColor }}>
									{description}
								</SolaceTypography>
							</SolaceStack>
							<SolaceStack direction="row" alignItems="center" paddingTop={theme.spacing(3)} spacing={1.5}>
								<SolaceLearningButton
									variant={"call-to-action"}
									onClick={onPrimaryButtonClick}
									dataQa={primaryButton?.dataQa ?? "emptyStateBannerPrimaryButton"}
								>
									{primaryButton.label}
								</SolaceLearningButton>

								{secondaryButton && (
									<SolaceLearningButton
										variant="dark-call-to-action"
										dataQa={secondaryButton.dataQa ?? "emptyStateBannerSecondaryButton"}
										onClick={() => secondaryButton.onClick()}
									>
										{secondaryButton.label}
									</SolaceLearningButton>
								)}
							</SolaceStack>
						</Box>
					</Box>
				</SolaceStack>
			</Box>
		</Box>
	);
}
