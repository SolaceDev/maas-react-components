import React, { useState, useEffect } from "react";
import { Meta } from "@storybook/react";
import { SolaceAccordion } from "@SolaceDev/maas-react-components";
import { SolaceAccordionProps } from "@SolaceDev/maas-react-components";

(SolaceAccordion as React.FC & { displayName?: string }).displayName = "SolaceAccordion";

(SolaceAccordion as React.FC & { displayName?: string }).displayName = "SolaceAccordion";

export default {
	title: "Container/Accordion",
	component: SolaceAccordion,
	tags: ["!autodocs"],

	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/4Y6nwn19uTNgpxzNAP5Vqe/Patterns?node-id=1060%3A0"
		},
		preview: {
			tab: "Code",
			code: `<MyComponent prop="value" />`
		}
	},
	argTypes: {
		id: {
			control: { type: "text" },
			description:
				"Unique identifier for the Accordion component. Use this to distinguish between multiple accordions on the same page, especially when tracking user interactions or managing state.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		summary: {
			description:
				"The summary section of the Accordion component. This is always visible and acts as the clickable header that expands/collapses the accordion. Can be a string or JSX element for more complex headers.",
			table: {
				type: { summary: "string | JSX.Element" },
				defaultValue: { summary: "undefined" }
			}
		},
		details: {
			description:
				"The details (e.g. expandable) section of the Accordion component. This content is shown when the accordion is expanded and hidden when collapsed. Can be a string or JSX element for rich content.",
			table: {
				type: { summary: "string | JSX.Element" },
				defaultValue: { summary: "undefined" }
			}
		},
		indicatorVariant: {
			options: ["info", "error", "warn", "success", "secondary"],
			control: {
				type: "select"
			},
			description:
				"Adds a colored vertical bar to the left border of the accordion. Use this to visually indicate the nature or importance of the content. For example, use 'error' for critical information, 'warn' for cautionary content, or 'info' for informational content.",
			table: {
				type: { summary: '"info" | "error" | "warn" | "success" | "secondary"' },
				defaultValue: { summary: "undefined" }
			},
			link: "https://github.com/SolaceDev/maas-react-components/blob/main/src/types/solaceAccordion.ts"
		},
		disabled: {
			control: { type: "boolean" },
			description:
				"If true, the Accordion is disabled and cannot be interacted with. Use this when the accordion content is not currently applicable or available to the user based on other selections or states in your application.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		expanded: {
			control: { type: "boolean" },
			description:
				"If true, expands the Accordion component, otherwise collapse it. Use this to control the accordion state programmatically, such as expanding specific accordions based on user actions elsewhere in the application.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "undefined" }
			}
		},
		disablePadding: {
			control: { type: "boolean" },
			description:
				"If `true`, the Accordion details component will not have padding. The default is `false`. If enabled, the content will not left align with the header title anymore. Use this when you need to display content that has its own padding or when you want to maximize the available space for content like tables or images.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		hover: {
			control: { type: "boolean" },
			description:
				"If true, the Accordion component has a hover effect. This provides visual feedback when users hover over the accordion, enhancing the interactive feel of the component and indicating it can be clicked.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		onChange: {
			description:
				"A callback function that fires when the expand/collapse state of the Accordion component is changed. Use this to perform actions when the accordion state changes, such as loading additional data, updating other UI elements, or tracking user interactions."
		},
		backgroundColor: {
			control: { type: "color" },
			description:
				"Background color of the accordion. Use this to visually distinguish the accordion from surrounding content or to group related accordions by color coding them.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		border: {
			control: { type: "boolean" },
			description:
				"If false, accordion is borderless. Use borderless accordions when you want a cleaner, more minimal look or when the accordion is already contained within another bordered element.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "true" }
			}
		},
		borderColor: {
			options: ["default", "info", "error", "warn", "success"],
			control: {
				type: "select"
			},
			description:
				"The variant of the accordion border color. Use this to visually communicate the nature of the content, such as using 'error' for critical information or 'success' for positive outcomes. See enum at https://github.com/SolaceDev/maas-react-components/blob/main/src/types/states.ts",
			table: {
				type: { summary: '"info" | "error" | "warn" | "success"' },
				defaultValue: { summary: "undefined" }
			}
		},
		square: {
			control: { type: "boolean" },
			description:
				"If false, enables rounded corners. Use this to create a softer, more modern appearance or to match the visual style of other rounded UI elements in your application.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "true" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description: "Data attribute for QA testing. Use this to identify elements during automated testing.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataTags: {
			control: { type: "text" },
			description: "Data attribute for additional tagging. Use this for analytics, tracking, or additional metadata.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		}
	}
} as Meta<typeof SolaceAccordion>;

