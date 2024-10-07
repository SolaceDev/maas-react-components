import { SvgIcon } from "@mui/material";

export const ArrowLeftIcon = ({ className = "" }): JSX.Element => {
	return (
		<SvgIcon className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" data-testid="ArrowLeftIcon">
			<path
				d="M14.27,6.117l0.838,0.883c0.156,0.156,0.156,0.373,0,0.529l-4.443,4.46l4.443,4.481c0.156,0.156,0.169,0.373,0.013,0.529
    l-0.851,0.883c-0.156,0.156-0.414,0.156-0.57,0l-5.583-5.61c-0.156-0.156-0.156-0.41,0-0.567l5.583-5.61
    C13.857,5.961,14.114,5.961,14.27,6.117z"
			/>
		</SvgIcon>
	);
};
