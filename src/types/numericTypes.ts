type StringAsNumber<T extends string> = T extends `${infer N extends number}` ? N : never;

type Range_0_9 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Range_1_9 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type Range_0_99 = StringAsNumber<`${Range_1_9}${Range_0_9}`> | Range_0_9;

export type RANGE_0_TO_100 = 100 | Range_0_99;
