import React, { useState, useEffect, useCallback } from "react";
import { SolaceTextFieldChangeEvent } from "./SolaceTextField";
import { SolaceAttributeValuePair, valueInputTypes } from "./SolaceAttributeValuePair";

export interface AVPItem {
	id?: string;
	key: string;
	value: string;
	keyErrorText?: string;
	valueErrorText?: string;
}

export interface AVPListProps {
	/**
	 * read only flag
	 */
	readOnly?: boolean;
	/**
	 * TODO: implementation required
	 * specifies the type of the value providing component: types can be input, select etc. component, default to SolaceTextField if no type provided
	 */
	type?: valueInputTypes;
	/**
	 * initial AVP list of key/value pairs, it can be an empty array e.g.[]
	 */
	avpList: Array<AVPItem>;
	/**
	 * callback function that returns the updated AVP list
	 */
	onAVPListUpdate: (list: Array<AVPItem>) => void;
	/**
	 * validate individual AVP values, the function is triggered by onBlur event
	 */
	avpKeyValidationCallback?: (input: string, values: Array<AVPItem>) => string;
	/**
	 * validate individual AVP values, the function is triggered by onBlur event
	 */
	avpValueValidationCallback?: (input: string, values: Array<AVPItem>) => string;
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

const SolaceAttributeValuePairList = ({
	readOnly,
	type,
	avpList,
	onAVPListUpdate,
	avpKeyValidationCallback,
	avpValueValidationCallback,
	dropOverIndex,
	dropFromTop,
	emptyFieldDisplayValue = "",
	keyRequired = true, // by default, key is considered mandatory for every AVP (i.e. you can have a key with no value, but you cannot have a value with no key)
	keyIsRequiredMessage = "Required"
}: AVPListProps): JSX.Element => {
	const [currentAVPList, setAVPList] = useState<AVPItem[]>(avpList);

	/**
	 * on avpList updated
	 */
	useEffect(() => {
		setAVPList(avpList);
	}, [avpList]);

	// determine whether an enum item is a ghost item
	const ghostItem = useCallback(
		(index: number): boolean => {
			return index === currentAVPList.length - 1 ? true : false;
		},
		[currentAVPList.length]
	);

	const handleInputChange = useCallback(
		(event: SolaceTextFieldChangeEvent, index: number) => {
			const name: string = event.name;
			const value: string = event.value;

			const list = [...currentAVPList];
			list[index][name] = value;

			// add a new row at the end of the list upon input changes
			if (name && list.length - 1 === index) {
				list.push({ key: "", value: "" });
			}
			setAVPList(list);
			onAVPListUpdate(list);
		},
		[currentAVPList, onAVPListUpdate]
	);

	const handleDeleteItem = useCallback(
		(event: React.MouseEvent<HTMLElement>, index: number) => {
			if (event.type === "click" && !ghostItem(index) && currentAVPList.length > 1) {
				const list = [...currentAVPList];
				list.splice(index, 1);
				setAVPList(list);
				onAVPListUpdate(list);
			}
		},
		[currentAVPList, onAVPListUpdate, ghostItem]
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
		// eslint-disable-next-line sonarjs/cognitive-complexity
		(event: React.FocusEvent<HTMLInputElement>, index: number) => {
			const list = [...currentAVPList];
			let mandatoryKeyValidationFailed = false;
			list[index]["key"] = list[index]["key"].trim(); // trim leading and trailing whitespace
			list[index]["value"] = list[index]["value"].trim();
			if (keyRequired && !list[index]["key"]) {
				list[index]["keyErrorText"] = keyIsRequiredMessage;
				mandatoryKeyValidationFailed = true;
			} else if (list[index]["keyErrorText"] === keyIsRequiredMessage) {
				delete list[index]["keyErrorText"];
				mandatoryKeyValidationFailed = false;
			}
			if (index !== currentAVPList.length - 1 && (avpKeyValidationCallback || avpValueValidationCallback)) {
				if (
					event.target.getAttribute("name") === "key" &&
					!mandatoryKeyValidationFailed && // only validate against external key rules if mandatory key validation passed
					avpKeyValidationCallback
				) {
					const error = avpKeyValidationCallback(event.target.value, list.slice(0, -1));
					if (error) {
						list[index]["keyErrorText"] = error;
					} else if (!error && list[index]["keyErrorText"]) {
						delete list[index]["keyErrorText"];
					}
				} else if (event.target.getAttribute("name") === "value" && avpValueValidationCallback) {
					const error = avpValueValidationCallback(event.target.value, list.slice(0, -1));
					if (error) {
						list[index]["valueErrorText"] = error;
					} else if (!error && list[index]["valueErrorText"]) {
						delete list[index]["valueErrorText"];
					}
				}
			}
			setAVPList(list);
			onAVPListUpdate(list);
		},
		[
			currentAVPList,
			keyRequired,
			avpKeyValidationCallback,
			avpValueValidationCallback,
			keyIsRequiredMessage,
			onAVPListUpdate
		]
	);

	return (
		<React.Fragment>
			{currentAVPList.map((item, index) => {
				return (
					<SolaceAttributeValuePair
						key={`${index}`}
						id={`${index}`}
						index={index}
						avpKey={item.key}
						avpValue={item.value}
						dataTags="avpInput"
						type={type}
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
		</React.Fragment>
	);
};

export default SolaceAttributeValuePairList;
