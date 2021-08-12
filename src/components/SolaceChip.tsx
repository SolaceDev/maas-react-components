import { Chip, ChipProps, styled } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

const StyledChip = styled(Chip)(() => ({
	"& .MuiChip-deleteIcon": {
		color: "inherit"
	}
}));
export default function SolaceChip(props: ChipProps): JSX.Element {
	return <StyledChip {...props} deleteIcon={<CloseIcon />} />;
}

SolaceChip.defaultProps = {
	size: "small"
};
