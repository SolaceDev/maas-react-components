import React, { useState } from "react";
import { Meta, Decorator } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import { SolaceNotificationCounter, SolaceButton } from "@SolaceDev/maas-react-components";

(SolaceNotificationCounter as React.FC & { displayName?: string }).displayName = "SolaceNotificationCounter";
(SolaceButton as React.FC & { displayName?: string }).displayName = "SolaceButton";

// Create a decorator to include the tooltip & popover inside the snapshot"
const withSnapshotContainer: Decorator = (Story) => {
	return (
		<div id="snapshot" style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh" }}>
			<div style={{ margin: "16px" }}>
				<Story />
			</div>
		</div>
	);
};

export default {
	title: "Data Display/Badge/Counter",
	component: SolaceNotificationCounter,
	parameters: {
		docs: {
			description: {
				component:
					"NotificationCounter component for reuse in all Solace based applications. Code component name: SolaceNotificationCounter"
			}
		}
	},
	argTypes: {
		value: {
			control: { type: "text" },
			description:
				"The text to render in the circle. Can be a number, string, or text like '99+' for values that exceed a maximum threshold.",
			table: {
				type: { summary: "string | number" },
				defaultValue: { summary: "undefined" }
			}
		},
		show: {
			control: { type: "boolean" },
			description:
				"Whether to show the component. Use this to conditionally display the notification counter based on whether there are notifications to show.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "true" }
			}
		},
		size: {
			control: { type: "number" },
			description:
				"Size of the circular badge in pixels. Affects both width and height. Use larger sizes for more prominent notifications or when displaying longer text content.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "21" }
			}
		},
		fontSize: {
			control: { type: "number" },
			description:
				"Font size of the text inside the notification counter in pixels. Should be proportional to the size prop for optimal visual balance.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "14" }
			}
		},
		animationDuration: {
			control: { type: "number" },
			description:
				"Duration of the animation effect in milliseconds. Set to 0 to disable animations. Use shorter durations for subtle effects, longer for more attention-grabbing notifications.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "1000" }
			}
		},
		animationRepeatsInitialCount: {
			control: { type: "number" },
			description:
				"The number of animation cycles to run when showing the component for the first time. Use higher values for critical notifications that need immediate attention.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "1" }
			}
		},
		animationRepeatsUpdateCount: {
			control: { type: "number" },
			description:
				"The number of animation cycles to run when the value is updated. Use higher values for significant updates that users should notice.",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "3" }
			}
		},
		title: {
			control: { type: "text" },
			description:
				"Tooltip text to display when hovering over the notification counter. Use this to provide additional context about what the counter represents.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		className: {
			control: { type: "text" },
			description: "Additional CSS class name to apply to the notification counter for custom styling.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		style: {
			control: false,
			description:
				"Inline styles to apply to the notification counter. Use this for positioning or custom appearance modifications.",
			table: {
				type: { summary: "React.CSSProperties" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description:
				"Data attribute for QA testing. Use this to identify notification counters during automated testing.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataTags: {
			control: { type: "text" },
			description: "Data attribute for additional tagging. Use this for analytics, tracking, or additional metadata.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		}
	}
} as Meta<typeof SolaceNotificationCounter>;

function NotificationCounterDemo({
	animiationDuration = 1000,
	animationRepeatsInitialCount = 1,
	animationRepeatsUpdateCount = 3,
	title = undefined as string | undefined
}) {
	const [counter, setCounter] = useState(1);
	return (
		<>
			<SolaceNotificationCounter
				value={counter}
				show={counter > 0}
				animationDuration={animiationDuration}
				animationRepeatsInitialCount={animationRepeatsInitialCount}
				animationRepeatsUpdateCount={animationRepeatsUpdateCount}
				title={title}
			/>
			<div style={{ marginTop: "16px", display: "flex", gap: "16px" }}>
				<SolaceButton variant="call-to-action" onClick={() => setCounter((previousCounter) => previousCounter + 1)}>
					Increment
				</SolaceButton>
				<SolaceButton variant="call-to-action" onClick={() => setCounter((previousCounter) => previousCounter - 1)}>
					Decrement
				</SolaceButton>
			</div>
		</>
	);
}

export const DefaultNotificationCounter = {
	render: () => {
		return <NotificationCounterDemo />;
	},

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByText("Decrement"));
		await userEvent.click(await canvas.findByText("Increment"));
		await userEvent.click(await canvas.findByText("Increment"));
		await userEvent.click(await canvas.findByText("Increment"));
		await userEvent.click(await canvas.findByText("Increment"));
		await userEvent.click(await canvas.findByText("Decrement"));
	},

	parameters: {
		// Delay snapshot 5 seconds until all interactions are done
		chromatic: { delay: 5000 }
	}
};

export const CustomAnimationNotificationCounter = {
	render: () => {
		return <NotificationCounterDemo animiationDuration={500} animationRepeatsUpdateCount={2} />;
	},

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByText("Increment"));
		await userEvent.click(await canvas.findByText("Increment"));
		await userEvent.click(await canvas.findByText("Increment"));
		await userEvent.click(await canvas.findByText("Decrement"));
	},

	parameters: {
		// Delay snapshot 5 seconds until all interactions are done
		chromatic: { delay: 5000 }
	}
};

export const NoAnimationNotificationCounter = {
	render: () => {
		return <NotificationCounterDemo animiationDuration={0} />;
	},

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByText("Decrement"));
		await userEvent.click(await canvas.findByText("Increment"));
		await userEvent.click(await canvas.findByText("Increment"));
		await userEvent.click(await canvas.findByText("Increment"));
		await userEvent.click(await canvas.findByText("Decrement"));
	},

	parameters: {
		// Delay snapshot 5 seconds until all interactions are done
		chromatic: { delay: 5000 }
	}
};

export const NotificationCounterWithTooltip = {
	render: () => {
		return <NotificationCounterDemo animiationDuration={0} title={"new events"} />;
	},

	decorators: [withSnapshotContainer],

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		await userEvent.click(await canvas.findByText("1"));
	},

	parameters: {
		// Delay snapshot 5 seconds until all interactions are done
		chromatic: { delay: 5000 }
	}
};

export const CustomNotificationCounter = {
	args: {
		value: "99+",
		fontSize: 11
	}
};
