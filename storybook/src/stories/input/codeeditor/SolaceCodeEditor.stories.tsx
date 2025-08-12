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
import { Meta } from "@storybook/react";

import { SolaceCodeEditor, SolaceCheckBox } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

(SolaceCodeEditor as React.FC & { displayName?: string }).displayName = "SolaceCodeEditor";
(SolaceCheckBox as React.FC & { displayName?: string }).displayName = "SolaceCheckBox";

export default {
	title: "Input/Code/Editor",
	component: SolaceCodeEditor,
	args: {
		id: "",
		name: "",
		value: "",
		mode: "json",
		readOnly: false,
		expandable: false,
		fullScreen: false,
		hasErrors: false,
		hasWarnings: false,
		helperText: "",
		dataQa: ""
	},
	parameters: {},
	argTypes: {
		id: {
			control: { type: "text" },
			description: "Unique identifier for the code editor component. Used for accessibility and programmatic access.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		name: {
			control: { type: "text" },
			description: "Name attribute for the code editor input. Used for form submission and identification.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		value: {
			control: { type: "text" },
			description: "The current code content in the editor. This is the controlled value of the editor.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		mode: {
			control: { type: "select" },
			options: ["json", "xml", "protobuf", "javascript", "typescript", "yaml"],
			description:
				"The syntax highlighting mode for the code editor. Determines the language parsing and highlighting.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "json" }
			}
		},
		onChange: {
			description:
				"Callback function triggered when the code content changes. Receives (editor, data, value) parameters."
		},
		readOnly: {
			control: { type: "boolean" },
			description: "If true, the editor is read-only and cannot be modified by the user.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		expandable: {
			control: { type: "boolean" },
			description: "If true, shows an expand button that allows the editor to be opened in full-screen mode.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		fullScreen: {
			control: { type: "boolean" },
			description: "If true, the editor is displayed in full-screen mode covering the entire viewport.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		hasErrors: {
			control: { type: "boolean" },
			description: "If true, displays the editor in an error state with red styling to indicate validation issues.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		hasWarnings: {
			control: { type: "boolean" },
			description: "If true, displays the editor in a warning state with amber styling to indicate potential issues.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		helperText: {
			control: { type: "text" },
			description:
				"Helper text displayed below the editor. Can be used for instructions, error messages, or additional context.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description: "Data attribute for QA testing. Use this to identify the code editor during automated testing.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		}
	}
} as Meta<typeof SolaceCodeEditor>;

const DEFAULT_JSON_VALUE = {
	squadName: "Super hero squad",
	homeTown: "Metro City",
	formed: 2016,
	secretBase: "Super tower",
	active: true,
	members: [
		{
			name: "Molecule Man",
			age: 29,
			secretIdentity: "Dan Jukes",
			powers: ["Radiation resistance", "Turning tiny", "Radiation blast"]
		},
		{
			name: "Madame Uppercut",
			age: 39,
			secretIdentity: "Jane Wilson",
			powers: ["Million tonne punch", "Damage resistance", "Superhuman reflexes"]
		},
		{
			name: "Eternal Flame",
			age: 1000000,
			secretIdentity: "Unknown",
			powers: ["Immortality", "Heat Immunity", "Inferno", "Teleportation", "Interdimensional travel"]
		}
	]
};
const DEFAULT_XML_CONTENT = `<part number="1976">
<name>Windscreen Wiper</name>
<description>The Windscreen wiper
  automatically removes rain
  from your windscreen, if it
  should happen to splash there.
  It has a rubber <ref part="1977">blade</ref>
  which can be ordered separately
  if you need to replace it.
</description>
</part>`;

const DEFAULT_PROTOBUF_CONTENT = `syntax = "proto3";
package com.acme;

import "OtherRecord.proto";

message MyRecord {
  string f1 = 1;
  OtherRecord f2 = 2;
}`;

export const DefaultEditor = {
	args: {
		onChange: action("callback")
	}
};

const NAME = "schemaVersion[content]";

export const EmptyEditor = {
	args: {
		id: NAME,
		name: NAME,
		value: "",
		hasErrors: undefined,
		helperText: null,
		onChange: (editor, data, value) => action(value),
		dataQa: NAME
	}
};

