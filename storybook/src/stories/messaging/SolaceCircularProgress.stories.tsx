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
import { SolaceCircularProgress } from "@SolaceDev/maas-react-components";

(SolaceCircularProgress as React.FC & { displayName?: string }).displayName = "SolaceCircularProgress";

export default {
	title: "Messaging/Progress Indicator/Circular",
	component: SolaceCircularProgress,
	parameters: {
		docs: {
			description: {
				component: "Code component name: SolaceCircularProgress"
			}
		}
	},
	argTypes: {
		variant: {
			options: ["determinate", "indeterminate"],
			control: {
				type: "select"
			}
		},
		size: {
			options: ["xs", "sm", "md", "lg"],
			control: {
				type: "select"
			}
		},
		disableShrink: {
			control: {
				type: "boolean"
			}
		},
		value: {
			control: {
				type: "text"
			}
		},
		message: {
			control: {
				type: "text"
			}
		},
		inline: {
			control: {
				type: "boolean"
			}
		}
	}
} as Meta<typeof SolaceCircularProgress>;

export const DefaultVariant = {
	args: {}
};

export const WithMessageVariant = {
	args: {
		message: "Loading"
	}
};

export const DeterminateVariant = {
	args: {
		variant: "determinate",
		value: 90
	}
};

export const LargeSize = {
	args: {
		size: "lg"
	}
};

export const DisableShrink = {
	args: {
		disableShrink: true
	}
};
export const Inline = {
	args: {
		inline: true,
		message: "Loading"
	}
};
