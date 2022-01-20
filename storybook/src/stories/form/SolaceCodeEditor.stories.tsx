import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SolaceCodeEditor, SolaceCheckBox } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

export default {
	title: "Forms/SolaceCodeEditor",
	component: SolaceCodeEditor,
	parameters: {},
	argTypes: {}
} as ComponentMeta<typeof SolaceCodeEditor>;

const Template: ComponentStory<typeof SolaceCodeEditor> = (args) => <SolaceCodeEditor {...args} />;
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

export const DefaultEditor = Template.bind({});
DefaultEditor.args = {
	onChange: action("callback")
};

const NAME = "schemaVersion[content]";

export const EmptyEditor = Template.bind({});
EmptyEditor.args = {
	id: NAME,
	name: NAME,
	value: "",
	hasErrors: undefined,
	helperText: null,
	onChange: (editor, data, value) => action(value),
	dataQa: NAME
};

export const JSONEditor = Template.bind({});
JSONEditor.args = {
	onChange: action("callback"),
	id: "demoCodeEditorId",
	value: JSON.stringify(DEFAULT_JSON_VALUE, null, " "),
	mode: "json"
};

export const XMLEditor = Template.bind({});
XMLEditor.args = {
	onChange: action("callback"),
	id: "demoCodeEditorId",
	value: DEFAULT_XML_CONTENT,
	mode: "xml"
};

export const ReadOnlyEditor = Template.bind({});
ReadOnlyEditor.args = {
	onChange: action("callback"),
	id: "demoCodeEditorId",
	value: JSON.stringify(DEFAULT_JSON_VALUE, null, " "),
	mode: "json",
	readOnly: true
};

export const FullScreenEditor = (): JSX.Element => {
	const [fullScreen, setFullScreen] = useState(false);

	const onToggleFullScreen = () => {
		setFullScreen(!fullScreen);
	};

	return (
		<>
			<SolaceCheckBox label="Full Screen" isChecked={fullScreen} onChange={() => onToggleFullScreen()} />
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

export const ControlledEditor = ({ value: initialValue, ...args }): JSX.Element => {
	const [value, setValue] = useState(initialValue);
	const handleChange = (_editor: any, _data: any, value: string) => {
		setValue(value);
	};
	return (
		<div>
			<SolaceCodeEditor id="controlledEditor" value={value} mode="json" onChange={handleChange} {...args} />
			<div>Returned Data:</div>
			<div>{JSON.stringify(value)}</div>
		</div>
	);
};

const SAMPLE_DATA = '{\n\t"name": "jason",\n \t"address": "123 road"\n}';

export const UpdateData = ({ value: initialValue, ...args }): JSX.Element => {
	const [value, setValue] = useState(initialValue);
	const handleChange = (_editor: any, _data: any, value: string) => {
		setValue(value);
	};
	return (
		<div>
			<SolaceCodeEditor id="controlledEditor" value={value} mode="json" onChange={handleChange} {...args} />
			<button
				onClick={() => {
					setValue(SAMPLE_DATA);
				}}
			>
				Update data
			</button>
			<div>Returned Data:</div>
			<div>{JSON.stringify(value)}</div>
		</div>
	);
};
