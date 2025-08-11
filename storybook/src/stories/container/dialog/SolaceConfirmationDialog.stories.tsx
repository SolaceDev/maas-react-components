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

import React, { useState, ReactNode } from "react";
import { Stack } from "@mui/material";
import {
	CheckCircleIcon,
	MenuItem,
	SolaceAccordion,
	SolaceButton,
	SolaceCheckBox,
	SolaceConfirmationDialog,
	SolaceSelect,
	SolaceTextField,
	styled
} from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";
import { Meta } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { DefaultTable } from "../../data-display/table/SolaceTable.stories";

(SolaceConfirmationDialog as React.FC & { displayName?: string }).displayName = "SolaceConfirmationDialog";
(SolaceSelect as React.FC & { displayName?: string }).displayName = "SolaceSelect";
(SolaceTextField as React.FC & { displayName?: string }).displayName = "SolaceTextField";
(MenuItem as React.FC & { displayName?: string }).displayName = "MenuItem";
(SolaceAccordion as React.FC & { displayName?: string }).displayName = "SolaceAccordion";
(SolaceCheckBox as React.FC & { displayName?: string }).displayName = "SolaceCheckBox";
(SolaceButton as React.FC & { displayName?: string }).displayName = "SolaceButton";

// Dialog Wrapper Component to manage open state
interface DialogWrapperProps {
	children: (isOpen: boolean, handleClose: () => void) => ReactNode;
	buttonText?: string;
}

const DialogWrapper = ({ children, buttonText = "Open Dialog" }: DialogWrapperProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<>
			<SolaceButton onClick={handleOpen} variant="outline">
				{buttonText}
			</SolaceButton>

			{children(isOpen, handleClose)}
		</>
	);
};

