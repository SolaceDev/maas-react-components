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
	 * The file types to accept. This should be a valid file type string.
	 * Still need to be implemented.
	 */
	accept?: string;

	/**
	 * The ID of the file uploader component.
	 */
	id?: string;
};
