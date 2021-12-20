import SolaceTextField, { SolaceTextFieldChangeEvent } from "./SolaceTextField";
import { styled } from "@material-ui/core";
import { DeleteIcon } from "../../resources/icons/DeleteIcon";
import { MoveIcon } from "../../resources/icons/MoveIcon";
import React from "react";
import { BASE_COLORS } from "../../resources/colorPallette";

const SolaceAttributeValuePairContainer = styled("div")(
	({ theme }) => theme.mixins.formComponent_EnumInputItem.container
);

enum valueInputTypes {
	textfield = "textfield",
	select = "select",
	autocomplete = "autocomplete"
}

export interface SolaceAttributeValuePairProps {
	/**
	 * unique id for each Attribute Value Pair (AVP) item TODO: may not needed for AVP item
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
	 * specifies the type of the value providing component: types can be input, select etc. component (currently default to SolaceTextField)
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
	 * callback for drag and drop action
	 */
	moveItem?: (dragIndex: number, hoverIndex: number) => void;
}

export const SolaceAttributeValuePair = ({
	index,
	avpKey,
	avpValue,
	dataTags,
	type = valueInputTypes.textfield,
	ghostItem = false,
	onDelete,
	onChange,
	onKeyUp
}: SolaceAttributeValuePairProps) => {
	return (
		<SolaceAttributeValuePairContainer className={ghostItem ? "ghost" : ""}>
			<div>
				<MoveIcon fill={ghostItem ? BASE_COLORS.greys.grey3 : BASE_COLORS.greys.grey11} opacity={1} />
			</div>
			{type == valueInputTypes.textfield && (
				<SolaceTextField
					name="key"
					dataQa={`avpKey-${index}`}
					dataTags={dataTags}
					value={avpKey}
					onChange={(e) => onChange(e, index)}
					onKeyUp={onKeyUp}
				/>
			)}
			{type === valueInputTypes.textfield && (
				<SolaceTextField
					name="value"
					dataQa={`avpValue-${index}`}
					dataTags={dataTags}
					value={avpValue}
					onChange={(e) => onChange(e, index)}
					onKeyUp={onKeyUp}
				/>
			)}

			<div
				style={{ cursor: ghostItem ? "default" : "pointer", paddingTop: "2px" }}
				onClick={(e) => onDelete(e, index)}
				tabIndex={0}
			>
				<DeleteIcon fill={ghostItem ? BASE_COLORS.greys.grey3 : BASE_COLORS.greys.grey11} opacity={1} />
			</div>
		</SolaceAttributeValuePairContainer>
	);
};
