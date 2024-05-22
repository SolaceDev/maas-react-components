import { IconProps } from "./IconProps";
import { SvgIcon } from "@mui/material";

export function InfoIcon({ size, fill }: IconProps): JSX.Element {
	return (
		<SvgIcon sx={{ width: `${size}px`, height: `${size}px` }} viewBox="0 0 24 24">
			<path
				d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,20c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8S16.4,20,12,20
					z M12.6,7h-1.2C11.2,7,11,7.2,11,7.4v1.2C11,8.8,11.2,9,11.4,9h1.2C12.8,9,13,8.8,13,8.6V7.4C13,7.2,12.8,7,12.6,7z M12.6,10h-1.2
					c-0.2,0-0.4,0.2-0.4,0.4v6.2c0,0.2,0.2,0.4,0.4,0.4h1.2c0.2,0,0.4-0.2,0.4-0.4v-6.2C13,10.2,12.8,10,12.6,10z"
				fill={fill}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z"
				fill={fill}
			/>
		</SvgIcon>
	);
}
