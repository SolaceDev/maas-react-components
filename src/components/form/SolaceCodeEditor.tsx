import { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import SolaceButton from "./SolaceButton";
import HelperText from "./HelperText";
import ErrorText from "./ErrorText";
import ExpandIcon from "../../resources/icons/ExpandIcon";
import { CloseFullscreen } from "@mui/icons-material";
import { styled, useTheme } from "@mui/material";

import SolaceComponentProps from "../SolaceComponentProps";

import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/material.css";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/lint/json-lint";
import "codemirror/keymap/sublime";
import "codemirror/addon/display/fullscreen";
import "codemirror/addon/display/fullscreen.css"; // apply fullscreen to CodeEditor

const StyledOuterWrapper = styled("div")(({ theme }) => ({
	...(theme.mixins.formComponent_CodeEditor.OuterWrapper as any)
}));
const StyledInnerWrapper = styled("div")(({ theme }) => ({
	...(theme.mixins.formComponent_CodeEditor.InnerWrapper as any)
}));
const StyledEditorWrapper = styled("div")(({ theme }) => ({
	...(theme.mixins.formComponent_CodeEditor.EditorWrapper as any)
}));
const IconWrapper = styled("div")(({ theme }) => ({ ...(theme.mixins.formComponent_CodeEditor.IconWrapper as any) }));

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
	mode?: "json" | "xml";
	/**
	 * Content to display as supportive/explanitory text
	 */
	helperText?: string | JSX.Element;
	/**
	 * Boolean flag to mark the SolaceCodeEditor in error state
	 */
	hasErrors?: boolean;
	/**
	 * whether to allow CodeEditor to be expandable
	 */
	expandable?: boolean;
	/**
	 * Callback function to trigger whenever the value of the `input` is changed
	 */
	onChange?: (editor: CodeMirror, data: any, value: string) => void;
}

const renderHelperText = (helperText: string | JSX.Element, hasErrors: boolean): JSX.Element => {
	return hasErrors ? <ErrorText>{helperText}</ErrorText> : <HelperText>{helperText}</HelperText>;
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
	onChange
}: SolaceCodeEditorProps): JSX.Element {
	const theme = useTheme();

	const [val, setVal] = useState(value || "");
	const [editorExpanded, setEditorExpanded] = useState(false);
	useEffect(() => {
		if (value !== undefined) setVal(value);
	}, [value]);
	const handleChange = (_editor: CodeMirror, _data: any, value: string) => {
		setVal(value);
	};

	const toggleExpandedMode = () => {
		setEditorExpanded(!editorExpanded);
	};

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
									<CloseFullscreen />
								</SolaceButton>
							) : (
								<SolaceButton
									variant="icon"
									dataQa="buttonExpandCodeEditor"
									onClick={toggleExpandedMode}
									title="Expand"
								>
									<ExpandIcon fill={theme.palette.ux.deprecated.secondary.wMain} size={24} />
								</SolaceButton>
							)}
						</IconWrapper>
						<StyledEditorWrapper className={!editorExpanded ? "codeEditor-border" : ""}>
							<CodeMirror
								key={id}
								value={val}
								onBeforeChange={handleChange}
								options={{
									theme: "default",
									mode: mode === "json" ? "application/ld+json" : "application/xml",
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
									readOnly: readOnly ? "nocursor" : false,
									gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"]
								}}
								onChange={onChange}
							/>
						</StyledEditorWrapper>
						{helperText && renderHelperText(helperText, hasErrors)}
					</StyledInnerWrapper>
				</StyledOuterWrapper>
			)}
			{!expandable && (
				<>
					<StyledEditorWrapper className={!editorExpanded ? "codeEditor-border" : ""}>
						<CodeMirror
							key={id}
							value={val}
							onBeforeChange={handleChange}
							options={{
								theme: "default",
								mode: mode === "json" ? "application/ld+json" : "application/xml",
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
								readOnly: readOnly ? "nocursor" : false,
								gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"]
							}}
							onChange={onChange}
						/>
					</StyledEditorWrapper>
					{helperText && renderHelperText(helperText, hasErrors)}
				</>
			)}
		</>
	);
}

export default SolaceCodeEditor;
