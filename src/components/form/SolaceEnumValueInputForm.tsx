import React, { useState } from "react";
import SolaceTextField, { SolaceTextFieldChangeEvent } from "./SolaceTextField";
import { DeleteIcon } from "../../resources/icons/DeleteIcon";
import { MoveIcon } from "../../resources/icons/MoveIcon";

enum EnumNavigationKeys {
	Left = "ArrowLeft",
	Right = "ArrowRight",
	Down = "ArrowDown",
	Up = "ArrowUp",
	NextLine = "Enter"
}

// TODO: make the function more generic
// const NUM_OF_COLUMN_PER_ROW = 2

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

const SolaceEnumValueInputForm = (): JSX.Element => {
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

	const handleDeleteItem = (index: number) => {
		if (inputList.length > 1) {
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

	const handleMoveItem = () => {
		console.log("handle drag and drop");
	};

	return (
		<React.Fragment>
			{inputList.length > 0 &&
				inputList.map((item, index) => {
					return (
						<div
							key={index}
							style={{
								backgroundColor: "transparent",
								padding: "9px 0px",
								minWidth: "600px",

								// grid
								// display: "grid",
								// gridTemplateColumns: "1fr 6fr 8fr 1fr",
								// gridGap: "10px",

								// flexbox
								display: "flex",
								gap: "0px 10px",
								flexDirection: "row",
								flexWrap: "nowrap",
								justifyContent: "space-between",
								alignItems: "center"
							}}
						>
							<div style={{ cursor: "move", paddingTop: "2px", color: "rgba(0, 0, 0, 0.2)" }} onClick={handleMoveItem}>
								<MoveIcon />
							</div>
							<SolaceTextField
								name="name"
								dataQa="enum-input"
								dataTags={`${index}-0`}
								value={item.name}
								onChange={(e) => handleInputChange(e, index)}
								onKeyUp={handleKeyUp}
							/>
							<SolaceTextField
								name="displayName"
								dataQa="enum-input"
								dataTags={`${index}-1`}
								value={item.displayName}
								onChange={(e) => handleInputChange(e, index)}
								onKeyUp={handleKeyUp}
							/>
							<div
								style={{ cursor: "pointer", paddingTop: "2px", color: "rgba(0, 0, 0, 0.2)" }}
								onClick={() => handleDeleteItem(index)}
								tabIndex={0}
							>
								<DeleteIcon />
							</div>
						</div>
					);
				})}

			<div style={{ marginTop: 20 }}>
				<div>Show data:</div>
				<div>{JSON.stringify(inputList)}</div>
			</div>
		</React.Fragment>
	);
};

export default SolaceEnumValueInputForm;
