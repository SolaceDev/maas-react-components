import React from "react";
import { Box, Grid, Stack } from "@material-ui/core";

const TreeConnector: React.FC<{ borderWidth: string; borderRadius: string }> = ({ borderWidth, borderRadius }) => {
	const borderProperties1 = borderWidth + " solid";

	return (
		<Box
			sx={{
				borderLeft: borderProperties1,
				borderBottom: borderProperties1,
				height: "100%",
				width: "100%",
				borderRadius: "0 0 0 " + borderRadius
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
	spacing: number; // vertical spacing between indexs of TreeObjects
	rowHeight: string; // height of 1 row
	offset: string; // offset of the child display stack from the connector stack
	connectorWidth: string; // width of the connector
	leftOffset: string; // distance from the left margin
	connectorBorderRadius: string; // radius of the corner on the connector
	connectorStroke: string; // size of connector stroke
}
/**
 *  SolaceDataTree Component
 *  Displays a series of components arranged to look like a tree of height 2.
 *
 *  The "connector" is the part that connects the children to the parent component.
 *
 *  The components passed into this component should all have a uniform height
 *
 * @interface SolaceTree
 * @param props
 * @returns JSX.Element
 *
 */
export default function SolaceTree(props: SolaceTree): JSX.Element {
	const { rowHeight, offset, connectorBorderRadius, connectorWidth, spacing, leftOffset, connectorStroke } = props;
	return (
		<>
			<Stack spacing={spacing}>
				{props.components.map((obj, index) => (
					<Grid key={index} container sx={{ paddingBottom: "5px", width: "100%" }}>
						<Grid item xs={12}>
							{obj.component}
						</Grid>
						<Grid item width={leftOffset}></Grid>
						<Grid item width={connectorWidth}>
							{obj.treeChildren.map(() => (
								<Stack>
									<Box sx={{ width: connectorWidth, height: rowHeight }}>
										<TreeConnector borderWidth={connectorStroke} borderRadius={connectorBorderRadius}></TreeConnector>
									</Box>
								</Stack>
							))}
						</Grid>
						<Grid item sx={{ flexGrow: 1 }}>
							<Stack>
								<Box sx={{ height: offset }}></Box>
								{obj.treeChildren.map((component) => (
									<Box sx={{ height: rowHeight }}>{component}</Box>
								))}
							</Stack>
						</Grid>
					</Grid>
				))}
			</Stack>
		</>
	);
}

SolaceTree.defaultProps = {
	spacing: 2,
	rowHeight: "45px",
	offset: "30px",
	connectorWidth: "20px",
	leftOffset: "20px",
	connectorBorderRadius: "2px",
	connectorStroke: "3px"
};
