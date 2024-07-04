import SolaceTypography from "./SolaceTypography";
import { useEffect, useState } from "react";
import SolaceStack from "./layout/SolaceStack";
import styled from "@emotion/styled";
import { Box, Button, useTheme } from "@mui/material";
import SolaceButton from "./form/SolaceButton";
import { CloseIcon } from "../resources/icons/CloseIcon";
import ErrorText from "./form/ErrorText";
import { SolaceFileUploaderProps } from "../types";

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1
});

/**
 * A file uploader component that allows users to upload files by dragging and dropping or selecting from their device.
 *
 * @component
 * @example
 * ```tsx
 * <SolaceFileUploader
 *   maxFiles={3}
 *   readOnly={false}
 *   fileNames={[]}
 *   onFileChange={handleFileChange}
 *   label="Drag and drop file here"
 *   errorText="File size exceeds the limit"
 *   dataQa="fileUploader"
 *   id="fileUploaderId"
 * />
 * ```
 */

export default function SolaceFileUploader(props: SolaceFileUploaderProps) {
	const {
		maxFiles = 1,
		readOnly = false,
		fileNames = [],
		onFileChange,
		label = "Drag and drop file here",
		errorText,
		dataQa,
		id
	} = props;

	const theme = useTheme();
	const [dragEvent, setDragEvent] = useState(false);
	const [filesData, setFilesData] = useState<File[] | string[]>(fileNames ?? []);
	const [maxFilesError, setMaxFilesError] = useState("");

	useEffect(() => {
		console.log("filesData", filesData);
		onFileChange && onFileChange(filesData as File[]);
	}, [filesData, onFileChange]);

	const getDivider = (direction: "left" | "right") => (
		<Box
			borderRadius={"4px"}
			width={"125px"}
			height="1px"
			bgcolor={theme.palette.ux.secondary.w40}
			mr={direction === "left" ? 1 : undefined}
			ml={direction === "right" ? 1 : undefined}
		></Box>
	);

	const onDragEvent = (e: React.DragEvent<HTMLDivElement>) => {
		e.stopPropagation();
		e.preventDefault();
		if (!dragEvent) {
			setDragEvent(true);
		}
	};

	const onFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.stopPropagation();
		e.preventDefault();
		setDragEvent(false);
		if (maxFilesError) setMaxFilesError("");
		const filesAdded: File[] = [];
		if (e.dataTransfer.items) {
			if (maxFiles !== 0 && e.dataTransfer.items.length + filesData.length > maxFiles) {
				setMaxFilesError("Maximum files allowed is " + maxFiles);
				return;
			}
			// Use DataTransferItemList interface to access the file(s)
			Array.from(e.dataTransfer.items).forEach((item) => {
				// If dropped items aren't files, reject them
				if (item.kind === "file") {
					const file = item.getAsFile();
					if (file) {
						filesAdded.push(file);
					}
				}
			});
		}

		if (filesAdded.length > 0) {
			setFilesData([...filesData, ...filesAdded] as File[]);
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files === null) return;
		if (maxFilesError) setMaxFilesError("");

		if (maxFiles !== 0 && 1 + filesData.length > maxFiles) {
			setMaxFilesError("Maximum files allowed is " + maxFiles);
			return;
		}

		const file = event?.target?.files[0];

		setFilesData([...filesData, file] as File[]);
	};

	const renderFileNameDisplay = (file: File | string, index: number): JSX.Element => {
		return (
			<Box
				key={index}
				border={`1px solid ${theme.palette.ux.secondary.w40}`}
				display={"flex"}
				alignItems={"center"}
				justifyContent={"space-between"}
				height="48px"
				role="listitem"
				data-qa={`solaceFileUploaderFileName-${index}`}
				paddingLeft={2}
				paddingRight={0.5}
			>
				<SolaceTypography variant="h5">{typeof file === "string" ? file : file.name}</SolaceTypography>
				{/* option to remove the item is disabled in read only mode */}
				{!readOnly && (
					<SolaceButton
						variant="icon"
						onClick={() => {
							const newFiles = (filesData as File[]).filter((_, i) => i !== index);
							setFilesData(newFiles as File[]);
						}}
					>
						<CloseIcon />
					</SolaceButton>
				)}
			</Box>
		);
	};

	return (
		<>
			{filesData.length < maxFiles && !readOnly && (
				<Box
					onDragEnter={onDragEvent}
					onDragOver={onDragEvent}
					onDrop={onFileDrop}
					onDragLeave={() => setDragEvent(false)}
					height={"139px"}
					sx={[
						(theme) => ({
							border: dragEvent
								? `1px solid ${theme.palette.ux.brand.wMain}`
								: `1px dashed ${theme.palette.ux.secondary.w40}`
						})
					]}
					alignContent={"center"}
					paddingTop={2}
					paddingBottom={2}
					id={"solaceFileUploaderWrapper" ?? id}
					data-qa={dataQa}
					role="dropzone"
				>
					{dragEvent && (
						<SolaceTypography variant="body1" textAlign={"center"}>
							Drop file here
						</SolaceTypography>
					)}
					{!dragEvent && (
						<SolaceStack alignItems={"center"} spacing={2}>
							<SolaceTypography variant="body1" sx={{ color: theme.palette.ux.secondary.text.wMain }}>
								{label}
							</SolaceTypography>
							<Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"center"}>
								{getDivider("left")}
								<SolaceTypography sx={{ color: theme.palette.ux.secondary.text.wMain }} variant="body1">
									OR
								</SolaceTypography>
								{getDivider("right")}
							</Box>
							<Button component="label" role={undefined} variant="text" tabIndex={-1}>
								Upload file
								<VisuallyHiddenInput type="file" onChange={handleFileChange} />
							</Button>
						</SolaceStack>
					)}
				</Box>
			)}
			{(errorText || maxFilesError) && (
				<ErrorText dataQa="solaceFileUploaderError">{errorText || maxFilesError}</ErrorText>
			)}
			{filesData.length > 0 && (
				<SolaceStack mt={maxFiles > 1 ? 2 : 0}>
					{filesData.map((file, index) => renderFileNameDisplay(file, index))}
				</SolaceStack>
			)}
		</>
	);
}
