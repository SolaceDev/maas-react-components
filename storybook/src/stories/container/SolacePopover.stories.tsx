import React from "react";
import { Decorator, Meta } from "@storybook/react";
import { HelpOutlineOutlinedIcon, SolaceButton, SolacePopover } from "@SolaceDev/maas-react-components";
import { userEvent, within } from "@storybook/test";

(SolacePopover as React.FC & { displayName?: string }).displayName = "SolacePopover";
(SolaceButton as React.FC & { displayName?: string }).displayName = "SolaceButton";
(HelpOutlineOutlinedIcon as React.FC & { displayName?: string }).displayName = "HelpOutlineOutlinedIcon";

// Create a decorator to include the tooltip & popover inside the snapshot"
const withSnapshotContainer: Decorator = (Story) => {
	return (
		<div id="snapshot" style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh" }}>
			<div style={{ margin: "16px" }}>
				<Story />
			</div>
		</div>
	);
};

export default {
	title: "Container/Popover",
	component: SolacePopover,
	properties: {
		docs: {
			description: {
				component: "Code component name: SolacePopover"
			}
		}
	},
	argTypes: {
		id: {
			control: { type: "text" }
		},
		placement: {
			options: [
				"bottom-end",
				"bottom-start",
				"bottom",
				"left-end",
				"left-start",
				"left",
				"right-end",
				"right-start",
				"right",
				"top-end",
				"top-start",
				"top"
			],
			control: {
				type: "select"
			}
		},
		disableHoverListener: {
			control: { type: "boolean" }
		},
		disableFocusListener: {
			control: { type: "boolean" }
		},
		enterDelay: {
			control: { type: "number" }
		},
		enterNextDelay: {
			control: { type: "number" }
		},
		useAnimation: {
			control: { type: "boolean" },
			description: "Enable or disable the popover animation",
			defaultValue: true
		}
	},
	decorators: [withSnapshotContainer]
} as Meta<typeof SolacePopover>;

export const DefaultPopover = {
	args: {
		title: "simple text",
		children: <span data-testid="popover-details">Hover content</span>,
		variant: "html",
		maxWidth: "medium"
	},
	decorators: [withSnapshotContainer],
	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		const triggerElement = canvas.getByTestId("popover-details");
		await userEvent.hover(triggerElement);
	}
};

DefaultPopover.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	await userEvent.hover(canvas.getByText("Hover content"));
};

const MyComp = ({ myRef, ...props }) => {
	return (
		<div
			{...props}
			ref={myRef}
			style={{ width: "180px", backgroundColor: "skyblue", padding: "20px", textAlign: "center", cursor: "pointer" }}
			data-testid="popover-details"
		>
			Custom Component
		</div>
	);
};

const MyCompForwardRef = React.forwardRef((props, ref) => {
	return <MyComp {...props} myRef={ref} />;
});

export const CustomComponent = {
	args: {
		title: "simple text",
		children: <MyCompForwardRef />,
		maxWidth: "medium"
	},
	decorators: [withSnapshotContainer],
	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		const triggerElement = canvas.getByTestId("popover-details");
		await userEvent.hover(triggerElement);
	}
};

CustomComponent.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	await userEvent.hover(canvas.getByText("Custom Component"));
};

/**
 * Using Enum version list as an example to demonstrate how to customize both the hover over element and the Popover component
 */

// mock-up data
const enumVersionList = [
	{
		version: "1.1.0",
		desc: "description for version 1.1.0",
		values: ["value1", "value2", "value3", "value4", "value5", "value6", "value7", "value8", "value9", "value10"]
	},
	{
		version: "1.1.1",
		desc: "description for version 1.1.1",
		values: ["value1", "value2", "value3", "value4", "value5", "value6", "value7", "value8", "value9"]
	},
	{
		version: "1.1.2",
		desc: "description for version 1.1.2",
		values: ["value1", "value2", "value3", "value4", "value5", "value6", "value7", "value8"]
	},
	{
		version: "1.1.3",
		desc: "description for version 1.1.3",
		values: ["value1", "value2", "value3", "value4", "value5", "value6", "value7", "value8", "value9", "value10"]
	},
	{
		version: "1.1.4",
		desc: "description for version 1.1.4",
		values: ["value1", "value2", "value3", "value4", "value5", "value6", "value7", "value8", "value9", "value10"]
	}
];

