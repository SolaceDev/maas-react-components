import { Meta } from "@storybook/react";
import { SolaceCircularProgress } from "@SolaceDev/maas-react-components";

(SolaceCircularProgress as React.FC & { displayName?: string }).displayName = "SolaceCircularProgress";

export default {
	title: "Messaging/Progress Indicator/Circular",
	component: SolaceCircularProgress,
	parameters: {},
	args: {
		variant: "indeterminate",
		size: "sm",
		disableShrink: false,
		value: undefined,
		message: undefined,
		inline: false,
		dataQa: "loading-spinner",
		dataTags: "",
		eventName: ""
	},
	argTypes: {
		variant: {
			options: ["determinate", "indeterminate"],
			control: {
				type: "select"
			},
			description: "The variant to use. Use indeterminate when there is no progress value to showcase.",
			table: {
				defaultValue: {
					summary: '"indeterminate"'
				}
			}
		},
		size: {
			options: ["xs", "sm", "md", "lg"],
			control: {
				type: "select"
			},
			description:
				"Size of the circular indicator. Uses BASE_SIZE_TYPES enum from https://github.com/SolaceDev/maas-react-components/blob/main/src/types/sizing.ts",
			table: {
				defaultValue: {
					summary: '"sm"'
				}
			}
		},
		disableShrink: {
			control: {
				type: "boolean"
			},
			description: "If `true`, the shrink animation is disabled. This only works if variant is `indeterminate`.",
			table: {
				type: { summary: "boolean" },
				defaultValue: {
					summary: "false"
				}
			}
		},
		value: {
			control: {
				type: "number",
				min: 0,
				max: 100,
				step: 1
			},
			description: "Useful only if the variant is 'determinate'. Represents the progress value (0-100).",
			table: {
				type: { summary: "number" },
				defaultValue: {
					summary: "undefined"
				}
			}
		},
		message: {
			control: {
				type: "text"
			},
			description: "Text to display below the spinner (or beside it when inline is true).",
			table: {
				type: { summary: "string" },
				defaultValue: {
					summary: "undefined"
				}
			}
		},
		inline: {
			control: {
				type: "boolean"
			},
			description: "If `true`, the spinner and message are displayed side by side.",
			table: {
				type: { summary: "boolean" },
				defaultValue: {
					summary: "false"
				}
			}
		},
		dataQa: {
			control: {
				type: "text"
			},
			description: "Data QA attribute for testing purposes.",
			table: {
				type: { summary: "string" },
				defaultValue: {
					summary: '"loading-spinner"'
				}
			}
		},
		dataTags: {
			control: {
				type: "text"
			},
			description: "Data tags attribute for additional metadata.",
			table: {
				type: { summary: "string" },
				defaultValue: {
					summary: '""'
				}
			}
		},
		eventName: {
			control: {
				type: "text"
			},
			description: "Event name to be used in tracking facility.",
			table: {
				type: { summary: "string" },
				defaultValue: {
					summary: '""'
				}
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
