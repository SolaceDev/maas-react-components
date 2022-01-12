import React from "react";
import { ComponentMeta } from "@storybook/react";
import { SolacePopover } from "@SolaceDev/maas-react-components";

export default {
	title: "Forms/SolacePopover",
	component: SolacePopover,
	argTypes: {
		id: {
			control: { type: "text" },
			description: "Unique identifier for the popover"
		}
	}
} as ComponentMeta<typeof SolacePopover>;

export const DefaultPopover = () => {
	return (
		<div>
			<SolacePopover title="simple text">
				<span>Hover content</span>
			</SolacePopover>
		</div>
	);
};

const MyComp = ({ myRef, ...props }) => {
	return (
		<div
			{...props}
			ref={myRef}
			style={{ width: "180px", backgroundColor: "skyblue", padding: "20px", textAlign: "center" }}
		>
			Custom Component
		</div>
	);
};

export const CustomComponent = () => {
	const MyCompForwardRef = React.forwardRef((props, ref) => {
		return <MyComp {...props} myRef={ref} />;
	});
	return (
		<div>
			<SolacePopover title="simple text" placement="bottom-end">
				<MyCompForwardRef />
			</SolacePopover>
		</div>
	);
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
	item: any;
}

// custom hover over element, in this case, an Enum list item
const EnumVersionItem = ({ item, itemRef, ...props }) => {
	return (
		<div
			{...props}
			ref={itemRef}
			style={{ width: "200px", height: "auto", padding: "10px", border: "1px solid lightgrey" }}
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
								<EnumVersionItemForwardRef item={item} />
							</SolacePopover>
						</div>
					);
				})}
			</div>
		</div>
	);
};
