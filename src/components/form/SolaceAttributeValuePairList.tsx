import React, { useState, useEffect } from "react";
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
	initialAVPList: Array<AVPItem>;
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
	initialAVPList,
	onAVPListUpdate,
	avpKeyValidationCallback,
	avpValueValidationCallback,
	dropOverIndex,
	dropFromTop
}: AVPListProps): JSX.Element => {
	const [avpList, setAVPList] = useState<AVPItem[]>(initialAVPList);
	const [errorCount, setErrorCount] = useState(0);

	/**
	 * on initialAVPList updated
	 */
	useEffect(() => {
		setAVPList(initialAVPList);
	}, [initialAVPList]);

	/**
	 * on current avpList updated
	 */
	useEffect(() => {
		onAVPListUpdate(avpList);
	}, [avpList]);

	/**
	 * run a full validation process when error total counts change
	 */
	// eslint-disable-next-line sonarjs/cognitive-complexity
	useEffect(() => {
		const list = [...avpList];
		let count = 0;
		list.forEach((value, index) => {
			if (index !== list.length - 1) {
				if (avpKeyValidationCallback) {
					const error = avpKeyValidationCallback(value.key, list.slice(0, -1));
					if (error) {
						list[index]["keyErrorText"] = error;
						count++;
					} else if (!error && list[index]["keyErrorText"]) {
						delete list[index]["keyErrorText"];
						count--;
					}
				}
				if (avpValueValidationCallback) {
					const error = avpValueValidationCallback(value.value, list.slice(0, -1));
					if (error) {
						list[index]["valueErrorText"] = error;
						count++;
					} else if (!error && list[index]["valueErrorText"]) {
						delete list[index]["valueErrorText"];
						count--;
					}
				}
			}
		});
		setErrorCount(count);
	}, [errorCount]);

	// determine whether an enum item is a ghost item
	const ghostItem = (index: number): boolean => {
		return index === avpList.length - 1 ? true : false;
	};

	const handleInputChange = (event: SolaceTextFieldChangeEvent, index: number) => {
		console.log(`handleInputChange`);
		const name: string = event.name;
		const value: string = event.value;
		const list = [...avpList];
		list[index][name] = value.trim();

		// add a new row at the end of the list upon input changes
		if (name && list.length - 1 === index) {
			list.push({ key: "", value: "" });
		}
		setAVPList(list);
	};

	const handleDeleteItem = (event: React.MouseEvent<HTMLElement>, index: number) => {
		if (event.type === "click" && !ghostItem(index) && avpList.length > 1) {
			const list = [...avpList];
			list.splice(index, 1);
			setAVPList(list);
		}
	};

	const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const inputEleList = document.querySelectorAll("[data-tags='avpInput']");
		const focusedEle = document.activeElement;

		for (let i = 0; i < inputEleList.length; i++) {
			if (inputEleList[i].getAttribute("data-qa") === focusedEle?.getAttribute("data-qa")) {
				handleNavigateAVPList(event.key, i, inputEleList);
			}
		}
	};

	// eslint-disable-next-line sonarjs/cognitive-complexity
	const handleInputOnBlur = (event: React.FocusEvent<HTMLInputElement>, index: number) => {
		if (index !== avpList.length - 1) {
			const list = [...avpList];
			let count = 0;
			if (event.target.getAttribute("name") === "key" && avpKeyValidationCallback) {
				const error = avpKeyValidationCallback(event.target.value, list.slice(0, -1));
				if (error) {
					list[index]["keyErrorText"] = error;
					count++;
				} else if (!error && list[index]["keyErrorText"]) {
					delete list[index]["keyErrorText"];
					count--;
				}
			} else if (event.target.getAttribute("name") === "value" && avpValueValidationCallback) {
				const error = avpValueValidationCallback(event.target.value, list.slice(0, -1));
				if (error) {
					list[index]["valueErrorText"] = error;
					count++;
				} else if (!error && list[index]["valueErrorText"]) {
					delete list[index]["valueErrorText"];
					count--;
				}
			}
			setErrorCount(count);
			setAVPList(list);
		}
	};

	return (
		<React.Fragment>
			{avpList.map((item, index) => {
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
					/>
				);
			})}
		</React.Fragment>
	);
};

export default SolaceAttributeValuePairList;
