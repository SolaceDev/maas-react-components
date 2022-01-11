import React from "react";
import { ComponentMeta } from "@storybook/react";
import { SolaceTooltip } from "@SolaceDev/maas-react-components";

export default {
	title: "Forms/SolaceTooltip",
	component: SolaceTooltip,
	argTypes: {
		id: {
			control: { type: "text" },
			description: "Unique identifier for the popover"
		},
		anchorOrigin: {
			description: "The anchoring position where the popover's anchorEl will attach to",
			table: {
				defaultValue: {
					vertical: "top",
					horizontal: "left"
				}
			}
		},
		anchorPosition: {
			description: "",
			table: {
				defaultValue: {}
			}
		},
		transformOrigin: {
			description: "",
			table: {
				defaultValue: {}
			}
		},
		anchorReference: {
			description: ""
		},
		marginThreshold: {
			control: { type: "number" },
			description: ""
		},
		anchorElement: {
			control: { type: "object" },
			description: ""
		},
		children: {
			control: { type: "object" },
			description: ""
		}
	}
} as ComponentMeta<typeof SolaceTooltip>;

export const SimpleTooltip = () => {
	return (
		<div>
			<SolaceTooltip title="simple text">
				<div>Hover Tooltip</div>
			</SolaceTooltip>
		</div>
	);
};

const MyComp = ({ buttonRef, ...props }) => {
	return (
		<button {...props} ref={buttonRef}>
			My Custom Button
		</button>
	);
};

export const CustomComponent = () => {
	const MyCompForwardRef = React.forwardRef((props, ref) => {
		return <MyComp {...props} buttonRef={ref} />;
	});
	return (
		<div>
			<SolaceTooltip title="simple text">
				<MyCompForwardRef />
			</SolaceTooltip>
		</div>
	);
};

const enumVersionList = [
	{
		version: "1.1.0",
		desc: "description for version 1.1.0",
		values: ["value1", "value2", "value3", "value4", "value5", "value6", "value7", "value8", "value9", "value10"]
	},
	{
		version: "1.1.1",
		desc: "description for version 1.1.1",
		values: ["value1", "value2", "value3", "value4", "value5", "value6", "value7", "value8", "value9", "value10"]
	},
	{
		version: "1.1.2",
		desc: "description for version 1.1.2",
		values: ["value1", "value2", "value3", "value4", "value5", "value6", "value7", "value8", "value9", "value10"]
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

const EnumDescComponent = ({ desc, values }) => {
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

export const EnumVersionList = () => {
	return (
		<div style={{ width: "100px", border: "1px solid orange" }}>
			{enumVersionList.map((item, index) => {
				return (
					<div key={index}>
						<SolaceTooltip title={<EnumDescComponent desc={item.desc} values={item.values} />}>
							<div style={{ padding: "10px", border: "1px solid skyblue" }}>{item.version}</div>
						</SolaceTooltip>
					</div>
				);
			})}
		</div>
	);
};