export default {
	title: "Container/Dialog/Modal",
	component: SolaceConfirmationDialog,
	tags: ["!autodocs"],

	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/4Y6nwn19uTNgpxzNAP5Vqe/UI-Library%3A-Patterns?node-id=1%3A3"
		}
	},
	argTypes: {
		title: {
			control: { type: "text" },
			description:
				"Title of the dialog. This should be concise and clearly communicate the purpose of the dialog. Can be a string or JSX element for more complex headers with icons.",
			table: {
				type: { summary: "string | React.ReactNode" },
				defaultValue: { summary: "undefined" }
			}
		},
		isOpen: {
			control: { type: "boolean" },
			description:
				"Controls whether the dialog is visible or hidden. Use this prop to programmatically open or close the dialog based on user interactions or application state.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		maxWidth: {
			options: ["sm", "md", "dialogMd", "lg", "xl"],
			control: { type: "select" },
			description:
				"Determines the maximum width of the dialog. Choose based on the amount of content to display - use smaller sizes for simple messages and larger sizes for complex forms or tables.",
			table: {
				type: { summary: '"sm" | "md" | "dialogMd" | "lg" | "xl"' },
				defaultValue: { summary: "dialogMd" }
			}
		},
		contentText: {
			control: { type: "text" },
			description:
				"Text to be displayed in the dialog content section. This should provide clear information or instructions related to the purpose of the dialog.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		contentLayout: {
			options: ["block", "contents", "flex"],
			control: { type: "select" },
			description:
				"Overrides the display attribute of the dialog content section. Use 'flex' for layouts that need alignment control, 'contents' for custom layouts, and 'block' (default) for standard content flow.",
			table: {
				type: { summary: '"block" | "contents" | "flex"' },
				defaultValue: { summary: "block" }
			}
		},
		actions: {
			description:
				"Array of action button configurations to be displayed in the dialog footer. Each action should include a label and onClick handler, and can optionally include variant, isDisabled, and other button props.",
			table: {
				type: { summary: "DialogAction[]" },
				defaultValue: { summary: "undefined" }
			}
		},
		customAction: {
			description:
				"Optional JSX element to display a custom action component (like a checkbox) in the dialog footer alongside the action buttons.",
			table: {
				type: { summary: "React.ReactNode" },
				defaultValue: { summary: "undefined" }
			}
		},
		linearProgressIndicator: {
			control: { type: "boolean" },
			description:
				"When true, displays an indeterminate linear progress indicator at the bottom border of the dialog. Use this to indicate background processing while the dialog is open."
		},
		disableDefaultPadding: {
			control: { type: "boolean" },
			description:
				"Disables the default padding applied to the dialog and dialog title components. Use this when you want to control padding manually or when using custom layouts.",
			table: {
				defaultValue: {
					summary: "false"
				}
			}
		},
		children: {
			description:
				"Content to be displayed in the dialog body below the contentText. Use this to add form elements, tables, or other complex content to the dialog.",
			table: {
				type: { summary: "React.ReactNode" },
				defaultValue: { summary: "undefined" }
			}
		},
		onClose: {
			description:
				"Callback function triggered when the dialog should be closed. Called when clicking outside the dialog, pressing escape, or clicking the close button if present."
		},
		disableBackdropClick: {
			control: { type: "boolean" },
			description:
				"When true, prevents the dialog from closing when clicking on the backdrop. Use this for critical dialogs that require explicit user action.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		disableEscapeKeyDown: {
			control: { type: "boolean" },
			description:
				"When true, prevents the dialog from closing when pressing the Escape key. Use this for critical dialogs that require explicit user action.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		fullScreen: {
			control: { type: "boolean" },
			description:
				"When true, makes the dialog full screen. Useful for complex workflows or mobile interfaces where maximum screen real estate is needed.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		fullWidth: {
			control: { type: "boolean" },
			description:
				"When true, makes the dialog take up the full width available up to the maxWidth constraint. Useful for responsive designs.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		scroll: {
			options: ["paper", "body"],
			control: { type: "select" },
			description:
				"Determines the scroll behavior when content overflows. 'paper' scrolls the dialog content, 'body' scrolls the entire page behind the dialog.",
			table: {
				type: { summary: '"paper" | "body"' },
				defaultValue: { summary: "paper" }
			}
		},
		TransitionComponent: {
			description:
				"Custom transition component for dialog animations. Use this to customize how the dialog appears and disappears.",
			table: {
				type: { summary: "React.ComponentType" },
				defaultValue: { summary: "Fade" }
			}
		},
		transitionDuration: {
			control: { type: "number" },
			description:
				"Duration of the dialog transition animation in milliseconds. Controls how fast the dialog opens and closes.",
			table: {
				type: { summary: "number | { enter?: number, exit?: number }" },
				defaultValue: { summary: "225" }
			}
		},
		hideBackdrop: {
			control: { type: "boolean" },
			description:
				"When true, hides the backdrop behind the dialog. Use sparingly as the backdrop helps focus user attention on the dialog.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		keepMounted: {
			control: { type: "boolean" },
			description:
				"When true, keeps the dialog mounted in the DOM even when closed. Useful for performance optimization when the dialog is opened frequently.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		ariaDescribedBy: {
			control: { type: "text" },
			description:
				"ARIA described-by attribute referencing elements that provide additional description for the dialog. Essential for accessibility.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		ariaLabelledBy: {
			control: { type: "text" },
			description:
				"ARIA labelled-by attribute referencing the element that labels the dialog. Typically references the dialog title element.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		role: {
			control: { type: "text" },
			description:
				"ARIA role for the dialog element. Defines the semantic meaning for assistive technologies. Common values include 'dialog' or 'alertdialog'.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "dialog" }
			}
		},
		dataQa: {
			control: { type: "text" },
			description:
				"Data attribute for QA testing. Use this to identify dialog elements during automated testing. Should be unique and descriptive.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		dataTags: {
			control: { type: "text" },
			description:
				"Data attribute for additional tagging and metadata. Use this for analytics tracking, categorization, or any additional metadata.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		className: {
			control: { type: "text" },
			description:
				"Additional CSS class names to apply to the dialog. Use this to extend styling with custom CSS while maintaining base functionality.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		},
		id: {
			control: { type: "text" },
			description:
				"Unique identifier for the dialog element. Use this when you need to reference the dialog programmatically or for linking with other elements.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "undefined" }
			}
		}
	}
} as Meta<typeof SolaceConfirmationDialog>;

const SELECT_OPTIONS: Array<JSX.Element> = [];
SELECT_OPTIONS.push(
	<MenuItem key="option1" value="option1">
		Menu Option #1
	</MenuItem>
);
SELECT_OPTIONS.push(
	<MenuItem key="option2" value="option2">
		Menu Option #2
	</MenuItem>
);
SELECT_OPTIONS.push(
	<MenuItem key="option3" value="option3">
		Menu Option #3
	</MenuItem>
);

