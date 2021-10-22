import React from "react";
import { SvgIcon } from "@material-ui/core";

const CheckboxIcon = (props: { children?: React.ReactNode }) => (
	<SvgIcon width="24" height="24" viewBox="0 0 24 24" fill="none">
		<rect width="24" height="24" rx="4" fill="white" />
		<rect x="0.5" y="0.5" width="23" height="23" rx="3.5" stroke="black" strokeOpacity="0.2" fillOpacity="0" />
		{props.children}
	</SvgIcon>
);

export const RestingCheckBoxIcon = <CheckboxIcon />;

export const SelectedCheckBoxIcon = (
	<CheckboxIcon>
		<path
			d="M2.95765 7.91172C2.32003 7.38283 1.37438 7.47097 0.845484 8.10859C0.316589 8.74621 0.404729 9.69186 1.04235 10.2208L2.95765 7.91172ZM6.74244 13L5.78479 14.1545C6.41919 14.6807 7.35935 14.5965 7.89009 13.9659L6.74244 13ZM17.1477 2.96586C17.6811 2.33203 17.5997 1.38578 16.9659 0.852346C16.332 0.318915 15.3858 0.400306 14.8523 1.03414L17.1477 2.96586ZM1.04235 10.2208L5.78479 14.1545L7.70009 11.8455L2.95765 7.91172L1.04235 10.2208ZM7.89009 13.9659L17.1477 2.96586L14.8523 1.03414L5.59478 12.0341L7.89009 13.9659Z"
			transform="translate(3, 5)"
		/>
	</CheckboxIcon>
);

export const IndeterminateCheckBoxIcon = (
	<CheckboxIcon>
		<line x1="5" y1="12" x2="19" y2="12" stroke="#00C895" strokeWidth="3" strokeLinecap="round" />
	</CheckboxIcon>
);
