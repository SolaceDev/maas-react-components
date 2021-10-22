import React from "react";
import { Box, Grid, Stack, Theme, useTheme } from "@material-ui/core";
import SolaceComponentProps from "./SolaceComponentProps";

const TreeConnector = (config: { borderWidth: number; borderRadius: number; color: string; theme: Theme }) => {
	const { borderWidth, borderRadius, color, theme } = config;
	const borderProperties = theme.spacing(borderWidth) + " solid " + color;
	return (
		<Box
			sx={{
				borderLeft: borderProperties,
				borderBottom: borderProperties,
				height: "100%",
				width: "100%",
				borderRadius: "0 0 0 " + theme.spacing(borderRadius)
			}}
		></Box>
	);
};
export interface TreeNode {
	children?: TreeNode[];
	component: JSX.Element;
}
const hasChildren = (child: TreeNode) => child.children && child.children.length >= 0;

// calculates the height in theme units of a node and it's children
export const createHeightCalculation = (
	node: TreeNode | undefined,
	rowHeight: number,
	connectorOffset: number,
	index: number
): number => {
	if (!node) {
		return index != 0 ? rowHeight : rowHeight - connectorOffset;
	} else {
		return countNodes(node) * rowHeight;
	}
};
// counts children nodes of a node
const countNodes = (node: TreeNode): number => {
	if (node.children && node.children.length > 0) {
		return node.children
			.map((child) => countNodes(child))
			.concat([1])
			.reduce((acc, value) => acc + value, 0);
	} else {
		return 1;
	}
};

interface SolaceTree extends SolaceComponentProps {
	components: TreeNode[];
	rowHeight: number; // height of 1 row
	connectorOffset: number; // offset of the child display stack from the connector stack
	connectorWidth: number; // width of the connector
	leftOffset: number; // distance from the left margin
	connectorBorderRadius: number; // radius of the corner on the connector
	connectorStroke: number; // size of connector stroke
	connectorColor: string;
	theme: Theme;
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
		leftOffset,
		connectorStroke,
		connectorColor
	} = props;
	const theme = useTheme();
	const sp = theme.spacing;
	const childProps = (components: TreeNode[]) => {
		const newProps = { ...props };
		newProps.components = components;
		return newProps;
	};

	console.log(props.components);
	return (
		<Stack>
			{props.components.map(({ component, children }, index) => (
				<Grid key={index} container sx={{ width: "100%" }}>
					<Grid item xs={12}>
						<Box height={sp(rowHeight)}>{component}</Box>
					</Grid>
					{children && (
						<>
							<Grid item width={sp(leftOffset)}></Grid>
							<Grid item width={sp(connectorWidth)}>
								<Stack>
									{children.map((_child, index) => (
										<Box
											sx={{
												width: sp(connectorWidth),
												height: sp(
													createHeightCalculation(
														index >= 1 ? children[index - 1] : undefined,
														rowHeight,
														connectorOffset,
														index
													)
												)
											}}
										>
											<TreeConnector
												borderWidth={connectorStroke}
												borderRadius={connectorBorderRadius}
												color={connectorColor}
												theme={theme}
											/>
										</Box>
									))}
								</Stack>
							</Grid>
							<Grid item sx={{ flexGrow: 1 }}>
								<Stack>
									{children.map((child) =>
										hasChildren(child) ? (
											<SolaceTree {...childProps([child] as TreeNode[])} />
										) : (
											<Box sx={{ height: sp(rowHeight) }}>{child.component}</Box>
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
	rowHeight: 5.5,
	connectorOffset: 4,
	connectorWidth: 2,
	leftOffset: 2,
	connectorBorderRadius: 0.1,
	connectorStroke: 0.1,
	connectorColor: "#808080"
};
