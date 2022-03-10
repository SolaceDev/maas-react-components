import { SvgIcon } from "@mui/material";

export interface DeleteIconProps {
	fill?: string;
	opacity?: number;
}

export const DeleteIcon = ({ fill, opacity }: DeleteIconProps): JSX.Element => {
	return (
		<SvgIcon width="24" height="24" viewBox="0 0 24 24" fill="none">
			<g transform="translate(5,3)">
				<path
					d="M9.5 0H4.5L3.5 1H0.401C0.179 1 0 1.179 0 1.401V2.599C0 2.821 0.179 3 0.401 3H13.599C13.821 3 14 2.821 14 2.599V1.401C14 1.179 13.821 1 13.599 1H10.5L9.5 0ZM10.875 6L10.118 16H3.882L3.125 6H10.875ZM12.59 4H1.39C1.159 4 0.982 4.196 1 4.426L2 17.634C2.016 17.841 2.193 18 2.4 18H11.6C11.807 18 11.984 17.841 12 17.635L13 4.427C13.018 4.196 12.82 4 12.59 4Z"
					fill={fill}
					opacity={opacity}
				/>
			</g>
		</SvgIcon>
	);
};
