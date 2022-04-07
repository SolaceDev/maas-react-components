import { useState, useEffect, useCallback } from "react";
import { styled } from "@mui/material";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import SolaceLabel from "./SolaceLabel";
import { valueInputTypes } from "./SolaceAttributeValuePair";
import SolaceAttributeValuePairList, { AVPItem } from "./SolaceAttributeValuePairList";

interface SolaceAVPFormLabelProps {
	readOnly: boolean;
}

const SolaceAVPFormContainer = styled("div")(({ theme }) => theme.mixins.formComponent_AVPForm.container);
const SolaceAVPFormLabel = styled("div")<SolaceAVPFormLabelProps>(({ theme, readOnly }) => ({
	...theme.mixins.formComponent_AVPForm.labelWrapper,
	gridTemplateColumns: readOnly ? "0px 3fr 8px 5fr 0px" : "32px 1fr 8px 1fr 32px"
}));
const SolaceAVPListContainer = styled("div")(({ theme }) => theme.mixins.formComponent_AVPForm.listWrapper);

const reorderList = (list: Array<AVPItem>, startIndex: number, endIndex: number): Array<AVPItem> => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const ghostItemAtIndex = (list: Array<AVPItem>, index: number) => {
	return list[index]["key"] === "" && list[index]["value"] === "";
};

export interface SolaceAttributeValuePairFormProps {
	/**
	 * Unique identifier, if `id` is not specified, `name` value will be used
	 */
	id?: string;
	/**
	 * Name attribute to assign to the AVP form
	 */
	name: string;
	/**
	 * read only flag
	 */
	readOnly?: boolean;
	/**
	 * label for the key column
	 */
	labelForKeys?: string;
	/**
	 * label for the value column
	 */
	labelForValues?: string;
	/**
	 * TODO: implementation required
	 * specifies the type of the value providing component: types can be input, select etc. component, default to SolaceTextField if no type provided
	 */
	type?: valueInputTypes;
	/**
	 * initial AVP list of key/value pairs, it can be an empty array e.g.[]
	 */
	avpList?: Array<AVPItem>;
	/**
	 * callback function that returns the current AVP list
	 */
	onAVPListUpdate?: (list: Array<AVPItem>) => void;
	/**
	 * validate individual AVP values, the function is triggered onBlur event
	 */
	avpKeyValidationCallback?: (input: string, values: Array<AVPItem>) => string;
	/**
	 * validate individual AVP values, the function is triggered onBlur event
	 */
	avpValueValidationCallback?: (input: string, values: Array<AVPItem>) => string;
	/**
	 * Boolean flag used to display an indicator of whether or not `input` for key field is mandatory
	 */
	enableRequiredKeyFieldIndicator?: boolean;
	/**
	 * Boolean flag used to display an indicator of whether or not `input` for value field is mandatory
	 */
	enableRequiredValueFieldIndicator?: boolean;
	/**
	 * An optional string to be displayed when an AVP key or value is empty when set to read-only.
	 */
	emptyFieldDisplayValue?: string;
	/**
	 *
	 * This boolean allows user to toggle whether keys are mandatory or not (i.e. if set to false, you can have a value without an associated key)
	 */
	keyRequired?: boolean;
	/**
	 * String message to display if an AVP value is specified without an associated key (unless allowedKeyToBeEmpty is true, then no validation check done)
	 */
	keyIsRequiredMessage?: string;
}

