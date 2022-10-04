import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { SolacePagination } from "@SolaceDev/maas-react-components";

export default {
	title: "Under Construction/SolacePagination",
	component: SolacePagination,
	parameters: {},
	argTypes: {
		totalResults: {
			control: {
				type: "number",
				defaultValue: 156
			}
		},
		pageSize: {
			control: {
				type: "select",
				options: [10, 20, 50, 100]
			}
		},
		displayText: {
			control: {
				type: "text",
				defaultValue: "Showing ${firstItemIndex}-${lastItemIndex} of ${totalResults} results"
			}
		},
		loading: {
			control: {
				type: "boolean",
				description: "The loading state flag for pagination component, default to false"
			}
		}
	}
} as ComponentMeta<typeof SolacePagination>;

const Template: ComponentStory<typeof SolacePagination> = (args) => <SolacePagination {...args} />;

export const DefaultPagination = (args): JSX.Element => {
	const [selectedPage, setSelectedPage] = useState(1);

	return (
		<SolacePagination
			totalResults={args.totalResults || 156}
			activePage={selectedPage}
			pageSize={args.pageSize}
			displayText={args.displayText}
			onPageSelection={(page) => setSelectedPage(page)}
		/>
	);
};

export const CustomMessageText = (args): JSX.Element => {
	const [selectedPage, setSelectedPage] = useState(1);

	return (
		<SolacePagination
			totalResults={args.totalResults || 156}
			activePage={selectedPage}
			pageSize={args.pageSize || 50}
			displayText={args.displayText || "Showing page ${activePage} with ${pageSize} results"}
			onPageSelection={(page) => setSelectedPage(page)}
		/>
	);
};
