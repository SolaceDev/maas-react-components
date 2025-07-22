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

import SolaceComponentProps from "../components/SolaceComponentProps";

/**
 * Props for the SolaceFileUploader component.
 */
export type SolaceFileUploaderProps = SolaceComponentProps & {
	/**
	 * Callback function triggered when the selected files change.
	 * @param file - The selected file(s).
	 * Not required for read-only mode.
	 */
	onFileChange?: (file: File[]) => void;

	/**
	 * The maximum number of files that can be selected. Default is 1.
	 * Setting to 0 will allow unlimited files.
	 * Setting to a value greater than 1 will allow that many files.
	 */
	maxFiles?: number;

	/**
	 * Specifies whether the file uploader is in read-only mode.
	 * If true, the file uploader will display the files but will not allow any changes.
	 */
	readOnly?: boolean;

	/**
	 * An array of file names to be displayed in the file uploader.
	 * This is used in read-only mode and edit-mode when only file name is provided by the provider.
	 * Not required for create mode.
	 */
	fileNames?: string[];

	/**
	 * The label to be shown inside the file dropzone area.
	 */
	label?: string;

	/**
	 * The error text to display when there is an error.
	 */
	errorText?: string;

	/**
	 * Set accepted file types. Checkout https://developer.mozilla.org/en-US/docs/Web/API/window/showOpenFilePicker types option for more information.
	 * example :
	 * accept: {
	 * 'image/png': ['.png'],
	 * 'text/html': ['.html', '.htm']
	 * }
	 */
	accept?: Record<string, string[]>;

	/**
	 * The ID of the file uploader component.
	 */
	id?: string;

	/**
	 * The maximum size of the file in bytes.
	 * default is inifinite.
	 */
	maxSize?: number;

	/**
	 * The minimum size of the file in bytes.
	 * default is 0.
	 */
	minSize?: number;
};
