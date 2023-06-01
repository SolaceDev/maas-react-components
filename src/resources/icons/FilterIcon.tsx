import { SvgIcon, useTheme } from "@mui/material";

export const FilterIcon = ({ size = 24, fill = "" }): JSX.Element => {
	const theme = useTheme();
	return (
		<SvgIcon sx={{ width: `${size}px`, height: `${size}px` }} viewBox="0 0 24 24">
			<g>
				<path
					d="M20.598,18H16.4c-0.356,0-0.535,0.431-0.283,0.683l2.13,2.2C18.325,20.961,18.428,21,18.53,21
                    c0.102,0,0.205-0.039,0.283-0.117l2.068-2.2C21.133,18.431,20.954,18,20.598,18z M17.798,5l-4.522,6L13,11.462V12v3.899L11,17.4V12
                    v-0.538L10.723,11L6.201,5H17.798z M20.6,3H3.4C3.067,3,2.801,3.379,3,3.645L9,12v8.6C9,20.84,9.196,21,9.404,21
                    c0.088,0,0.178-0.022,0.256-0.087L14.853,17C14.945,16.924,15,16.817,15,16.698V12l6-8.4C21.2,3.334,20.932,3,20.6,3z"
					fill={fill || theme.palette.ux.secondary.wMain}
				/>
			</g>
		</SvgIcon>
	);
};
