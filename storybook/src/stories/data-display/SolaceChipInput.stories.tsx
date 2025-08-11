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
import { SolaceChip, MODES, STATUSES, CHIP_VARIANT } from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";

(SolaceChip as React.FC & { displayName?: string }).displayName = "SolaceChip";

export default {
	title: "Data Display/Chip/Input",
	component: SolaceChip,
	parameters: {
		docs: {
			description: {
				component: "Code component name: SolaceChip"
			}
		}
	},
	argTypes: {
		label: {},
		variant: {
			options: [CHIP_VARIANT.FILLED, CHIP_VARIANT.OUTLINED],
			control: { type: "radio" }
		},
		disabled: {
			control: { type: "boolean" }
		},
		clickable: {
			control: { type: "boolean" }
		},
		mode: {
			options: [MODES.LIGHT_MODE, MODES.DARK_MODE],
			control: { type: "radio" }
		},
		status: {
			options: [STATUSES.NO_STATUS, STATUSES.ERROR_STATUS],
			control: { type: "radio" }
		}
	}
} as Meta<typeof SolaceChip>;

const DELETE_ACTION_TEXT = "Delete icon clicked";
const CLICK_ACTION_TEXT = "Input button clicked";

export const DefaultInputChip = {
	args: {
		label: "Default Input Chip",
		clickable: true,
		onDelete: action(DELETE_ACTION_TEXT),
		onClick: action(CLICK_ACTION_TEXT)
	}
};

export const DarkInputChip = {
	args: {
		mode: MODES.DARK_MODE,
		label: "Dark Input Chip",
		clickable: true,
		onDelete: action(DELETE_ACTION_TEXT),
		onClick: action(CLICK_ACTION_TEXT)
	}
};

export const ErrorInputChip = {
	args: {
		status: STATUSES.ERROR_STATUS,
		label: "Error Input Chip",
		clickable: true,
		onDelete: action(DELETE_ACTION_TEXT),
		onClick: action(CLICK_ACTION_TEXT)
	}
};
