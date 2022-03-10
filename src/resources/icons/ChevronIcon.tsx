import { SvgIcon } from "@mui/material";

export const ChevronIcon = ({ size = 16, stroke = "rgba(0, 0, 0, 0.5)", className = "" }): JSX.Element => {
	return (
		<SvgIcon className={className} sx={{ width: `${size}px`, height: `${size}px` }} viewBox="0 0 24 24">
			<g stroke={stroke} strokeWidth="3px" strokeLinecap="round" fill="none">
				<path d="M15 2 L5 12 L15 22"></path>
			</g>
		</SvgIcon>
	);
};
