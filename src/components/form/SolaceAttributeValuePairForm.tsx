// import { useCallback } from "react";
import { styled } from "@material-ui/core";
import SolaceLabel from "./SolaceLabel";
import SolaceAttributeValuePairList, { AVPItem } from "./SolaceAttributeValuePairList";

const SolaceEnumInputFormLabel = styled("div")(({ theme }) => theme.mixins.formComponent_EnumInputForm.label);

const SolaceAttributeValuePairFormContainer = styled("div")`
	background-color: lightgrey;
`;

export interface SolaceAttributeValuePairFormProps {
	labelForKeys: string;
	labelForValues: string;
	initialAVPList: Array<AVPItem>;
	onAVPListUpdate: (list: Array<AVPItem>) => void;
}

const SolaceAttributeValuePairForm = ({
	labelForKeys = "Name",
	labelForValues = "DisplayName",
	initialAVPList,
	onAVPListUpdate
}: SolaceAttributeValuePairFormProps): JSX.Element => {
	console.log(initialAVPList);
	return (
		<SolaceAttributeValuePairFormContainer>
			<SolaceEnumInputFormLabel>
				<div></div>
				<SolaceLabel id="avpLabelForKeys">{labelForKeys}</SolaceLabel>
				<SolaceLabel id="avpLabelForValues">{labelForValues}</SolaceLabel>
				<div></div>
			</SolaceEnumInputFormLabel>
			<SolaceAttributeValuePairList initialAVPList={initialAVPList} onAVPListUpdate={onAVPListUpdate} />
		</SolaceAttributeValuePairFormContainer>
	);
};

export default SolaceAttributeValuePairForm;
