import React, { useState, useEffect } from "react";
import { SolaceTextFieldChangeEvent } from "./SolaceTextField";
import { SolaceAttributeValuePair, valueInputTypes } from "./SolaceAttributeValuePair";

export interface AVPItem {
	id?: string;
	key: string;
	value: string;
}

export interface AVPListProps {
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

const SolaceAttributeValuePairList = ({ type, initialAVPList, onAVPListUpdate }: AVPListProps): JSX.Element => {
	const [avpList, setAVPList] = useState(initialAVPList);

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

	// determine whether an enum item is a ghost item
	const ghostItem = (index: number): boolean => {
		return index === avpList.length - 1 ? true : false;
	};

	const handleInputChange = (event: SolaceTextFieldChangeEvent, index: number) => {
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

	return (
		<React.Fragment>
			{avpList.map((item, index) => {
				return (
					<SolaceAttributeValuePair
						key={index}
						id={`${index}-${item.key}`}
						index={index}
						avpKey={item.key}
						avpValue={item.value}
						dataTags="avpInput"
						type={type}
						onChange={handleInputChange}
						onDelete={handleDeleteItem}
						onKeyUp={handleKeyUp}
						ghostItem={ghostItem(index)}
					/>
				);
			})}
		</React.Fragment>
	);
};

export default SolaceAttributeValuePairList;
