import { useTheme } from "@mui/material";

export const EllipsisIcon = ({ fill = "" }): JSX.Element => {
	const defaultFill = useTheme().palette.ux?.secondary.wMain;
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="8" viewBox="0 0 24 8" fill="none">
			<circle cx="6" cy="4" r="2" fill={fill || defaultFill} />
			<circle cx="12" cy="4" r="2" fill={fill || defaultFill} />
			<circle cx="18" cy="4" r="2" fill={fill || defaultFill} />
		</svg>
	);
};
