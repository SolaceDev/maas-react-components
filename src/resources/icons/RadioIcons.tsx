import React from "react";
import { SvgIcon } from "@material-ui/core";

export const RestingRadioIcon = (
	<SvgIcon width="24" height="24" viewBox="0 0 24 24" fill="none">
		<rect width="24" height="24" rx="12" fill="white" />
		<rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="black" strokeOpacity="0.2" fillOpacity="0" />
	</SvgIcon>
);

export const SelectedRadioIcon = (
	<SvgIcon width="24" height="24" viewBox="0 0 24 24" fill="none">
		<rect width="24" height="24" rx="12" fill="white" />
		<rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="black" strokeOpacity="0.2" fillOpacity="0" />
		<circle cx="6" cy="6.27051" r="6" fill="#00C895" transform="translate(6, 6)" />
	</SvgIcon>
);
