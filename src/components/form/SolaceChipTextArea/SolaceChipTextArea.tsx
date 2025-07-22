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

import React, { useCallback, useEffect, useRef, useState, MouseEvent } from "react";
import { constants } from "@src/constants";
import { CHIP_VARIANT } from "@src/types/solaceChip";
import { STATUSES } from "@src/types/statuses";
import { ChipData, SolaceChipTextAreaProps } from "@src/types/solaceChipTextArea";
import SolaceChip from "@src/components/SolaceChip";
import FormChildBase from "@src/components/form/FormChildBase";
import { ChipInputContainer, ChipItem, InputWrapper, StyledInputBase } from "./SolaceChipTextArea.styles";

const SolaceChipTextArea: React.FC<SolaceChipTextAreaProps> = ({
	id,
	name,
	label,
	value,
	helperText,
	maxLength = constants.maxLength,
	title,
	autoFocus = false,
	hasErrors = false,
	required = false,
	inlineLabel = false,
	onChange,
	onBlur,
	onKeyDown,
	onKeyUp,
	onFocus,
	dataQa,
	dataTags,
	width,
	validateChip
}) => {
	const [chips, setChips] = useState<ChipData[]>([]);
	const [inputValue, setInputValue] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
	const [showCursor, setShowCursor] = useState<boolean>(true);
	const inputRef = useRef<HTMLInputElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	// Initialize chips from value prop and update when value changes
	useEffect(() => {
		if (value !== undefined) {
			const tokens = tokenizeInput(value);
			const newChips = tokens.map((token) => {
				const errorMsg = validateChip ? validateChip(token) : undefined;
				return {
					id: generateUniqueId(),
					label: token,
					isValid: !errorMsg,
					errorMessage: errorMsg
				};
			});
			setChips(newChips);
		}
	}, [value, validateChip]);

	const generateUniqueId = (): string => {
		return `chip-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
	};

	const tokenizeInput = (input: string): string[] => {
		// Split by common delimiters: space, comma, semicolon
		return input
			.split(/[\s,;]+/)
			.map((token) => token.trim())
			.filter((token) => token.length > 0);
	};

	const getChipValuesString = (chipsList: ChipData[]): string => {
		return chipsList.map((chip) => chip.label).join(",");
	};

	const addChip = useCallback(
		(text: string) => {
			const validateInput = (inputString: string): string | undefined => {
				if (!inputString) return undefined;

				// Use props.validateChip if provided
				if (validateChip) {
					return validateChip(inputString);
				}

				return undefined;
			};

			const trimmedText = text.trim();
			if (!trimmedText) return;

			const errorMsg = validateInput(trimmedText);

			const newChip: ChipData = {
				id: generateUniqueId(),
				label: trimmedText,
				isValid: !errorMsg,
				errorMessage: errorMsg
			};

			setChips((prevChips) => {
				const updatedChips = [...prevChips, newChip];

				if (onChange) {
					onChange({
						name,
						value: inputValue,
						chips: updatedChips,
						allValues: getChipValuesString(updatedChips)
					});
				}

				return updatedChips;
			});

			setInputValue("");

			if (errorMsg) {
				setErrorMessage(errorMsg);
			}
		},
		[inputValue, name, onChange, validateChip]
	);

	const removeChip = useCallback(
		(chipId: string) => {
			setChips((prevChips) => {
				const updatedChips = prevChips.filter((chip) => chip.id !== chipId);

				if (onChange) {
					onChange({
						name,
						value: inputValue,
						chips: updatedChips,
						allValues: getChipValuesString(updatedChips)
					});
				}

				// Check if all chips are valid
				const checkIfNoError = updatedChips.every((chip) => chip.isValid);
				if (checkIfNoError) {
					setErrorMessage(undefined);
				}

				return updatedChips;
			});
		},
		[inputValue, name, onChange]
	);

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.value;
			let finalValue = newValue;
			setErrorMessage(undefined);

			// Check if the input contains delimiters
			if (/[\s,;]/.test(newValue)) {
				const tokens = tokenizeInput(newValue);
				if (tokens.length > 1) {
					// Process all tokens except the last one
					tokens.slice(0, -1).forEach((token) => addChip(token));
					// Keep the last token in the input field
					finalValue = tokens[tokens.length - 1];
				}
			}

			// Set the input value once
			setInputValue(finalValue);

			if (onChange) {
				onChange({
					name,
					value: newValue, // Use original value for onChange to maintain expected behavior
					chips,
					allValues: getChipValuesString(chips)
				});
			}
		},
		[addChip, chips, name, onChange]
	);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if ((event.key === "Enter" || event.key === " " || event.key === "," || event.key === ";") && inputValue.trim()) {
				event.preventDefault();
				addChip(inputValue);
			}

			// Only remove the last chip if there are no characters in the input field and backspace/delete is pressed
			// This ensures spaces are deleted before removing chips
			if ((event.key === "Backspace" || event.key === "Delete") && inputValue.length === 0) {
				event.preventDefault();
				const lastChip = chips[chips.length - 1];
				if (lastChip) {
					removeChip(lastChip.id);
				}
			}

			if (event.key === "Space") {
				event.preventDefault();
			}

			if (onKeyDown) {
				onKeyDown(event);
			}
		},
		[addChip, chips, removeChip, inputValue, onKeyDown]
	);

	const handlePaste = useCallback(
		(event: React.ClipboardEvent<HTMLInputElement>) => {
			event.preventDefault();
			const pastedText = event.clipboardData.getData("text");
			const tokens = tokenizeInput(pastedText);

			if (tokens.length > 0) {
				// Add all tokens as chips
				tokens.forEach((token) => addChip(token));
			}
		},
		[addChip]
	);

	const handleChipClick = useCallback((event: MouseEvent) => {
		event.stopPropagation();
		setShowCursor(false);
		if (inputRef.current) {
			inputRef.current.blur();
		}
	}, []);

	const handleContainerClick = useCallback((event: React.MouseEvent) => {
		if (inputRef.current) {
			// Only focus if the click was directly on the container or input area
			// and not propagated from a chip
			const target = event.target as HTMLElement;
			const isChipClick = target.closest('[data-chip="true"]');

			if (!isChipClick) {
				setShowCursor(true);
				inputRef.current.focus();
			}
		}
	}, []);

	// Calculate helper text based on validation errors
	const displayHelperText = errorMessage ?? helperText;
	const displayHasErrors = !!errorMessage || hasErrors;

	// Check if any chip has an error
	const hasChipErrors = chips.some((chip) => !chip.isValid);

	const getId = () => {
		return id ?? name;
	};

	return (
		<FormChildBase
			id={getId()}
			label={label}
			helperText={displayHelperText}
			errorText={displayHasErrors ? displayHelperText : undefined}
			disabled={false}
			readOnly={false}
			required={required}
			inlineLabel={inlineLabel}
			sx={{ width: width }}
		>
			<ChipInputContainer
				ref={containerRef}
				onClick={handleContainerClick}
				className={hasChipErrors ? "error" : ""}
				style={{
					width: width
				}}
				data-qa={dataQa}
				data-tags={dataTags}
			>
				{chips.map((chip) => (
					<ChipItem key={chip.id} data-chip="true" onClick={handleChipClick}>
						<SolaceChip
							label={chip.label}
							status={chip.isValid ? STATUSES.NO_STATUS : STATUSES.ERROR_STATUS}
							onDelete={() => removeChip(chip.id)}
							clickable={true}
							variant={CHIP_VARIANT.FILLED}
						/>
					</ChipItem>
				))}
				<InputWrapper>
					<StyledInputBase
						inputRef={inputRef}
						value={inputValue}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						onPaste={handlePaste}
						onBlur={onBlur}
						onFocus={(e) => {
							if (!showCursor) {
								// Use currentTarget which is the element the event listener was attached to
								e.currentTarget.blur();
								return;
							}
							// Cast the event to the expected type for the onFocus prop
							if (onFocus) onFocus(e as React.FocusEvent<HTMLInputElement>);
						}}
						onKeyUp={onKeyUp}
						sx={{
							visibility: showCursor ? "visible" : "hidden",
							"& .MuiInputBase-input": {
								caretColor: showCursor ? "auto" : "transparent"
							}
						}}
						inputProps={{
							maxLength: maxLength,
							title: title,
							"aria-describedby": displayHelperText ? `${getId()}-helper-text` : "",
							"aria-labelledby": label ? `${getId()}-label` : "",
							"data-qa": dataQa,
							"data-tags": dataTags
						}}
						autoFocus={autoFocus}
						multiline
						rows={4}
						maxRows={4}
						fullWidth
					/>
				</InputWrapper>
			</ChipInputContainer>
		</FormChildBase>
	);
};

export default SolaceChipTextArea;
