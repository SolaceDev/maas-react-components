/*
 * Copyright 2023-2025 Solace Systems. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
					summary: "true"
				}
			}
		},
		size: {
			control: { type: "number" },
			description: "Size the circle in pixels",
			table: {
				defaultValue: {
					summary: "21"
				}
			}
		},
		fontSize: {
			control: { type: "number" },
			description: "Font size of the text",
			table: {
				defaultValue: {
					summary: "14"
				}
			}
		},
		animationDuration: {
			contorl: { type: "number" },
			description: "Animation duration in milliseconds",
			table: {
				defaultValue: {
					summary: "1000"
				}
			}
		},
		animationRepeatsInitialCount: {
			control: { type: "number" },
			description: "The number of animation cycles to run when showing the component the first time",
			table: {
				defaultValue: {
					summary: "1"
				}
			}
		},
		animationRepeatsUpdateCount: {
			control: { type: "number" },
			description: "The number of animation cycles to run when value is updated",
			table: {
				defaultValue: {
					summary: "3"
				}
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
