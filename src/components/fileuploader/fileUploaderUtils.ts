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

import accepts from "attr-accept";

export const strings = {
	maxFilesErrorMessage: "Maximum files allowed is ",
	maxSizeErrorMessage: "Maximum fileSize allowed is ",
	minSizeErrorMessage: "Minimum fileSize allowed is ",
	defaultSize: "0 kb",
	sizeInKb: " kb",
	sizeInMb: " mb"
};

export function isMIMEType(value: string) {
	return (
		value === "audio/*" ||
		value === "video/*" ||
		value === "image/*" ||
		value === "text/*" ||
		/\w+\/[-+.\w]+/g.test(value)
	);
}

/**
 * Check if v is a file extension.
 * @param {string} v
 */
export function isExt(value: string) {
	return /^.*\.[\w]+$/.test(value);
}

export function acceptPropAsAcceptAttr(acceptedFiles: Record<string, string[]>) {
	return Object.values(acceptedFiles)
		.reduce((acc, curr) => acc.concat(curr), [])
		.filter((v) => isMIMEType(v) || isExt(v))
		.join(",");
}

export const validateFiles = (
	maxFiles: number,
	minSize: number,
	files: File[],
	maxSize?: number,
	acceptedFiles?: string
): string | null => {
	if (maxFiles !== 0 && files.length > maxFiles) {
		return strings.maxFilesErrorMessage + maxFiles;
	}

	let errorMessage: string | null = null;

	files.some((file) => {
		if (maxSize && file.size > maxSize) {
			errorMessage = strings.maxSizeErrorMessage + readableFileSize(maxSize);
			return true; // break the loop
		}

		if (file.size < minSize) {
			errorMessage = strings.minSizeErrorMessage + readableFileSize(minSize);
			return true; // break the loop
		}

		if (acceptedFiles && acceptedFiles.length > 0 && !accepts(file, acceptedFiles)) {
			errorMessage = "File type not supported";
			return true; // break the loop
		}

		return false; // continue the loop
	});

	return errorMessage;
};

export function readableFileSize(bytes: number): string {
	const DEFAULT_SIZE = strings.defaultSize;

	if (!bytes) {
		return DEFAULT_SIZE;
	}

	const sizeInKb = bytes / 1024;

	if (sizeInKb > 1024) {
		return `${(sizeInKb / 1024).toFixed(2)}${strings.sizeInMb}`;
	} else {
		return `${sizeInKb.toFixed(2)}${strings.sizeInKb}`;
	}
}
