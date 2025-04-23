import React, { useEffect, useRef, useState } from "react";
import { Decorator, Meta } from "@storybook/react";
import {
	Box,
	SolaceButton,
	SolacePopover,
	SolacePopoverProps,
	SolaceTextField,
	SolaceStack,
	SolaceTypography
} from "@SolaceDev/maas-react-components";
import { action } from "@storybook/addon-actions";
import { userEvent, within } from "@storybook/test";

(SolacePopover as React.FC & { displayName?: string }).displayName = "SolacePopover";
(SolaceButton as React.FC & { displayName?: string }).displayName = "SolaceButton";
(SolaceTextField as React.FC & { displayName?: string }).displayName = "SolaceTextField";
(SolaceTypography as React.FC & { displayName?: string }).displayName = "SolaceTypography";

// Create a decorator to include the tooltip & popover inside the snapshot"
const withSnapshotContainer: Decorator = (Story) => {
	return (
		<div id="snapshot" style={{ height: "600px", padding: "0px", margin: "0px" }}>
			<Story />
		</div>
	);
};

export default {
	title: "Container/Popover",
	component: SolacePopover,
	parameters: {
		chromatic: { delay: 1000 },
		design: {
			type: "figma",
			url: "https://www.figma.com/design/4Y6nwn19uTNgpxzNAP5Vqe/Patterns?node-id=21909-955&p=f&t=nZPRTnBQWGY5q2cb-0"
		},
		docs: {
			description: {
				component:
					"A Popover can be used to display some content on top of another. Popovers can appear in-context, aligned to the anchor element. Alignment can vary depending on where the anchor element is placed on a page."
			}
		}
	},
	argTypes: {
		id: {
			control: { type: "text" },
			description:
				"Unique identifier for the popover. This is important for accessibility and helps screen readers identify the popover content. It's used for ARIA attributes and should be unique across the page. The id is also used to establish the relationship between the trigger element and the popover content via aria-describedby."
		},
		anchorElement: {
			control: false,
			description:
				"The ref element the popover is going to anchor to. If no anchor element is provided, the popover will anchor to the top left of the application's client area. This is typically a button or other interactive element that triggers the popover. When using anchorElement, the anchorPosition prop is ignored."
		},
		anchorPosition: {
			control: "object",
			description:
				"Position of the anchor element relative to the top left corner of the application's client area. Use this when you need to position the popover relative to a specific point rather than an element. This prop is used when you want absolute positioning, such as for context menus. The object should contain 'top' and 'left' properties with numeric values representing pixel positions. When using anchorPosition, the anchorElement prop is ignored."
		},
		anchorOrigin: {
			control: "object",
			description:
				"This is the point on the referenced anchor where the popover will attach to. This is used to determine the position of the popover. Can be specified using vertical ('top', 'center', 'bottom') and horizontal ('left', 'center', 'right') values, or with numeric pixel values for precise positioning. For example, { vertical: 'bottom', horizontal: 'center' } will position the popover below the anchor, centered horizontally."
		},
		transformOrigin: {
			control: "object",
			description:
				"This is the point on the popover which will attach to the anchor's origin. Works in conjunction with anchorOrigin to determine the final position of the popover relative to its anchor element. For example, if anchorOrigin is { vertical: 'bottom', horizontal: 'center' } and transformOrigin is { vertical: 'top', horizontal: 'center' }, the popover's top-center will attach to the anchor's bottom-center."
		},
		open: {
			control: "boolean",
			description:
				"Controls whether the popover is open. Use this prop to programmatically show or hide the popover based on user interactions or application state. This makes the popover a controlled component, meaning its visibility state is fully managed by the parent component."
		},
		children: {
			control: false,
			description:
				"The content to be displayed inside the popover. This can be any valid React node, including text, elements, or components. The content is rendered within a Paper component that provides the visual container for the popover."
		},
		onClose: {
			control: false,
			description:
				"Callback fired when the popover requests to be closed. This function is triggered when the user clicks outside the popover or presses the escape key (unless these behaviors are disabled). The callback receives the event that triggered the close action as its parameter. This is essential for controlled components to update their state and close the popover."
		},
		marginThreshold: {
			control: { type: "number" },
			description:
				"Specifies the minimum margin (in pixels) between the popover and the screen edges. This ensures the popover remains visible even when the anchor is near the edge of the viewport."
		},
		activateOnHover: {
			control: "boolean",
			description:
				"Determines if the popover should activate on hover rather than click. When true, the popover will appear when the user hovers over the anchor element and disappear when the mouse leaves. Setting this to true also disables pointer events on the popover (sets pointerEvents: 'none'), which affects how the popover interacts with mouse events. This is useful for tooltip-like behavior where you want the popover to appear on hover but not intercept mouse events."
		},
		dataQa: {
			control: "text",
			description:
				"Data attribute for QA purposes. This attribute helps with automated testing by providing a consistent selector for test scripts. It's added as a data-qa attribute to the DOM element."
		},
		dataTags: {
			control: "text",
			description: "Data tags for the popover. These can be used for analytics tracking or other custom metadata needs."
		}
	}
} as Meta<typeof SolacePopover>;

