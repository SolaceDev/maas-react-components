import { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

import SolaceComponentProps from "../SolaceComponentProps";

import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/material.css";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/lint/json-lint";
import "codemirror/keymap/sublime";
import "codemirror/addon/display/fullscreen";

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
	 * The formatting style to render the content as
	 */
	mode?: "json" | "xml";
	/**
	 * flag for toggling the editor into full screen
	 */
	fullScreen?: boolean;
	/**
	 * Callback function to trigger whenever the value of the `input` is changed
	 */
	onChange?: (editor: CodeMirror, data: any, value: string) => void;
}

function SolaceCodeEditor({
	id,
	mode = "json",
	value,
	fullScreen = false,
	readOnly = false,
	onChange
}: SolaceCodeEditorProps): JSX.Element {
	const [val, setVal] = useState(value || "");
	useEffect(() => {
		if (value !== undefined) setVal(value);
	}, [value]);
	const handleChange = (_editor: CodeMirror, _data: any, value: string) => {
		setVal(value);
	};

	return (
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
	);
}

export default SolaceCodeEditor;
