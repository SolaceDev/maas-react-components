import React, { ReactNode, useState } from "react";
import { Meta } from "@storybook/react";
import { SolaceDrawer, SolaceDetailMessage, styled } from "@SolaceDev/maas-react-components";
import NoAccessImg from "../../../resources/images/NoAccessBook";

(SolaceDrawer as React.FC & { displayName?: string }).displayName = "SolaceDrawer";
(SolaceDetailMessage as React.FC & { displayName?: string }).displayName = "SolaceDetailMessage";

enum ANCHOR {
	LEFT = "left",
	RIGHT = "right"
}

const INITIAL_WIDTH = 320;

const CALL_TO_ACTION = "call-to-action";

const drawerMessage = (
	<div style={{ margin: "15px" }}>
		<h3>Drawer</h3>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
			magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
			imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
			velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit adipiscing
			bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu scelerisque felis
			imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
			vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi
			tincidunt. Lorem donec massa sapien faucibus et molestie ac.
		</p>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
			magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
			imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
			velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit adipiscing
			bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu scelerisque felis
			imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
			vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi
			tincidunt. Lorem donec massa sapien faucibus et molestie ac.
		</p>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
			magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
			imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
			velit laoreet id donec ultrices.
		</p>
	</div>
);

export default {
	title: "Container/Drawer",
	component: SolaceDrawer,
	tags: ["!autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"The Drawer component provides a sliding panel that appears from the edge of the screen. Drawers are commonly used for navigation menus, filter panels, or displaying additional information without leaving the current context. They can be anchored to either the left or right side of the screen and can be made resizable to allow users to adjust the viewing area."
			}
		}
	},
	argTypes: {
		open: {
			control: { type: "boolean" },
			description:
				"Controls whether the drawer is visible or hidden. Use this prop to programmatically open or close the drawer based on user interactions or application state.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		width: {
			control: { type: "number" },
			description:
				"Sets the initial width of the drawer in pixels. Choose an appropriate width based on the content to be displayed - wider for complex forms or tables, narrower for simple navigation menus.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "320" }
			}
		},
		resizable: {
			control: { type: "boolean" },
			description:
				"When true, allows users to resize the drawer by dragging its edge. Enable this when users might need to adjust the viewing area based on content needs.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		anchor: {
			control: { type: "select" },
			options: ["left", "right"],
			description:
				"Determines which side of the screen the drawer appears from. Use 'left' for primary navigation menus and 'right' for supplementary information or actions. See enum at https://github.com/SolaceDev/maas-react-components/blob/main/src/types/solaceDrawer.ts",
			table: {
				type: { summary: '"left" | "right"' },
				defaultValue: { summary: '"right"' }
			}
		},
		onResizeDone: {
			description:
				"Callback function that fires when the user finishes resizing the drawer. Use this to capture the new width for persistence or other state management needs.",
			table: {
				type: { summary: "(newWidth: number) => void" },
				defaultValue: { summary: "undefined" }
			}
		},
		minWidth: {
			control: { type: "number" },
			description:
				"Sets the minimum width (in pixels) that the drawer can be resized to. Use this to ensure content remains usable when the drawer is resized.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "100" }
			}
		},
		maxWidth: {
			control: { type: "number" },
			description:
				"Sets the maximum width (in pixels) that the drawer can be resized to. Use this to prevent the drawer from taking up too much screen space.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "1000" }
			}
		},
		top: {
			control: { type: "text" },
			description:
				"CSS property that sets the top position of the drawer. Use this to position the drawer below fixed elements like headers.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: '"0"' }
			}
		},
		height: {
			control: { type: "text" },
			description:
				"CSS property that sets the height of the drawer. Use this to control how much vertical space the drawer occupies.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: '"100%"' }
			}
		},
		offset: {
			control: { type: "text" },
			description:
				"CSS property that sets the distance from the anchor side. Use this when you need the drawer to be inset from the edge of the screen.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		children: {
			description: "Content to be displayed inside the drawer. This can include any React components or HTML elements.",
			table: {
				type: { summary: "React.ReactNode" },
				defaultValue: { summary: "undefined" }
			}
		}
	}
} as Meta<typeof SolaceDrawer>;

