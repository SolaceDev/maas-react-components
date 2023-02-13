import * as Diff2Html from "diff2html";
import { styled } from "@mui/material";
import React from "react";
import Diff from "diff";
import "diff2html/bundles/css/diff2html.min.css";

import SolaceComponentProps from "./SolaceComponentProps";

const CodeDiffContainer = styled("div")(({ theme }) => ({
	".d2h-file-list-wrapper": {
		display: "none"
	},
	".d2h-file-wrapper": {
		border: 0,
		".d2h-file-header": {
			display: "none"
		},
		".d2h-files-diff": {
			gap: 25,
			".d2h-info": {
				display: "none"
			},
			".d2h-file-side-diff": {
				border: `1px solid ${theme.palette.ux.secondary.w20}`,
				borderRadious: 4,
				".d2h-diff-table": {
					"td, th": {
						padding: 0
					}
				},
				".d2h-code-side-linenumber": {
					border: 0,
					position: "relative", // Fixes line numbers overflowing out of container. https://github.com/rtfpessoa/diff2html/issues/381
					backgroundColor: `${theme.palette.ux.primary.w20} !important;`,
					padding: 0,
					textAlign: "center",
					width: 24
				},
				".d2h-code-line-prefix": {
					display: "none"
				},
				".d2h-del.d2h-change": {
					border: 0,
					backgroundColor: "rgba(243, 170, 36, 0.2);", // TODO: This is not added in the theme mapping file. Need to add it
					mixBlendMode: "multiply"
				},
				".d2h-code-side-emptyplaceholder, .d2h-emptyplaceholder": {
					border: 0,
					backgroundColor: "#D0021B", // TODO: This is not added in the theme mapping file. Need to add it
					opacity: 0.1,
					mixBlendMode: "multiply"
				},
				".d2h-ins, .d2h-del": {
					backgroundColor: "rgba(83, 174, 15, 0.2);", // TODO: This is not added in the theme mapping file. Need to add it
					mixBlendMode: "multiply"
				},
				ins: {
					backgroundColor: "#FEE5BF", // TODO: This is not added in the theme mapping file. Need to add it
					mixBlendMode: "multiply"
				},
				del: {
					backgroundColor: "#FEE5BF", // TODO: This is not added in the theme mapping file. Need to add it
					mixBlendMode: "multiply"
				}
			}
		}
	}
}));

const FILE_PATCH_TEXT1 = "file1";
const FILE_PATCH_TEXT2 = "file2";

export interface SolaceTextDiffProps extends SolaceComponentProps {
	/**
	 * 	Text 1 for comparison
	 */
	text1: string;
	/**
	 * 	Text 2 for comparison
	 */
	text2: string;
}

export default function SolaceTextDiff(props: SolaceTextDiffProps): JSX.Element {
	const [diff, setDiff] = React.useState("");

	React.useEffect(() => {
		const diffString = Diff.createTwoFilesPatch(FILE_PATCH_TEXT1, FILE_PATCH_TEXT2, props.text1, props.text2);

		const diffHtml = Diff2Html.html(diffString, {
			drawFileList: true,
			outputFormat: "side-by-side"
		});

		setDiff(diffHtml);
	}, [props.text1, props.text2]);

	return <CodeDiffContainer id="code-diff" dangerouslySetInnerHTML={{ __html: diff }}></CodeDiffContainer>;
}