const SolaceAttributeValuePairForm = ({
	id,
	name,
	readOnly,
	labelForKeys = "Name",
	labelForValues = "DisplayName",
	avpList = [],
	onAVPListUpdate,
	avpKeyValidationCallback,
	avpValueValidationCallback,
	enableRequiredKeyFieldIndicator,
	enableRequiredValueFieldIndicator,
	emptyFieldDisplayValue = "",
	keyRequired = true, // by default, key is considered mandatory for every AVP (i.e. you can have a key with no value, but you cannot have a value with no key)
	keyIsRequiredMessage = "Required"
}: SolaceAttributeValuePairFormProps): JSX.Element => {
	const [currentAVPList, setAVPList] = useState(avpList);
	const [dropOverIndex, setDropOverIndex] = useState<number | null>(null);
	const [dropFromTop, setDropFromTop] = useState<boolean | null>(null);

	// on avp list update
	useEffect(() => {
		const list = [...avpList];
		list.push({ key: "", value: "" });
		setAVPList(list);
	}, [avpList]);

	const handleListUpdate = useCallback(
		(list: Array<AVPItem>) => {
			setAVPList(list);
			if (onAVPListUpdate && ghostItemAtIndex(list, list.length - 1)) onAVPListUpdate(list.slice(0, -1));
			setDropOverIndex(null); // reset drop over index on drag end
			setDropFromTop(null); // reset drop over direction on drag end
		},
		[onAVPListUpdate]
	);

	/**
	 * All the things to do when a drag action ended
	 */
	const handleDragEnd = (result: any) => {
		// drag outside of the list
		if (!result.destination) {
			return;
		}
		// drag and drop on the same item
		if (result.destination.index === result.source.index) {
			return;
		}
		// drag and drop on the last item e.g. ghost item
		if (result.destination.index === currentAVPList.length - 1) {
			return;
		}

		const reorderedList = reorderList(currentAVPList, result.source.index, result.destination.index);

		setAVPList(reorderedList);

		if (onAVPListUpdate && ghostItemAtIndex(reorderedList, reorderedList.length - 1))
			onAVPListUpdate(reorderedList.slice(0, -1));
		setDropOverIndex(null); // reset drop over index on drag end
		setDropFromTop(null); // reset drop over direction on drag end
	};

	/**
	 * update drop over index & direction on drag update
	 * this allows to apply visual indicators to UI elements based on dragging behaviours
	 */
	const handleDragUpdate = (update: any) => {
		const sourceIndex: number | null = update.source.index;
		const destinationIndex: number | null = update.destination.index;
		const dropOverIndex: number | null = destinationIndex;
		let dropFromTop: boolean | null = null;
		if (sourceIndex !== null && destinationIndex !== null) {
			if (sourceIndex > destinationIndex) {
				dropFromTop = false;
			} else if (sourceIndex < destinationIndex) {
				dropFromTop = true;
			}
		}
		setDropOverIndex(dropOverIndex);
		setDropFromTop(dropFromTop);
	};

	const getId = () => {
		return id ? id : name;
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd} onDragUpdate={handleDragUpdate}>
			<Droppable droppableId={getId()}>
				{(provided) => (
					<SolaceAVPFormContainer ref={provided.innerRef} {...provided.droppableProps}>
						<SolaceAVPFormLabel readOnly={readOnly ? readOnly : false}>
							<SolaceLabel id="avpLabelForKeys" required={enableRequiredKeyFieldIndicator}>
								{labelForKeys}
							</SolaceLabel>
							<SolaceLabel id="avpLabelForValues" required={enableRequiredValueFieldIndicator}>
								{labelForValues}
							</SolaceLabel>
						</SolaceAVPFormLabel>
						<SolaceAVPListContainer>
							<SolaceAttributeValuePairList
								avpList={currentAVPList}
								onAVPListUpdate={handleListUpdate}
								avpKeyValidationCallback={avpKeyValidationCallback}
								avpValueValidationCallback={avpValueValidationCallback}
								dropOverIndex={dropOverIndex}
								dropFromTop={dropFromTop}
								readOnly={readOnly}
								keyRequired={keyRequired}
								keyIsRequiredMessage={keyIsRequiredMessage}
								emptyFieldDisplayValue={emptyFieldDisplayValue}
							/>
						</SolaceAVPListContainer>
						{provided.placeholder}
					</SolaceAVPFormContainer>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default SolaceAttributeValuePairForm;
