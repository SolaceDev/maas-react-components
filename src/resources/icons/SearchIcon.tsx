import { SvgIcon, useTheme } from "@mui/material";

export const SearchIcon = ({ size = 24, fill = "" }): JSX.Element => {
	const theme = useTheme();
	return (
		<SvgIcon sx={{ width: `${size}px`, height: `${size}px` }} viewBox="0 0 24 24">
			<g>
				<path
					d="M10.504,3.13C6.402,3.13,3,6.53,3,10.63S6.402,18,10.504,18c1.701,0,3.202-0.37,4.503-1.37l4.442,4.09
		c0.1,0.1,0.2,0.15,0.3,0.15c0.1,0,0.2-0.05,0.3-0.15l0.8-0.8c0.2-0.2,0.2-0.4,0-0.6l-4.342-4.19c0.901-1.2,1.492-2.8,1.492-4.5
		C18,6.53,14.606,3.13,10.504,3.13L10.504,3.13z M10.504,16c-3.002,0-5.503-2.37-5.503-5.37s2.501-5.5,5.503-5.5S16,7.63,16,10.63
		S13.506,16,10.504,16L10.504,16z"
					fill={fill || theme.palette.ux.secondary.wMain}
				/>
			</g>
		</SvgIcon>
	);
};
