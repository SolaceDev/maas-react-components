import SolaceTextField, { SolaceTextFieldChangeEvent } from "./SolaceTextField";
import { DeleteIcon } from "../../resources/icons/DeleteIcon";
import { MoveIcon } from "../../resources/icons/MoveIcon";

export interface SolaceEnumInputItemProps {
	id: number;
	name: string;
	displayName: string;
	onDelete: (event: React.MouseEvent<HTMLElement>, index: number) => void;
	onChange: (event: SolaceTextFieldChangeEvent, index: number) => void;
	onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	onMove?: () => void;
}

export const SolaceEnumInputItem = ({
	id,
	name,
	displayName,
	onDelete,
	onChange,
	onKeyUp
}: SolaceEnumInputItemProps) => {
	return (
		<div
			key={id}
			style={{
				backgroundColor: "transparent",
				padding: "9px 0px",
				minWidth: "600px",

				// TODO: grid option
				// display: "grid",
				// gridTemplateColumns: "1fr 6fr 8fr 1fr",
				// gridGap: "10px",

				// flexbox option
				display: "flex",
				gap: "0px 10px",
				flexDirection: "row",
				flexWrap: "nowrap",
				justifyContent: "space-between",
				alignItems: "center"
			}}
		>
			<div style={{ cursor: "move", paddingTop: "2px", color: "rgba(0, 0, 0, 0.2)" }}>
				<MoveIcon />
			</div>
			<SolaceTextField
				name="name"
				dataQa="enum-input"
				dataTags={`${id}-0`}
				value={name}
				onChange={(e) => onChange(e, id)}
				onKeyUp={onKeyUp}
			/>
			<SolaceTextField
				name="displayName"
				dataQa="enum-input"
				dataTags={`${id}-1`}
				value={displayName}
				onChange={(e) => onChange(e, id)}
				onKeyUp={onKeyUp}
			/>
			<div
				style={{ cursor: "pointer", paddingTop: "2px", color: "rgba(0, 0, 0, 0.2)" }}
				onClick={(e) => onDelete(e, id)}
				tabIndex={0}
			>
				<DeleteIcon />
			</div>
		</div>
	);
};
