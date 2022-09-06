import { SvgIcon, useTheme } from "@mui/material";

export interface SortIconProps {
	fill?: string;
}

export const AscendingSortIcon = ({ fill }: SortIconProps): JSX.Element => {
	const defaultFill = useTheme().palette.ux.secondary.wMain;
	return (
		<SvgIcon className="asc" sx={{ width: "16px", height: "10px" }} viewBox="0 0 16 10" fill="none">
			<g transform="translate(9,0)">
				<path
					d="M3.91344 0.413412L6.15855 2.65852C6.46226 2.96224 6.23806 3.49063 5.80323 3.49595L1.25738 3.55158C0.822545 3.5569 0.611212 3.03383 0.922448 2.72259L3.22318 0.421858C3.41613 0.228918 3.72516 0.225137 3.91344 0.413412Z"
					fill={fill ?? defaultFill}
				/>
				<g transform="translate(0,6)">
					<path
						d="M3.88969 3.71893L6.21811 1.39051C6.5331 1.07552 6.31001 0.536952 5.86456 0.536952L1.20771 0.536952C0.762253 0.536952 0.539169 1.07552 0.854152 1.39051L3.18258 3.71893C3.37784 3.91419 3.69442 3.91419 3.88969 3.71893Z"
						fill="none"
						fillOpacity="0"
					/>
				</g>
			</g>
		</SvgIcon>
	);
};

export const DescendingSortIcon = ({ fill }: SortIconProps): JSX.Element => {
	const defaultFill = useTheme().palette.ux.secondary.wMain;
	return (
		<SvgIcon className="desc" sx={{ width: "16px", height: "10px" }} viewBox="0 0 16 10" fill="none">
			<g transform="translate(9,0)">
				<path
					d="M3.91344 0.413412L6.15855 2.65852C6.46226 2.96224 6.23806 3.49063 5.80323 3.49595L1.25738 3.55158C0.822545 3.5569 0.611212 3.03383 0.922448 2.72259L3.22318 0.421858C3.41613 0.228918 3.72516 0.225137 3.91344 0.413412Z"
					fill="none"
					fillOpacity="0"
				/>
				<g transform="translate(0,6)">
					<path
						d="M3.88969 3.71893L6.21811 1.39051C6.5331 1.07552 6.31001 0.536952 5.86456 0.536952L1.20771 0.536952C0.762253 0.536952 0.539169 1.07552 0.854152 1.39051L3.18258 3.71893C3.37784 3.91419 3.69442 3.91419 3.88969 3.71893Z"
						fill={fill ?? defaultFill}
					/>
				</g>
			</g>
		</SvgIcon>
	);
};

export const UnsortedIcon = ({ fill }: SortIconProps): JSX.Element => {
	const defaultFill = useTheme().palette.ux.secondary.w40;
	return (
		<SvgIcon className="unsorted" sx={{ width: "16px", height: "10px" }} viewBox="0 0 16 10" fill="none">
			<g transform="translate(9,0)">
				<path
					d="M3.91344 0.413412L6.15855 2.65852C6.46226 2.96224 6.23806 3.49063 5.80323 3.49595L1.25738 3.55158C0.822545 3.5569 0.611212 3.03383 0.922448 2.72259L3.22318 0.421858C3.41613 0.228918 3.72516 0.225137 3.91344 0.413412Z"
					fill={fill ?? defaultFill}
				/>
				<g transform="translate(0,6)">
					<path
						d="M3.88969 3.71893L6.21811 1.39051C6.5331 1.07552 6.31001 0.536952 5.86456 0.536952L1.20771 0.536952C0.762253 0.536952 0.539169 1.07552 0.854152 1.39051L3.18258 3.71893C3.37784 3.91419 3.69442 3.91419 3.88969 3.71893Z"
						fill={fill ?? defaultFill}
					/>
				</g>
			</g>
		</SvgIcon>
	);
};