interface SolacePopoverTestProps extends SolacePopoverProps {
	testTitle?: JSX.Element;
	testMessage: JSX.Element;
}

const PopoverFormContent = (props) => {
	const { onClose, onSubmit, onFirstNameChange, onLastNameChange, invalid, ...remainingProps } = props;

	return (
		<div {...remainingProps} style={{ padding: "16px" }}>
			<form>
				<SolaceStack>
					<SolaceTextField
						label="First Name"
						name="popoverSampleFirstNameField"
						title="Popover Sample First Name Field"
						required
						onChange={onFirstNameChange}
					/>
					<SolaceTextField
						label="Last Name"
						name="popoverSampleLastNameField"
						title="Popover Sample Last Name Field"
						required
						onChange={onLastNameChange}
					/>
					<div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
						<SolaceButton variant="outline" onClick={onClose}>
							Cancel
						</SolaceButton>
						<SolaceButton variant="call-to-action" onClick={onSubmit}>
							Submit
						</SolaceButton>
					</div>
					{invalid && (
						<SolaceTypography variant="body2" color="error">
							Please enter a valid first and last name
						</SolaceTypography>
					)}
				</SolaceStack>
			</form>
		</div>
	);
};

const PopoverTemplate: Story<SolacePopoverTestProps> = (args) => {
	const { testTitle, testMessage, ...popoverArgs } = args;
	const popoverContentRef = useRef<HTMLDivElement>(null);
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		action("ClickMeButtonClicked");
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		action("UserClickedElsewhereToClosePopover");
		setAnchorEl(null);
	};

	useEffect(() => {
		const handleDocumentClick = (event: MouseEvent) => {
			if (
				open &&
				anchorEl &&
				popoverContentRef.current &&
				!anchorEl.contains(event.target as Node) &&
				!popoverContentRef.current.contains(event.target as Node)
			) {
				handleClose();
			}
		};

		document.addEventListener("click", handleDocumentClick);

		return () => {
			document.removeEventListener("click", handleDocumentClick);
		};
	}, [open, anchorEl]);

	return (
		<div style={{ width: "600px" }}>
			<SolaceTypography variant="h2" component="div">
				{testTitle}
			</SolaceTypography>
			{testMessage}
			{testMessage && <Box height="20px" />}
			<SolacePopover
				id={id}
				anchorElement={anchorEl}
				ref={popoverContentRef}
				open={open}
				{...popoverArgs}
				onClose={handleClose}
			>
				<div style={{ width: "500px", padding: "16px" }}>
					<SolaceTypography variant="body1" component="div">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
						ea commodo consequat
					</SolaceTypography>
				</div>
			</SolacePopover>

			<SolaceButton aria-describedby={id} variant="call-to-action" onClick={handleClick}>
				Click Me To Launch Popover
			</SolaceButton>
		</div>
	);
};

