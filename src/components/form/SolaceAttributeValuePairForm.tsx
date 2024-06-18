import React, { useState, useCallback, useEffect, useRef } from "react";
import { styled } from "@mui/material";
import { DragDropContext, Droppable, OnDragEndResponder, OnDragUpdateResponder } from "react-beautiful-dnd";
import SolaceLabel from "./SolaceLabel";
import { SolaceAttributeValuePair, valueInputTypes } from "./SolaceAttributeValuePair";
import HelperText from "./HelperText";
import ErrorText from "./ErrorText";
import WarningText from "./WarningText";
import { CSSProperties } from "@mui/styled-engine";
import { SolaceTextFieldChangeEvent } from "./SolaceTextField";
import { Virtuoso } from "react-virtuoso";

interface SolaceAVPFormLabelProps {
	readOnly: boolean;
	disableReorder?: boolean;
	hasScrollBar?: boolean;
}

export interface VirtualizeAvpListOptions {
	minHeight?: number | string;
	height?: number | string;
	useWindowScrolling?: boolean;
	increaseViewportBy?:
		| number
		| {
				top: number;
				bottom: number;
		  };
	initialTopMostItemIndex?: number;
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

// If hasScrollBar is true, the label wrapper will have an additional 16px padding to accommodate the scrollbar in the content area
const SolaceAVPFormLabel = styled("div")<SolaceAVPFormLabelProps>(
	({ theme, readOnly, disableReorder, hasScrollBar }) => ({
		...(theme.mixins.formComponent_AVPForm.labelWrapper as CSSProperties),
		gridTemplateColumns: readOnly
			? `0px minmax(0, 1fr) 8px minmax(0, 1fr) 0px${hasScrollBar ? " 16px" : ""}`
			: disableReorder
			  ? `0px 1fr 8px 1fr 32px${hasScrollBar ? " 16px" : ""}`
			  : `32px 1fr 8px 1fr 32px${hasScrollBar ? " 16px" : ""}`
	})
);
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

const List = React.forwardRef<HTMLDivElement>((props, ref) => {
	const headerRef = props["context"]?.headerRef;
	const virtualizedAvpListOption = props["context"]?.virtualizedAvpListOption;
	const style = props["style"];

	return (
		<SolaceAVPListContainer
			{...props}
			ref={ref}
			style={{
				...style,
				width: virtualizedAvpListOption?.height && headerRef.current ? headerRef.current.offsetWidth - 16 : "100%"
			}}
		/>
	);
});

List.displayName = "List";

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
	labelForKeys?: string | JSX.Element;
	/**
	 * label for the value column
	 */
	labelForValues?: string | JSX.Element;
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
	/**
	 * Boolean flag to disable re-ordering of items
	 */
	disableReorder?: boolean;
	/**
	 * AVP values maximum height if virtualizedAvpListOption is not set
	 */
	avpListMaxHeight?: string;
	/**
	 * If option is set, only render part of a large data set to fill the viewport
	 */
	virtualizedAvpListOption?: VirtualizeAvpListOptions;
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
	hasWarnings = false,
	disableReorder = false,
	avpListMaxHeight,
	virtualizedAvpListOption
}: SolaceAttributeValuePairFormProps): JSX.Element => {
	const [currentAVPList, setCurrentAVPList] = useState(avpList);
	const [dropOverIndex, setDropOverIndex] = useState<number | null>(null);
	const [dropFromTop, setDropFromTop] = useState<boolean | null>(null);
	const headerRef = useRef<HTMLDivElement>(null);

	// Add new entry on avp list update
	useEffect(() => {
		const list = [...avpList];
		list.push({ key: "", value: "" });
		setCurrentAVPList(list);
	}, [avpList]);

	const handleListUpdate = useCallback(
		(list: Array<AVPItem>) => {
			setCurrentAVPList(list);
			if (onAVPListUpdate && ghostItemAtIndex(list, list.length - 1)) onAVPListUpdate(list.slice(0, -1));
			setDropOverIndex(null); // reset drop over index on drag end
			setDropFromTop(null); // reset drop over direction on drag end
		},
		[onAVPListUpdate]
	);

	// All the things to do when a drag action ended
	const handleDragEnd: OnDragEndResponder = (result) => {
		/**
		 * No changes on the following conditions:
		 * 1. Drag outside of the list
		 * 2. Drag & Drop on the same item
		 * 3. Drag & Drop on the last item e.g. ghost item
		 */
		if (
			!result.destination ||
			result.destination.index === result.source.index ||
			result.destination.index === currentAVPList.length - 1
		)
			return;

		const reorderedList = reorderList(currentAVPList, result.source.index, result.destination.index);

		setCurrentAVPList(reorderedList);

		if (onAVPListUpdate && ghostItemAtIndex(reorderedList, reorderedList.length - 1))
			onAVPListUpdate(reorderedList.slice(0, -1));

		setDropOverIndex(null); // reset drop over index on drag end
		setDropFromTop(null); // reset drop over direction on drag end
	};

	/**
	 * update drop over index & direction on drag update
	 * this allows to apply visual indicators to UI elements based on dragging behaviors
	 */
	const handleDragUpdate: OnDragUpdateResponder | undefined = (update) => {
		const sourceIndex: number | null = update.source.index;
		const destinationIndex: number | null = update?.destination?.index ?? null;
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
			setCurrentAVPList(list);
			handleListUpdate(list);
		},
		[currentAVPList, handleListUpdate]
	);

	// determine whether an enum item is a ghost item
	const ghostItem = useCallback(
		(index: number): boolean => index === currentAVPList.length - 1,
		[currentAVPList.length]
	);

	const handleDeleteItem = useCallback(
		(event: React.MouseEvent<HTMLElement>, index: number) => {
			if (event.type === "click" && !ghostItem(index) && currentAVPList.length > 1) {
				const list = [...currentAVPList];
				list.splice(index, 1);
				setCurrentAVPList(list);
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
			const list = [...currentAVPList];

			list[index]["key"] = list[index]["key"].trim();
			list[index]["value"] = list[index]["value"].trim();

			// Check if the key field is valid if key validation callback is provided
			if (event.target.getAttribute("name") === "key" && avpKeyValidationCallback) {
				const error = avpKeyValidationCallback(event.target.value, list.slice(0, -1));

				if (error) {
					list[index]["keyErrorText"] = error;
				} else {
					delete list[index]["keyErrorText"];
				}
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

			// Check if the key field is empty
			if (keyRequired && !list[index]["key"]) {
				list[index]["keyErrorText"] = keyIsRequiredMessage;
			} else if (list[index]["keyErrorText"] === keyIsRequiredMessage) {
				delete list[index]["keyErrorText"];
			}

			setCurrentAVPList(list);
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
			<Droppable droppableId={id ?? name}>
				{(provided) => (
					<SolaceAVPFormContainer ref={provided.innerRef} {...provided.droppableProps}>
						<SolaceAVPFormLabel
							ref={headerRef}
							readOnly={!!readOnly}
							disableReorder={!!disableReorder}
							hasScrollBar={!!avpListMaxHeight || !!virtualizedAvpListOption?.height}
						>
							<SolaceLabel id="avpLabelForKeys" required={enableRequiredKeyFieldIndicator}>
								{labelForKeys}
							</SolaceLabel>
							<SolaceLabel id="avpLabelForValues" required={enableRequiredValueFieldIndicator}>
								{labelForValues}
							</SolaceLabel>
						</SolaceAVPFormLabel>
						{virtualizedAvpListOption && headerRef.current && (
							<Virtuoso
								context={{ headerRef, virtualizedAvpListOption }}
								style={{
									height: virtualizedAvpListOption.height ? virtualizedAvpListOption.height : "auto",
									minHeight: virtualizedAvpListOption.minHeight ? virtualizedAvpListOption.minHeight : 40
								}}
								useWindowScroll={virtualizedAvpListOption.useWindowScrolling}
								increaseViewportBy={virtualizedAvpListOption.increaseViewportBy}
								components={{ List }}
								initialTopMostItemIndex={virtualizedAvpListOption.initialTopMostItemIndex ?? 0}
								data={currentAVPList}
								itemContent={(index, item) => {
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
											disableReorder={disableReorder}
										/>
									);
								}}
							/>
						)}
						{!virtualizedAvpListOption && headerRef.current && (
							<div style={avpListMaxHeight ? { maxHeight: avpListMaxHeight, overflowY: "auto" } : undefined}>
								<SolaceAVPListContainer
									style={{ width: avpListMaxHeight ? headerRef.current.offsetWidth - 16 : "100%" }}
								>
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
												disableReorder={disableReorder}
											/>
										);
									})}
								</SolaceAVPListContainer>
							</div>
						)}
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