export const JSONEditor = {
	args: {
		onChange: action("callback"),
		id: "demoCodeEditorId",
		value: JSON.stringify(DEFAULT_JSON_VALUE, null, " "),
		mode: "json"
	}
};

export const XMLEditor = {
	args: {
		onChange: action("callback"),
		id: "demoCodeEditorId",
		value: DEFAULT_XML_CONTENT,
		mode: "xml"
	}
};

export const ProtobufEditor = {
	args: {
		onChange: action("callback"),
		id: "demoCodeEditorId",
		value: DEFAULT_PROTOBUF_CONTENT,
		mode: "protobuf"
	}
};

export const ReadOnlyEditor = {
	args: {
		onChange: action("callback"),
		id: "demoCodeEditorId",
		value: JSON.stringify(DEFAULT_JSON_VALUE, null, " "),
		mode: "json",
		readOnly: true
	}
};

export const ExpandableEditor = {
	args: {
		onChange: action("callback"),
		id: "demoCodeEditorId",
		value: JSON.stringify(DEFAULT_JSON_VALUE, null, " "),
		mode: "json",
		expandable: true
	}
};

export const WithHelperText = {
	args: {
		onChange: action("callback"),
		id: "demoCodeEditorId",
		value: JSON.stringify(DEFAULT_JSON_VALUE, null, " "),
		mode: "json",
		expandable: true,
		helperText: "A sample helper text"
	}
};

export const WithError = {
	args: {
		onChange: action("callback"),
		id: "demoCodeEditorId",
		value: JSON.stringify(DEFAULT_JSON_VALUE, null, " "),
		mode: "json",
		expandable: true,
		helperText: "A sample error text",
		hasErrors: true
	}
};

export const WithWarning = {
	args: {
		onChange: action("callback"),
		id: "demoCodeEditorId",
		value: JSON.stringify(DEFAULT_JSON_VALUE, null, " "),
		mode: "json",
		expandable: true,
		helperText: "A sample warning text",
		hasWarnings: true
	}
};

export const FullScreenEditor = (): JSX.Element => {
	const [fullScreen, setFullScreen] = useState(false);

	const onToggleFullScreen = () => {
		setFullScreen(!fullScreen);
	};

	return (
		<>
			<SolaceCheckBox
				name="fullScreenCheckbox"
				label="Full Screen"
				checked={fullScreen}
				onChange={() => onToggleFullScreen()}
			/>
			<SolaceCodeEditor
				id="demoCodeEditorId"
				value={JSON.stringify(DEFAULT_JSON_VALUE, null, " ")}
				mode="json"
				fullScreen={fullScreen}
				onChange={action("callback")}
			/>
		</>
	);
};

export const ControlledEditor = (): JSX.Element => {
	const [value, setValue] = useState("");
	const handleChange = (_editor: unknown, _data: unknown, value: string) => {
		setValue(value);
	};
	return (
		<div>
			<SolaceCodeEditor id="controlledEditor" value={value} mode="json" onChange={handleChange} />
			<div>Returned Data:</div>
			<div>{JSON.stringify(value)}</div>
		</div>
	);
};

const DATA = [
	'{\n\t"name": "jason",\n \t"address": "123 road"\n}',
	'{\n\t"name": "peter",\n \t"address": "456 road"\n}',
	'{\n\t"name": "jane",\n \t"address": "789 road"\n}',
	"{}",
	""
];

const fetchRandomDataSet = (array) => {
	const n = Math.floor(Math.random() * 5);
	return array[n];
};

export const UpdateData = (): JSX.Element => {
	const [initValue, setInitValue] = useState("");
	const [value, setValue] = useState("");
	const handleChange = (_editor: unknown, _data: unknown, value: string) => {
		setValue(value);
	};
	return (
		<div>
			<SolaceCodeEditor id="controlledEditor" value={initValue} mode="json" onChange={handleChange} />
			<button
				onClick={() => {
					setInitValue(fetchRandomDataSet(DATA));
				}}
			>
				Update data
			</button>
			<div>Returned Data:</div>
			<div>{JSON.stringify(value)}</div>
		</div>
	);
};
