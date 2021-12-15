import React, { useState, useCallback, useEffect } from "react";
import { styled } from "@material-ui/core";
import { SolaceTextFieldChangeEvent } from "./SolaceTextField";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SolaceEnumInputItem } from "./SolaceEnumInputItem";
import SolaceLabel from "./SolaceLabel";

const SolaceEnumInputFormLabel = styled("div")(({ theme }) => theme.mixins.formComponent_EnumInputForm.label);

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
		(enumList[index - 1] as HTMLInputElement).select();
	} else if (key === EnumNavigationKeys.Right && index + 1 < enumList.length) {
		(enumList[index + 1] as HTMLInputElement).select();
	} else if (key === EnumNavigationKeys.Up && index - 1 > 0) {
		(enumList[index - 2] as HTMLInputElement).select();
	} else if (key === EnumNavigationKeys.Down && index + 2 < enumList.length) {
		(enumList[index + 2] as HTMLInputElement).select();
	} else if (key === EnumNavigationKeys.NextLine && index + 2 < enumList.length) {
		if (index % 2 === 0) {
			(enumList[index + 2] as HTMLInputElement).select();
		} else if (index % 2 === 1) {
			(enumList[index + 1] as HTMLInputElement).select();
		}
	}
};

export interface EnumItem {
	name: string;
	displayName: string;
}

export interface SolaceEnumInputFormProps {
	initialEnumList: EnumItem[];
	updateEnumList: (list: EnumItem[]) => void;
}

const SolaceEnumInputForm = ({
	initialEnumList = [{ name: "", displayName: "" }],
	updateEnumList
}: SolaceEnumInputFormProps): JSX.Element => {
	const [inputList, setInputList] = useState(initialEnumList);

	useEffect(() => {
		if (initialEnumList.length === 0 || initialEnumList[0].name) {
			const list = [...inputList];
			list.push({ name: "", displayName: "" });
			setInputList(list);
		}
	}, [initialEnumList]);

	useEffect(() => {
		updateEnumList(inputList.filter((item) => item.name !== ""));
	}, [inputList]);

	// determine whether an enum item is a ghost item
	const ghostItem = (index: number): boolean => {
		if (index === inputList.length - 1 && inputList[index].name === "" && inputList[index].displayName === "") {
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
			<div>
				<SolaceEnumInputFormLabel>
					<div></div>
					<SolaceLabel id="nameLabel">Name</SolaceLabel>
					<SolaceLabel id="displayNameLabel">Display Name</SolaceLabel>
					<div></div>
				</SolaceEnumInputFormLabel>
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
			</div>
		</DndProvider>
	);
};

export default SolaceEnumInputForm;
