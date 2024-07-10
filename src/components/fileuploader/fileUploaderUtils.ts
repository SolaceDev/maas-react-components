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
