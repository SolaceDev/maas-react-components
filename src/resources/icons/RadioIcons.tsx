import { SvgIcon } from "@material-ui/core";

const SIZE = 24;

function Container() {
	return <circle className="SolaceRadioContainer" cx={SIZE / 2} cy={SIZE / 2} r={SIZE / 2 - 1}></circle>;
}

export const RestingRadioIcon = (
	<SvgIcon width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
		<Container></Container>
	</SvgIcon>
);

export const SelectedRadioIcon = (
	<SvgIcon width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
		<Container />
		<circle className="SolaceRadioSelection" cx={SIZE / 2} cy={SIZE / 2} r={SIZE / 4}></circle>
	</SvgIcon>
);
