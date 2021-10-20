import React from "react";
import { Box, Grid, Stack } from "@material-ui/core";

// it should display an array of components where one component is a parent with multiple children
const toPx = (num: number) => num + "px";

const TreeConnectorSVG: React.FC = () => {
	const borderProperties1 = "2px solid";

	return (
		<Box
			sx={{
				borderLeft: borderProperties1,
				borderBottom: borderProperties1,
				height: "100%",
				width: "100%",
				borderRadius: "0 0 0 10px"
			}}
		></Box>
	);
};

export interface TreeObject {
	treeChildren: JSX.Element[];
	component: JSX.Element;
}

interface SolaceTree {
	components: TreeObject[];
	config: {
		spacing: number;
		width: string;
		height: string;
		verticalAlign: string;
		paddingLeftConnector: string;
	};
	rowHeight: string;
	offset: string;
	connectorColor: string;
}
/**
 *  SolaceDataTree Component
 *  Displays a series of components
 *
 * @interface SolaceToolTip
 * @param props
 * @returns JSX.Element
 *
 */
export default function SolaceTree(props: SolaceTree): JSX.Element {
	const { config } = props;
	const rowHeight = 40;
	const offset = rowHeight - 10;
	return (
		<>
			<Stack spacing={config.spacing}>
				{props.components.map((obj, index) => (
					<Grid key={index} container sx={{ paddingBottom: "5px", width: "100%" }}>
						<Grid item xs={12}>
							{obj.component}
						</Grid>
						<Grid item width={20}></Grid>
						<Grid item width={config.width}>
							{obj.treeChildren.map(() => (
								<Stack>
									<Box sx={{ width: config.width, height: toPx(rowHeight) }}>
										<TreeConnectorSVG></TreeConnectorSVG>
									</Box>
								</Stack>
							))}
						</Grid>
						<Grid item>
							<Stack>
								<Box sx={{ height: toPx(offset) }}></Box>
								{obj.treeChildren.map((component) => (
									<Box sx={{ height: toPx(rowHeight) }}>{component}</Box>
								))}
							</Stack>
						</Grid>
					</Grid>
				))}
			</Stack>
		</>
	);
}

const width = 20;
const height = 30;

SolaceTree.defaultProps = {
	config: {
		spacing: 2,
		width: toPx(width),
		height: toPx(height),
		paddingLeftConnector: "10"
	},
	rowHeight: "40px",
	offset: "30px"
};
