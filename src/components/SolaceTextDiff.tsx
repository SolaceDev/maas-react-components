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
import * as Diff from "diff";
import React from "react";

import SolaceComponentProps from "./SolaceComponentProps";

const CodeDiffContainer = styled("div")(({ theme }) => ({
	border: `1px solid ${theme.palette.ux.secondary.w40}`,
	borderRadius: theme.shape.borderRadius,
	fontFamily: "monospace",
	fontSize: "14px",
	overflow: "hidden"
}));

const DiffSplitView = styled("div")({
	display: "flex",
	width: "100%"
});

const DiffPane = styled("div")({
	flex: 1,
	minWidth: 0
});

const DiffLine = styled("div")<{ lineType: "normal" | "insert" | "delete" | "empty" }>(({ theme, lineType }) => ({
	display: "flex",
	minHeight: "1.2em",
	lineHeight: "1.2em",
	...(lineType === "insert" && {
		backgroundColor: theme.palette.ux.success.w10
	}),
	...(lineType === "delete" && {
		backgroundColor: theme.palette.ux.warning.w10,
		mixBlendMode: "multiply"
	}),
	...(lineType === "empty" && {
		backgroundColor: theme.palette.ux.error.wMain,
		opacity: 0.1
	})
}));

const DiffGutter = styled("div")(({ theme }) => ({
	color: theme.palette.ux.secondary.text.wMain,
	backgroundColor: theme.palette.ux.background.w20,
	textAlign: "center",
	minWidth: theme.spacing(3),
	padding: theme.spacing(0, 0.5),
	borderRight: `1px solid ${theme.palette.ux.secondary.w40}`,
	userSelect: "none",
	flexShrink: 0
}));

const DiffContent = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 1),
	whiteSpace: "pre",
	overflow: "hidden",
	textOverflow: "ellipsis",
	flex: 1
}));

const NoDifferencesContainer = styled("div")(({ theme }) => ({
	padding: theme.spacing(2),
	textAlign: "center",
	color: theme.palette.ux.secondary.text.wMain
}));

// Type definitions for diff changes
interface DiffChange {
	type: "insert" | "delete" | "normal";
	isInsert?: boolean;
	isDelete?: boolean;
	isNormal?: boolean;
	content: string;
	oldLineNumber?: number;
	newLineNumber?: number;
	lineNumber?: number;
}

interface DiffHunk {
	content: string;
	oldStart: number;
	newStart: number;
	oldLines: number;
	newLines: number;
	changes: DiffChange[];
}

export interface SolaceTextDiffProps extends SolaceComponentProps {
	/**
	 * 	Text 1 for comparison
	 */
	text1: string;
	/**
	 * 	Text 2 for comparison
	 */
	text2: string;
	/**
	 * Text to display when there is no content to compare.
	 * @default 'No content to compare'
	 */
	noContentText?: string;
	/**
	 * Text to display when there are no differences.
	 * @default 'No Differences'
	 */
	noDifferencesText?: string;
	/**
	 * Whether to hide the diff and show the noDifferencesText when there are no differences.
	 * @default false
	 */
	hideWhenNoDifferences?: boolean;
}

const createChangesArray = (change: Diff.Change, lines: string[], oldStart: number, newStart: number): DiffChange[] => {
	const type = change.added ? "insert" : change.removed ? "delete" : "normal";

	return lines.map((line, i) => {
		const diffChange: DiffChange = {
			type,
			content: line
		};

		if (type === "insert") {
			diffChange.isInsert = true;
			diffChange.newLineNumber = newStart + i;
			diffChange.lineNumber = newStart + i;
		} else if (type === "delete") {
			diffChange.isDelete = true;
			diffChange.oldLineNumber = oldStart + i;
			diffChange.lineNumber = oldStart + i;
		} else {
			// normal
			diffChange.isNormal = true;
			diffChange.oldLineNumber = oldStart + i;
			diffChange.newLineNumber = newStart + i;
		}
		return diffChange;
	});
};

const getChangeLines = (change: Diff.Change): string[] => {
	if (!change.value) {
		return [];
	}
	const lines = change.value.split("\n");
	if (lines.length > 0 && lines[lines.length - 1] === "") {
		lines.pop();
	}
	return lines;
};

export default function SolaceTextDiff(props: SolaceTextDiffProps): JSX.Element {
	const {
		text1,
		text2,
		noContentText = "No content to compare",
		noDifferencesText = "No Differences",
		hideWhenNoDifferences = false
	} = props;

	const hunks = React.useMemo((): DiffHunk[] => {
		const changes = Diff.diffLines(text1, text2);
		const hunks: DiffHunk[] = [];
		let oldStart = 1;
		let newStart = 1;
		for (const change of changes) {
			const lines = getChangeLines(change);
			if (lines.length === 0) {
				continue;
			}

			const changesArr = createChangesArray(change, lines, oldStart, newStart);

			const hunk: DiffHunk = {
				content: "",
				oldStart,
				newStart,
				oldLines: change.added ? 0 : lines.length,
				newLines: change.removed ? 0 : lines.length,
				changes: changesArr
			};
			hunks.push(hunk);
			if (!change.added) {
				oldStart += lines.length;
			}
			if (!change.removed) {
				newStart += lines.length;
			}
		}
		return hunks;
	}, [text1, text2]);

	// Collect all changes from all hunks
	const allChanges = React.useMemo(() => {
		return hunks.flatMap((hunk) => hunk.changes);
	}, [hunks]);

	// Helper function to render a single line
	const renderLine = (change: DiffChange, side: "old" | "new", index: number) => {
		const lineNumber = side === "old" ? change.oldLineNumber : change.newLineNumber;
		const shouldShow = side === "old" ? !change.isInsert : !change.isDelete;

		if (!shouldShow) {
			return (
				<DiffLine key={`${side}-empty-${index}`} lineType="empty">
					<DiffGutter>&nbsp;</DiffGutter>
					<DiffContent>&nbsp;</DiffContent>
				</DiffLine>
			);
		}

		const lineType = change.isInsert ? "insert" : change.isDelete ? "delete" : "normal";

		return (
			<DiffLine key={`${side}-${lineNumber || index}`} lineType={lineType}>
				<DiffGutter>{lineNumber || ""}</DiffGutter>
				<DiffContent>{change.content}</DiffContent>
			</DiffLine>
		);
	};

	if (!text1 && !text2) {
		return (
			<CodeDiffContainer id="code-diff">
				<NoDifferencesContainer>{noContentText}</NoDifferencesContainer>
			</CodeDiffContainer>
		);
	}

	if (hideWhenNoDifferences && allChanges.every((change) => change.isNormal)) {
		return (
			<CodeDiffContainer id="code-diff">
				<NoDifferencesContainer>{noDifferencesText}</NoDifferencesContainer>
			</CodeDiffContainer>
		);
	}

	return (
		<CodeDiffContainer id="code-diff">
			<DiffSplitView>
				<DiffPane>{allChanges.map((change, idx) => renderLine(change, "old", idx))}</DiffPane>
				<DiffPane>{allChanges.map((change, idx) => renderLine(change, "new", idx))}</DiffPane>
			</DiffSplitView>
		</CodeDiffContainer>
	);
}
