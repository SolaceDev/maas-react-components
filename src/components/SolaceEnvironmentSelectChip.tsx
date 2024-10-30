import React, { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material";
import { SelectOption } from "@mui/base";
import { Select as BaseSelect, SelectProps, selectClasses, SelectRootSlotProps } from "@mui/base/Select";
import { Option as BaseOption, optionClasses } from "@mui/base/Option";
import SolaceComponentProps from "./SolaceComponentProps";
import { SolaceSelectChangeEvent } from "./form/SolaceSelect";
import { SelectDropdownIcon } from "../resources/icons/SelectIcons";

const shouldForwardProp = (key: string) => key !== "bgColor" && key !== "fgColor";

const ColorLayer = styled("div", { shouldForwardProp })<{ bgColor?: string; fgColor?: string }>(
	({ theme, bgColor = "#FFFFFF", fgColor = "#000000" }) => `
	background-color: ${bgColor};
	border-color: ${bgColor?.toUpperCase() === "#FFFFFF" ? theme.palette.ux.secondary.w100 : "transparent"};
	border-style: solid;
	border-width: 1px;
	border-radius: ${theme.spacing(0.5)};
	box-sizing: border-box;
	color: ${fgColor};
	fill: ${fgColor};`
);

const IconWrapper = styled(ColorLayer)(
	({ theme }) => `
	display: flex;
	padding: ${theme.spacing(0.5)};`
);

const StateLayer = styled("div")(
	({ theme }) => `
	align-items: center;
	column-gap: ${theme.spacing(1)};
	display: flex;
	flex-direction: row;
	font-weight: ${theme.typography.body1.fontWeight};
	justify-content: space-between;
	padding: ${theme.spacing(0, 0, 0, 0.5)};
	&:hover {
		background-color: ${theme.palette.ux.stateLayer.w10};
	}
	& > svg {
		vertical-align: middle;
	}`
);

const ContentLayer = React.forwardRef(function EnvironmentButton(
	props: SelectRootSlotProps<string, false> & SelectOptionsProps,
	ref: React.ForwardedRef<HTMLButtonElement>
) {
	const { ownerState, options, children, ...other } = props;
	const details = (options ?? []).find((o) => o.value === ownerState.value);

	return (
		<button type="button" {...other} ref={ref}>
			<ColorLayer bgColor={details?.bgColor} fgColor={details?.fgColor}>
				<StateLayer className="state-layer">
					{children}
					<SelectDropdownIcon />
				</StateLayer>
			</ColorLayer>
		</button>
	);
});

const ContainerLayer = styled(ContentLayer, { shouldForwardProp: () => true })(
	({ theme }) => `
	border: none;
	border-radius: ${theme.spacing(0.5)};
	cursor: pointer;
	font-size: ${theme.typography.body1.fontSize};
	font-weight: ${theme.typography.body1.fontWeight};
	padding: 0;
	text-align: left;
	&.${selectClasses.expanded} .state-layer {
		background-color: ${theme.palette.ux.stateLayer.w20};
	}
	&.${selectClasses.focusVisible} {
		outline: 0;
	}`
);

const Listbox = styled("ul")(
	({ theme }) => `
	background-color: ${theme.palette.ux.background.w10};
	border-radius: ${theme.spacing(0.5)};
	box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
	box-sizing: border-box;
	margin: 0;
	min-width: ${theme.spacing(40)};
	outline: 0;
	overflow: auto;
	padding: ${theme.spacing(1, 0)};`
);

const Option = styled(BaseOption)(
	({ theme }) => `
	align-items: center;
	column-gap: ${theme.spacing(2)};
	cursor: default;
	display: flex;
	flex-direction: row;
	list-style: none;
	padding: ${theme.spacing(1, 2)};
	&:last-of-type {
		border-bottom: none;
	}
	&.${optionClasses.selected},
	&.${optionClasses.highlighted},
	&.${optionClasses.highlighted}.${optionClasses.selected} {
		background-color: ${theme.palette.ux.brand.w10};
	}
	&.${optionClasses.disabled} {
		color: ${theme.palette.ux.secondary.w40};
	}
	&:hover:not(.${optionClasses.disabled}) {
		background-color: ${theme.palette.ux.deprecated.secondary.w10};
	}`
);

const Popup = styled("div")`
	z-index: 1;
`;

const Icon = styled("span")`
	display: flex;
`;

const Text = styled("span")`
	max-width: 134px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export interface SolaceEnvironmentSelectChipOption {
	/**
	 * Environment's label
	 */
	label: string;
	/**
	 * Environment's value (or unique ID)
	 */
	value: string;
	/**
	 * Background color
	 */
	bgColor: string;
	/**
	 * Text color
	 */
	fgColor: string;
	/**
	 * Icon from maas-icons (16x16)
	 */
	icon: JSX.Element;
}

interface SelectOptionsProps {
	options: SolaceEnvironmentSelectChipOption[];
}

function Select(props: SelectProps<string, false> & SelectOptionsProps) {
	const slots: SelectProps<string, false>["slots"] = {
		root: ContainerLayer,
		listbox: Listbox,
		popup: Popup,
		...props.slots
	};

	const { children, ...other } = props;
	const options = other.options;

	const renderValue = useCallback(
		(option: SelectOption<string> | null) => {
			const details = (options ?? []).find((o) => o.value === option?.value);
			return (
				<>
					{details?.icon && <Icon>{details.icon}</Icon>}
					<Text>{details?.label}</Text>
				</>
			);
		},
		[options]
	);

	return (
		<BaseSelect renderValue={renderValue} {...other} slots={slots}>
			{options.map(({ label, value, fgColor, bgColor, icon }) => (
				<Option key={value} value={value}>
					{icon && (
						<IconWrapper fgColor={fgColor} bgColor={bgColor}>
							{icon}
						</IconWrapper>
					)}
					<span>{label}</span>
				</Option>
			))}
			{children}
		</BaseSelect>
	);
}

export interface SolaceEnvironmentSelectChipProps extends SolaceComponentProps, SelectOptionsProps {
	/**
	 * Unique identifier ... if `id` is not specified, `name` value will be used in order to make `label` and `helperText` accessible for screen readers
	 */
	id?: string;
	/**
	 * Name attribute to assign to the `input` element
	 */
	name: string;
	/**
	 * Array of environment options
	 */
	options: SolaceEnvironmentSelectChipOption[];
	/**
	 * The value of the `input` element, required for controlled component
	 */
	value?: string;
	/**
	 * Callback function to trigger whenever the value of the `input` is changed, required for controlled component
	 */
	onChange?: (event: SolaceSelectChangeEvent) => void;
	/**
	 * Additional elements to render below the environments
	 */
	children?: JSX.Element | Array<JSX.Element>;
}

function SolaceEnvironmentSelectChip({
	id,
	name,
	options,
	value = "",
	onChange,
	dataQa,
	dataTags,
	children
}: SolaceEnvironmentSelectChipProps): JSX.Element {
	const [selectedValue, setSelectedValue] = useState(value);

	useEffect(() => {
		setSelectedValue(value);
	}, [value]);

	const handleChange = (_: unknown, value: string | null) => {
		setSelectedValue(value ?? "");
		if (onChange) {
			onChange({
				name: name,
				value: value ?? ""
			});
		}
	};

	const getId = () => {
		return id ? id : name;
	};

	return (
		<Select
			id={getId()}
			name={name}
			options={options}
			data-qa={dataQa}
			data-tags={dataTags}
			value={selectedValue}
			onChange={handleChange}
		>
			{children}
		</Select>
	);
}

export default SolaceEnvironmentSelectChip;
