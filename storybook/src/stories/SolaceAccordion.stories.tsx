import React from "react";
import { Meta } from "@storybook/react";
import { SolaceAccordion } from "@SolaceDev/maas-react-components";
import { useEffect, useState } from "@storybook/addons";
import { SolaceAccordionProps } from "../../../dist/components/SolaceAccordion";

export default {
	title: "Under Construction/SolaceAccordion",
	component: SolaceAccordion,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/4Y6nwn19uTNgpxzNAP5Vqe/Patterns?node-id=1060%3A0"
		},
		docs: {
			description: {
				component: "Accordion component for reuse in all Solace based applications"
			}
		}
	},
	argTypes: {
		id: {
			control: { type: "text" },
			description: "Unique identifier for the Accordion component"
		},
		summary: {
			description: "The summary section of the Accordion component"
		},
		details: {
			description: "The details (e.g. expandable) section of the Accordion component"
		},
		indicatorVariant: {
			options: ["info", "error", "warn", "success", "secondary"],
			control: {
				type: "select"
			},
			description: "The variant of the colored vertical bar displayed inside the left border",
			table: {
				defaultValue: {
					summary: ""
				}
			}
		},
		disabled: {
			control: { type: "boolean" },
			description: "If true, the Accordion expands by default",
			table: {
				defaultValue: {
					summary: false
				}
			}
		},
		round: {
			control: { type: "boolean" },
			description: "If true, square corners are enabled",
			table: {
				defaultValue: {
					summary: false
				}
			}
		},
		expanded: {
			control: { type: "boolean" },
			description: "If true, expands the Accordion component, otherwise collapse it",
			table: {
				defaultValue: {
					summary: false
				}
			}
		},
		disablePadding: {
			control: { type: "boolean" },
			description:
				"If `true`, the Accordion details component will not have padding. The default is `false`.If enabled, the content will not left align with the header title anymore.",
			table: {
				defaultValue: {
					summary: false
				}
			}
		},
		hover: {
			control: { type: "boolean" },
			description: "If true, the Accordion component is has hover effect.",
			table: {
				defaultValue: {
					summary: false
				}
			}
		},
		onChange: {
			description: "A callback function that fires when the expand/collapse state of the Accordion component is changed"
		},
		backgroundColor: {
			control: { type: "color" },
			description: "Background color of the accordion",
			table: {
				defaultValue: {
					summary: "white"
				}
			}
		},
		border: {
			control: { type: "boolean" },
			description: "If false, accordion is borderless",
			table: {
				defaultValue: {
					summary: true
				}
			}
		},
		borderColor: {
			options: ["default", "info", "error", "warn", "success"],
			control: {
				type: "select"
			},
			description: "The variant of the accordion border color",
			table: {
				defaultValue: {
					summary: ""
				}
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
	}
};

export const ExpandedAccordion = {
	render: SolaceAccordionStory,

	args: {
		dataQa: testItem.id,
		summary: testItem.summary,
		details: testItem.details,
		expanded: true
	}
};

export const DisabledAccordion = {
	render: SolaceAccordionStory,

	args: {
		dataQa: testItem.id,
		summary: testItem.summary,
		details: testItem.details,
		disabled: true
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
	const [expandedMap, setExpandedMap] = useState({});

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
						expanded={expandedMap[item.id] === true}
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
	}
};

export const MultiExpandedAccordion = {
	render: SolaceMultiExpandedAccordionListStory,

	args: {
		dataQa: "demoAccordionList"
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
	}
};

export const RoundedAccordion = {
	render: RoundedAccordionStory,

	args: {
		dataQa: testItem.id,
		summary: testItem.summary,
		details: testItem.details,
		square: false
	}
};

export const BorderlessAccordion = {
	render: SolaceAccordionStory,

	args: {
		dataQa: testItem.id,
		summary: testItem.summary,
		details: testItem.details,
		border: false
	}
};

export const CustomBorderAccordion = {
	render: SolaceAccordionStory,

	args: {
		dataQa: testItem.id,
		summary: testItem.summary,
		details: testItem.details,
		borderColor: "info"
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
	}
};