const PopoverFormTemplate: Story<SolacePopoverTestProps> = (args) => {
	const { testTitle, testMessage, ...popoverArgs } = args;
	const popoverFormContentRef = useRef<HTMLDivElement>(null);
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [invalid, setInvalid] = useState(false);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		action("ClickMeButtonClicked");
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		action("UserClickedElsewhereToClosePopover");

		if (!firstName || !lastName) {
			setInvalid(true);
		} else {
			setFirstName("");
			setLastName("");
			setInvalid(false);
			setAnchorEl(null);
		}
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!firstName || !lastName) {
			setInvalid(true);
		} else {
			setFirstName("");
			setLastName("");
			setInvalid(false);
			setAnchorEl(null);
		}
	};

	const handleCancel = () => {
		setFirstName("");
		setLastName("");
		setInvalid(false);
		setAnchorEl(null);
	};

	const handleFirstNameChange = (event) => {
		action("firstNameChanged");
		setInvalid(false);
		setFirstName(event?.value);
	};

	const handleLastNameChange = (event) => {
		action("lastNameChanged");
		setInvalid(false);
		setLastName(event.value);
	};

	useEffect(() => {
		const handleDocumentClick = (event: MouseEvent) => {
			if (
				open &&
				anchorEl &&
				popoverFormContentRef.current &&
				!anchorEl.contains(event.target as Node) &&
				!popoverFormContentRef.current.contains(event.target as Node)
			) {
				handleClose();
			}
		};

		document.addEventListener("click", handleDocumentClick);

		return () => {
			document.removeEventListener("click", handleDocumentClick);
		};
	}, [open, firstName, lastName, anchorEl]);

	return (
		<div style={{ width: "600px" }}>
			<SolaceTypography variant="h2" component="div">
				{testTitle}
			</SolaceTypography>
			{testMessage}
			{testMessage && <Box height="20px" />}
			<SolacePopover
				id={id}
				anchorElement={anchorEl}
				ref={popoverFormContentRef}
				open={open}
				onClose={handleClose}
				{...popoverArgs}
			>
				<PopoverFormContent
					invalid={invalid}
					onFirstNameChange={handleFirstNameChange}
					onLastNameChange={handleLastNameChange}
					onClose={handleCancel}
					onSubmit={handleSubmit}
				/>
			</SolacePopover>

			<SolaceButton aria-describedby={id} variant="call-to-action" onClick={handleClick}>
				Click Me To Launch Popover
			</SolaceButton>
		</div>
	);
};

export const DefaultPopover = PopoverTemplate.bind({});
DefaultPopover.args = {
	testTitle: "Default Popover",
	testMessage: (
		<>
			<SolaceTypography variant="h3" component="div">
				This test showcases the default Popover with no additional properties set
			</SolaceTypography>
			<SolaceTypography variant="body1" component="div">
				Clicking the &apos;Click Me To Launch Popover&apos; button will display the Popover. Once the Popover is
				displayed, clicking anywhere outside the Popover will close it.
			</SolaceTypography>
		</>
	)
};
DefaultPopover.parameters = {
	docs: {
		story: {
			before:
				"The standard popover with default positioning and behavior. This is the most common popover pattern and should be used for displaying supplementary information or controls without navigating away from the current context."
		}
	}
};
DefaultPopover.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	const button = canvas.getByRole("button");
	await userEvent.click(button);
};

export const WithAnchorAndTransformOrigin = PopoverTemplate.bind({});
WithAnchorAndTransformOrigin.args = {
	testTitle: "Popover With Degined Anchor and Transform",
	testMessage: (
		<>
			<SolaceTypography variant="h3" component="div">
				This test showcases how a Popover component positioned by its anchor and transform properties
			</SolaceTypography>
			<SolaceTypography variant="body1" component="div">
				This test has the anchorOrigin set to top right and the transformOrigin set to top left.
			</SolaceTypography>
			<SolaceTypography variant="body1" component="div">
				Clicking the &apos;Click Me To Launch Popover&apos; button will display the Popover. Once the Popover is
				displayed, clicking anywhere outside the Popover will close it.
			</SolaceTypography>
		</>
	),
	anchorOrigin: { vertical: "top", horizontal: "right" },
	transformOrigin: { vertical: "top", horizontal: "left" }
};
WithAnchorAndTransformOrigin.parameters = {
	docs: {
		story: {
			before:
				"A popover with custom anchor and transform origins. Use this pattern when you need precise control over the popover's position relative to its anchor element. This example positions the popover so that its top-left corner connects to the top-right corner of the anchor element.\n\n**Prop Dependencies:**\n- `anchorOrigin` and `transformOrigin` - These props work together to determine the final position of the popover. The anchorOrigin defines the point on the anchor element where the popover will attach, while transformOrigin defines the point on the popover that will connect to that anchor point."
		}
	}
};
WithAnchorAndTransformOrigin.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	const button = canvas.getByRole("button");
	await userEvent.click(button);
};

