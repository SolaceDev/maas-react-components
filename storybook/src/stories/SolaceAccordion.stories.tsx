import React from "react";
import { ComponentMeta } from "@storybook/react";
import { SolaceAccordion } from "@SolaceDev/maas-react-components";
import { useEffect, useState } from "@storybook/addons";

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
		disabled: {
			control: { type: "boolean" },
			description: "If true, the Accordion expands by default",
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
		onChange: {
			description: "A callback function that fires when the expand/collapse state of the Accordion component is changed"
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

export const MultipleAccordions = SolaceAccordionListStory.bind({});
MultipleAccordions.args = {
	dataQa: "demoAccordionList"
};
