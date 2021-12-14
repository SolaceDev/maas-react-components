import SolaceTextField, { SolaceTextFieldChangeEvent } from "./SolaceTextField";
import { DeleteIcon } from "../../resources/icons/DeleteIcon";
import { MoveIcon } from "../../resources/icons/MoveIcon";
import React, { useRef } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { XYCoord } from "dnd-core";

export interface SolaceEnumInputItemProps {
	id: string;
	index: number;
	name: string;
	displayName: string;
	ghostItem: boolean;
	onDelete: (event: React.MouseEvent<HTMLElement>, index: number) => void;
	onChange: (event: SolaceTextFieldChangeEvent, index: number) => void;
	onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	moveItem: (dragIndex: number, hoverIndex: number) => void;
}

// drag-n-drop type for Enum
const dndType = "EnumInput";

interface DragItem {
	index: number;
	id: string;
	type: string;
}

export const SolaceEnumInputItem = ({
	id,
	index,
	name,
	displayName,
	ghostItem = false,
	onDelete,
	onChange,
	onKeyUp,
	moveItem
}: SolaceEnumInputItemProps) => {
	// init dnd reference
	const ref = useRef<HTMLDivElement>(null);
	// item to be dropped
	const [{ handlerId }, drop] = useDrop({
		accept: dndType,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId()
			};
		},
		hover(item: DragItem, monitor: DropTargetMonitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) {
				return;
			}
			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect();

			// Get vertical middle
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

			// Determine mouse position
			const clientOffset = monitor.getClientOffset();

			// Get pixels to the top
			const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%

			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}

			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			// Time to actually perform the action
			moveItem(dragIndex, hoverIndex);
			// update item index
			item.index = hoverIndex;
		}
	});
	// item to be dragged
	const [{ isDragging }, drag, preview] = useDrag({
		type: dndType,
		canDrag: !ghostItem,
		item: () => {
			return { id, index };
		},
		collect: (monitor: any) => ({
			isDragging: monitor.isDragging()
		})
	});
	const opacity = isDragging ? 0.6 : 1;
	drag(drop(ref));
	return (
		<React.Fragment>
			<div
				key={id}
				ref={preview}
				data-handler-id={handlerId}
				style={{
					backgroundColor: "transparent",
					border: isDragging ? "1px dashed grey" : "",
					padding: "4px 0px",
					minWidth: "500px",
					opacity,

					// grid option
					// display: "grid",
					// gridTemplateColumns: "1fr 6fr 8fr 1fr",
					// gridGap: "10px",

					// flexbox option
					display: "flex",
					gap: "0px 6px",
					flexDirection: "row",
					flexWrap: "nowrap",
					justifyContent: "space-between",
					alignItems: "center"
				}}
			>
				<div ref={ref} style={{ cursor: ghostItem ? "default" : "move", paddingTop: "2px" }}>
					<MoveIcon fill={ghostItem ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.65)"} opacity={1} />
				</div>
				<SolaceTextField
					name="name"
					dataQa="enum-input"
					dataTags={`${index}-0`}
					value={name}
					onChange={(e) => onChange(e, index)}
					onKeyUp={onKeyUp}
				/>
				<SolaceTextField
					name="displayName"
					dataQa="enum-input"
					dataTags={`${index}-1`}
					value={displayName}
					onChange={(e) => onChange(e, index)}
					onKeyUp={onKeyUp}
				/>
				<div
					style={{ cursor: ghostItem ? "default" : "pointer", paddingTop: "2px" }}
					onClick={(e) => onDelete(e, index)}
					tabIndex={0}
				>
					<DeleteIcon fill={ghostItem ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.65)"} opacity={1} />
				</div>
			</div>
		</React.Fragment>
	);
};
