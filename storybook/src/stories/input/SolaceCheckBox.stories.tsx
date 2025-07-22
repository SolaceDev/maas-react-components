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

import { Meta } from "@storybook/react";

import { SolaceCheckBox } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

(SolaceCheckBox as React.FC & { displayName?: string }).displayName = "SolaceCheckBox";

const LABEL = "Some Label";
const TITLE = "Demo Checkbox";

export default {
	title: "Input/Checkbox",
	component: SolaceCheckBox,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/4Y6nwn19uTNgpxzNAP5Vqe/Patterns?node-id=2932%3A22443"
		},
		docs: {
			description: {
				component: "Code component name: SolaceCheckBox"
			}
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
		boldLabel: {
			control: {
				type: "boolean"
			}
		},
		subTextProps: {
			label: {
				control: {
					type: "text"
				}
			},
			light: {
				control: {
					type: "boolean"
				}
			}
		},
		largeLabel: {
			control: {
				type: "boolean"
			}
		}
	}
} as Meta<typeof SolaceCheckBox>;

export const DefaultCheckbox = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		id: "demoCheckboxId",
		name: "demoCheckbox"
	}
};

export const Labeled = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		id: "demoCheckboxId",
		name: "demoCheckbox",
		label: LABEL
	}
};

export const BoldLabel = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		id: "demoCheckboxId",
		name: "demoCheckbox",
		label: LABEL,
		boldLabel: true
	}
};

export const LargeLabel = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		id: "demoCheckboxId",
		name: "demoCheckbox",
		label: LABEL,
		largeLabel: true
	}
};

export const SubText = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		id: "demoCheckboxId",
		name: "demoCheckbox",
		label: "Primary Label",
		subTextProps: {
			label: "Subtext subtext"
		}
	}
};

export const LightSubText = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		id: "demoCheckboxId",
		name: "demoCheckbox",
		label: "Primary Label",
		subTextProps: {
			label: "This is a light subtext",
			light: true
		}
	}
};

export const HelperText = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		id: "demoCheckboxId",
		name: "demoCheckbox",
		label: LABEL,
		helperText: "Some helper text here"
	}
};

export const WithErrors = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		id: "demoCheckboxId",
		name: "demoCheckbox",
		label: LABEL,
		hasErrors: true,
		helperText: "Some error occured"
	}
};

export const Required = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		name: "demoCheckbox",
		label: LABEL,
		required: true
	}
};

export const Disabled = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		name: "demoCheckbox",
		label: LABEL,
		checked: true,
		disabled: true
	}
};

export const Indeterminate = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		name: "demoCheckbox",
		label: LABEL,
		checked: true,
		indeterminate: true,
		readOnly: false
	}
};

export const ReadOnly = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		name: "demoCheckbox",
		label: LABEL,
		checked: true,
		readOnly: true
	}
};

export const IndeterminateAndReadOnly = {
	args: {
		onChange: action("callback"),
		title: TITLE,
		name: "demoCheckbox",
		label: LABEL,
		checked: true,
		indeterminate: true,
		readOnly: true
	}
};
