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

import { SolaceTextArea } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

(SolaceTextArea as React.FC & { displayName?: string }).displayName = "SolaceTextArea";

export default {
	title: "Input/Textfield/Text Area",
	component: SolaceTextArea,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/P5XeF1KE6z2MKyzlEyInrH/Core-Component-Specs-(Copy)?node-id=430%3A548"
		},
		docs: {
			description: {
				component: "Text area component for reuse in all Solace based applications. Code component name: SolaceTextArea"
			}
		}
	},
	argTypes: {
		label: {
			control: {
				type: "text"
			}
		},
		helperText: {
			control: {
				type: "text"
			}
		},
		hasErrors: {
			control: {
				type: "boolean"
			}
		},
		autoFocus: {
			control: {
				type: "boolean"
			}
		},
		inlineLabel: {
			control: {
				type: "boolean"
			}
		},
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
		readOnly: {
			control: {
				type: "boolean"
			}
		},
		value: {
			control: {
				type: "text"
			}
		},
		type: {
			options: ["text", "number", "password", "email", "url"],
			control: {
				type: "select"
			}
		},
		size: {
			control: {
				type: "number"
			}
		},
		width: {
			control: {
				type: "text"
			}
		},
		resizable: {
			options: ["both", "horizontal", "vertical"],
			control: { type: "select" },
			table: {
				type: {
					summary: "'both' | 'horizontal' | 'vertical'"
				}
			},
			description: "Set the resize property of text area."
		}
	}
} as Meta<typeof SolaceTextArea>;

const DEMO_TITLE = "Demo Text Field";
const DEMO_LABEL = "Some Label";

export const DefaultTextfield = {
	args: {
		onChange: action("callback"),
		title: DEMO_TITLE,
		id: "demoTextFieldId",
		name: "demoTextField"
	}
};

export const CustomWidth = {
	args: {
		onChange: action("callback"),
		title: DEMO_TITLE,
		id: "demoTextFieldId",
		name: "demoTextField",
		width: "40%"
	}
};

export const StackedLabeleFormat = {
	args: {
		onChange: action("callback"),
		title: DEMO_TITLE,
		name: "demoTextField",
		label: DEMO_LABEL
	}
};

export const InlineLabeleFormat = {
	args: {
		onChange: action("text-changed"),
		name: "demoTextField",
		title: DEMO_TITLE,
		label: DEMO_LABEL,
		inlineLabel: true
	}
};

export const PlaceholderText = {
	args: {
		onChange: action("callback"),
		name: "demoTextField",
		title: DEMO_TITLE,
		label: DEMO_LABEL,
		placeholder: "Some placeholder text"
	}
};

export const HelperText = {
	args: {
		onChange: action("callback"),
		name: "demoTextField",
		title: DEMO_TITLE,
		label: DEMO_LABEL,
		helperText: "Some helper text"
	}
};

export const WithErrors = {
	args: {
		onChange: action("callback"),
		name: "demoTextField",
		title: DEMO_TITLE,
		label: DEMO_LABEL,
		helperText: "The text you entered was invalid",
		hasErrors: true
	}
};

export const AutoFocus = {
	args: {
		onChange: action("callback"),
		name: "demoTextField",
		title: DEMO_TITLE,
		label: DEMO_LABEL,
		autoFocus: true
	}
};

export const WithOnBlurOnFocus = {
	args: {
		onChange: action("callback"),
		onBlur: action("blur"),
		onFocus: action("focus"),
		title: DEMO_TITLE,
		id: "demoTextFieldId",
		name: "demoTextField"
	}
};

export const Required = {
	args: {
		onChange: action("callback"),
		name: "demoTextField",
		title: DEMO_TITLE,
		label: DEMO_LABEL,
		required: true
	}
};

export const Disabled = {
	args: {
		onChange: action("callback"),
		name: "demoTextField",
		title: DEMO_TITLE,
		label: DEMO_LABEL,
		value: "Some value",
		disabled: true
	}
};

export const ReadOnly = {
	args: {
		onChange: action("callback"),
		name: "demoTextField",
		title: DEMO_TITLE,
		label: DEMO_LABEL,
		value: "Some value",
		readOnly: true
	}
};

const ControlledComponent = ({ value: initialValue, name, ...args }): JSX.Element => {
	const [value, setValue] = useState(initialValue);
	const handleChange = (e) => {
		setValue(e.value);
	};

	return <SolaceTextArea value={value} name={name} onChange={handleChange} {...args} />;
};

export const Controlled = {
	render: ControlledComponent,

	args: {
		name: "controlledTextArea",
		label: "Controlled Text Area",
		value: "Initial value",
		helperText: "The value of the text area is controlled by the change handler in the story."
	}
};

export const ResizableBoth = {
	args: {
		onChange: action("callback"),
		title: DEMO_TITLE,
		id: "demoTextFieldId",
		name: "demoTextField",
		width: "40%",
		resizable: "both"
	}
};

export const ResizableVertically = {
	args: {
		onChange: action("callback"),
		title: DEMO_TITLE,
		id: "demoTextFieldId",
		name: "demoTextField",
		width: "40%",
		resizable: "vertical"
	}
};

export const ResizableHorizontal = {
	args: {
		onChange: action("callback"),
		title: DEMO_TITLE,
		id: "demoTextFieldId",
		name: "demoTextField",
		width: "40%",
		resizable: "horizontal"
	}
};
