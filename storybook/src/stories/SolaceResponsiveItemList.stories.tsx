import React, { useCallback, useRef, useState, useEffect } from "react";
import { Meta } from "@storybook/react";
import {
	SolaceCheckBox,
	SolaceResponsiveItemList,
	SolaceResponsiveItem,
	SolaceChip,
	styled,
	SolaceTooltip
} from "@SolaceDev/maas-react-components";
import { within, userEvent, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

(SolaceResponsiveItemList as unknown as React.FC & { displayName?: string }).displayName = "SolaceResponsiveItemList";
(SolaceCheckBox as React.FC & { displayName?: string }).displayName = "SolaceCheckBox";

export default {
	title: "Under Construction/SolaceResponsiveItemList",
	component: SolaceResponsiveItemList,
	parameters: {},
	argTypes: {}
} as Meta<typeof SolaceResponsiveItemList>;

const DEFAULT_OPTIONS = [
	{ value: "applicationDomain", label: "Application Domain" },
	{ value: "state", label: "State" },
	{ value: "brokerType", label: "Broker Type" },
	{ value: "mem", label: "Modeled Event Mesh" },
	{ value: "shared", label: "Shared" },
	{ value: "gatewayServices", label: "Gateway Services" },
	{ value: "accessType", label: "Access Type" }
];

const EXPANDED_OPTIONS = new Array(20).fill(null).map((_v, i) => {
	return { value: `option${i}`, label: `Option ${i}` };
});

const Container = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	rowGap: theme.spacing(3)
}));

const StatusContainer = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	flexWrap: "nowrap",
	columnGap: theme.spacing(2)
}));

const ChipsContaner = styled("div", { shouldForwardProp: (prop) => prop !== "containerWidth" })<{
	containerWidth?: number;
}>(({ theme, containerWidth }) => ({
	width: containerWidth + "px",
	border: `1px solid ${theme.palette.ux.secondary.w40}`,
	borderRadius: "4px",
	minHeight: "32px",
	padding: "4px",
	boxSizing: "border-box"
}));

const CheckboxContainer = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "row",
	flexWrap: "wrap",
	columnGap: theme.spacing(2),
	rowGap: theme.spacing(1)
}));

function ChipTooltip({
	title,
	shouldShowPopover
}: {
	title: string;
	maxWidth?: string;
	shouldShowPopover?: () => boolean;
}) {
	const [tooltipOpen, setTooltipOpen] = useState(false);

	function handleTooltipOpen() {
		setTooltipOpen(!!shouldShowPopover?.());
	}

	function handleTooltipClose() {
		setTooltipOpen(false);
	}

	return (
		<SolaceTooltip
			variant="overflow"
			title={title}
			maxWidth={"medium"}
			open={tooltipOpen}
			onOpen={handleTooltipOpen}
			onClose={handleTooltipClose}
			placement={"bottom-start"}
		>
			{title}
		</SolaceTooltip>
	);
}

const ResponsiveItemListTemplate = ({
	options,
	initSelectedOptions = null,
	containerWidth = 600,
	componentToShowOverflowItems = "popover",
	numOfRowsToShow = 1,
	numOfMenuItemsToDisplay,
	chipMaxWidth,
	overflowIndicatorLabel,
	overflowIndicatorLabelSingular
}: {
	options: [{ value: string; label: string }];
	initSelectedOptions: string[] | null;
	containerWidth: number | undefined;
	componentToShowOverflowItems: "popover" | null;
	numOfRowsToShow: number;
	numOfMenuItemsToDisplay?: number;
	overflowIndicatorLabel?: string;
	overflowIndicatorLabelSingular?: string;
	chipMaxWidth?: string | number;
}): JSX.Element => {
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	const [items, setItems] = useState<SolaceResponsiveItem[] | null>(null);
	const [showAll, setShowAll] = useState<boolean>(false);
	const overflowedItemIdsRef = useRef<string[] | null>(null);

	const optionMap = options.reduce((prev, curr) => {
		prev[curr.value] = curr.label;
		return prev;
	}, {});

	const handleShouldShowPopover = useCallback((id: string): boolean => {
		return !overflowedItemIdsRef.current?.includes(id);
	}, []);

	useEffect(() => {
		if (initSelectedOptions) {
			setSelectedOptions([...initSelectedOptions]);
			setItems(
				initSelectedOptions.map((option) => ({
					id: option + "-Chip",
					content: (
						<SolaceChip
							label={
								<ChipTooltip
									title={optionMap[option]}
									shouldShowPopover={() => handleShouldShowPopover(option + "-Chip")}
								/>
							}
							maxWidth={chipMaxWidth}
						/>
					)
				}))
			);
		}
	}, [chipMaxWidth, handleShouldShowPopover, initSelectedOptions, optionMap]);

	const handleItemsOverflow = useCallback((overflowedItems: SolaceResponsiveItem[]) => {
		overflowedItemIdsRef.current = overflowedItems ? overflowedItems.map((item) => item.id) : null;
	}, []);

	const handleItemsHiddenIndicatorClick = useCallback(() => {
		overflowedItemIdsRef.current = null;
		setShowAll(true);
	}, []);

	const handleOptionChange = (event) => {
		const currentIndex = selectedOptions.indexOf(event.name);
		const newSelectedOptions = [...selectedOptions];

		if (currentIndex === -1) {
			newSelectedOptions.push(event.name);
		} else {
			newSelectedOptions.splice(currentIndex, 1);
		}

		setSelectedOptions(newSelectedOptions);
		setItems(
			// eslint-disable-next-line sonarjs/no-identical-functions
			newSelectedOptions.map((option) => ({
				id: option + "-Chip",
				content: (
					<SolaceChip
						label={
							<ChipTooltip
								title={optionMap[option]}
								shouldShowPopover={() => handleShouldShowPopover(option + "-Chip")}
							/>
						}
						maxWidth={chipMaxWidth}
					/>
				)
			}))
		);
	};

	const checkboxOptions = options.map((option) => (
		<SolaceCheckBox
			key={option.value}
			name={option.value}
			label={option.label}
			checked={selectedOptions.indexOf(option.value) !== -1}
			onChange={handleOptionChange}
		/>
	));

	const handleShowAllChange = (event) => {
		setShowAll(event.value);
	};

	return (
		<Container>
			<StatusContainer>
				<ChipsContaner key={"chipsContainer"} containerWidth={containerWidth}>
					{items && (
						<SolaceResponsiveItemList
							items={items}
							containerWidth={containerWidth}
							componentToShowOverflowItems={componentToShowOverflowItems}
							numOfRowsToShow={numOfRowsToShow}
							numOfMenuItemsToDisplay={numOfMenuItemsToDisplay}
							showAll={showAll}
							overflowIndicatorLabel={overflowIndicatorLabel}
							overflowIndicatorLabelSingular={overflowIndicatorLabelSingular}
							onItemsOverflow={handleItemsOverflow}
							onItemsOverflowIndicatorClick={componentToShowOverflowItems ? handleItemsHiddenIndicatorClick : undefined}
						/>
					)}
				</ChipsContaner>
				<SolaceCheckBox
					key="showAllToggle"
					name="showAllToggle"
					label="Show All"
					checked={showAll}
					onChange={handleShowAllChange}
				/>
			</StatusContainer>

			<CheckboxContainer>{checkboxOptions}</CheckboxContainer>
		</Container>
	);
};

