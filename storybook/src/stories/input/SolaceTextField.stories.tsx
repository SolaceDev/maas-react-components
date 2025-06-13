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
import { within, userEvent } from "@storybook/testing-library";
import { Search } from "@mui/icons-material";
import { SolaceTextField, SolaceButton, CloseIcon } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

(SolaceTextField as React.FC & { displayName?: string }).displayName = "SolaceTextField";
(SolaceButton as React.FC & { displayName?: string }).displayName = "SolaceButton";

export default {
	title: "Input/Textfield/Standard",
	component: SolaceTextField,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/P5XeF1KE6z2MKyzlEyInrH/Core-Component-Specs-(Copy)?node-id=430%3A548"
		},
		docs: {
			description: {
				component:
					"Text field component for reuse in all Solace based applications. Code component name: SolaceTextField"
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
				type: "number"
			}
		},
		minWidth: {
			control: {
				type: "number"
			}
		}
	}
} as Meta<typeof SolaceTextField>;

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
		width: "50%"
	}
};

export const StackedLabelFormat = {
	args: {
		onChange: action("callback"),
		title: DEMO_TITLE,
		name: "demoTextField",
		label: DEMO_LABEL
	}
};

export const InlineLabelFormat = {
	args: {
		onChange: action("text-changed"),
		name: "demoTextField",
		title: DEMO_TITLE,
		label: DEMO_LABEL,
		inlineLabel: true
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

export const PlaceholderText = {
	args: {
		onChange: action("callback"),
		name: "demoTextField",
		title: DEMO_TITLE,
		label: DEMO_LABEL,
		placeholder: "Some placeholder text"
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

export const WithWarning = {
	args: {
		onChange: action("callback"),
		name: "demoTextField",
		title: DEMO_TITLE,
		label: DEMO_LABEL,
		helperText: "The text you entered triggered a warning",
		hasWarnings: true
	}
};

export const WithIcon = {
	args: {
		onChange: action("callback"),
		name: "demoTextField",
		title: DEMO_TITLE,
		label: DEMO_LABEL,
		helperText: "Text field with search icon",
		customIcon: { position: "end", icon: <Search /> }
	}
};

const WithClearButtonComponent = (): JSX.Element => {
	const [value, setValue] = useState("");
	const handleChange = (e) => {
		setValue(e.value);
	};
	const handleClearInput = () => {
		setValue("");
	};
	const endAdornment = [
		value ? (
			<SolaceButton key={"closeIcon"} dataQa="clearButton" variant="icon" onClick={handleClearInput}>
				<CloseIcon />
			</SolaceButton>
		) : null,
		<SolaceButton key={"searchIcon"} variant="icon" onClick={handleClearInput}>
			<Search key="search" />
		</SolaceButton>
	];

	return (
		<SolaceTextField
			value={value}
			name="demoTextField"
			onChange={handleChange}
			endAdornment={endAdornment}
			title={DEMO_TITLE}
			label={DEMO_LABEL}
			helperText="Text field with clear button"
			dataQa="textfieldWithClearButton"
		/>
	);
};

export const WithClearButton = {
	render: WithClearButtonComponent,

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);

		await userEvent.type(canvas.getByTestId("textfieldWithClearButton"), "This is a test ", {
			delay: 100
		});
	},

	parameters: {
		// Delay snapshot 10 seconds until all interactions are done
		chromatic: { delay: 10000 }
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

export const ReadOnlyLongTextOverflowWithTooltip = (): JSX.Element => {
	return (
		<div style={{ width: "400px" }}>
			<SolaceTextField
				name={"demoTextField"}
				title={DEMO_TITLE}
				label={DEMO_LABEL}
				value={"Some long value that will be truncated by ellipsis along with a tooltip upon hover!"}
				readOnly={true}
			/>
		</div>
	);
};

export const ReadOnlyInlineLabelLongTextOverflowWithTooltip = (): JSX.Element => {
	return (
		<div style={{ width: "400px" }}>
			<SolaceTextField
				name={"demoTextField"}
				title={DEMO_TITLE}
				label={DEMO_LABEL}
				value={"Some long value that will be truncated by ellipsis along with a tooltip upon hover!"}
				inlineLabel={true}
				readOnly={true}
			/>
		</div>
	);
};

const ControlledComponent = ({ value: initialValue, name, ...args }): JSX.Element => {
	const [value, setValue] = useState(initialValue);
	const handleChange = (e) => {
		setValue(e.value);
	};

	return <SolaceTextField value={value} name={name} onChange={handleChange} {...args} />;
};

export const Controlled = {
	render: ControlledComponent,

	args: {
		name: "controlledTextField",
		label: "Controlled Text Field",
		value: "Initial value",
		helperText: "The value of the text field is controlled by the change handler in the story."
	}
};

export const Interaction = {
	args: {
		onChange: action("callback"),
		id: "interactionTextField",
		title: DEMO_TITLE,
		label: DEMO_LABEL,
		dataQa: "interactionTextField"
	},

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);

		await userEvent.type(canvas.getByTestId("interactionTextField"), "This is a test", {
			delay: 100
		});
	},

	parameters: {
		// Delay snapshot 5 seconds until all interactions are done
		chromatic: { delay: 5000 }
	}
};
