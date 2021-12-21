import { styled } from "@material-ui/core";
import SolaceLabel from "./SolaceLabel";
import { valueInputTypes } from "./SolaceAttributeValuePair";
import SolaceAttributeValuePairList, { AVPItem } from "./SolaceAttributeValuePairList";

const SolaceAVPFormContainer = styled("div")(({ theme }) => theme.mixins.formComponent_AVPForm.container);
const SolaceAVPFormLabel = styled("div")(({ theme }) => theme.mixins.formComponent_AVPForm.labelWrapper);
const SolaceAVPListContainer = styled("div")(({ theme }) => theme.mixins.formComponent_AVPForm.listWrapper);

export interface SolaceAttributeValuePairFormProps {
	labelForKeys: string;
	labelForValues: string;
	/**
	 * specifies the type of the value providing component: types can be input, select etc. component, default to SolaceTextField if no type provided
	 */
	type?: valueInputTypes;
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
		<SolaceAVPFormContainer>
			<SolaceAVPFormLabel>
				<SolaceLabel id="avpLabelForKeys">{labelForKeys}</SolaceLabel>
				<SolaceLabel id="avpLabelForValues">{labelForValues}</SolaceLabel>
			</SolaceAVPFormLabel>
			<SolaceAVPListContainer>
				<SolaceAttributeValuePairList initialAVPList={initialAVPList} onAVPListUpdate={onAVPListUpdate} />
			</SolaceAVPListContainer>
		</SolaceAVPFormContainer>
	);
};

export default SolaceAttributeValuePairForm;
