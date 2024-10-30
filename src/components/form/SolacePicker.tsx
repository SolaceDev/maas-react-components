import { MenuItem, MenuProps, PopoverOrigin, Select, SelectChangeEvent, styled, useTheme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { SelectDropdownIcon } from "../../resources/icons/SelectIcons";
import SolaceComponentProps from "../SolaceComponentProps";
import FormChildBase from "./FormChildBase";

export interface SolaceColors {
	bgColor: string;
	fgColor: string;
}

const Icon = styled("div")(
	({ theme }) => `
	align-items: center;
	display: flex;
	flex-direction: column;
	height: ${theme.spacing(3)};
	justify-content: center;
	width: ${theme.spacing(3)};`
);

const Color = styled(Icon, { shouldForwardProp: (key: string) => key !== "bgColor" && key !== "fgColor" })<{
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
}

function SolacePicker<T extends string>({
	id,
	name,
	variant = "colors",
	icons,
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
	menuTransformOrigin
}: SolacePickerProps<T>): JSX.Element {
	const theme = useTheme();
	const ux = theme.palette.ux;
	const [selectedValue, setSelectedValue] = useState(value);

	useEffect(() => {
		setSelectedValue(value);
	}, [value]);

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
		const menuProps: Partial<MenuProps> = {
			anchorOrigin: { vertical: "bottom", horizontal: "left" },
			transformOrigin: { vertical: "top", horizontal: "left" },
			MenuListProps: {
				autoFocusItem: true,
				className: "SolaceGrid",
				style: {
					gridTemplateColumns: `repeat(${sizes[variant]}, 1fr)`
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

	const select = () => (
		<Select
			id={getId()}
			name={name}
			data-qa={dataQa}
			data-tags={dataTags}
			aria-describedby={helperText ? `${getId()}-select-helper-text` : ""}
			aria-labelledby={label ? `${getId()}-label` : ""}
			aria-readonly={readOnly}
			className="SolaceGrid"
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
		>
			{variant === "colors" &&
				colors.map((color) => {
					const value = color2value(color);
					return (
						<MenuItem key={value} value={value} disableGutters>
							<Color bgColor={color.bgColor} fgColor={color.fgColor}>
								Aa
							</Color>
						</MenuItem>
					);
				})}
			{variant === "icons" &&
				icons &&
				Object.entries<JSX.Element>(icons).map(([key, icon]) => (
					<MenuItem key={key} value={key} disableGutters>
						<Icon>{icon}</Icon>
					</MenuItem>
				))}
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