const BUTTON_CLICK_ACTION_CALLBACK = "button-clicked-callback";

export const DefaultDialog = {
	render: () => {
		return (
			<DialogWrapper>
				{(isOpen, handleClose) => (
					<SolaceConfirmationDialog
						title="Test Dialog Title"
						contentText="Placeholder text to showcase a modal dialog with a title, some content text and two action buttons (primary action and secondary secondary)"
						isOpen={isOpen}
						actions={[
							{
								label: "Secondary",
								onClick: () => {
									action("secondary-callback")();
									handleClose();
								}
							},
							{
								label: "Primary",
								onClick: () => {
									action("primary-callback")();
									handleClose();
								},
								variant: "outline"
							}
						]}
					/>
				)}
			</DialogWrapper>
		);
	},
	parameters: {
		docs: {
			story: {
				before:
					"The standard dialog with a title, content text, and action buttons. This is the most common dialog pattern and should be used for simple confirmations or notifications that require user acknowledgment."
			},
			source: {
				code: `<SolaceConfirmationDialog
  title="Test Dialog Title"
  contentText="Placeholder text to showcase a modal dialog with a title, some content text and two action buttons (primary action and secondary secondary)"
  isOpen={isOpen}
  actions={[
    {
      label: "Secondary",
      onClick: () => {
        action("secondary-callback")();
        handleClose();
      }
    },
    {
      label: "Primary",
      onClick: () => {
        action("primary-callback")();
        handleClose();
      },
      variant: "outline"
    }
  ]}
/>`,
				language: "jsx",
				type: "code"
			}
		}
	},
	play: async ({ canvasElement }) => {
		// Starts querying the component from its root element
		const canvas = within(canvasElement);

		// Find the clear button using role and its accessible name (aria-label)
		const clearButton = canvas.getByRole("button");
		await userEvent.click(clearButton);
	}
};

export const WithChildrenComponents = {
	render: () => (
		<DialogWrapper buttonText="Open Dialog with Form Components">
			{(isOpen, handleClose) => (
				<SolaceConfirmationDialog
					title="Children"
					contentText="Some content text sitting above dialog child components (form elements in this case)"
					isOpen={isOpen}
					actions={[
						{
							label: "Ok",
							onClick: () => {
								action(BUTTON_CLICK_ACTION_CALLBACK)();
								handleClose();
							},
							variant: "outline"
						}
					]}
				>
					<Stack
						direction="column"
						justifyContent="flex-start"
						alignItems="stretch"
						spacing={2}
						sx={{ marginTop: "24px" }}
					>
						<SolaceTextField
							onChange={action("textfield-change-callback")}
							title="Demo Text Field"
							id="demoTextFieldId"
							name="demoTextField"
							label="Some Label"
						/>
						<SolaceSelect
							onChange={action("select-change-callback")}
							title="Demo Select"
							name="demoSelect"
							label="Some Label"
						>
							{SELECT_OPTIONS}
						</SolaceSelect>
					</Stack>
				</SolaceConfirmationDialog>
			)}
		</DialogWrapper>
	),
	parameters: {
		docs: {
			story: {
				before:
					"A dialog containing form components. Use this pattern when you need to collect user input through form fields. This is useful for creating, editing, or configuring items without navigating away from the current context. When using form components as children.\n\n**Prop Dependencies:**\n- `contentLayout` - you may need to adjust the `contentLayout` prop to ensure proper styling and alignment."
			},
			source: {
				code: `<SolaceConfirmationDialog
  title="Children"
  contentText="Some content text sitting above dialog child components (form elements in this case)"
  isOpen={isOpen}
  actions={[
    {
      label: "Ok",
      onClick: () => {
        action(BUTTON_CLICK_ACTION_CALLBACK)();
        handleClose();
      },
      variant: "outline"
    }
  ]}
>
  <Stack
    direction="column"
    justifyContent="flex-start"
    alignItems="stretch"
    spacing={2}
    sx={{ marginTop: "24px" }}
  >
    <SolaceTextField
      onChange={action("textfield-change-callback")}
      title="Demo Text Field"
      id="demoTextFieldId"
      name="demoTextField"
      label="Some Label"
    />
    <SolaceSelect
      onChange={action("select-change-callback")}
      title="Demo Select"
      name="demoSelect"
      label="Some Label"
    >
      {SELECT_OPTIONS}
    </SolaceSelect>
  </Stack>
</SolaceConfirmationDialog>`,
				language: "jsx",
				type: "code"
			}
		}
	},
	// decorators: [useWithSnapshotContainer],
	play: async ({ canvasElement }) => {
		// Starts querying the component from its root element
		const canvas = within(canvasElement);

		// Find the clear button using role and its accessible name (aria-label)
		const clearButton = canvas.getByRole("button");
		await userEvent.click(clearButton);
	}
};

