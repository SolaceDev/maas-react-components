import { useState, useCallback, useEffect } from "react";
import { styled } from "@mui/material";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import SolaceLabel from "./SolaceLabel";
import { SolaceAttributeValuePair, valueInputTypes } from "./SolaceAttributeValuePair";
import HelperText from "./HelperText";
import ErrorText from "./ErrorText";
import WarningText from "./WarningText";
import { CSSProperties } from "@mui/styled-engine";
import { SolaceTextFieldChangeEvent } from "./SolaceTextField";

interface SolaceAVPFormLabelProps {
	readOnly: boolean;
}

export interface AVPItem {
	id?: string;
	key: string;
	value: string;
	keyErrorText?: string;
	valueErrorText?: string;
}

const SolaceAVPFormContainer = styled("div")(({ theme }) => ({
	...(theme.mixins.formComponent_AVPForm.container as CSSProperties)
}));
const SolaceAVPFormLabel = styled("div")<SolaceAVPFormLabelProps>(({ theme, readOnly }) => ({
	...(theme.mixins.formComponent_AVPForm.labelWrapper as CSSProperties),
	gridTemplateColumns: readOnly ? "0px minmax(0, 1fr) 8px minmax(0, 1fr) 0px" : "32px 1fr 8px 1fr 32px"
}));
const SolaceAVPListContainer = styled("div")(({ theme }) => ({
	...(theme.mixins.formComponent_AVPForm.listWrapper as CSSProperties)
}));

const reorderList = (list: Array<AVPItem>, startIndex: number, endIndex: number): Array<AVPItem> => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const ghostItemAtIndex = (list: Array<AVPItem>, index: number) => {
	return list[index]["key"] === "" && list[index]["value"] === "";
};

enum AVPNavigationKeys {
	Down = "ArrowDown",
	Up = "ArrowUp",
	NextLine = "Enter"
}

// the navigation logic assumes there are two columns per row for the enum list
const handleNavigateAVPList = (key: string, index: number, enumList: NodeListOf<Element>): void => {
	if (key === AVPNavigationKeys.Up && index - 1 > 0) {
		(enumList[index - 2] as HTMLInputElement).select();
	} else if (key === AVPNavigationKeys.Down && index + 2 < enumList.length) {
		(enumList[index + 2] as HTMLInputElement).select();
	} else if (key === AVPNavigationKeys.NextLine && index + 2 < enumList.length) {
		if (index % 2 === 0) {
			(enumList[index + 2] as HTMLInputElement).select();
		} else if (index % 2 === 1) {
			(enumList[index + 1] as HTMLInputElement).select();
		}
	}
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
	/**
	 * Content to display as supportive/explanitory text
	 */
	helperText?: string | JSX.Element;
	/**
	 * Boolean flag to mark the `input` in error state
	 */
	hasErrors?: boolean;
	/**
	 * Boolean flag to mark the `input` in warn state
	 */
	hasWarnings?: boolean;
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
	keyIsRequiredMessage = "Required",
	helperText = "",
	hasErrors = false,
	hasWarnings = false
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

	const handleInputChange = useCallback(
		(event: SolaceTextFieldChangeEvent, index: number) => {
			const eventName: string = event.name;
			const value: string = event.value;

			const list = [...currentAVPList];
			list[index][eventName] = value;

			// add a new row at the end of the list upon input changes
			if (eventName && list.length - 1 === index) {
				list.push({ key: "", value: "" });
			}
			setAVPList(list);
			handleListUpdate(list);
		},
		[currentAVPList, handleListUpdate]
	);

	// determine whether an enum item is a ghost item
	const ghostItem = useCallback(
		(index: number): boolean => {
			return index === currentAVPList.length - 1 ? true : false;
		},
		[currentAVPList.length]
	);

	const handleDeleteItem = useCallback(
		(event: React.MouseEvent<HTMLElement>, index: number) => {
			if (event.type === "click" && !ghostItem(index) && currentAVPList.length > 1) {
				const list = [...currentAVPList];
				list.splice(index, 1);
				setAVPList(list);
				handleListUpdate(list);
			}
		},
		[currentAVPList, handleListUpdate, ghostItem]
	);

	const handleKeyUp = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
		const inputEleList = document.querySelectorAll("[data-tags='avpInput']");
		const focusedEle = document.activeElement;

		for (let i = 0; i < inputEleList.length; i++) {
			if (inputEleList[i].getAttribute("data-qa") === focusedEle?.getAttribute("data-qa")) {
				handleNavigateAVPList(event.key, i, inputEleList);
			}
		}
	}, []);

	const handleInputOnBlur = useCallback(
		(event: React.FocusEvent<HTMLInputElement>, index: number) => {
			const list = currentAVPList;

			list[index]["key"] = list[index]["key"].trim();
			list[index]["value"] = list[index]["value"].trim();

			// Check if the key field is empty
			if (keyRequired && !list[index]["key"]) {
				list[index]["keyErrorText"] = keyIsRequiredMessage;

				setAVPList(list);
				handleListUpdate(list);
				return;
			}

			// Remove the error message if the key field is not empty anymore
			if (list[index]["keyErrorText"] === keyIsRequiredMessage) {
				delete list[index]["keyErrorText"];
			}

			// Check if the key field is valid if key validation callback is provided
			if (event.target.getAttribute("name") === "key" && avpKeyValidationCallback) {
				const error = avpKeyValidationCallback(event.target.value, list.slice(0, -1));

				if (error) {
					list[index]["keyErrorText"] = error;
				} else {
					delete list[index]["keyErrorText"];
				}

				setAVPList(list);
				handleListUpdate(list);
				return;
			}

			// Check if the value field is valid if value callback is provided
			if (event.target.getAttribute("name") === "value" && avpValueValidationCallback) {
				const error = avpValueValidationCallback(event.target.value, list.slice(0, -1));

				if (error) {
					list[index]["valueErrorText"] = error;
				} else {
					delete list[index]["valueErrorText"];
				}
			}

			setAVPList(list);
			handleListUpdate(list);
		},
		[
			currentAVPList,
			keyRequired,
			avpKeyValidationCallback,
			avpValueValidationCallback,
			keyIsRequiredMessage,
			handleListUpdate
		]
	);

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
							{currentAVPList.map((item, index) => {
								return (
									<SolaceAttributeValuePair
										key={`${index}`}
										id={`${index}`}
										index={index}
										avpKey={item.key}
										avpValue={item.value}
										dataTags="avpInput"
										onChange={handleInputChange}
										onDelete={handleDeleteItem}
										onKeyUp={handleKeyUp}
										ghostItem={ghostItem(index)}
										onBlur={handleInputOnBlur}
										keyErrorText={item.keyErrorText}
										valueErrorText={item.valueErrorText}
										dropOverIndex={dropOverIndex}
										dropFromTop={dropFromTop}
										readOnly={readOnly}
										emptyFieldDisplayValue={emptyFieldDisplayValue}
									/>
								);
							})}
						</SolaceAVPListContainer>
						{provided.placeholder}
					</SolaceAVPFormContainer>
				)}
			</Droppable>
			{helperText && (
				<div style={{ paddingLeft: "16px" }}>
					{helperText && !hasWarnings && !hasErrors && <HelperText>{helperText}</HelperText>}
					{helperText && !hasErrors && hasWarnings && <WarningText>{helperText}</WarningText>}
					{helperText && hasErrors && <ErrorText>{helperText}</ErrorText>}
				</div>
			)}
		</DragDropContext>
	);
};

export default SolaceAttributeValuePairForm;