const testItem = {
	id: "demoAccordion",
	summary: "Summary",
	details: "Details with Looooooooooong description"
};

const testListItems = [
	{ id: "itemA", title: "Item A", subTitle: "About A", content: "Description of Item A" },
	{ id: "itemB", title: "Item B", subTitle: "About B", content: "Description of Item B" },
	{ id: "itemC", title: "Item C", subTitle: "About C", content: "Description of Item C" }
];

const renderAccordionSummary = (title: string) => {
	return title;
};

const renderAccordionDetails = (subTitle: string, content: string) => {
	return (
		<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
			<div style={{ color: "gray", padding: "10px 0px" }}>{subTitle}</div>
			<div>{content}</div>
		</div>
	);
};

/**
 * Single Accordion component story
 */
const SolaceAccordionStory = ({ expanded, summary, details, ...args }) => {
	const [isExpanded, setIsExpanded] = useState(expanded);

	const handleChange = () => {
		setIsExpanded(!isExpanded);
	};
	return (
		<SolaceAccordion summary={summary} details={details} {...args} expanded={isExpanded} onChange={handleChange} />
	);
};

export const DefaultAccordion = {
	render: SolaceAccordionStory,

	args: {
		dataQa: testItem.id,
		summary: testItem.summary,
		details: testItem.details,
		expanded: false
	},

	parameters: {
		docs: {
			story: {
				before:
					"The default accordion starts in a collapsed state. Use this variant when you want users to explicitly choose to view the content. This is the most common accordion pattern and helps reduce visual clutter on initial page load."
			}
		}
	}
};

export const ExpandedAccordion = {
	render: SolaceAccordionStory,

	args: {
		dataQa: testItem.id,
		summary: testItem.summary,
		details: testItem.details,
		expanded: true
	},

	parameters: {
		docs: {
			story: {
				before:
					"An accordion that starts in an expanded state. Use this when the content is particularly important and should be immediately visible to users, or when you want to draw attention to specific information."
			}
		}
	}
};

export const DisabledAccordion = {
	render: SolaceAccordionStory,

	args: {
		dataQa: testItem.id,
		summary: testItem.summary,
		details: testItem.details,
		disabled: true
	},

	parameters: {
		docs: {
			story: {
				before:
					"A disabled accordion that cannot be interacted with. Use this when the content is not currently applicable based on other selections or states in your application, but you still want to show that the option exists."
			}
		}
	}
};

export const DisabledExpandedAccordion = {
	render: SolaceAccordionStory,

	args: {
		dataQa: testItem.id,
		summary: testItem.summary,
		details: testItem.details,
		expanded: true,
		disabled: true
	},

	parameters: {
		docs: {
			story: {
				before:
					"A disabled accordion that is expanded and cannot be collapsed. Use this when you need to display important information that cannot be modified but should always be visible to the user."
			}
		}
	}
};

/**
 * Accordion List story: demo in a list of Accordions with only one Accordion expanded at a time
 */
const SolaceAccordionListStory = ({ ...args }) => {
	const [expanded, setExpanded] = useState<string | false>(false);

	const handleChange = (id: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
		setExpanded(isExpanded ? id : false);
	};
	return (
		<div>
			{testListItems.map((item) => {
				return (
					<SolaceAccordion
						key={item.id}
						{...args}
						expanded={expanded === item.id}
						onChange={handleChange(item.id)}
						summary={renderAccordionSummary(item.title)}
						details={renderAccordionDetails(item.subTitle, item.content)}
					/>
				);
			})}
		</div>
	);
};

/**
 * Multiple expanded accordion list demo
 */
const SolaceMultiExpandedAccordionListStory = ({ ...args }) => {
	const [expandedMap, setExpandedMap] = useState(
		testListItems.reduce((acc, item) => {
			acc[item.id] = true;
			return acc;
		}, {})
	);

	const handleChange = (id: string) => () => {
		const updatedExpandedMap = { ...expandedMap };
		updatedExpandedMap[id] = !expandedMap[id];
		setExpandedMap(updatedExpandedMap);
	};
	return (
		<div>
			{testListItems.map((item) => {
				return (
					<SolaceAccordion
						key={item.id}
						{...args}
						expanded={expandedMap[item.id]}
						onChange={handleChange(item.id)}
						summary={renderAccordionSummary(item.title)}
						details={renderAccordionDetails(item.subTitle, item.content)}
					/>
				);
			})}
		</div>
	);
};

/**
 * Accordion List story: demo in a list of Accordions with only one Accordion expanded at a time
 */
