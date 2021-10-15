export interface TableColumn {
	field: string;
	headerName: string;
	class?: string;
	width?: number;
	sortable: boolean;
	sortDirection?: SORT_DIRECTION;
	disableToggling: boolean;
	resizable?: boolean;
	hasNoRows?: boolean;
}

export enum SELECTION_TYPE {
	SINGLE = "single",
	MULTI = "multi",
	NONE = "none"
}

export enum SORT_DIRECTION {
	ASC = "asc",
	DCS = "desc"
}
