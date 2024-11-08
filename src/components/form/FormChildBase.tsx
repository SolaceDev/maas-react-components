import { Box, styled } from "@mui/material";
import SolaceLabel from "./SolaceLabel";
import SolaceStackLabel from "./SolaceStackLabel";
import HelperText from "./HelperText";
import ErrorText from "./ErrorText";
import WarningText from "./WarningText";
import SolaceComponentProps from "../SolaceComponentProps";
import { SX } from "../../types/sx";

interface ChildrenContainerProps {
	inlineLabel: boolean;
}

const ChildrenContainer = styled("div", {
	shouldForwardProp: (prop) => prop !== "inlineLabel"
})<ChildrenContainerProps>(({ theme, inlineLabel }) => ({
	display: "flex",
	flexDirection: "column",
	flexGrow: 1,
	maxWidth: "100%",
	paddingLeft: inlineLabel ? "36px" : "0px",
	"&.hasWarnings": {
		"fieldset.MuiOutlinedInput-notchedOutline, fieldset.MuiInputBase-inputMultiline": {
			borderColor: `${theme.palette.ux.warning.w100}`
		}
	}
}));

export interface FormChildBaseProps extends SolaceComponentProps {
	/**
	 * Unique identifier ... if `id` is not specified, `name` value will be used in order to make `label` and `helperText` accessible for screen readers
	 */
	id: string;
	/**
	 * the label content to display on the screen
	 */
	label?: string | JSX.Element;
	/**
	 * Boolean flag to allow labels to be rendered as SolaceStackLabel component, which provides more props, such as large, bold
	 */
	stackLabel?: boolean;
	/**
	 * Boolean flag to allow StackSolaceLabel component to be rendered with larger font size of 16px (default to 14px)
	 */
	large?: boolean;
	/**
	 * Boolean flag to allow StackSolaceLabel component to be rendered with font weight of medium (default to regular)
	 */
	bold?: boolean;
	/**
	 * The value of the `input` element, required for controlled component
	 */
	value?: string;
	/**
	 * Content to display as supportive/explanatory text
	 */
	helperText?: string | JSX.Element;
	/**
	 * HelperText when the `input` in error state
	 */
	errorText?: string | JSX.Element;
	/**
	 * HelperText when the `input` in warning state
	 */
	warningText?: string | JSX.Element;
	/**
	 * Boolean flag used to display an indicator of whether or not this `input` is mandatory
	 */
	required: boolean;
	/**
	 * Boolean flag to disable the `input`
	 */
	disabled: boolean;
	/**
	 * Boolean flag to set the `input` in a read-only state
	 */
	readOnly: boolean;
	/**
	 * Display the label horizontally
	 */
	inlineLabel: boolean;
	/**
	 * Center align the inline label, this will e used only for single line field label
	 */
	centerInlineLabel?: boolean;

	children: JSX.Element;
	/**
	 * The system prop that allows defining system overrides as well as additional CSS styles. See the `sx` page for more details.
	 */
	sx?: SX;
}

function FormChildBase({
	id,
	label,
	stackLabel,
	large,
	bold,
	required,
	disabled,
	readOnly,
	inlineLabel,
	centerInlineLabel,
	helperText,
	errorText,
	warningText,
	children,
	sx
}: FormChildBaseProps): JSX.Element {
	return (
		<Box
			display="flex"
			flexDirection={inlineLabel ? "row" : "column"}
			justifyContent="space-between"
			alignItems={centerInlineLabel ? "flex-start" : ""}
			sx={sx}
		>
			{stackLabel && label && (
				<div style={{ marginTop: centerInlineLabel ? "5.5px" : "" }}>
					<SolaceStackLabel
						id={`${id}-label`}
						htmlForId={`${id}`}
						required={required}
						disabled={disabled}
						large={large}
						bold={bold}
						readOnly={readOnly}
					>
						{label}
					</SolaceStackLabel>
				</div>
			)}
			{!stackLabel && label && (
				<div style={{ marginTop: centerInlineLabel ? "5.5px" : "" }}>
					<SolaceLabel
						id={`${id}-label`}
						htmlForId={`${id}`}
						required={required}
						disabled={disabled}
						readOnly={readOnly}
						noWrap={inlineLabel}
					>
						{label}
					</SolaceLabel>
				</div>
			)}
			<ChildrenContainer inlineLabel={inlineLabel} className={warningText ? "hasWarnings" : ""}>
				{children}
				{helperText && !errorText && !warningText && <HelperText>{helperText}</HelperText>}
				{warningText && !errorText && <WarningText>{warningText}</WarningText>}
				{errorText && <ErrorText>{errorText}</ErrorText>}
			</ChildrenContainer>
		</Box>
	);
}

export default FormChildBase;
