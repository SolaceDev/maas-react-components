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
	decorators: [withSnapshotContainer],
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
			control: { type: "text" }
		},
		anchorOrigin: {
			control: "object",
			description:
				"This is the point on the referenced anchor where the popover will attach to. This is used to determine the position of the popover"
		},
		transformOrigin: {
			control: "object",
			description: "This is the point on the popover which will attach to the anchor's origin"
		},
		open: {
			control: "boolean",
			description: "Controls whether the popover is open",
			defaultValue: false
		},
		anchorElement: {
			control: false, // We handle this internally
			description:
				"The ref element the popover is going to anchor to. If no anchor element is provided, the popover will anchor to the top left of the application's client area"
		},
		anchorPosition: {
			control: "object",
			description: "Position of the anchor element relative to the top left corner of the application's client area"
		},
		marginThreshold: {
			control: { type: "number" },
			description: "Specifies the minimum margin between the popover and the screen edges",
			defaultValue: 16
		},
		activateOnHover: {
			control: "boolean",
			description: "Determines if the popover should activate on hover",
			defaultValue: false
		},
		dataQa: {
			control: "text",
			description: "Data attribute for QA purposes"
		},
		dataTags: {
			control: "text",
			description: "Data tags for the popover"
		},
		onClose: {
			control: false,
			description: "Callback fired when the popover requests to be closed"
		},
		testTitle: {
			table: { disable: true }, // Hide this props from the control table since they are not part of the SolacePopover component
			description: "Test title for internal use"
		},
		testMessage: {
			table: { disable: true }, // Hide this props from the control table since they are not part of the SolacePopover component
			description: "Test message for internal use"
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
WithFormValidation.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	const button = canvas.getByRole("button");
	await userEvent.click(button);
};
