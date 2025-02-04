import React, { useCallback, useState } from "react";
import { action } from "@storybook/addon-actions";
import {
	Maintenance24Icon,
	Construction24Icon,
	Toolkit24Icon,
	Terminal24Icon,
	Bug24Icon,
	TestTube24Icon,
	NewRelease24Icon,
	ContentSearch24Icon,
	Broker24Icon,
	RocketLaunch24Icon,
	Verified24Icon,
	DeployedCode24Icon,
	Help24Icon
} from "@SolaceDev/maas-icons";

import {
	Box,
	MenuItem,
	MoreHorizOutlinedIcon,
	SolaceAccordion,
	SolaceButton,
	SolaceCheckBox,
	SolaceLabel,
	SolaceMenu,
	SolaceRadio,
	SolaceRadioGroup,
	SolaceSelect,
	SolaceStack,
	SolaceTabs,
	SolaceTextArea,
	SolaceTextField,
	SolaceToggle,
	SolaceToggleButtonGroup,
	SolaceTooltip,
	SolaceTypography,
	styled
} from "@SolaceDev/maas-react-components";
import { SolaceDatePicker, SolacePicker, TooltipVariant } from "../../../../dist";

const MIN_CONTENT = "min-content";
const FLEX = "flex";
const SPACE_BETWEEN = "space-between";

const CreateContentLayout = styled("div")(({ theme }) => ({
	height: "100%",
	display: FLEX,
	flexDirection: "column",
	// To be consistent with minWidth defined in SolaceHeader
	minWidth: "920px",
	overflow: "auto",
	// SolaceDrawer needs it's direct parent to have relative posistion to contain the drawer.
	position: "relative",
	backgroundColor: theme.palette.ux.background.w10
}));

const SectionTitle = styled("div")(({ theme }) => ({
	fontSize: theme.typography.subtitle1.fontSize,
	lineHeight: theme.typography.subtitle1.lineHeight,
	fontWeight: 500,
	marginTop: theme.spacing(4)
}));

const ListItemTitle = styled("div")(({ theme }) => ({
	fontWeight: theme.typography.fontWeightMedium
}));

const FormContainer = styled("form")(({ theme }) => ({
	display: "grid",
	columnGap: theme.spacing(36 / 8),
	rowGap: theme.spacing(2),
	gridTemplateColumns: "108px minmax(auto, 920px)",
	gridTemplateRows: MIN_CONTENT,
	padding: `${theme.spacing(2)} 0 ${theme.spacing(1)} 0`
}));

const IconContainer = styled("div")(({ theme }) => ({
	display: FLEX,
	alignItems: "center",
	gap: theme.spacing(1)
}));

const SelectorIconContainer = styled("div")(({ theme }) => ({
	display: FLEX,
	alignItems: "end",
	gap: theme.spacing(0)
}));

const LabelColumn = styled("div")({
	boxSizing: "border-box",
	paddingTop: "4px"
});

const ValueColumn = styled("div")({
	width: "100%",

	"&.fixed-width-520": {
		width: "520px"
	},
	"&.fixed-width-260": {
		width: "260px"
	}
});

// Custom attributes are embedded in a two column grid
// where they take up both columns
const TwoColumnSpan = styled("div")(({ theme }) => ({
	gridColumn: "1 / 3",
	color: theme.palette.ux.secondary.text.wMain,
	padding: theme.spacing(2, 0, 3, 0)
}));

const TabsContainer = styled("div")(({ theme }) => ({
	flex: 1,
	display: FLEX,
	flexWrap: "nowrap",
	justifyContent: SPACE_BETWEEN,
	alignItems: "center",
	borderBottom: `1px solid ${theme.palette.ux.secondary.w20}`,
	".MuiBox-root:first-of-type": {
		width: "auto" // Override the defaut 100% contioner width of SolaceTabs
	}
}));

const TabLayoutContainer = styled("div")(({ theme }) => ({
	marginTop: theme.spacing(2),
	display: "block"
}));