export const DefaultDrawer = {
	args: {
		open: true
	},
	parameters: {
		docs: {
			story: {
				before:
					"The default drawer appears from the right side of the screen. This is the most common drawer pattern and is typically used for displaying supplementary information or actions related to the main content.\n\n**Prop Dependencies:**\n- `resizable` - When set to `true`, the `onResizeDone`, `minWidth`, and `maxWidth` props become relevant"
			}
		}
	}
};

export const DefaultLeftDrawerWithOffset = {
	args: {
		open: true,
		anchor: "left",
		offset: "200px"
	},
	parameters: {
		docs: {
			story: {
				before:
					"A left-anchored drawer with an offset from the edge of the screen. This pattern is useful when you have a fixed sidebar or navigation element and need the drawer to appear next to it rather than overlapping it. The `offset` prop is applied based on the `anchor` prop - for 'left' anchored drawers, it sets the left position, and for 'right' anchored drawers, it sets the right position.\n\n**Prop Dependencies:**\n- `anchor` - Affects how the `offset` prop is applied"
			}
		}
	}
};

export const ResizableLeftDrawer = {
	args: {
		open: true,
		anchor: "left",
		resizable: true
	},
	parameters: {
		docs: {
			story: {
				before:
					"A left-anchored drawer that can be resized by the user. This is useful for navigation menus or content panels where users might want to adjust the viewing area based on their needs. When the `resizable` prop is set to true, the `minWidth`, `maxWidth`, and `onResizeDone` props become relevant for controlling the resizing behavior.\n\n**Prop Dependencies:**\n- `resizable` - When set to `true`, enables the `minWidth`, `maxWidth`, and `onResizeDone` props"
			}
		}
	}
};

export const ResizableLeftDrawerWithOffset = {
	args: {
		open: true,
		anchor: "left",
		offset: "200px",
		resizable: true
	},
	parameters: {
		docs: {
			story: {
				before:
					"A left-anchored drawer with both an offset and resizing capability. Use this when you have a fixed sidebar and need a resizable drawer that appears next to it rather than overlapping it.\n\n**Prop Dependencies:**\n- `resizable` - When set to `true`, enables the `minWidth`, `maxWidth`, and `onResizeDone` props\n- `anchor` - Affects how the `offset` prop is applied"
			}
		}
	}
};

export const ResizableRightDrawer = {
	args: {
		open: true,
		resizable: true
	},
	parameters: {
		docs: {
			story: {
				before:
					"A right-anchored drawer that can be resized by the user. This is useful for detail panels, property editors, or any context where users might want to adjust the viewing area based on the content.\n\n**Prop Dependencies:**\n- `resizable` - When set to `true`, enables the `minWidth`, `maxWidth`, and `onResizeDone` props"
			}
		}
	}
};

export const ResizableRightDrawerWithOffset = {
	args: {
		open: true,
		resizable: true,
		offset: "200px"
	},
	parameters: {
		docs: {
			story: {
				before:
					"A right-anchored drawer with both an offset and resizing capability. This pattern is useful when you have fixed elements on the right side of the screen and need a resizable drawer that appears next to them rather than overlapping them.\n\n**Prop Dependencies:**\n- `resizable` - When set to `true`, enables the `minWidth`, `maxWidth`, and `onResizeDone` props\n- `anchor` - Affects how the `offset` prop is applied"
			}
		}
	}
};

const ContentBlock = styled("div")({
	height: "250px",
	width: "100%",
	backgroundColor: "rgba(0, 0, 0, 0.2)",
	marginTop: "24px",
	padding: "24px"
});

function useWindowWidth({ offset }) {
	const [width, setWidth] = React.useState(window.innerWidth - offset);

	React.useEffect(() => {
		const handleResize = () => {
			setWidth(window.innerWidth - offset);
		};
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	});

	// Return the width with debounce to reduce the frequency of re-rendering
	return width;
}

