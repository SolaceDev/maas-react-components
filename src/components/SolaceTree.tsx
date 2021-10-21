import React from "react";
import { Box, Grid, Stack } from "@material-ui/core";

const TreeConnector: React.FC<{ borderWidth: string; borderRadius: string; color: string }> = ({
	borderWidth,
	borderRadius,
	color
}) => {
	const borderProperties1 = borderWidth + " solid " + color;

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
	connectorOffset: string; // offset of the child display stack from the connector stack
	connectorWidth: string; // width of the connector
	leftOffset: string; // distance from the left margin
	connectorBorderRadius: string; // radius of the corner on the connector
	connectorStroke: string; // size of connector stroke
	connectorColor: string;
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
	const {
		rowHeight,
		connectorOffset,
		connectorBorderRadius,
		connectorWidth,
		spacing,
		leftOffset,
		connectorStroke,
		connectorColor
	} = props;
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
							<Stack>
								{obj.treeChildren.map((_child, index) => (
									<Box
										sx={{
											width: connectorWidth,
											height: index === 0 ? "calc(" + rowHeight + " - " + connectorOffset + ")" : rowHeight
										}}
									>
										<TreeConnector
											borderWidth={connectorStroke}
											borderRadius={connectorBorderRadius}
											color={connectorColor}
										></TreeConnector>
									</Box>
								))}
							</Stack>
						</Grid>
						<Grid item sx={{ flexGrow: 1 }}>
							<Stack>
								<Box sx={{ height: "10px" }}></Box>
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
	spacing: 0,
	rowHeight: "45px",
	connectorOffset: "25px",
	connectorWidth: "20px",
	leftOffset: "20px",
	connectorBorderRadius: "2px",
	connectorStroke: "1px",
	connectorColor: "#808080"
};
