import React, { useState } from "react";
import { SolaceTextFieldChangeEvent } from "./SolaceTextField";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
// import { XYCoord } from "dnd-core";
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

	const handleInputChange = (event: SolaceTextFieldChangeEvent, index: number) => {
		const name: string = event.name;
		const value: string = event.value;
		const list = [...inputList];
		list[index][name] = value;
		// create a ghost row
		if (name && list.length - 1 === index) {
			list.push({ name: "", displayName: "" });
		}
		setInputList(list);
	};

	const handleDeleteItem = (event: React.MouseEvent<HTMLElement>, index: number) => {
		if (event.type === "click" && inputList.length > 1) {
			const list = [...inputList];
			list.splice(index, 1);
			setInputList(list);
		}
	};

	const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const inputList = document.querySelectorAll("[data-qa='enum-input']");
		const focusedEle = document.activeElement;

		for (let i = 0; i < inputList.length; i++) {
			if (inputList[i].getAttribute("data-tags") === focusedEle?.getAttribute("data-tags")) {
				navigateEnumList(event.key, i, inputList);
			}
		}
	};

	// const handleMoveItem = useCallback(
	// 	(dragIndex: number, hoverIndex: number) => {
	// 		const list = [...inputList];
	// 		const dragCard = list[dragIndex];
	// 		list.splice(dragIndex, 1);
	// 		const _list = [...list];
	// 		_list.splice(hoverIndex, 0, dragCard);
	// 		setInputList(_list);
	// 	},
	// 	[inputList]
	// );

	// const [{ isDragging }, drag] = useDrag({
	// 	type: "card",
	// 	item: () => {
	// 		return { id, index };
	// 	},
	// 	collect: (monitor: any) => ({
	// 		isDragging: monitor.isDragging()
	// 	})
	// });
	// const opacity = isDragging ? 0 : 1;
	// drag(drop(ref));

	return (
		<DndProvider backend={HTML5Backend}>
			<React.Fragment>
				{inputList.length > 0 &&
					inputList.map((item, index) => {
						return (
							<SolaceEnumInputItem
								key={index}
								id={index}
								name={item.name}
								displayName={item.displayName}
								onChange={handleInputChange}
								onDelete={handleDeleteItem}
								onKeyUp={handleKeyUp}
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