const ParentAndContentStory = (): ReactNode => {
	const [open, setOpen] = useState(true);
	const [anchor, setAnchor] = useState(ANCHOR.RIGHT);
	const [offset, setOffset] = useState("0");
	const [currentWidth, setCurrentWidth] = useState(INITIAL_WIDTH);
	const maxWidth = useWindowWidth({ offset: 0 });

	const handleOpenChange = () => {
		setOpen(!open);
	};
	const handleAnchorChange = () => {
		setAnchor(anchor === ANCHOR.RIGHT ? ANCHOR.LEFT : ANCHOR.RIGHT);
	};
	const handleOffsetChange = () => {
		setOffset(offset === "0" ? "100px" : "0");
	};
	const handleResizeDone = (newWidth: number) => {
		setCurrentWidth(newWidth);
	};

	return (
		<div style={{ display: "flex", flexDirection: "column", margin: "-16px" }}>
			<div
				style={{
					width: "100%",
					height: "80px",
					position: "fixed",
					borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
					backgroundColor: "white"
				}}
			>
				<div style={{ paddingTop: "30px", textAlign: "center" }}>Header</div>
			</div>
			<div style={{ overflowY: "hidden", marginTop: "80px" }}>
				<SolaceDetailMessage
					msgImg={<NoAccessImg />}
					title="Drawer Demo"
					details={<span>Click the buton to toggle the drawer</span>}
					actions={[
						{
							id: "open-button",
							variant: CALL_TO_ACTION,
							children: open ? "Close Drawer" : "Open Drawer",
							onClick: handleOpenChange
						},
						{
							id: "anchor-button",
							variant: CALL_TO_ACTION,
							children: anchor === ANCHOR.RIGHT ? "Change to Left" : "Change to Right",
							onClick: handleAnchorChange
						},
						{
							id: "anchor-button",
							variant: CALL_TO_ACTION,
							children: offset === "0" ? "Add Offset" : "Remove Offset",
							onClick: handleOffsetChange
						}
					]}
				/>
				<div style={{ textAlign: "center", marginTop: "32px" }}>
					{currentWidth === INITIAL_WIDTH ? "Initial Width: " : "New Width: "}
					{currentWidth}
					<p>*Only update after the action of resizing is completed.</p>
				</div>
				<ContentBlock>Content Block 1</ContentBlock>
				<ContentBlock>Content Block 2</ContentBlock>
			</div>
			<SolaceDrawer
				open={open}
				resizable={true}
				anchor={anchor}
				width={INITIAL_WIDTH}
				maxWidth={maxWidth}
				onResizeDone={handleResizeDone}
				top="80px"
				offset={offset}
				height="calc(100vh - 160px)"
			>
				{drawerMessage}
			</SolaceDrawer>
			<div
				style={{
					height: "80px",
					bottom: "0px",
					position: "sticky",
					borderTop: "1px solid rgba(0, 0, 0, 0.2)",
					backgroundColor: "white",
					zIndex: 100
				}}
			>
				<div style={{ paddingTop: "30px", textAlign: "center" }}>Footer</div>
			</div>
		</div>
	);
};

export const WithParentAndContent = {
	render: ParentAndContentStory,
	parameters: {
		docs: {
			story: {
				before:
					"A comprehensive example showing the drawer in a realistic page layout with header and footer. This story demonstrates interactive controls for toggling the drawer, changing its anchor position, adding offsets, and tracking resize operations. Use this pattern when you need to see how the drawer component integrates with other page elements and how it behaves with various configuration options. The `top` and `height` props are used together to position the drawer relative to the header and footer, ensuring it doesn't overlap with fixed page elements.\n\n**Prop Dependencies:**\n- `resizable` - When set to `true`, enables the `minWidth`, `maxWidth`, and `onResizeDone` props\n- `anchor` - Affects how the `offset` prop is applied"
			}
		}
	}
};
