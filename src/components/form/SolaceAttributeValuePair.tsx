import React from "react";
import SolaceTextField, { SolaceTextFieldChangeEvent } from "./SolaceTextField";
import { styled } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import { DeleteIcon } from "../../resources/icons/DeleteIcon";
import { MoveIcon } from "../../resources/icons/MoveIcon";

import { BASE_COLORS } from "../../resources/colorPallette";

interface SolaceAVPMoveButtonProps {
	cursor: string;
}
interface SolaceAVPDeleteButtonProps {
	cursor: string;
	background: string;
}

const SolaceAVPContainer = styled("div")(({ theme }) => theme.mixins.formComponent_AVPItem.container);
const SolaceAVPInputForKey = styled("div")(({ theme }) => theme.mixins.formComponent_AVPItem.inputWrapperForKey);
const SolaceAVPInputForValue = styled("div")(({ theme }) => theme.mixins.formComponent_AVPItem.inputWrapperForValue);

const SolaceAVPMoveButton = styled("div")<SolaceAVPMoveButtonProps>(({ theme, cursor }) => ({
	...theme.mixins.formComponent_AVPItem.moveButton,
	cursor: cursor
}));

const SolaceAVPDeleteButton = styled("div")<SolaceAVPDeleteButtonProps>(({ theme, cursor, background }) => ({
	...theme.mixins.formComponent_AVPItem.deleteButton,
	cursor: cursor,
	":hover": {
		backgroundColor: background
	}
}));

export enum valueInputTypes {
	textfield = "textfield",
	select = "select",
	autocomplete = "autocomplete"
}

export interface SolaceAttributeValuePairProps {
	/**
	 * unique id for each Attribute Value Pair (AVP) item
	 */
	id?: string;
	/**
	 * index for each Attribute Value Pair (AVP) item in the list, used to updated the list in response to delete and onchange events
	 */
	index: number;
	/**
	 * key for Attribute Value Pair (AVP)
	 */
	avpKey: string;
	/**
	 * value for Attribute Value Pair (AVP)
	 */
	avpValue: string;
	/**
	 *
	 */
	dataTags: string;
	/**
	 * TODO: implementation required
	 * specifies the type of the value providing component: types can be input, select etc. component, default to SolaceTextField if no type provided
	 */
	type?: valueInputTypes;
	/**
	 * specifies whether the Attribute Value Pair (AVP) component is rendered in ghost state
	 */
	ghostItem: boolean;
	/**
	 * callback for delete action
	 */
	onDelete: (event: React.MouseEvent<HTMLElement>, index: number) => void;
	/**
	 * callback for input onchange event
	 */
	onChange: (event: SolaceTextFieldChangeEvent, index: number) => void;
	/**
	 * callback for keyup event
	 */
	onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	/**
	 * callback for onblur event
	 */
	onBlur: (event: React.FocusEvent<HTMLInputElement>, index: number) => void;
	/**
	 * validation error on an AVP value input value
	 */
	keyErrorText: string;
	/**
	 * validation error on an AVP value input value
	 */
	valueErrorText: string;
}

export const SolaceAttributeValuePair = ({
	index,
	avpKey,
	avpValue,
	dataTags,
	ghostItem = false,
	onDelete,
	onChange,
	onKeyUp,
	onBlur,
	keyErrorText,
	valueErrorText
}: SolaceAttributeValuePairProps) => {
	return (
		<Draggable draggableId={`avp-${index}`} index={index}>
			{(provided) => (
				<SolaceAVPContainer ref={provided.innerRef} {...provided.draggableProps}>
					<SolaceAVPMoveButton {...provided.dragHandleProps} cursor={ghostItem ? "default" : "move"}>
						<MoveIcon fill={ghostItem ? BASE_COLORS.greys.grey3 : BASE_COLORS.greys.grey11} opacity={1} />
					</SolaceAVPMoveButton>

					<SolaceAVPInputForKey>
						<SolaceTextField
							name="key"
							dataQa={`avpKey-${index}`}
							dataTags={dataTags}
							value={avpKey}
							onChange={(e) => onChange(e, index)}
							onKeyUp={onKeyUp}
							onBlur={(e) => onBlur(e, index)}
							hasErrors={ghostItem ? false : !!keyErrorText}
							helperText={ghostItem ? "" : keyErrorText}
						/>
					</SolaceAVPInputForKey>

					<SolaceAVPInputForValue>
						<SolaceTextField
							name="value"
							dataQa={`avpValue-${index}`}
							dataTags={dataTags}
							value={avpValue}
							onChange={(e) => onChange(e, index)}
							onKeyUp={onKeyUp}
							onBlur={(e) => onBlur(e, index)}
							hasErrors={ghostItem ? false : !!valueErrorText}
							helperText={ghostItem ? "" : valueErrorText}
						/>
					</SolaceAVPInputForValue>

					<SolaceAVPDeleteButton
						onClick={(e) => onDelete(e, index)}
						tabIndex={0}
						cursor={ghostItem ? "default" : "pointer"}
						background={ghostItem ? "inherit" : BASE_COLORS.greys.grey23}
					>
						<DeleteIcon fill={ghostItem ? BASE_COLORS.greys.grey3 : BASE_COLORS.greys.grey11} opacity={1} />
					</SolaceAVPDeleteButton>
				</SolaceAVPContainer>
			)}
		</Draggable>
	);
};