const RoundedAccordionStory = ({ expanded, ...args }: SolaceAccordionProps) => {
	const [isExpanded, setIsExpanded] = useState(expanded);

	useEffect(() => {
		setIsExpanded(isExpanded);
	}, [isExpanded]);

	const handleChange = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div
			style={{
				borderRadius: "2px"
			}}
		>
			<SolaceAccordion {...args} expanded={isExpanded} onChange={handleChange} />
		</div>
	);
};

export const MultipleAccordions = {
	render: SolaceAccordionListStory,

	args: {
		dataQa: "demoAccordionList"
	},

	parameters: {
		docs: {
			story: {
				before:
					"A list of accordions where only one can be expanded at a time. This pattern is useful for FAQ sections, navigation menus, or any scenario where you want to ensure users focus on one piece of content at a time."
			}
		}
	}
};

export const MultiExpandedAccordion = {
	render: SolaceMultiExpandedAccordionListStory,

	args: {
		dataQa: "demoAccordionList"
	},

	parameters: {
		docs: {
			story: {
				before:
					"Multiple accordions that can be expanded simultaneously. Use this when users might need to compare information across different sections or when the content in each accordion is relatively short."
			}
		}
	}
};

export const AccordionWithHoverEffect = {
	render: SolaceAccordionStory,

	args: {
		dataQa: testItem.id,
		summary: testItem.summary,
		details: testItem.details,
		expanded: false,
		hover: true
	},

	parameters: {
		docs: {
			story: {
				before:
					"An accordion with a hover effect that provides visual feedback when users hover over it. This enhances the interactive feel of the component and makes it clear that it can be clicked."
			}
		}
	}
};

export const AccordionWithCustomColor = {
	render: SolaceAccordionStory,

	args: {
		dataQa: testItem.id,
		summary: testItem.summary,
		details: testItem.details,
		expanded: false,
		backgroundColor: "#F9F9F9"
	},

	parameters: {
		docs: {
			story: {
				before:
					"An accordion with a custom background color. Use this to visually distinguish the accordion from surrounding content or to group related accordions by color coding them."
			}
		}
	}
};

export const AccordionWithIndicator = {
	render: SolaceAccordionStory,

	args: {
		dataQa: testItem.id,
		summary: testItem.summary,
		details: testItem.details,
		expanded: false,
		indicatorVariant: "info"
	},

	parameters: {
		docs: {
			story: {
				before:
					"An accordion with a colored indicator bar on the left side. Use this to visually communicate the nature or importance of the content, such as using 'info' for informational content, 'error' for critical information, or 'warn' for cautionary content."
			}
		}
	}
};

export const RoundedAccordion = {
	render: RoundedAccordionStory,

	args: {
		dataQa: testItem.id,
		summary: testItem.summary,
		details: testItem.details,
		square: false
	},

	parameters: {
		docs: {
			story: {
				before:
					"An accordion with rounded corners. Use this to create a softer, more modern appearance or to match the visual style of other rounded UI elements in your application."
			}
		}
	}
};

export const BorderlessAccordion = {
	render: SolaceAccordionStory,

	args: {
		dataQa: testItem.id,
		summary: testItem.summary,
		details: testItem.details,
		border: false
	},

	parameters: {
		docs: {
			story: {
				before:
					"An accordion without borders. Use this for a cleaner, more minimal look or when the accordion is already contained within another bordered element. Borderless accordions can help reduce visual noise in dense interfaces."
			}
		}
	}
};

export const CustomBorderAccordion = {
	render: SolaceAccordionStory,

	args: {
		dataQa: testItem.id,
		summary: testItem.summary,
		details: testItem.details,
		borderColor: "info"
	},

	parameters: {
		docs: {
			story: {
				before:
					"An accordion with a custom border color. Use this to visually communicate the nature of the content, such as using 'info' for informational content, 'error' for critical information, or 'success' for positive outcomes.\n\n**Prop Dependencies:**\n- `borderColor` - Only applies when `border` is true"
			}
		}
	}
};

export const DisablePaddingForAccordionDetails = {
	render: SolaceAccordionStory,

	args: {
		dataQa: testItem.id,
		summary: testItem.summary,
		details: testItem.details,
		expanded: true,
		disablePadding: true
	},

	parameters: {
		docs: {
			story: {
				before:
					"An accordion with padding disabled in the details section. Use this when you need to display content that has its own padding or when you want to maximize the available space for content like tables or images.\n\n**Prop Dependencies:**\n- `disablePadding` - When true, the content will not left-align with the header title"
			}
		}
	}
};
