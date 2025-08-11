/*
 * Copyright 2023-2025 Solace Systems. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

type StringAsNumber<T extends string> = T extends `${infer N extends number}` ? N : never;

type Range_0_9 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Range_1_9 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type Range_0_99 = StringAsNumber<`${Range_1_9}${Range_0_9}`> | Range_0_9;

export type RANGE_0_TO_100 = 100 | Range_0_99;
