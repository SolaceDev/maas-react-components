import React from "react";
import SolaceTextField, { SolaceTextFieldChangeEvent } from "./SolaceTextField";
import { styled } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import { DeleteIcon } from "../../resources/icons/DeleteIcon";
import { MoveIcon } from "../../resources/icons/MoveIcon";

import { BASE_COLORS } from "../../resources/colorPallette";

interface SolaceAVPContainerProps {
	isDragging: boolean;
	dropOverIndex: number | null;
	dropFromTop: boolean | null;
	index: number;
}

interface SolaceAVPMoveButtonProps {
	isDragging: boolean;
	ghostItem: boolean;
}
interface SolaceAVPDeleteButtonProps {
	cursor: string;
	background: string;
}

// conditionally display a drop line as a visual indicator for droppable position
const displayDropLine = (dropFromTop: boolean | null, dropOverIndex: number | null, index: number): string => {
	let dropLine = "";
	if (dropFromTop != null && dropOverIndex !== null) {
		if (dropFromTop && dropOverIndex + 1 === index) {
			dropLine = `1px solid ${BASE_COLORS.greens.green2}`;
		} else if (!dropFromTop && dropOverIndex === index) dropLine = `1px solid ${BASE_COLORS.greens.green2}`;
	}
	return dropLine;
};

const SolaceAVPContainer = styled("div")<SolaceAVPContainerProps>(
	({ theme, isDragging, dropOverIndex, index, dropFromTop }) => ({
		...theme.mixins.formComponent_AVPItem.container,
		backgroundColor: isDragging ? BASE_COLORS.greens.green9 : "inherit",
		borderTop: displayDropLine(dropFromTop, dropOverIndex, index)
	})
);
const SolaceAVPInputForKey = styled("div")(({ theme }) => theme.mixins.formComponent_AVPItem.inputWrapperForKey);
const SolaceAVPInputForValue = styled("div")(({ theme }) => theme.mixins.formComponent_AVPItem.inputWrapperForValue);

const SolaceAVPMoveButton = styled("div")<SolaceAVPMoveButtonProps>(({ theme, ghostItem, isDragging }) => ({
	...theme.mixins.formComponent_AVPItem.moveButton,
	cursor: ghostItem ? "default" : isDragging ? "move" : "pointer"
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
	id: string;
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
	keyErrorText?: string;
	/**
	 * validation error on an AVP value input value
	 */
	valueErrorText?: string;
	/**
	 * index of the element that is being dragged over with
	 * the index is updated on dragging
	 */
	dropOverIndex: number | null;
	/**
	 * dropping over state with three possible values:
	 * true: dropping from top to bottom
	 * false: dropping from bottom to top
	 * null: dropping back to the same position or outside of the droppable container
	 */
	dropFromTop: boolean | null;
	/**
	 * read only flag
	 */
	readOnly?: boolean;
}

export const SolaceAttributeValuePair = ({
	id,
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
	valueErrorText,
	dropOverIndex,
	dropFromTop,
	readOnly
}: SolaceAttributeValuePairProps) => {
	return (
		<Draggable draggableId={id} index={index} isDragDisabled={ghostItem}>
			{(provided, snapshot) => (
				<SolaceAVPContainer
					ref={provided.innerRef}
					{...provided.draggableProps}
					isDragging={snapshot.isDragging}
					dropOverIndex={dropOverIndex}
					dropFromTop={dropFromTop}
					index={index}
				>
					{!readOnly && (
						<SolaceAVPMoveButton {...provided.dragHandleProps} isDragging={snapshot.isDragging} ghostItem={ghostItem}>
							<MoveIcon fill={ghostItem ? BASE_COLORS.greys.grey3 : BASE_COLORS.greys.grey11} opacity={1} />
						</SolaceAVPMoveButton>
					)}

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
							readOnly={readOnly}
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
							readOnly={readOnly}
						/>
					</SolaceAVPInputForValue>

					{!readOnly && (
						<SolaceAVPDeleteButton
							onClick={(e) => onDelete(e, index)}
							tabIndex={0}
							cursor={ghostItem ? "default" : "pointer"}
							background={ghostItem ? "inherit" : BASE_COLORS.greys.grey23}
						>
							<DeleteIcon fill={ghostItem ? BASE_COLORS.greys.grey3 : BASE_COLORS.greys.grey11} opacity={1} />
						</SolaceAVPDeleteButton>
					)}
				</SolaceAVPContainer>
			)}
		</Draggable>
	);
};
