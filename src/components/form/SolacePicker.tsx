import {
	ListSubheader,
	MenuItem,
	MenuProps,
	PopoverOrigin,
	Select,
	SelectChangeEvent,
	styled,
	useTheme
} from "@mui/material";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { SelectDropdownIcon } from "../../resources/icons/SelectIcons";
import SolaceComponentProps from "../SolaceComponentProps";
import FormChildBase from "./FormChildBase";

export interface SolaceColors {
	bgColor: string;
	fgColor: string;
}

export const SolacePickerIconWrapper = styled("div")(
	({ theme }) => `
	align-items: center;
	display: flex;
	flex-direction: column;
	height: ${theme.spacing(3)};
	justify-content: center;
	width: ${theme.spacing(3)};`
);

const Color = styled(SolacePickerIconWrapper, {
	shouldForwardProp: (key: string) => key !== "bgColor" && key !== "fgColor"
})<{
	bgColor: string;
	fgColor: string;
}>(
	({ theme, bgColor, fgColor }) => `
	background-color: ${bgColor};
	border: ${bgColor === "#FFFFFF" ? "1px solid #000" : "none"};
	border-radius: ${theme.spacing(0.5)};
	box-sizing: border-box;
	color: ${fgColor};
	font-size: ${theme.typography.caption.fontSize};
	font-weight: ${theme.typography.caption.fontWeight};
	height: ${theme.spacing(3)};
	width: ${theme.spacing(3)};`
);

export const EmptyMessageContainer = styled("div")(
	({ theme }) => `
	width: 100%;
	color: ${theme.palette.ux.deprecated.secondary.text.wMain};
	text-align: center;`
);

export type SolacePickerTypes = "colors" | "icons";

const sizes: { [key in SolacePickerTypes]: number } = {
	colors: 5,
	icons: 4
};

/**
 * Utility function to convert a color object to a value
 * @param param {object}
 * @returns string
 */
export const color2value = ({ fgColor, bgColor }: SolaceColors): string => `${fgColor},${bgColor}`;

/**
 *
 * @param value Utility function to convert a string value to object
 * @returns object with fgColor and bgColor
 */
export const value2color = (value: string): SolaceColors => {
	const [fgColor, bgColor] = value.split(",");
	return { fgColor, bgColor };
};

/**
 * Icons are not provided by MRC but maas-icons repo.
 * These are the ones that shoud be used.
 */
export type SolaceEnvironmentIcons =
	| "MAINTENANCE"
	| "CONSTRUCTION"
	| "TOOLKIT"
	| "TERMINAL"
	| "BUG"
	| "TEST_TUBE"
	| "NEW_RELEASE"
	| "CONTENT_SEARCH"
	| "BROKER"
	| "ROCKET_LAUNCH"
	| "VERIFIED"
	| "DEPLOYED_CODE";

export interface SolacePickerChangeEvent {
	name: string;
	value: string;
}

export interface SolacePickerProps<T extends string> extends SolaceComponentProps {
	/**
	 * Unique identifier ... if `id` is not specified, `name` value will be used in order to make `label` and `helperText` accessible for screen readers
	 */
	id?: string;
	/**
	 * Type of picker: "colors" or "icons"
	 */
	variant: SolacePickerTypes;
	/**
	 * Name attribute to assign to the `input` element
	 */
	name: string;
	/**
	 * When #variant is "icons", you must provide the icons from maas-icons (24px). Also see #SolaceEnvironmentIcons
	 */
	icons?: { [key in T]: JSX.Element };
	/**
	 * When #variant is "icons", you can specify the order of the icons to be displayed
	 */
	iconKeyOrderedList?: T[];
	/**
	 * the label content to display on the screen
	 */
	label?: string | JSX.Element;
	/**
	 * The value of the `input` element, required for controlled component
	 */
	value?: string;
	/**
	 * Content to display as supportive/explanitory text
	 */
	helperText?: string | JSX.Element;
	/**
	 * The text to display as the tooltip hint
	 */
	title?: string;
	/**
	 * Boolean flag to mark the `input` in error state
	 */
	hasErrors?: boolean;
	/**
	 * Boolean flag used to display an indicator of whether or not this `input` is mandatory
	 */
	required?: boolean;
	/**
	 * Boolean flag to control whether to stack the label on top of the `input` element (false) or place them inline to one another (true)
	 */
	inlineLabel?: boolean;
	/**
	 * Boolean flag to disable the `input`
	 */
	disabled?: boolean;
	/**
	 * Boolean flag to set the `input` in a read-only state
	 */
	readOnly?: boolean;
	/**
	 * Callback function to trigger whenever the value of the `input` is changed
	 */
	onChange?: (event: SolacePickerChangeEvent) => void;
	/**
	 * Boolean flag to show the select option that has empty value
	 */
	displayEmpty?: boolean;
	/**
	 * Boolean flag to show the select options
	 */
	open?: boolean;
	/**
	 * Callback function to trigger whenever the dropdown opens
	 */
	onOpen?: () => void;
	/**
	 * Callback function to trigger whenever the dropdown closes
	 */
	onClose?: () => void;
	/**
	 * Custom anchorOrigin of the menu
	 */
	menuAnchorOrigin?: PopoverOrigin;
	/**
	 * Custom transformOrigin of the menu
	 */
	menuTransformOrigin?: PopoverOrigin;
	/**
	 * Number of colors or icons to display per row
	 */
	numOfItemsPerRow?: number;
	/**
	 * Optional flag to specify the number of rows to be displayed, default to 5.
	 */
	numOfRowsDisplayed?: number;
	/**
	 * Content control panel to be displayed on top of the menu items. Only applicable when variant is "icons".
	 * This is useful when you want to provide additional controls to the user, such as search, filter, etc.
	 */
	contentControlPanel?: JSX.Element;
	/**
	 * Callback function to return option display value based on selected option value
	 */
	getOptionDisplayValue?: (value: unknown) => ReactNode;
	/**
	 * If true, will focus on the first menuitem
	 */
	autoFocusItem?: boolean;
	/**
	 * Empty state message
	 */
	emptyStateMessage?: string;
}

