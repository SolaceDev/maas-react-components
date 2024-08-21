import { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import SolaceButton from "./SolaceButton";
import HelperText from "./HelperText";
import ErrorText from "./ErrorText";
import WarningText from "./WarningText";
import ExpandIcon from "../../resources/icons/ExpandIcon";
import CollapseIcon from "../../resources/icons/CollapseIcon";
import { styled, useTheme } from "@mui/material";

import SolaceComponentProps from "../SolaceComponentProps";

import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/protobuf/protobuf";
import "codemirror/theme/material.css";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/lint/json-lint";
import "codemirror/keymap/sublime";
import "codemirror/addon/display/fullscreen";
import "codemirror/addon/display/fullscreen.css"; // apply fullscreen to CodeEditor
import { CSSProperties } from "@mui/styled-engine";

const StyledOuterWrapper = styled("div")(({ theme }) => ({
	...(theme.mixins.formComponent_CodeEditor.OuterWrapper as CSSProperties)
}));
const StyledInnerWrapper = styled("div")(({ theme }) => ({
	...(theme.mixins.formComponent_CodeEditor.InnerWrapper as CSSProperties)
}));
const StyledEditorWrapper = styled("div")(({ theme }) => ({
	...(theme.mixins.formComponent_CodeEditor.EditorWrapper as CSSProperties)
}));
const IconWrapper = styled("div")(({ theme }) => ({
	...(theme.mixins.formComponent_CodeEditor.IconWrapper as CSSProperties)
}));

export interface SolaceCodeEditorProps extends SolaceComponentProps {
	/**
	 * Unique identifier for the button
	 */
	id?: string;
	/**
	 * The value to initialize the content with
	 */
	value?: string;
	/**
	 * Renders the button disabled
	 */
	readOnly?: boolean;
	/**
	 * render SolaceCodeEditor in fullscreen state
	 */
	fullScreen?: boolean;
	/**
	 * The formatting style to render the content as
	 */
	mode?: "json" | "xml" | "protobuf";
	/**
	 * Content to display as supportive/explanitory text
	 */
	helperText?: string | JSX.Element;
	/**
	 * Boolean flag to mark the SolaceCodeEditor in error state
	 */
	hasErrors?: boolean;
	/**
	 * Boolean flag to mark the SolaceCodeEditor in warning state
	 */
	hasWarnings?: boolean;
	/**
	 * whether to allow CodeEditor to be expandable
	 */
	expandable?: boolean;
	/**
	 * Callback function to trigger whenever the value of the `input` is changed
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onChange?: (editor: CodeMirror, data: any, value: string) => void;
}

const renderHelperText = (helperText: string | JSX.Element, hasErrors: boolean, hasWarnings: boolean): JSX.Element => {
	return hasErrors ? (
		<ErrorText>{helperText}</ErrorText>
	) : hasWarnings ? (
		<WarningText>{helperText}</WarningText>
	) : (
		<HelperText>{helperText}</HelperText>
	);
};

function SolaceCodeEditor({
	id,
	mode = "json",
	value,
	readOnly = false,
	fullScreen = false,
	expandable = false,
	helperText = "",
	hasErrors = false,
	hasWarnings = false,
	onChange
}: SolaceCodeEditorProps): JSX.Element {
	const theme = useTheme();

	const [val, setVal] = useState(value || "");
	const [editorExpanded, setEditorExpanded] = useState(false);
	useEffect(() => {
		if (value !== undefined) setVal(value);
	}, [value]);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleChange = (_editor: CodeMirror, _data: any, value: string) => {
		setVal(value);
	};

	const toggleExpandedMode = () => {
		setEditorExpanded(!editorExpanded);
	};

	let codeMirrorMode = "";
	switch (mode) {
		case "xml":
			codeMirrorMode = "application/xml";
			break;
		case "protobuf":
			codeMirrorMode = "text/x-protobuf";
			break;
		default:
			codeMirrorMode = "application/ld+json";
	}

	return (
		<>
			{expandable && (
				<StyledOuterWrapper className={editorExpanded ? "codeEditor-expanded--backdrop" : ""}>
					<StyledInnerWrapper className={editorExpanded ? "codeEditor-expanded--main" : ""}>
						<IconWrapper className={editorExpanded ? "codeEditor-expanded--icon" : "codeEditor-collapsed--icon"}>
							{editorExpanded ? (
								<SolaceButton
									variant="icon"
									dataQa="buttonCollapseCodeEditor"
									onClick={toggleExpandedMode}
									title="Collapse"
								>
									<CollapseIcon fill={theme.palette.ux.secondary.wMain} size={24} />
								</SolaceButton>
							) : (
								<SolaceButton
									variant="icon"
									dataQa="buttonExpandCodeEditor"
									onClick={toggleExpandedMode}
									title="Expand"
								>
									<ExpandIcon fill={theme.palette.ux.secondary.wMain} size={24} />
								</SolaceButton>
							)}
						</IconWrapper>
						<StyledEditorWrapper
							className={`${!editorExpanded ? "codeEditor-border" : ""} ${readOnly ? "codeEditor-readonly" : ""}`}
						>
							<CodeMirror
								key={id}
								value={val}
								onBeforeChange={handleChange}
								options={{
									theme: "default",
									mode: codeMirrorMode,
									styleActiveLine: true,
									keyMap: "sublime",
									lint: false,
									fullScreen: fullScreen,
									matchClosing: true,
									matchBrackets: true,
									autoCloseBrackets: true,
									autoCloseTags: true,
									lineWrapping: true,
									lineNumbers: true,
									foldGutter: true,
									readOnly: readOnly,
									gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"]
								}}
								onChange={onChange}
							/>
						</StyledEditorWrapper>
						{helperText && renderHelperText(helperText, hasErrors, hasWarnings)}
					</StyledInnerWrapper>
				</StyledOuterWrapper>
			)}
			{!expandable && (
				<>
					<StyledEditorWrapper
						className={`${!editorExpanded ? "codeEditor-border" : ""} ${readOnly ? "codeEditor-readonly" : ""}`}
					>
						<CodeMirror
							key={id}
							value={val}
							onBeforeChange={handleChange}
							options={{
								theme: "default",
								mode: codeMirrorMode,
								styleActiveLine: true,
								keyMap: "sublime",
								lint: false,
								fullScreen: fullScreen,
								matchClosing: true,
								matchBrackets: true,
								autoCloseBrackets: true,
								autoCloseTags: true,
								lineWrapping: true,
								lineNumbers: true,
								foldGutter: true,
								readOnly: readOnly,
								gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"]
							}}
							onChange={onChange}
						/>
					</StyledEditorWrapper>
					{helperText && renderHelperText(helperText, hasErrors, hasWarnings)}
				</>
			)}
		</>
	);
}

export default SolaceCodeEditor;
