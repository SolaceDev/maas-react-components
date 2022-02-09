import { styled } from "@material-ui/core";
import { useCallback, useMemo } from "react";
import SolaceComponentProps from "../SolaceComponentProps";

const Row = styled("div")(({ theme }) => theme.mixins.layoutComponent_GridList.row);
const List = styled("div")(({ theme }) => theme.mixins.layoutComponent_GridList.list);

interface SolaceGridListItem {
	id: string;
}

interface SolaceGridListProps<T extends SolaceGridListItem> extends SolaceComponentProps {
	id?: string;
	items: T[];
	headers?: string[];
	selectedItemId?: string;
	onSelection?: (item: T | undefined) => void;
	rowMapping: (item: T) => HTMLDivElement[];
	gridTemplate: string;
}

interface SolaceGridListRowProps extends SolaceComponentProps {
	id: string;
	index: number;
	items: HTMLDivElement[];
	gridTemplate: string;
	selected?: boolean;
	onClick: (id: string) => void;
}

function SolaceGridListRow({ id, index, items, gridTemplate, selected, onClick }: SolaceGridListRowProps): JSX.Element {
	const handleKeyPress = (e: any) => {
		if (e.key === "Enter") {
			onClick(id);
		}
	};

	return (
		<Row
			className={selected ? "selected" : ""}
			onClick={() => onClick(id)}
			onKeyPress={(e) => handleKeyPress(e)}
			style={{ gridTemplateColumns: gridTemplate }}
			tabIndex={index}
		>
			{items}
		</Row>
	);
}

function SolaceGridList<T extends SolaceGridListItem>({
	id,
	items,
	headers,
	selectedItemId,
	onSelection,
	rowMapping,
	gridTemplate,
	dataQa
}: SolaceGridListProps<T>): JSX.Element {
	const getListHeader = useMemo(() => {
		if (headers) {
			return (
				<Row className="headerRow" style={{ gridTemplateColumns: gridTemplate }}>
					{headers.map((label, index) => (
						<span key={index}>{label}</span>
					))}
				</Row>
			);
		}
		return null;
	}, [gridTemplate, headers]);

	const handleRowClick = useCallback(
		(id: string) => {
			if (onSelection) {
				onSelection(items.find((item) => item.id === id));
			}
		},
		[items, onSelection]
	);

	return (
		<div key={id} data-qa={dataQa} style={{ height: "100%" }}>
			{headers && getListHeader}
			<List>
				{items?.map((item, index) => (
					<SolaceGridListRow
						key={`solaceGridListRow-${item.id}`}
						id={item.id}
						index={index + 1}
						items={rowMapping(item)}
						selected={item.id === selectedItemId}
						gridTemplate={gridTemplate}
						onClick={handleRowClick}
						dataQa={dataQa}
					/>
				))}
			</List>
		</div>
	);
}

export default SolaceGridList;
