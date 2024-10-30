import { SvgIcon } from "@SolaceDev/maas-react-components";
import React from "react";

const ListViewIcon = (): JSX.Element => {
	return (
		<SvgIcon sx={{ width: `24px`, height: `24px` }} viewBox="0 0 24 24">
			<g clipPath="url(#clip0_1284_65145)">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M20 3C21.1046 3 22 3.89543 22 5V19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19V5C2 3.89543 2.89543 3 4 3H20ZM10 5H20V8.41162H10V5ZM10 19H20V15.7061H10V19ZM8 15.7061V19H4V15.7061H8ZM10 13.7061H20V10.4116H10V13.7061ZM8 10.4116V13.7061H4V10.4116H8ZM8 8.41162H4V5H8V8.41162Z"
					fill="currentColor"
				/>
			</g>
			<defs>
				<clipPath id="clip0_1284_65145">
					<rect width={24} height={24} fill="white" />
				</clipPath>
			</defs>
		</SvgIcon>
	);
};

export { ListViewIcon };