const ITEM_HEIGHT = 32;
const ITEM_WIDTH = 32;
const ITEM_GAP = 8;
const DEFAULT_NUM_OF_ROWS = 5;
// Padding defined in SolaceGrid for MUI Paper component where menu items are rendered
const MUI_PAPER_PADDING = 16;
const DEFAULT_EMPTY_MESSAGE = "No Results Found";

function SolacePicker<T extends string>({
	id,
	name,
	variant = "colors",
	icons,
	iconKeyOrderedList,
	label,
	value,
	helperText,
	title,
	hasErrors = false,
	required = false,
	disabled = false,
	readOnly = false,
	inlineLabel = false,
	displayEmpty = false,
	onChange,
	dataQa,
	dataTags,
	open,
	onOpen,
	onClose,
	menuAnchorOrigin,
	menuTransformOrigin,
	numOfItemsPerRow,
	numOfRowsDisplayed = DEFAULT_NUM_OF_ROWS,
	contentControlPanel,
	getOptionDisplayValue,
	autoFocusItem = true,
	emptyStateMessage = DEFAULT_EMPTY_MESSAGE
}: SolacePickerProps<T>): JSX.Element {
	const theme = useTheme();
	const ux = theme.palette.ux;
	const [selectedValue, setSelectedValue] = useState(value);
	const [contentControlElement, setContentControlElement] = useState<null | HTMLElement>(null);

	useEffect(() => {
		setSelectedValue(value);
	}, [value]);

	const numOfMenuItemsPerRow = numOfItemsPerRow ? numOfItemsPerRow : sizes[variant];

	const contentWidth = useMemo(() => {
		return ITEM_WIDTH * numOfMenuItemsPerRow + ITEM_GAP * (numOfMenuItemsPerRow - 1);
	}, [numOfMenuItemsPerRow]);

	const contentMaxHeight = useMemo(() => {
		return ITEM_HEIGHT * numOfRowsDisplayed + ITEM_GAP * (numOfRowsDisplayed - 1) + ITEM_HEIGHT / 2;
	}, [numOfRowsDisplayed]);

	const colors = useMemo(
		() =>
			[
				{ fgColor: ux.primary.text.w100, bgColor: ux.background.w10 },
				{ fgColor: ux.primary.text.w100, bgColor: ux.accent.n2.w20 },
				{ fgColor: ux.primary.text.w100, bgColor: ux.accent.n1.w20 },
				{ fgColor: ux.primary.text.w100, bgColor: ux.accent.n6.w30 },
				{ fgColor: ux.primary.text.w100, bgColor: ux.accent.n5.w60 },
				{ fgColor: ux.primary.text.w100, bgColor: ux.accent.n7.wMain },
				{ fgColor: ux.primary.text.w10, bgColor: ux.accent.n0.wMain },
				{ fgColor: ux.primary.text.w10, bgColor: ux.accent.n3.wMain },
				{ fgColor: ux.primary.text.w10, bgColor: ux.accent.n4.wMain },
				{ fgColor: ux.primary.text.w10, bgColor: ux.accent.n9.wMain }
			] as SolaceColors[],
		[ux]
	);

	const shallRenderContentControl = useMemo(() => {
		return variant === "icons" && contentControlPanel;
	}, [contentControlPanel, variant]);

	const handleChange = (event: SelectChangeEvent) => {
		setSelectedValue(event.target.value);
		if (onChange) {
			onChange({
				name: name,
				value: event.target.value
			});
		}
	};

	const getId = () => {
		return id ? id : name;
	};

	const getMenuProps = () => {
		let maxHeight = contentMaxHeight;

		if (shallRenderContentControl) {
			maxHeight = maxHeight + (contentControlElement?.clientHeight || 0);
		} else {
			maxHeight = maxHeight - MUI_PAPER_PADDING / 2;
		}

		const paperOverrrides = {
			// For Select's Paper component, the default maxHeight is `calc(100% - 96px)` which depending on view size.
			// Adding custom maxHeight to override the default value if it is smaller than `calc(100% - 96px)`.
			maxHeight: `min(${maxHeight}px, calc(100% - 96px))`,
			// When rendering content control panel inside the sticky ListSubheader, we want the ListSubheader to define paddingTop
			// instead of the parent Paper component so that when user scrolls, the content inside the ListSubheader stays at the same location.
			padding: shallRenderContentControl ? theme.spacing(0, 2, 2, 2) : theme.spacing(2)
		};

		const menuProps: Partial<MenuProps> = {
			anchorOrigin: { vertical: "bottom", horizontal: "left" },
			transformOrigin: { vertical: "top", horizontal: "left" },
			MenuListProps: {
				autoFocusItem: autoFocusItem,
				className: "SolacePickerGrid",
				style: {
					gridTemplateColumns: `repeat(${numOfMenuItemsPerRow}, 1fr)`
				}
			},
			slotProps: {
				paper: {
					sx: paperOverrrides
				}
			}
		};
		if (menuAnchorOrigin) {
			menuProps.anchorOrigin = menuAnchorOrigin;
		}
		if (menuTransformOrigin) {
			menuProps.transformOrigin = menuTransformOrigin;
		}
		return menuProps;
	};

	const renderContentControl = useCallback(() => {
		if (contentControlPanel) {
			return (
				<ListSubheader
					ref={setContentControlElement}
					sx={{
						gridColumnStart: 1,
						gridColumnEnd: numOfMenuItemsPerRow + 1,
						padding: theme.spacing(2, 0, 1, 0),
						width: contentWidth, // width is determined by the number of items per row
						height: "fit-content !important"
					}}
				>
					{contentControlPanel}
				</ListSubheader>
			);
		}

		return null;
	}, [contentControlPanel, contentWidth, numOfMenuItemsPerRow, theme]);

	const renderEmptyMessage = useCallback(() => {
		return (
			<ListSubheader
				sx={{
					gridColumnStart: 1,
					gridColumnEnd: numOfMenuItemsPerRow + 1,
					padding: theme.spacing(0),
					width: contentWidth, // width is determined by the number of items per row
					height: "fit-content !important"
				}}
			>
				<EmptyMessageContainer>{emptyStateMessage}</EmptyMessageContainer>
			</ListSubheader>
		);
	}, [contentWidth, emptyStateMessage, numOfMenuItemsPerRow, theme]);

	const renderColorMenuItems = useCallback(() => {
		if (variant === "colors") {
			return colors.map((color) => {
				const value = color2value(color);
				return (
					<MenuItem key={value} value={value} disableGutters>
						<Color bgColor={color.bgColor} fgColor={color.fgColor}>
							Aa
						</Color>
					</MenuItem>
				);
			});
		}

		return null;
	}, [colors, variant]);

	const renderIconMenuItems = useCallback(() => {
		if (variant === "icons") {
			let iconMenuItems = null;

			if (icons) {
				if (iconKeyOrderedList) {
					iconMenuItems = iconKeyOrderedList
						.map((key) => {
							const icon = icons[key];
							return icon ? (
								<MenuItem key={key} value={key} disableGutters>
									<SolacePickerIconWrapper>{icon}</SolacePickerIconWrapper>
								</MenuItem>
							) : null;
						})
						.filter((item) => item !== null);
				} else {
					iconMenuItems = Object.entries<JSX.Element>(icons).map(([key, icon]) => (
						<MenuItem key={key} value={key} disableGutters>
							<SolacePickerIconWrapper>{icon}</SolacePickerIconWrapper>
						</MenuItem>
					));
				}
			}

			if (iconMenuItems?.length) {
				return iconMenuItems;
			} else {
				return renderEmptyMessage();
			}
		}

		return null;
	}, [variant, icons, iconKeyOrderedList, renderEmptyMessage]);

	const select = () => (
		<Select
			id={getId()}
			name={name}
			data-qa={dataQa}
			data-tags={dataTags}
			aria-describedby={helperText ? `${getId()}-select-helper-text` : ""}
			aria-labelledby={label ? `${getId()}-label` : ""}
			aria-readonly={readOnly}
			className="SolacePickerGrid"
			title={title}
			disabled={disabled && !readOnly}
			readOnly={readOnly}
			required={required}
			error={hasErrors}
			value={selectedValue}
			onChange={handleChange}
			IconComponent={SelectDropdownIcon}
			MenuProps={getMenuProps()}
			SelectDisplayProps={{ style: { padding: "4px 40px 4px 4px" } }}
			style={{ width: "fit-content" }}
			displayEmpty={displayEmpty}
			onOpen={onOpen}
			onClose={onClose}
			open={open}
			renderValue={getOptionDisplayValue ? getOptionDisplayValue : undefined}
		>
			{shallRenderContentControl && renderContentControl()}
			{renderColorMenuItems()}
			{renderIconMenuItems()}
		</Select>
	);

	return (
		<FormChildBase
			id={getId()}
			label={label}
			helperText={helperText}
			errorText={hasErrors ? helperText : undefined}
			disabled={disabled}
			readOnly={readOnly}
			required={required}
			inlineLabel={inlineLabel}
			centerInlineLabel={inlineLabel}
		>
			{select()}
		</FormChildBase>
	);
}

export default SolacePicker;