export const WithChildrenAccordionComponents = {
	render: () => (
		<DialogWrapper buttonText="Open Dialog with Accordion">
			{(isOpen, handleClose) => (
				<SolaceConfirmationDialog
					title="Children"
					contentText="Some content text sitting above dialog child components (form elements in this case)"
					isOpen={isOpen}
					actions={[
						{
							label: "Ok",
							onClick: () => {
								action(BUTTON_CLICK_ACTION_CALLBACK)();
								handleClose();
							},
							variant: "outline"
						}
					]}
				>
					<SolaceAccordion
						summary={"hello world"}
						details="here are some details"
						expanded={false}
						onChange={action("you clicked me")}
					/>
				</SolaceConfirmationDialog>
			)}
		</DialogWrapper>
	),
	parameters: {
		docs: {
			story: {
				before:
					"A dialog containing an accordion component. This pattern is useful when you need to present a large amount of information in a structured, collapsible format to save space and improve readability.\n\n**Prop Dependencies:**\n- `contentLayout` - You may need to adjust this prop when using accordion components to ensure proper styling"
			},
			source: {
				code: `<SolaceConfirmationDialog
  title="Children"
  contentText="Some content text sitting above dialog child components (form elements in this case)"
  isOpen={isOpen}
  actions={[
    {
      label: "Ok",
      onClick: () => {
        action(BUTTON_CLICK_ACTION_CALLBACK)();
        handleClose();
      },
      variant: "outline"
    }
  ]}
>
  <SolaceAccordion
    summary={"hello world"}
    details="here are some details"
    expanded={false}
    onChange={action("you clicked me")}
  />
</SolaceConfirmationDialog>`,
				language: "jsx",
				type: "code"
			}
		}
	},
	play: async ({ canvasElement }) => {
		// Starts querying the component from its root element
		const canvas = within(canvasElement);

		// Find the clear button using role and its accessible name (aria-label)
		const clearButton = canvas.getByRole("button");
		await userEvent.click(clearButton);
	}
};

export const WithNoChildren = {
	render: () => (
		<DialogWrapper buttonText="Open Simple Dialog">
			{(isOpen, handleClose) => (
				<SolaceConfirmationDialog
					title="No Children"
					contentText="Some content text sitting above dialog child components (form elements in this case)"
					isOpen={isOpen}
					actions={[
						{
							label: "Ok",
							onClick: () => {
								action(BUTTON_CLICK_ACTION_CALLBACK)();
								handleClose();
							},
							variant: "outline"
						}
					]}
				/>
			)}
		</DialogWrapper>
	),
	parameters: {
		docs: {
			story: {
				before:
					"A simple dialog with only title, content text, and action buttons. Use this for straightforward messages or confirmations that don't require additional UI elements."
			},
			source: {
				code: `<SolaceConfirmationDialog
  title="No Children"
  contentText="Some content text sitting above dialog child components (form elements in this case)"
  isOpen={isOpen}
  actions={[
    {
      label: "Ok",
      onClick: () => {
        action(BUTTON_CLICK_ACTION_CALLBACK)();
        handleClose();
      },
      variant: "outline"
    }
  ]}
/>`,
				language: "jsx",
				type: "code"
			}
		}
	},
	play: async ({ canvasElement }) => {
		// Starts querying the component from its root element
		const canvas = within(canvasElement);

		// Find the clear button using role and its accessible name (aria-label)
		const clearButton = canvas.getByRole("button");
		await userEvent.click(clearButton);
	}
};

