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

import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { baseThemeMapping } from "../../../../../src/theming/base/themeMapping";
import { boomiThemeMapping } from "../../../../../src/theming/boomi/themeMapping";
import { sapThemeMapping } from "../../../../../src/theming/sap/themeMapping";
import { solaceNewThemeMapping } from "../../../../../src/theming/solace/themeMapping";

// Map theme names to their corresponding theme mappings
const themeMap = {
	boomi: boomiThemeMapping,
	sap: sapThemeMapping,
	solace: baseThemeMapping, // assuming "solace" maps to base
	newSolace: solaceNewThemeMapping
};

// Common styles
const MONOSPACE_FONT = "monospace";
const BREAK_ALL = "break-all";
const TEXT_SECONDARY = "text.secondary";
const SECONDARY_MONOSPACE_STYLE = { color: TEXT_SECONDARY, fontFamily: MONOSPACE_FONT, wordBreak: BREAK_ALL };

// Helper component to display individual color items
const ColorItemDisplay = ({
	displayedKey,
	colorValue,
	fullPathKey
}: {
	displayedKey: string;
	colorValue: string;
	fullPathKey: string;
}) => {
	const [copied, setCopied] = useState(false);
	const fullThemePath = `theme.palette.ux.${fullPathKey}`;

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(fullThemePath);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			// Silently handle clipboard errors
		}
	};

	return (
		<Box sx={{ display: "flex", alignItems: "center", mb: 1, pl: 1 }} key={fullPathKey}>
			<Box
				sx={{
					minWidth: 32, // Use minWidth to prevent squishing if colorValue is long
					width: 32,
					height: 32,
					backgroundColor: colorValue,
					border: "1px solid rgba(0,0,0,0.2)",
					borderRadius: "4px",
					mr: 1.5,
					boxShadow: "inset 0 0 3px rgba(0,0,0,0.1)"
				}}
			/>
			<Box sx={{ flex: 1 }}>
				<Typography variant="body2" sx={{ fontWeight: "500", fontFamily: MONOSPACE_FONT, wordBreak: BREAK_ALL }}>
					{displayedKey}
				</Typography>
				<Typography variant="caption" sx={SECONDARY_MONOSPACE_STYLE}>
					{colorValue}
				</Typography>
				<Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
					<Typography
						variant="caption"
						sx={{
							...SECONDARY_MONOSPACE_STYLE,
							fontSize: "0.7rem"
						}}
					>
						{fullThemePath}
					</Typography>
					<Tooltip title={copied ? "Copied!" : "Copy theme path"}>
						<IconButton
							size="small"
							onClick={handleCopy}
							sx={{
								p: 0.25,
								ml: 0.5,
								"&:hover": { backgroundColor: "action.hover" }
							}}
						>
							{copied ? (
								<CheckIcon sx={{ fontSize: 14, color: "success.main" }} />
							) : (
								<ContentCopyIcon sx={{ fontSize: 14, color: TEXT_SECONDARY }} />
							)}
						</IconButton>
					</Tooltip>
				</Box>
			</Box>
		</Box>
	);
};

// Recursive component to display palette sections (handles nesting)
const PaletteSectionDisplay = ({
	sectionData,
	basePath
}: {
	sectionData: Record<string, unknown>;
	basePath: string;
}) => {
	return (
		<Box>
			{Object.entries(sectionData).map(([key, value]) => {
				const currentPath = `${basePath}.${key}`; // Full path for React key and potentially for other uses
				if (typeof value === "string") {
					// It's a color entry
					return <ColorItemDisplay key={currentPath} displayedKey={key} colorValue={value} fullPathKey={currentPath} />;
				} else if (typeof value === "object" && value !== null) {
					// It's a nested object (sub-group)
					return (
						<Box key={currentPath} sx={{ mt: 1.5, mb: 1, pl: 1 }}>
							{" "}
							{/* Indent subgroups */}
							<Typography
								variant="caption"
								sx={{
									display: "block",
									color: "text.disabled",
									fontWeight: "bold",
									textTransform: "uppercase",
									fontSize: "0.7rem",
									mb: 0.5,
									borderBottom: "1px dashed #eee",
									pb: 0.2
								}}
							>
								{key}
							</Typography>
							<PaletteSectionDisplay sectionData={value as Record<string, unknown>} basePath={currentPath} />
						</Box>
					);
				}
				return null;
			})}
		</Box>
	);
};

// Main component rendered by the Story
const ColorPaletteStoryViewer = ({ currentTheme }: { currentTheme: string }) => {
	// Get the theme mapping for the current theme
	const themeMapping = themeMap[currentTheme as keyof typeof themeMap] || baseThemeMapping;
	const paletteToShow = themeMapping.palette;

	if (!paletteToShow) {
		return <Typography sx={{ p: 2 }}>Palette data is not available for the current theme.</Typography>;
	}

	return (
		<Box sx={{ p: 2, maxWidth: "800px", fontFamily: "sans-serif" }}>
			<Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
				Color Palette - {currentTheme}
			</Typography>
			<Typography variant="body1" sx={{ mb: 3, color: TEXT_SECONDARY }}>
				Current theme colors grouped by category. Use the Storybook theme switcher to view different theme palettes.
				Click the copy icon next to any color to copy its full theme path.
			</Typography>

			{Object.entries(paletteToShow).map(([topLevelKey, topLevelValue]) => {
				// Ensure topLevelValue is an object before passing to PaletteSectionDisplay
				if (typeof topLevelValue !== "object" || topLevelValue === null) {
					// Handle cases where a top-level key might directly hold a color string (though not typical for MUI palettes)
					if (typeof topLevelValue === "string") {
						return (
							<Box
								key={topLevelKey}
								sx={{ mb: 2.5, p: 1.5, border: "1px solid #e0e0e0", borderRadius: "8px", background: "#fdfdfd" }}
							>
								<Typography
									variant="h6"
									component="div"
									sx={{ borderBottom: "1px solid #ddd", pb: 0.5, mb: 1.5, fontSize: "1.1rem", fontWeight: "600" }}
								>
									{topLevelKey.charAt(0).toUpperCase() + topLevelKey.slice(1)} (Direct Value)
								</Typography>
								<ColorItemDisplay displayedKey={topLevelKey} colorValue={topLevelValue} fullPathKey={topLevelKey} />
							</Box>
						);
					}
					return null; // Or some other placeholder for non-object, non-string topLevelValue
				}
				return (
					<Box
						key={topLevelKey}
						sx={{ mb: 2.5, p: 1.5, border: "1px solid #e0e0e0", borderRadius: "8px", background: "#fdfdfd" }}
					>
						<Typography
							variant="h6"
							component="div"
							sx={{
								borderBottom: "1px solid #ddd",
								pb: 0.5,
								mb: 1.5,
								fontSize: "1.1rem",
								fontWeight: "600"
							}}
						>
							{topLevelKey.charAt(0).toUpperCase() + topLevelKey.slice(1)}
						</Typography>
						<PaletteSectionDisplay sectionData={topLevelValue as Record<string, unknown>} basePath={topLevelKey} />
					</Box>
				);
			})}
		</Box>
	);
};

const meta: Meta<typeof ColorPaletteStoryViewer> = {
	title: "Style/Color Palette",
	component: ColorPaletteStoryViewer,
	parameters: {}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args, { globals }) => {
		const currentTheme = globals.theme || "solace";
		return <ColorPaletteStoryViewer currentTheme={currentTheme} />;
	}
};
