import React, { useState, useCallback } from "react";
import { SolaceTextFieldChangeEvent } from "./SolaceTextField";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SolaceEnumInputItem } from "./SolaceEnumInputItem";

enum EnumNavigationKeys {
	Left = "ArrowLeft",
	Right = "ArrowRight",
	Down = "ArrowDown",
	Up = "ArrowUp",
	NextLine = "Enter"
}

// the navigation logic assumes there are two columns per row for the enum list
const navigateEnumList = (key: string, index: number, enumList: NodeListOf<Element>): void => {
	if (key === EnumNavigationKeys.Left && index > 0) {
		(enumList[index - 1] as HTMLElement).focus();
	} else if (key === EnumNavigationKeys.Right && index + 1 < enumList.length) {
		(enumList[index + 1] as HTMLElement).focus();
	} else if (key === EnumNavigationKeys.Up && index - 1 > 0) {
		(enumList[index - 2] as HTMLElement).focus();
	} else if (key === EnumNavigationKeys.Down && index + 2 < enumList.length) {
		(enumList[index + 2] as HTMLElement).focus();
	} else if (key === EnumNavigationKeys.NextLine && index + 2 < enumList.length) {
		if (index % 2 === 0) {
			(enumList[index + 2] as HTMLElement).focus();
		} else if (index % 2 === 1) {
			(enumList[index + 1] as HTMLElement).focus();
		}
	}
};

const SolaceEnumInputForm = (): JSX.Element => {
	const [inputList, setInputList] = useState([{ name: "", displayName: "" }]);

	// check whether an enum item is a ghost item
	const ghostItem = (index: number): boolean => {
		if (index === inputList.length - 1 && inputList[index].name == "" && inputList[index].displayName == "") {
			return true;
		}
		return false;
	};

	const handleInputChange = (event: SolaceTextFieldChangeEvent, index: number) => {
		const name: string = event.name;
		const value: string = event.value;
		const list = [...inputList];
		list[index][name] = value.trim();
		// create a ghost row at the end of the list
		if (name && list.length - 1 === index) {
			list.push({ name: "", displayName: "" });
		}
		setInputList(list);
	};

	const handleDeleteItem = (event: React.MouseEvent<HTMLElement>, index: number) => {
		if (event.type === "click" && !ghostItem(index) && inputList.length > 1) {
			const list = [...inputList];
			list.splice(index, 1);
			setInputList(list);
		}
	};

	const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const inputEleList = document.querySelectorAll("[data-qa='enum-input']");
		const focusedEle = document.activeElement;

		for (let i = 0; i < inputEleList.length; i++) {
			if (inputEleList[i].getAttribute("data-tags") === focusedEle?.getAttribute("data-tags")) {
				navigateEnumList(event.key, i, inputEleList);
			}
		}
	};

	const handleMoveItem = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			const list = [...inputList];
			// get the dragged item index
			const dragCard = list[dragIndex];
			// remove the dragged item from its current position
			list.splice(dragIndex, 1);
			// insert the dragged item into the new position
			list.splice(hoverIndex, 0, dragCard);
			// update enum list
			setInputList(list);
		},
		[inputList]
	);

	return (
		<DndProvider backend={HTML5Backend}>
			<React.Fragment>
				{inputList.length > 0 &&
					inputList.map((item, index) => {
						return (
							<SolaceEnumInputItem
								key={index}
								id={`enumInput-${index}`}
								index={index}
								name={item.name}
								displayName={item.displayName}
								onChange={handleInputChange}
								onDelete={handleDeleteItem}
								onKeyUp={handleKeyUp}
								moveItem={handleMoveItem}
								ghostItem={ghostItem(index)}
							/>
						);
					})}
				<div style={{ marginTop: 20 }}>
					<div>Show data:</div>
					<div>{JSON.stringify(inputList)}</div>
				</div>
			</React.Fragment>
		</DndProvider>
	);
};

export default SolaceEnumInputForm;