// Define a proper component for WithLinearProgressIndicator to avoid React Hook errors
const LinearProgressIndicatorStory = ({ ...args }) => {
	const [expanded, setExpanded] = useState(false);

	return (
		<DialogWrapper buttonText="Open Dialog with Progress Indicator">
			{(isOpen, handleClose) => (
				<SolaceConfirmationDialog
					title="With Accordion Content And Progress Indicator"
					isOpen={isOpen}
					linearProgressIndicator={true}
					actions={[
						{
							label: "Submit",
							onClick: () => {
								action(BUTTON_CLICK_ACTION_CALLBACK)();
								handleClose();
							},
							isDisabled: false
						}
					]}
				>
					<SolaceAccordion
						summary="Accordion in a dialog could have extra paddings AND break dialog progress indicator"
						details="Because they both have MuiPaper-root class."
						expanded={expanded}
						onChange={() => setExpanded(!expanded)}
						{...args}
					/>
				</SolaceConfirmationDialog>
			)}
		</DialogWrapper>
	);
};

export const WithLinearProgressIndicator = {
	render: LinearProgressIndicatorStory,
	parameters: {
		docs: {
			story: {
				before:
					"A dialog with a linear progress indicator at the bottom. Use this when an operation is being performed in the background while the dialog is open, such as saving data or loading content.\n\n**Prop Dependencies:**\n- `linearProgressIndicator` - Often used with action buttons that have their `isDisabled` state toggled based on loading state"
			},
			source: {
				code: `<SolaceConfirmationDialog
  title="With Accordion Content And Progress Indicator"
  isOpen={isOpen}
  linearProgressIndicator={true}
  actions={[
    {
      label: "Submit",
      onClick: () => {
        action(BUTTON_CLICK_ACTION_CALLBACK)();
        handleClose();
      },
      isDisabled: false
    }
  ]}
>
  <SolaceAccordion
    summary="Accordion in a dialog could have extra paddings AND break dialog progress indicator"
    details="Because they both have MuiPaper-root class."
    expanded={expanded}
    onChange={() => setExpanded(!expanded)}
  />
</SolaceConfirmationDialog>`,
				language: "jsx",
				type: "code"
			}
		}
	},
	play: async ({ canvasElement }) => {
		// Starts querying the component from its root element
		const canvas = within(canvasElement);

		// Find the clear button using role and its accessible name (aria-label)
		const clearButton = canvas.getByRole("button");
		await userEvent.click(clearButton);
	}
};

const CustomContentWrapper = styled("div")(() => ({
	display: "flex",
	flexDirection: "column",
	overflow: "auto",
	rowGap: 16,
	maxHeight: 450,
	// set box-sizing to border-box so that
	// the 1px border applied to table wrapper will be neglected from width & height
	// this is to simulate the global style applied in maas-ui/ep
	".tableWrapper": {
		boxSizing: "border-box"
	}
}));

const TableWrapper = (props) => {
	return <CustomContentWrapper>{props.children}</CustomContentWrapper>;
};

export const CircularSpinnerWithinDialog = {
	render: () => {
		return (
			<DialogWrapper buttonText="Open Dialog with Icon">
				{(isOpen, handleClose) => (
					<SolaceConfirmationDialog
						isOpen={isOpen}
						maxWidth="sm"
						contentLayout="contents"
						actions={[
							{
								label: "Secondary",
								onClick: () => {
									action("secondary-callback")();
									handleClose();
								}
							},
							{
								label: "Primary",
								onClick: () => {
									action("primary-callback")();
									handleClose();
								},
								variant: "outline"
							}
						]}
					>
						<Stack
							direction="row"
							justifyContent="flex-start"
							alignItems="stretch"
							spacing={1}
							sx={{ marginTop: "0px" }}
						>
							<div className="success">
								<CheckCircleIcon />
							</div>{" "}
							{/* className can be success/error/progress*/}
							<div>{`Placeholder text to showcase a modal dialog with an Icon and some body`}</div>
						</Stack>
					</SolaceConfirmationDialog>
				)}
			</DialogWrapper>
		);
	},
	parameters: {
		docs: {
			story: {
				before:
					'A dialog with an icon in the content area. Use this to visually communicate the nature of the message, such as success, error, or information. Icons help users quickly understand the context of the dialog.\n\n**Prop Dependencies:**\n- `contentLayout` - Setting to "contents" allows the Stack component to control its own layout'
			},
			source: {
				code: `<SolaceConfirmationDialog
  isOpen={isOpen}
  maxWidth="sm"
  contentLayout="contents"
  actions={[
    {
      label: "Secondary",
      onClick: () => {
        action("secondary-callback")();
        handleClose();
      }
    },
    {
      label: "Primary",
      onClick: () => {
        action("primary-callback")();
        handleClose();
      },
      variant: "outline"
    }
  ]}
>
  <Stack
    direction="row"
    justifyContent="flex-start"
    alignItems="stretch"
    spacing={1}
    sx={{ marginTop: "0px" }}
  >
    <div className="success">
      <CheckCircleIcon />
    </div>
    <div>Placeholder text to showcase a modal dialog with an Icon and some body</div>
  </Stack>
</SolaceConfirmationDialog>`,
				language: "jsx",
				type: "code"
			}
		}
	},
	play: async ({ canvasElement }) => {
		// Starts querying the component from its root element
		const canvas = within(canvasElement);

		// Find the clear button using role and its accessible name (aria-label)
		const clearButton = canvas.getByRole("button");
		await userEvent.click(clearButton);
	}
};

