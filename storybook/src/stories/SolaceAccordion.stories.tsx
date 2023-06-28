import React from "react";
import { ComponentMeta } from "@storybook/react";
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
} as ComponentMeta<typeof SolaceAccordion>;

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
const SolaceAccordionStory = ({ expanded, ...args }) => {
	const [isExpanded, setIsExpanded] = useState(expanded);

	useEffect(() => {
		setIsExpanded(isExpanded);
	}, [isExpanded]);

	const handleChange = () => {
		setIsExpanded(!isExpanded);
	};
	return <SolaceAccordion {...args} expanded={isExpanded} onChange={handleChange} />;
};

export const DefaultAccordion = SolaceAccordionStory.bind({});
DefaultAccordion.args = {
	dataQa: testItem.id,
	summary: testItem.summary,
	details: testItem.details,
	expanded: false
};

export const ExpandedAccordion = SolaceAccordionStory.bind({});
ExpandedAccordion.args = {
	dataQa: testItem.id,
	summary: testItem.summary,
	details: testItem.details,
	expanded: true
};

export const DisabledAccordion = SolaceAccordionStory.bind({});
DisabledAccordion.args = {
	dataQa: testItem.id,
	summary: testItem.summary,
	details: testItem.details,
	disabled: true
};

export const DisabledExpandedAccordion = SolaceAccordionStory.bind({});
DisabledExpandedAccordion.args = {
	dataQa: testItem.id,
	summary: testItem.summary,
	details: testItem.details,
	expanded: true,
	disabled: true
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

export const MultipleAccordions = SolaceAccordionListStory.bind({});
MultipleAccordions.args = {
	dataQa: "demoAccordionList"
};

export const AccordionWithHoverEffect = SolaceAccordionStory.bind({});
AccordionWithHoverEffect.args = {
	dataQa: testItem.id,
	summary: testItem.summary,
	details: testItem.details,
	expanded: false,
	hover: true
};

export const AccordionWithCustomColor = SolaceAccordionStory.bind({});
AccordionWithCustomColor.args = {
	dataQa: testItem.id,
	summary: testItem.summary,
	details: testItem.details,
	expanded: false,
	backgroundColor: "#F9F9F9"
};

export const AccordionWithIndicator = SolaceAccordionStory.bind({});
AccordionWithIndicator.args = {
	dataQa: testItem.id,
	summary: testItem.summary,
	details: testItem.details,
	expanded: false,
	indicatorVariant: "info"
};

export const RoundedAccordion = RoundedAccordionStory.bind({});
RoundedAccordion.args = {
	dataQa: testItem.id,
	summary: testItem.summary,
	details: testItem.details,
	square: false
};

export const BorderlessAccordion = SolaceAccordionStory.bind({});
BorderlessAccordion.args = {
	dataQa: testItem.id,
	summary: testItem.summary,
	details: testItem.details,
	border: false
};

export const CustomBorderAccordion = SolaceAccordionStory.bind({});
CustomBorderAccordion.args = {
	dataQa: testItem.id,
	summary: testItem.summary,
	details: testItem.details,
	borderColor: "info"
};
