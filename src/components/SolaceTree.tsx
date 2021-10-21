import React from "react";
import { Box, Grid, Stack } from "@material-ui/core";

const TreeConnector = ({ borderWidth, borderRadius, color }) => {
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
	treeChildren?: TreeObject[];
	component: JSX.Element;
}
const hasChildren = (child: TreeObject) => child.treeChildren && child.treeChildren.length >= 0;

const offsetCalculation = (rowHeight: string, connectorOffset: string) =>
	"(" + rowHeight + " - " + connectorOffset + ")";

// I really hope this works
export const createHeightCalculation = (
	node: TreeObject | undefined,
	rowHeight: string,
	connectorOffset: string
): string => {
	const calculateHeight = (index: number, rowHeight: string, connectorOffset: string) =>
		index != 0 ? "(" + rowHeight + ")" : offsetCalculation(rowHeight, connectorOffset);

	if (!node) {
		return calculateHeight(0, rowHeight, connectorOffset);
	} else {
		return "(" + countNodes(node) + " * " + rowHeight + ")";
	}
};

const countNodes = (node: TreeObject): number => {
	if (node.treeChildren && node.treeChildren.length > 0) {
		return node.treeChildren
			.map((child) => countNodes(child))
			.concat([1])
			.reduce((acc, value) => acc + value, 0);
	} else {
		return 1;
	}
};
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
	const childProps = (components: TreeObject[]) => {
		const newProps = { ...props };
		newProps.components = components;
		return newProps;
	};

	return (
		<Stack spacing={spacing}>
			{props.components.map(({ component, treeChildren }, index) => (
				<Grid key={index} container sx={{ width: "100%" }}>
					<Grid item xs={12}>
						<Box height={rowHeight}>{component}</Box>
					</Grid>
					{treeChildren && (
						<>
							<Grid item width={leftOffset}></Grid>
							<Grid item width={connectorWidth}>
								<Stack>
									{treeChildren.map((_child, index) => (
										<Box
											sx={{
												width: connectorWidth,
												height:
													"calc" +
													createHeightCalculation(
														index >= 1 ? treeChildren[index - 1] : undefined,
														rowHeight,
														connectorOffset,
														index
													)
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
									{treeChildren.map((child) =>
										hasChildren(child) ? (
											<SolaceTree {...childProps([child] as TreeObject[])} />
										) : (
											<Box sx={{ height: rowHeight }}>{child.component}</Box>
										)
									)}
								</Stack>
							</Grid>
						</>
					)}
				</Grid>
			))}
		</Stack>
	);
}

SolaceTree.defaultProps = {
	spacing: 0,
	rowHeight: "45px",
	connectorOffset: "35px",
	connectorWidth: "10px",
	leftOffset: "5px",
	connectorBorderRadius: "2px",
	connectorStroke: "1px",
	connectorColor: "#808080"
};
