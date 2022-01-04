import { useState, useEffect } from "react";
import { styled } from "@material-ui/core";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import SolaceLabel from "./SolaceLabel";
import { valueInputTypes } from "./SolaceAttributeValuePair";
import SolaceAttributeValuePairList, { AVPItem } from "./SolaceAttributeValuePairList";

const SolaceAVPFormContainer = styled("div")(({ theme }) => theme.mixins.formComponent_AVPForm.container);
const SolaceAVPFormLabel = styled("div")(({ theme }) => theme.mixins.formComponent_AVPForm.labelWrapper);
const SolaceAVPListContainer = styled("div")(({ theme }) => theme.mixins.formComponent_AVPForm.listWrapper);

const reorderList = (list: Array<AVPItem>, startIndex: number, endIndex: number): Array<AVPItem> => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

export interface SolaceAttributeValuePairFormProps {
	/**
	 * label for the key column
	 */
	labelForKeys: string;
	/**
	 * label for the value column
	 */
	labelForValues: string;
	/**
	 * TODO: implementation required
	 * specifies the type of the value providing component: types can be input, select etc. component, default to SolaceTextField if no type provided
	 */
	type?: valueInputTypes;
	/**
	 * initial AVP list of key/value pairs, it can be an empty array e.g.[]
	 */
	initialAVPList: Array<AVPItem>;
	/**
	 * callback function that returns the current AVP list
	 */
	onAVPListUpdate: (list: Array<AVPItem>) => void;
	/**
	 * validate individual AVP values, the function is triggered onBlur event
	 */
	avpKeyValidationCallback?: (input: string, values: Array<AVPItem>) => string;
	/**
	 * validate individual AVP values, the function is triggered onBlur event
	 */
	avpValueValidationCallback?: (input: string, values: Array<AVPItem>) => string;
}

const SolaceAttributeValuePairForm = ({
	labelForKeys = "Name",
	labelForValues = "DisplayName",
	initialAVPList,
	onAVPListUpdate,
	avpKeyValidationCallback,
	avpValueValidationCallback
}: SolaceAttributeValuePairFormProps): JSX.Element => {
	const [avpList, setAVPList] = useState(initialAVPList);
	/**
	 * add append empty key/value pair on initial rendering
	 */
	useEffect(() => {
		const list = [...avpList, { key: "", value: "" }];
		setAVPList(list);
	}, []);

	/**
	 * remove the empty key/value pair in each callback
	 */
	useEffect(() => {
		const list = [...avpList];
		list.splice(-1);
		onAVPListUpdate(list);
	}, [avpList]);

	const handleListUpdate = (list: Array<AVPItem>) => {
		setAVPList(list);
	};

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
		if (result.destination.index === avpList.length - 1) {
			return;
		}

		const reorderedList = reorderList(avpList, result.source.index, result.destination.index);

		setAVPList(reorderedList);
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Droppable droppableId="avpForm">
				{(provided) => (
					<SolaceAVPFormContainer ref={provided.innerRef} {...provided.droppableProps}>
						<SolaceAVPFormLabel>
							<SolaceLabel id="avpLabelForKeys">{labelForKeys}</SolaceLabel>
							<SolaceLabel id="avpLabelForValues">{labelForValues}</SolaceLabel>
						</SolaceAVPFormLabel>
						<SolaceAVPListContainer>
							<SolaceAttributeValuePairList
								initialAVPList={avpList}
								onAVPListUpdate={handleListUpdate}
								avpKeyValidationCallback={avpKeyValidationCallback}
								avpValueValidationCallback={avpValueValidationCallback}
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
