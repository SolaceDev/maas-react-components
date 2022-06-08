import React from "react";
import SolaceTextField, { SolaceTextFieldChangeEvent } from "./SolaceTextField";
import { styled } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import { DeleteIcon } from "../../resources/icons/DeleteIcon";
import { MoveIcon } from "../../resources/icons/MoveIcon";
import { BASE_COLORS } from "../../resources/colorPallette";
import { CSSProperties } from "@mui/styled-engine";

interface SolaceAVPContainerProps {
	isDragging: boolean;
	dropOverIndex: number | null;
	dropFromTop: boolean | null;
	index: number;
	readOnly: boolean;
}

interface SolaceAVPMoveButtonProps {
	isDragging: boolean;
	ghostItem: boolean;
	readOnly: boolean;
}
interface SolaceAVPDeleteButtonProps {
	cursor: string;
	background: string;
	readOnly: boolean;
}

// conditionally display a drop line as a visual indicator for droppable position
const displayDropLine = (dropFromTop: boolean | null, dropOverIndex: number | null, index: number): string => {
	let dropLine = "";
	if (dropFromTop !== null && dropOverIndex !== null) {
		if (dropFromTop && dropOverIndex + 1 === index) {
			dropLine = `1px solid ${BASE_COLORS.greens.green2}`;
		} else if (!dropFromTop && dropOverIndex === index) dropLine = `1px solid ${BASE_COLORS.greens.green2}`;
	}
	return dropLine;
};

const SolaceAVPContainer = styled("div", {
	shouldForwardProp: (prop) =>
		prop !== "isDragging" && prop !== "dropOverIndex" && prop !== "dropFromTop" && prop !== "readOnly"
})<SolaceAVPContainerProps>(({ theme, isDragging, dropOverIndex, index, dropFromTop, readOnly }) => ({
	...(theme.mixins.formComponent_AVPItem.container as CSSProperties),
	backgroundColor: isDragging ? BASE_COLORS.greens.green9 : "inherit",
	borderTop: displayDropLine(dropFromTop, dropOverIndex, index),
	gridTemplateColumns: readOnly ? "0px minmax(0, 1fr) 8px minmax(0, 1fr) 0px" : "32px 1fr 8px 1fr 32px"
}));
const SolaceAVPInputForKey = styled("div")(({ theme }) => ({
	...(theme.mixins.formComponent_AVPItem.inputWrapperForKey as CSSProperties)
}));
const SolaceAVPInputForValue = styled("div")(({ theme }) => ({
	...(theme.mixins.formComponent_AVPItem.inputWrapperForValue as CSSProperties)
}));

const SolaceAVPMoveButton = styled("div", {
	shouldForwardProp: (prop) => prop !== "ghostItem" && prop !== "isDragging" && prop !== "readOnly"
})<SolaceAVPMoveButtonProps>(({ theme, ghostItem, isDragging, readOnly }) => ({
	...(theme.mixins.formComponent_AVPItem.moveButton as CSSProperties),
	cursor: ghostItem ? "default" : isDragging ? "move" : "pointer",
	display: readOnly ? "none" : "inherit"
}));

const SolaceAVPDeleteButton = styled("div", {
	shouldForwardProp: (prop) => prop !== "cursor" && prop !== "background" && prop !== "readOnly"
})<SolaceAVPDeleteButtonProps>(({ theme, cursor, background, readOnly }) => ({
	...(theme.mixins.formComponent_AVPItem.deleteButton as CSSProperties),
	cursor: cursor,
	display: readOnly ? "none" : "inherit",
	":hover": {
		backgroundColor: background
	}
}));

const ValueWrapper = styled("div")({
	paddingTop: "7px",
	color: BASE_COLORS.greys.grey11
});

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
	 * An optional string to be displayed when an AVP key or value is empty when set to read-only.
	 */
	emptyFieldDisplayValue?: string;
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
	readOnly,
	emptyFieldDisplayValue = ""
}: SolaceAttributeValuePairProps) => {
	return (
		<Draggable draggableId={id} index={index} isDragDisabled={ghostItem}>
			{
				// TODO: Refactor this function to reduce its Cognitive Complexity from 17 to the 15 allowed
				// eslint-disable-next-line sonarjs/cognitive-complexity
				(provided, snapshot) => (
					<SolaceAVPContainer
						ref={provided.innerRef}
						{...provided.draggableProps}
						isDragging={snapshot.isDragging}
						dropOverIndex={dropOverIndex}
						dropFromTop={dropFromTop}
						index={index}
						readOnly={readOnly ? readOnly : false}
					>
						<SolaceAVPMoveButton
							{...provided.dragHandleProps}
							isDragging={snapshot.isDragging}
							ghostItem={ghostItem}
							readOnly={readOnly ? readOnly : false}
						>
							<MoveIcon fill={ghostItem ? BASE_COLORS.greys.grey3 : BASE_COLORS.greys.grey11} opacity={1} />
						</SolaceAVPMoveButton>

						<SolaceAVPInputForKey>
							{!avpKey && avpValue && readOnly && (
								<ValueWrapper data-qa={`avpKey-${index}`}>{emptyFieldDisplayValue}</ValueWrapper>
							)}
							{(avpKey || (!avpKey && !readOnly)) && (
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
							)}
						</SolaceAVPInputForKey>

						<SolaceAVPInputForValue>
							{avpKey && !avpValue && readOnly && (
								<ValueWrapper data-qa={`avpValue-${index}`}>{emptyFieldDisplayValue}</ValueWrapper>
							)}
							{(avpValue || (!avpValue && !readOnly)) && (
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
							)}
						</SolaceAVPInputForValue>

						<SolaceAVPDeleteButton
							onClick={(e) => onDelete(e, index)}
							tabIndex={0}
							cursor={ghostItem ? "default" : "pointer"}
							background={ghostItem ? "inherit" : BASE_COLORS.greys.grey23}
							readOnly={readOnly ? readOnly : false}
						>
							<DeleteIcon fill={ghostItem ? BASE_COLORS.greys.grey3 : BASE_COLORS.greys.grey11} opacity={1} />
						</SolaceAVPDeleteButton>
					</SolaceAVPContainer>
				)
			}
		</Draggable>
	);
};