export const TableAsChildComponent = {
	render: () => {
		return (
			<DialogWrapper buttonText="Open Dialog with Table">
				{(isOpen, handleClose) => (
					<SolaceConfirmationDialog
						title="Dialog contains a scrollable table"
						isOpen={isOpen}
						maxWidth="sm"
						contentLayout="contents"
						actions={[
							{
								label: "Close",
								onClick: () => {
									action(BUTTON_CLICK_ACTION_CALLBACK)();
									handleClose();
								},
								variant: "outline"
							}
						]}
					>
						<TableWrapper>
							<DefaultTable.render {...DefaultTable.args} initialSelectedRowIds={[]} />
						</TableWrapper>
					</SolaceConfirmationDialog>
				)}
			</DialogWrapper>
		);
	},
	parameters: {
		docs: {
			story: {
				before:
					'A dialog containing a table component. Use this when you need to display structured data in a dialog, such as showing a list of items for selection or comparison. The scrollable container ensures the dialog remains manageable even with large datasets.\n\n**Prop Dependencies:**\n- `contentLayout` - Setting to "contents" is recommended for tables to allow children to control their own layout'
			},
			source: {
				code: `<SolaceConfirmationDialog
  title="Dialog contains a scrollable table"
  isOpen={isOpen}
  maxWidth="sm"
  contentLayout="contents"
  actions={[
    {
      label: "Close",
      onClick: () => {
        action(BUTTON_CLICK_ACTION_CALLBACK)();
        handleClose();
      },
      variant: "outline"
    }
  ]}
>
  <TableWrapper>
    <DefaultTable.render {...DefaultTable.args} initialSelectedRowIds={[]} />
  </TableWrapper>
</SolaceConfirmationDialog>`,
				language: "jsx",
				type: "code"
			}
		}
	},
	play: async ({ canvasElement }) => {
		// Starts querying the component from its root element
		const canvas = within(canvasElement);

		// Find the clear button using role and its accessible name (aria-label)
		const clearButton = canvas.getByRole("button");
		await userEvent.click(clearButton);
	}
};

export const WithElementTypeTitle = {
	render: () => (
		<DialogWrapper buttonText="Open Dialog with JSX Title">
			{(isOpen, handleClose) => (
				<SolaceConfirmationDialog
					title={
						<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
							<CheckCircleIcon />
							<div>Title With JSX Element</div>
						</div>
					}
					contentText="Some content"
					isOpen={isOpen}
					actions={[
						{
							label: "Submit",
							onClick: () => {
								action(BUTTON_CLICK_ACTION_CALLBACK)();
								handleClose();
							}
						}
					]}
				/>
			)}
		</DialogWrapper>
	),
	parameters: {
		docs: {
			story: {
				before:
					"A dialog with a JSX element as the title. Use this when you need to include icons or custom formatting in the dialog title to enhance visual communication or branding."
			},
			source: {
				code: `<SolaceConfirmationDialog
  title={
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <CheckCircleIcon />
      <div>Title With JSX Element</div>
    </div>
  }
  contentText="Some content"
  isOpen={isOpen}
  actions={[
    {
      label: "Submit",
      onClick: () => {
        action(BUTTON_CLICK_ACTION_CALLBACK)();
        handleClose();
      }
    }
  ]}
/>`,
				language: "jsx",
				type: "code"
			}
		}
	},
	play: async ({ canvasElement }) => {
		// Starts querying the component from its root element
		const canvas = within(canvasElement);

		// Find the clear button using role and its accessible name (aria-label)
		const clearButton = canvas.getByRole("button");
		await userEvent.click(clearButton);
	}
};

