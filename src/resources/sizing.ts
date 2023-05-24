export type BASE_SIZE_TYPES = {
	xs: number;
	sm: number;
	md: number;
	lg: number;
};

export type EXTENDED_SIZE_TYPES = BASE_SIZE_TYPES & {
	xxs?: number;
	xs?: number;
	xl?: number;
	xxl?: number;
	huge?: number;
};
