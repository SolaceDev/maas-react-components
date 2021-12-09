import React, { useState } from "react";
import SolaceTextField, { SolaceTextFieldChangeEvent } from "./SolaceTextField";
import { DeleteIcon } from "../../resources/icons/DeleteIcon";
import { MoveIcon } from "../../resources/icons/MoveIcon";

const SolaceEnumValueInputForm = (): JSX.Element => {
	const [inputList, setInputList] = useState([{ name: "", displayName: "" }]);

	const handleInputChange = (event: SolaceTextFieldChangeEvent, index: number) => {
		const name = event.name;
		const value = event.value;
		const list = [...inputList];
		list[index][name] = value;
		setInputList(list);
	};

	const handleDeleteItem = (index: number) => {
		const list = [...inputList];
		list.splice(index, 1);
		setInputList(list);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>, index: number) => {
		console.log(event.key);
		console.log(index);
		if (
			event.key === "Enter" &&
			inputList.length - 1 === index &&
			inputList[index]["name"] !== "" &&
			inputList[index]["displayName"] !== ""
		) {
			setInputList([...inputList, { name: "", displayName: "" }]);
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

								// grid
								// display: "grid",
								// minWidth: "600px",
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
							<span style={{ cursor: "move", alignSelf: "center" }} onClick={handleMoveItem}>
								<MoveIcon />
							</span>
							<SolaceTextField name="name" value={item.name} onChange={(e) => handleInputChange(e, index)} />
							<SolaceTextField
								name="displayName"
								value={item.displayName}
								onChange={(e) => handleInputChange(e, index)}
								onKeyDown={(e) => handleKeyDown(e, index)}
							/>
							<div style={{ cursor: "pointer" }} onClick={() => handleDeleteItem(index)}>
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