const args = {
	onChange: action("callback"),
	title: "Checkbox title",
	id: "demoCheckboxId",
	name: "demoCheckbox",
	label: "Optional checkbox that may be clicked before submitting"
};

export const WithCustomActions = {
	render: () => (
		<DialogWrapper buttonText="Open Dialog with Custom Action">
			{(isOpen, handleClose) => (
				<SolaceConfirmationDialog
					title="Dialog with custom action next to buttons"
					contentText="Some content"
					isOpen={isOpen}
					actions={[
						{
							label: "Submit",
							onClick: () => {
								action(BUTTON_CLICK_ACTION_CALLBACK)();
								handleClose();
							}
						}
					]}
					customAction={<SolaceCheckBox {...args} />}
				/>
			)}
		</DialogWrapper>
	),
	parameters: {
		docs: {
			story: {
				before:
					"A dialog with a custom action component in the footer alongside the action buttons. Use this when you need to include additional interactive elements like checkboxes in the dialog footer, such as 'Don't show this again' options or consent checkboxes.\n\n**Prop Dependencies:**\n- `customAction` - Only works when used with the `actions` prop, as it positions the custom element relative to action buttons"
			},
			source: {
				code: `<SolaceConfirmationDialog
  title="Dialog with custom action next to buttons"
  contentText="Some content"
  isOpen={isOpen}
  actions={[
    {
      label: "Submit",
      onClick: () => {
        action(BUTTON_CLICK_ACTION_CALLBACK)();
        handleClose();
      }
    }
  ]}
  customAction={<SolaceCheckBox {...args} />}
/>`,
				language: "jsx",
				type: "code"
			}
		}
	},
	play: async ({ canvasElement }) => {
		// Starts querying the component from its root element
		const canvas = within(canvasElement);

		// Find the clear button using role and its accessible name (aria-label)
		const clearButton = canvas.getByRole("button");
		await userEvent.click(clearButton);
	}
};

export const WithoutActions = {
	render: () => (
		<DialogWrapper buttonText="Open Dialog without Actions">
			{(isOpen) => (
				<SolaceConfirmationDialog title="Without Actions" contentText="Some content" isOpen={isOpen} actions={[]} />
			)}
		</DialogWrapper>
	),
	parameters: {
		docs: {
			story: {
				before:
					"A dialog without any actions. Use this when component displayed in dialog content has its own actions defined."
			},
			source: {
				code: `<SolaceConfirmationDialog
  title="Dialog without any buttons"
  contentText="Some content"
  isOpen={isOpen}
  actions={[]}
/>`,
				language: "jsx",
				type: "code"
			}
		}
	},
	play: async ({ canvasElement }) => {
		// Starts querying the component from its root element
		const canvas = within(canvasElement);

		// Find the clear button using role and its accessible name (aria-label)
		const clearButton = canvas.getByRole("button");
		await userEvent.click(clearButton);
	}
};

export const WithoutDefaultPadding = {
	render: () => (
		<DialogWrapper buttonText="Open Dialog without Default Padding">
			{(isOpen, handleClose) => (
				<SolaceConfirmationDialog
					title={"Without Default Padding"}
					contentText={"Some content"}
					isOpen={isOpen}
					actions={[
						{
							label: "Submit",
							onClick: () => {
								action(BUTTON_CLICK_ACTION_CALLBACK)();
								handleClose();
							}
						}
					]}
					disableDefaultPadding
				/>
			)}
		</DialogWrapper>
	),
	parameters: {
		docs: {
			story: {
				before:
					"A dialog without default padding applied to the dialog and dialog title. Use this when you want to control padding manually or when using custom layouts. It is not recommended to use this property unless the dialog content is complex and requires custom styling."
			},
			source: {
				code: `<SolaceConfirmationDialog
  title={"Without Default Padding"}
  contentText={"Some content"}
  isOpen={isOpen}
  actions={[
    {
      label: "Submit",
      onClick: () => {
        action(BUTTON_CLICK_ACTION_CALLBACK)();
        handleClose();
      }
    }
  ]}
/>`,
				language: "jsx",
				type: "code"
			}
		}
	},
	play: async ({ canvasElement }) => {
		// Starts querying the component from its root element
		const canvas = within(canvasElement);

		// Find the clear button using role and its accessible name (aria-label)
		const clearButton = canvas.getByRole("button");
		await userEvent.click(clearButton);
	}
};