export const DefaultList = {
	render: ResponsiveItemListTemplate,

	args: {
		options: DEFAULT_OPTIONS.slice(0)
	},

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);

		const options = DEFAULT_OPTIONS.slice(0);
		for (let i = 0; i < options.length; i++) {
			await userEvent.click(await canvas.findByText(options[i].label));
		}

		await userEvent.hover(await canvas.findByText(/more/));
	},

	parameters: {
		// Delay snapshot 5 seconds until all interactions are done
		chromatic: { disableSnapshot: true }
	}
};

export const DefaultListManyMenuItems = {
	render: ResponsiveItemListTemplate,

	args: {
		options: EXPANDED_OPTIONS.slice(0),
		initSelectedOptions: new Array(20).fill(null).map((_v, i) => `option${i}`)
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await waitFor(() => expect(canvas.getByText("+ 14 more")).toBeInTheDocument());
		await userEvent.hover(canvas.getByText(/more/));
	},

	parameters: {
		// Delay snapshot 5 seconds until all interactions are done
		chromatic: { disableSnapshot: true }
	}
};

export const DefaultListLimitedMenuItems = {
	render: ResponsiveItemListTemplate,

	args: {
		options: EXPANDED_OPTIONS.slice(0),
		initSelectedOptions: new Array(20).fill(null).map((_v, i) => `option${i}`),
		numOfMenuItemsToDisplay: 3
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await waitFor(() => expect(canvas.getByText("+ 14 more")).toBeInTheDocument());
		await userEvent.hover(canvas.getByText(/more/));
	},

	parameters: {
		// Delay snapshot 5 seconds until all interactions are done
		chromatic: { disableSnapshot: true }
	}
};

export const DefaultListShowAll = {
	render: ResponsiveItemListTemplate,

	args: {
		options: DEFAULT_OPTIONS.slice(0)
	},

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);

		const options = DEFAULT_OPTIONS.slice(0);
		for (let i = 0; i < options.length; i++) {
			await userEvent.click(await canvas.findByText(options[i].label));
		}

		await userEvent.click(await canvas.findByText("Show All"));
	}
};

export const ListWithChipWithTooltip = {
	render: ResponsiveItemListTemplate,

	args: {
		options: DEFAULT_OPTIONS.slice(0),
		chipMaxWidth: "120px"
	},

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);
		const options = DEFAULT_OPTIONS.slice(0);
		for (let i = 0; i < options.length; i++) {
			await userEvent.click(await canvas.findByText(options[i].label));
		}

		await userEvent.hover(await canvas.findByText(/more/));
	},

	parameters: {
		// Delay snapshot 5 seconds until all interactions are done
		chromatic: { disableSnapshot: true }
	}
};

export const ListShowTwoRows = {
	render: ResponsiveItemListTemplate,

	args: {
		options: DEFAULT_OPTIONS.slice(0),
		containerWidth: 400,
		numOfRowsToShow: 2
	},

	play: async ({ canvasElement }) => {
		// Starts querying the component from it's root element
		const canvas = within(canvasElement);

		const options = DEFAULT_OPTIONS.slice(0);
		for (let i = 0; i < options.length; i++) {
			await userEvent.click(await canvas.findByText(options[i].label));
		}
	}
};

export const ListWithNullOverflowComponent = {
	render: ResponsiveItemListTemplate,

	args: {
		options: DEFAULT_OPTIONS.slice(0),
		initSelectedOptions: ["applicationDomain", "brokerType", "mem", "shared", "gatewayServices"],
		componentToShowOverflowItems: null
	}
};

export const ListWithCustomOverflowLabel = {
	render: ResponsiveItemListTemplate,

	args: {
		options: DEFAULT_OPTIONS.slice(0),
		initSelectedOptions: ["applicationDomain", "brokerType", "mem", "shared", "gatewayServices"],
		overflowIndicatorLabel: "Filters",
		overflowIndicatorLabelSingular: "Filter"
	}
};