export const WithCustomAnchorOffest = PopoverTemplate.bind({});
WithCustomAnchorOffest.args = {
	testTitle: "Popover With Custom Anchor Offset",
	testMessage: (
		<>
			<SolaceTypography variant="h3" component="div">
				This test showcases how a Popover component positioned using a custom anchor offset to displace it from the
				anchor
			</SolaceTypography>
			<SolaceTypography variant="body1" component="div">
				An anchor offset of 36 pixels from the top and left is set for the anchorOrigin so to offset the Popover 10px
				away from the anchor (anchor button is 26px tall, leaving 10 px of offset). The transformOrigin is set to top
				left.
			</SolaceTypography>
			<SolaceTypography variant="body1" component="div">
				Clicking the &apos;Click Me To Launch Popover&apos; button will display the Popover. Once the Popover is
				displayed, clicking anywhere outside the Popover will close it.
			</SolaceTypography>
		</>
	),
	anchorOrigin: { vertical: 36, horizontal: "left" },
	transformOrigin: { vertical: "top", horizontal: "left" }
};
WithCustomAnchorOffest.parameters = {
	docs: {
		story: {
			before:
				"A popover with a custom numeric anchor offset. Use this pattern when you need to fine-tune the position of the popover with pixel-level precision, such as when you want to create a specific spacing between the anchor and the popover.\n\n**Prop Dependencies:**\n- `anchorOrigin` - When using numeric values (like 36) instead of keywords ('top', 'bottom', etc.), you can achieve precise pixel positioning relative to the anchor element.\n- `transformOrigin` - Works with the custom anchorOrigin to determine the final position."
		}
	}
};
WithCustomAnchorOffest.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	const button = canvas.getByRole("button");
	await userEvent.click(button);
};

export const WithAnchorPosition = PopoverTemplate.bind({});
WithAnchorPosition.args = {
	testTitle: "Popover With Anchor Position",
	testMessage: (
		<>
			<SolaceTypography variant="h3" component="div">
				This test showcases how a Popover component positioned using an anchor position
			</SolaceTypography>
			<SolaceTypography variant="body1" component="div">
				An anchor position of 120px from the top and 150px from the left relative to the application&apos;s client area.
			</SolaceTypography>
			<SolaceTypography variant="body1" component="div">
				Clicking the &apos;Click Me To Launch Popover&apos; button will display the Popover. Once the Popover is
				displayed, clicking anywhere outside the Popover will close it.
			</SolaceTypography>
		</>
	),
	anchorPosition: { top: 120, left: 150 }
};
WithAnchorPosition.parameters = {
	docs: {
		story: {
			before:
				"A popover positioned at specific coordinates on the screen. Use this pattern when you need to position a popover relative to the viewport rather than an anchor element. This is useful for context menus, tooltips for map points, or any scenario where the popover should appear at an absolute position.\n\n**Prop Dependencies:**\n- `anchorPosition` - When using this prop, the popover will ignore the `anchorElement` prop and position itself based on the specified coordinates relative to the application's client area. These two props are mutually exclusive - if you provide `anchorPosition`, the `anchorElement` will be ignored."
		}
	}
};
WithAnchorPosition.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	const button = canvas.getByRole("button");
	await userEvent.click(button);
};

export const WithFormValidation = PopoverFormTemplate.bind({});
WithFormValidation.args = {
	testTitle: "Popover With Custom Anchor Offset",
	testMessage: (
		<>
			<SolaceTypography variant="h3" component="div">
				This test showcases how a Popover can remain visible until a form is submitted with valid data
			</SolaceTypography>
			<SolaceTypography variant="body1" component="div">
				Clicking anywhere outside the Popover shall first validate the form before closing. If any form elements are
				invalid, the Popover shall remain open and the form can optionally show some validation errors for the user to
				be corrected. Correcting the validation errors or cancelling the form will allow the user to close the popover.
			</SolaceTypography>
			<SolaceTypography variant="body1" component="div">
				Clicking the &apos;Click Me To Launch Popover&apos; button will display the Popover. Once the Popover is
				displayed, clicking anywhere outside the Popover will close it.
			</SolaceTypography>
		</>
	),
	anchorOrigin: { vertical: 36, horizontal: "left" },
	transformOrigin: { vertical: "top", horizontal: "left" }
};
WithFormValidation.decorators = [withSnapshotContainer];
WithFormValidation.parameters = {
	docs: {
		story: {
			before:
				"A popover containing a form with validation. Use this pattern when you need to collect user input while maintaining the current page context. This example demonstrates how to keep the popover open until valid data is submitted, preventing accidental data loss.\n\n**Prop Dependencies:**\n- `onClose` - This prop is crucial for form validation popovers as it allows you to implement custom closing logic that can prevent the popover from closing when form data is invalid.\n- `anchorOrigin` and `transformOrigin` - These props are used here to position the form popover appropriately relative to its trigger button."
		}
	}
};
WithFormValidation.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	const button = canvas.getByRole("button");
	await userEvent.click(button);
};