// custom Popover component
const EnumVersionPopover = ({ desc, values }) => {
	return (
		<div>
			<h3>Description</h3>
			<div>{desc}</div>
			<h3>Values ({values.length})</h3>
			{values.map((value, index) => {
				return <div key={index}>{value}</div>;
			})}
		</div>
	);
};

interface EnumVersionItemProps {
	item: unknown;
}

// custom hover over element, in this case, an Enum list item
const EnumVersionItem = ({ item, itemRef, ...props }) => {
	return (
		<div
			{...props}
			ref={itemRef}
			style={{ width: "200px", height: "auto", padding: "10px", border: "1px solid lightgrey", cursor: "pointer" }}
		>
			{item.version}
		</div>
	);
};

export const EnumVersionList = () => {
	// to properly apply ref
	// use forwardRef
	const EnumVersionItemForwardRef = React.forwardRef<HTMLElement, React.PropsWithChildren<EnumVersionItemProps>>(
		(props, ref) => {
			return <EnumVersionItem {...props} item={props.item} itemRef={ref} />;
		}
	);
	return (
		<div
			style={{
				width: "250px",
				height: "250px",
				padding: "10px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "flex-start"
			}}
		>
			<div>Enum versions</div>
			<div>
				{enumVersionList.map((item, index) => {
					return (
						<div key={index}>
							<SolacePopover
								title={<EnumVersionPopover desc={item.desc} values={item.values} />}
								placement="right-start"
							>
								<EnumVersionItemForwardRef item={item} data-testid={`popover-details-${index}`} />
							</SolacePopover>
						</div>
					);
				})}
			</div>
		</div>
	);
};

(EnumVersionList.decorators = [withSnapshotContainer]),
	(EnumVersionList.play = async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		const triggerElement = canvas.getByTestId("popover-details-2");
		await userEvent.hover(triggerElement);
	});

export const HtmlPopover = {
	args: {
		title: (
			<div>
				<span>Semantic versioning is in the form of MAJOR.MINOR.PATCH format. For additional information, see </span>
				<SolaceButton variant="link" href="https://semver.org">
					Semantic versioning best practices
				</SolaceButton>
			</div>
		),
		children: <HelpOutlineOutlinedIcon data-testid="version-details" />
	},
	decorators: [withSnapshotContainer],
	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		const triggerElement = canvas.getByTestId("version-details");
		await userEvent.hover(triggerElement);
	}
};

export const HtmlPopoverMediumWidth = {
	args: {
		title: (
			<div>
				<span>Semantic versioning is in the form of MAJOR.MINOR.PATCH format. For additional information, see </span>
				<SolaceButton variant="link" href="https://semver.org">
					Semantic versioning best practices
				</SolaceButton>
			</div>
		),
		children: <HelpOutlineOutlinedIcon data-testid="version-details" />,
		variant: "html",
		maxWidth: "medium"
	},
	decorators: [withSnapshotContainer],
	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		const triggerElement = canvas.getByTestId("version-details");
		await userEvent.hover(triggerElement);
	}
};

export const PopoverWithoutAnimation = {
	args: {
		title: "Popover without animation",
		children: <span data-testid="no-animation-popover">Hover me (no animation)</span>,
		useAnimation: false,
		maxWidth: "medium"
	},
	decorators: [withSnapshotContainer],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const triggerElement = canvas.getByTestId("no-animation-popover");
		await userEvent.hover(triggerElement);
	}
};