const FilterWrapper = styled("div")(({ theme }) => ({
	marginBottom: theme.spacing(2),
	display: FLEX,
	alignItems: "center",
	justifyContent: "flex-start",
	gap: theme.spacing(3),
	minWidth: "425px"
}));

const SELECT_OPTIONS: Array<JSX.Element> = [];
SELECT_OPTIONS.push(
	<MenuItem key="option1" value="option1">
		Option 1
	</MenuItem>
);
SELECT_OPTIONS.push(
	<MenuItem key="option2" value="option2">
		Option 2
	</MenuItem>
);

const tabs = [
	{ label: "Tab 1", value: "tab1" },
	{ label: "Tab 2", value: "tab2" }
];

const SolaceTestForm = () => {
	const [accordion1Expanded, setAccordion1Expanded] = useState(false);
	const [accordion2Expanded, setAccordion2Expanded] = useState(false);
	const [accordion3Expanded, setAccordion3Expanded] = useState(true);
	const [activeTab, setActiveTab] = useState("tab1");
	const [activeToggle, setActiveToggle] = useState("toggle1");

	const toggleAccordion1 = useCallback(() => {
		setAccordion1Expanded(!accordion1Expanded);
		action("accordion1-expanded")(accordion1Expanded);
	}, [accordion1Expanded]);

	const toggleAccordion2 = useCallback(() => {
		setAccordion2Expanded(!accordion2Expanded);
		action("accordion2-expanded")(accordion2Expanded);
	}, [accordion2Expanded]);

	const toggleAccordion3 = useCallback(() => {
		setAccordion3Expanded(!accordion3Expanded);
		action("accordion3-expanded")(accordion3Expanded);
	}, [accordion3Expanded]);

	const toggleActiveToggle = (_event, value) => {
		setActiveToggle(value);
		action("toggle-changed")(value);
	};

	const onTabClick = (tabValue: string) => {
		setActiveTab(tabValue);
		action("tabClicked")(tabValue);
	};

	return (
		<CreateContentLayout className="scrollableContainer">
			<SectionTitle>Section 1</SectionTitle>
			<SolaceTypography variant="body1" style={{ marginTop: "10px" }}>
				Text that introduces the next section. Sometimes it has an{" "}
				<SolaceButton variant="link" dense href="http://www.solace.com">
					external link to documentation
				</SolaceButton>
			</SolaceTypography>
			<FormContainer>
				<LabelColumn>
					<SolaceLabel id="label1" htmlForId="demoIconPickerId" required={true}>
						Label 1
					</SolaceLabel>
				</LabelColumn>
				<SolaceStack spacing={10} direction="row">
					<SolacePicker
						variant="icons"
						value="DEPLOYED_CODE"
						onChange={action("callback")}
						title="Icon Picker"
						id="demoIconPickerId"
						name="demoIconPicker"
						icons={{
							MAINTENANCE: <Maintenance24Icon />,
							CONSTRUCTION: <Construction24Icon />,
							TOOLKIT: <Toolkit24Icon />,
							TERMINAL: <Terminal24Icon />,
							BUG: <Bug24Icon />,
							TEST_TUBE: <TestTube24Icon />,
							NEW_RELEASE: <NewRelease24Icon />,
							CONTENT_SEARCH: <ContentSearch24Icon />,
							BROKER: <Broker24Icon />,
							ROCKET_LAUNCH: <RocketLaunch24Icon />,
							VERIFIED: <Verified24Icon />,
							DEPLOYED_CODE: <DeployedCode24Icon />
						}}
					/>
					<LabelColumn className="fixed-width-108">
						<SolaceLabel id="label2" htmlForId="demoColorPickerId" required={true}>
							Label 2
						</SolaceLabel>
					</LabelColumn>
					<SolacePicker
						variant="colors"
						value="#000000,#FFFFFF"
						onChange={action("callback")}
						title="Color Picker"
						id="demoColorPickerId"
						name="demoColorPicker"
					/>
				</SolaceStack>
				<LabelColumn>
					<SolaceLabel id="datePickerLabel" htmlForId="datePicker" required={true}>
						Label 3
					</SolaceLabel>
				</LabelColumn>
				<ValueColumn className="fixed-width-520">
					<SolaceDatePicker
						id="datePicker"
						onChange={action("date picker changed")}
						onClear={action("date picker cleared")}
					/>
				</ValueColumn>
				<LabelColumn>
					<SolaceLabel id="textFieldLabel" htmlForId="textFieldId" required={true}>
						Label 4
					</SolaceLabel>
				</LabelColumn>
				<ValueColumn className="fixed-width-520">
					<SolaceTextField
						id="textFieldId"
						name="demoTextField"
						onChange={action("demoTextField-changed")}
						title="Demo Text Field"
					/>
				</ValueColumn>
				<LabelColumn>
					<SolaceLabel id="selectLabel" htmlForId="selectId" required>
						Label 5
					</SolaceLabel>
				</LabelColumn>
				<ValueColumn className="fixed-width-520">
					<SolaceSelect
						id="selectId"
						name="demoSelectComponent"
						onChange={action("Demo Select Changed")}
						value="option1"
					>
						{SELECT_OPTIONS}
					</SolaceSelect>
				</ValueColumn>
				<LabelColumn>
					<SolaceLabel id="textAreaLabel" htmlForId="textAreaId" required={true}>
						Label 6
					</SolaceLabel>
				</LabelColumn>
				<ValueColumn className="fixed-width-520">
					<SolaceTextArea
						id="textAreaId"
						name="demoTextArea"
						onChange={action("demoTextArea-changed")}
						title="Demo Text Area"
					/>
				</ValueColumn>
			</FormContainer>
			<SectionTitle>Section 2</SectionTitle>
			<FormContainer>
				<LabelColumn>
					<SolaceLabel id="sub-label">Sub-Label</SolaceLabel>
				</LabelColumn>
				<ValueColumn>
					<TabsContainer>
						<SolaceTabs tabs={tabs} activeTabValue={activeTab} onTabClick={onTabClick} />
						{activeTab === "tab1" && (
							<SolaceButton
								variant="text"
								name="manage-events-button"
								onClick={action("manage events button clicked")}
								dataQa="manageEventsButton"
							>
								<span style={{ whiteSpace: "nowrap" }}>Button</span>
							</SolaceButton>
						)}
					</TabsContainer>
					{activeTab === "tab1" && (
						<TabLayoutContainer>
							<FilterWrapper>
								<SolaceLabel id="selectedMem">Display</SolaceLabel>
								<div style={{ maxWidth: "350px", flexGrow: 1 }}>
									<SolaceSelect
										name="SolaceSelectMenu"
										value="menuItem2"
										onChange={action("menuItemChanged")}
										width="100%"
										dataQa={`appVersionDetailMemFilter`}
									>
										<MenuItem key="menuItem1" value="menuItem1">
											Menu Item 1
										</MenuItem>
										<MenuItem key="menuItem2" value="menuItem2">
											Menu Item 2
										</MenuItem>
										<MenuItem key="menuItem3" value="menuItem3">
											Menu Item 3
										</MenuItem>
									</SolaceSelect>
								</div>
								<SolaceToggleButtonGroup
									options={[
										{ value: "toggle1", label: "Toggle 1" },
										{ value: "toggle2", label: "Toggle 2" }
									]}
									activeValue={activeToggle}
									onChange={toggleActiveToggle}
								/>
							</FilterWrapper>
							<TwoColumnSpan>
								<SolaceAccordion
									dataQa="customAttributes-accordion"
									hover
									onChange={toggleAccordion1}
									summary={
										<Box
											width="100%"
											display="flex"
											padding="2px"
											alignItems="center"
											justifyContent="space-between"
											gap="48px"
										>
											<ListItemTitle>Simple List Item 1 Title</ListItemTitle>
											<Box display={FLEX} alignItems={"center"} columnGap={1} marginLeft={"auto"}>
												<SolaceTooltip
													title="This is a rich tooltip with content"
													placement={"right"}
													maxWidth={"medium"}
													variant={TooltipVariant.rich}
												>
													<IconContainer>
														<Help24Icon />
													</IconContainer>
												</SolaceTooltip>
												<SolaceMenu
													buttonProps={{
														children: <MoreHorizOutlinedIcon />,
														title: "More actions 1!",
														variant: "icon"
													}}
													dataQa="testDataProp"
													dataTags="testDataTag1"
													id="demo-solace-menu"
													items={[
														{
															dataQa: "testDataProp2",
															dataTags: "testDataTag2",
															name: "Option 1",
															onMenuItemClick: () => {}
														},
														{
															name: "Option 2",
															onMenuItemClick: () => {}
														},
														{
															name: "Option 3",
															onMenuItemClick: () => {}
														},
														{
															name: "Option 4",
															onMenuItemClick: () => {}
														},
														{
															name: "Option 5",
															onMenuItemClick: () => {}
														}
													]}
													numOfMenuItemDisplayed={3}
												/>
											</Box>
										</Box>
									}
									details={<p>Content in an expandable area</p>}
									expanded={accordion1Expanded}
								></SolaceAccordion>
								<SolaceAccordion
									dataQa="customAttributes-accordion2"
									hover
									onChange={toggleAccordion2}
									summary={
										<Box
											width="100%"
											display="flex"
											padding="2px"
											alignItems="center"
											justifyContent="space-between"
											gap="48px"
										>
											<ListItemTitle>Simple List Item 2 Title</ListItemTitle>
											<Box display={FLEX} alignItems={"center"} columnGap={1} marginLeft={"auto"}>
												<SolaceTooltip
													title="This is a rich tooltip with content"
													placement={"right"}
													maxWidth={"medium"}
													variant={TooltipVariant.rich}
												>
													<IconContainer>
														<Help24Icon />
													</IconContainer>
												</SolaceTooltip>
												<SolaceMenu
													buttonProps={{
														children: <MoreHorizOutlinedIcon />,
														title: "More actions 2!",
														variant: "icon"
													}}
													dataQa="testDataProp"
													dataTags="testDataTag1"
													id="demo-solace-menu"
													items={[
														{
															dataQa: "testDataProp2",
															dataTags: "testDataTag2",
															name: "Option 1",
															onMenuItemClick: () => {}
														},
														{
															name: "Option 2",
															onMenuItemClick: () => {}
														},
														{
															name: "Option 3",
															onMenuItemClick: () => {}
														},
														{
															name: "Option 4",
															onMenuItemClick: () => {}
														},
														{
															name: "Option 5",
															onMenuItemClick: () => {}
														}
													]}
													numOfMenuItemDisplayed={3}
												/>
											</Box>
										</Box>
									}
									details={<p>Content in an expandable area</p>}
									expanded={accordion2Expanded}
								></SolaceAccordion>
								<SolaceAccordion
									dataQa="customAttributes-accordion3"
									hover
									onChange={toggleAccordion3}
									summary={
										<Box
											width="100%"
											display="flex"
											padding="2px"
											alignItems="center"
											justifyContent="space-between"
											gap="48px"
										>
											<ListItemTitle>Simple List Item 3 Title</ListItemTitle>
											<Box display={FLEX} alignItems={"center"} columnGap={1} marginLeft={"auto"}>
												<SolaceTooltip
													title="This is a rich tooltip with content"
													placement={"right"}
													maxWidth={"medium"}
													variant={TooltipVariant.rich}
												>
													<IconContainer>
														<Help24Icon />
													</IconContainer>
												</SolaceTooltip>
												<SolaceMenu
													buttonProps={{
														children: <MoreHorizOutlinedIcon />,
														title: "More actions 3!",
														variant: "icon"
													}}
													dataQa="testDataProp"
													dataTags="testDataTag1"
													id="demo-solace-menu"
													items={[
														{
															dataQa: "testDataProp2",
															dataTags: "testDataTag2",
															name: "Option 1",
															onMenuItemClick: () => {}
														},
														{
															name: "Option 2",
															onMenuItemClick: () => {}
														},
														{
															name: "Option 3",
															onMenuItemClick: () => {}
														},
														{
															name: "Option 4",
															onMenuItemClick: () => {}
														},
														{
															name: "Option 5",
															onMenuItemClick: () => {}
														}
													]}
													numOfMenuItemDisplayed={3}
												/>
											</Box>
										</Box>
									}
									details={<p>Content in an expandable area</p>}
									expanded={accordion3Expanded}
								></SolaceAccordion>
							</TwoColumnSpan>
						</TabLayoutContainer>
					)}
					{activeTab === "tab2" && (
						<TabLayoutContainer>
							<SolaceRadioGroup
								id="demoRadioGroupId"
								label="Radio Options"
								large
								name="demoRadioGroup"
								onChange={action("radio-group-changed")}
								stackLabel
								title="Demo RadioGroup"
								value="radioOption2"
							>
								<SolaceRadio label="Radio Option 1" name="radioOption1" value="radioOption1" />
								<SolaceRadio label="Radio Option 2" name="radioOption2" value="radioOption2" />
								<SolaceRadio label="Radio Option 3" name="radioOption3" value="radioOption3" />
							</SolaceRadioGroup>
							<SolaceStack spacing={10} direction="row">
								<SolaceTypography variant="h4" style={{ marginTop: "20px" }}>
									Checkbox Options
								</SolaceTypography>
								<SolaceTooltip
									variant={TooltipVariant.rich}
									title="Rich tooltip with content for the checkbox options"
									placement={"right"}
									maxWidth={"medium"}
								>
									<SelectorIconContainer style={{ marginLeft: "10px" }}>
										<Help24Icon />
									</SelectorIconContainer>
								</SolaceTooltip>
							</SolaceStack>
							<div style={{ marginTop: "10px" }}>
								<SolaceCheckBox
									id="demoCheckboxId1"
									label="Checkbox 1"
									name="demoCheckbox1"
									onChange={action("checkbox1-changed")}
									title="Demo Checkbox 1"
								/>
							</div>
							<div style={{ marginTop: "10px" }}>
								<SolaceCheckBox
									id="demoCheckboxId2"
									label="Checkbox 2"
									checked
									name="demoCheckbox2"
									onChange={action("checkbox2-changed")}
									title="Demo Checkbox 2"
								/>
							</div>
							<div style={{ marginTop: "10px" }}>
								<SolaceCheckBox
									id="demoCheckboxId3"
									label="Checkbox 3"
									name="demoCheckbox3"
									onChange={action("checkbox3-changed")}
									title="Demo Checkbox 3"
								/>
							</div>

							<SolaceStack spacing={10} direction="row">
								<SolaceTypography variant="h4" style={{ marginTop: "20px" }}>
									Toggle Options
								</SolaceTypography>
								<SolaceTooltip
									variant={TooltipVariant.rich}
									title="Rich tooltip with content for the toggle options"
									placement={"right"}
									maxWidth={"medium"}
								>
									<SelectorIconContainer style={{ marginLeft: "10px" }}>
										<Help24Icon />
									</SelectorIconContainer>
								</SolaceTooltip>
							</SolaceStack>
							<div style={{ marginTop: "10px" }}>
								<SolaceToggle
									id="demoToggleId1"
									label="Toggle 1"
									name="demoToggle1"
									onChange={action("toggle1-changed")}
									title="Demo Toggle 1"
								/>
							</div>
							<div style={{ marginTop: "10px" }}>
								<SolaceToggle
									id="demoToggleId"
									label="Toggle 2"
									name="demoToggle2"
									onChange={action("toggle2-changed")}
									title="Demo Toggle 2"
									isOn={true}
								/>
							</div>
							<div style={{ marginTop: "10px" }}>
								<SolaceToggle
									id="demoToggleId"
									label="Toggle 3"
									name="demoToggle3"
									onChange={action("toggle3-changed")}
									title="Demo Toggle 3"
								/>
							</div>
						</TabLayoutContainer>
					)}
				</ValueColumn>
			</FormContainer>
		</CreateContentLayout>
	);
};

export default SolaceTestForm;
