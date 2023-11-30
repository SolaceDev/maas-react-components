import React, { useState } from "react";
import { Meta } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import { SolaceNotificationCounter, SolaceButton } from "@SolaceDev/maas-react-components";

export default {
	title: "Under Construction/SolaceNotificationCounter",
	component: SolaceNotificationCounter,
	parameters: {
		docs: {
			description: {
				component: "NotificationCounter component for reuse in all Solace based applications"
			}
		}
	},
	argTypes: {
		value: {
			control: { type: "text" },
			description: "The text to render in the circle",
			table: {
				defaultValue: {
					summary: "text"
				}
			}
		},
		show: {
			control: { type: "boolean" },
			description: "Whether to show the component",
			table: {
				defaultValue: {
					summary: true
				}
			}
		},
		size: {
			control: { type: "number" },
			description: "Size the circle in pixels",
			table: {
				defaultValue: {
					summary: 21
				}
			}
		},
		fontSize: {
			control: { type: "number" },
			description: "Font size of the text",
			table: {
				defaultValue: {
					summary: 14
				}
			}
		},
		animationDuration: {
			contorl: { type: "number" },
			description: "Animation duration in milliseconds",
			table: {
				defaultValue: {
					summary: 1000
				}
			}
		},
		animationRepeatsInitialCount: {
			control: { type: "number" },
			description: "The number of animation cycles to run when showing the component the first time",
			table: {
				defaultValue: {
					summary: 1
				}
			}
		},
		animationRepeatsUpdateCount: {
			control: { type: "number" },
			description: "The number of animation cycles to run when value is updated",
			table: {
				defaultValue: {
					summary: 3
				}
			}
		}
	}
} as Meta<typeof SolaceNotificationCounter>;

function NotificationCounterDemo({
	animiationDuration = 1000,
	animationRepeatsInitialCount = 1,
	animationRepeatsUpdateCount = 3,
	title = null
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
