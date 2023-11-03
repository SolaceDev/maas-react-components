import { Breadcrumbs, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SolaceButton from "./form/SolaceButton";

import SolaceComponentProps from "./SolaceComponentProps";

type Paths = {
	title: string;
	link: string;
	current: boolean;
};

export interface SolaceBreadcrumbProps extends SolaceComponentProps {
	id?: string;
	paths: Paths[];
	maxItems: number;
	onRouteClick: (route: string) => void;
}

function SolaceBreadcrumb({ id, paths, maxItems = 8, onRouteClick }: SolaceBreadcrumbProps): JSX.Element {
	const routes: JSX.Element[] = [];

	const handleRouteClick = (route: string) => {
		onRouteClick(route);
	};

	paths.forEach((path) => {
		{
			!path.current &&
				routes.push(
					<Link underline="hover">
						<SolaceButton variant="link" dense={true} onClick={() => handleRouteClick(path.link)} dataQa={path.link}>
							{path.title}
						</SolaceButton>
					</Link>
				);
		}
		{
			path.current &&
				routes.push(
					<Link underline="none" component="span">
						{path.title}
					</Link>
				);
		}
	});

	return (
		<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} maxItems={maxItems} data-qa="breadcrumbs" key={id}>
			{routes}
		</Breadcrumbs>
	);
}

export default SolaceBreadcrumb;
