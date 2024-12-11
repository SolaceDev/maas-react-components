import React from "react";
import { Meta } from "@storybook/react";

import { SolaceRadio } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

(SolaceRadio as React.FC & { displayName?: string }).displayName = "SolaceRadio";

export default {
	title: "Forms/SolaceRadio",
	component: SolaceRadio,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/4Y6nwn19uTNgpxzNAP5Vqe/Patterns?node-id=2931%3A22385"
		}
	},
	argTypes: {
		required: {
			control: {
				type: "boolean"
			}
		},
		disabled: {
			control: {
				type: "boolean"
			}
		},
		largeLabel: {
			control: {
				type: "boolean"
			}
		},
		lightSubText: {
			control: {
				type: "boolean"
			}
		}
	}
} as Meta<typeof SolaceRadio>;

const title = "Demo Radio";
const label = "Inline Label";

export const DefaultRadio = {
	args: {
		onChange: action("callback"),
		title: title,
		id: "demoRadioId",
		name: "demoRadio",
		value: "someValue"
	}
};

export const Labeled = {
	args: {
		onChange: action("callback"),
		title: title,
		id: "demoRadioId",
		name: "demoRadio",
		label: "Inline label",
		value: "someValue"
	}
};

export const SubText = {
	args: {
		onChange: action("callback"),
		title: title,
		id: "demoRadioId",
		name: "demoRadio",
		label: "Header text",
		subText: "Subtext subtext",
		value: "someValue"
	}
};

export const LightSubText = {
	args: {
		onChange: action("callback"),
		title: title,
		id: "demoRadioId",
		name: "demoRadio",
		label: "Header text",
		subText: "Subtext subtext",
		lightSubText: true,
		value: "someValue"
	}
};

function buildSubText() {
	return (
		<span>
			Runtime Discovery is used to import your architecture into the <i>PubSub+ Discovery</i>
		</span>
	);
}

export const LargeLabelAndCustomSubText = {
	args: {
		onChange: action("callback"),
		title: title,
		id: "demoRadioId",
		name: "demoRadio",
		label: "Import to Event Portal",
		subText: buildSubText(),
		value: "someValue",
		largeLabel: true,
		disabled: false
	}
};

export const Required = {
	args: {
		onChange: action("callback"),
		name: "demoRadio",
		title: "Demo Checkbox",
		label: label,
		required: true,
		value: "someValue"
	}
};

export const Disabled = {
	args: {
		onChange: action("callback"),
		name: "demoRadio",
		title: title,
		label: label,
		checked: true,
		disabled: true,
		value: "someValue"
	}
};

export const ReadOnly = {
	args: {
		onChange: action("callback"),
		name: "demoRadio",
		title: title,
		label: label,
		checked: true,
		readOnly: true,
		value: "someValue"
	}
};
