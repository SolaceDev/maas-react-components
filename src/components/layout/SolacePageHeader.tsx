import * as React from "react";
import { styled } from "@mui/material";
import SolaceFeatureTag from "../SolaceFeatureTag";
import SolaceComponentProps from "../SolaceComponentProps";
import SolaceBreadcrumb, { SolacePath } from "../SolaceBreadcrumb";

/**
 Structure of this Page Header component:
 1st row: {environment}{returnTo}|{release}{breadcrumbs {breadcrumb1} > {breadcrumb2} > ...}
 2nd row: {views}{title}: {sub-title}{tabs}{actions}{action-menu}
*/

const translateColor = (color?: string): string => {
	if (color?.toUpperCase() === "#FFFFFF") {
		return "#000000";
	}
	return color || "transparent";
};

const Layout = styled("header", { shouldForwardProp: (prop: PropertyKey) => prop !== "borderTop" })<{
	borderTop?: string;
}>(
	({ theme, borderTop }) => `
	background-color: ${theme.palette.background.paper};
	border-bottom: 1px solid ${theme.palette.ux.secondary.w40};
	border-top: 2px solid ${translateColor(borderTop)};
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	min-height: ${theme.spacing(10)};
	padding: ${theme.spacing(0, 3)};`
);

const NavSection = styled("div")(
	({ theme }) => `
	align-items: center;
	column-gap: ${theme.spacing(1)};
	display: flex;
	flex: 1 0 0%;
	flex-direction: row;
	font-size: ${theme.typography.body1.fontSize};
	font-weight: ${theme.typography.body1.fontWeight};`
);

const Wrapper = styled("div")(
	({ theme }) => `
	display: flex;
	height: ${theme.spacing(3)};`
);

const NavBorder = styled(Wrapper)(
	({ theme }) => `
	border-right: 1px solid ${theme.palette.ux.secondary.w40};`
);

const HeaderSection = styled("div")(
	({ theme }) => `
	align-items: center;
	color: ${theme.palette.ux.primary.text.wMain};
	column-gap: ${theme.spacing(2)};
	display: flex;
	flex-direction: row;
	height: ${theme.spacing(5.25)};`
);

const IconTabsSection = styled("div")`
	align-self: flex-end;
	margin-bottom: -1px;
`;

const TitleSection = styled("div")(
	({ theme }) => `
	align-self: center;
	column-gap: ${theme.spacing(1)};
	display: flex;
	flex-direction: row;`
);

const Title = styled("span")(
	({ theme }) => `
	font-family: ${theme.typography.h2.fontFamily};
	font-size: ${theme.typography.h2.fontSize};
	font-weight: ${theme.typography.h2.fontWeight};
	overflow-x: hidden;
	text-overflow: ellipsis;
	text-wrap: nowrap;`
);

const SubTitle = styled("span")(
	({ theme }) => `
	font-family: ${theme.typography.h1.fontFamily};
	font-size: ${theme.typography.h1.fontSize};
	font-weight: ${theme.typography.h1.fontWeight};
	overflow-x: hidden;
	text-overflow: ellipsis;
	text-wrap: nowrap;`
);

const TabsSection = styled("div")(
	({ theme }) => `
	.MuiTabs-root, .MuiTab-root {
		min-height: ${theme.spacing(5.25)};
	}`
);

const Actions = styled("div")(
	({ theme }) => `
	flex: 1 0 0%;
	column-gap: ${theme.spacing(1)};
	display: flex;
	justify-content: end;
	white-space: nowrap;`
);

export interface SolacePageHeaderProps extends SolaceComponentProps {
	/**
	 * Optional id to be used
	 */
	id?: string;
	/**
	 * The header's title to display
	 */
	title: string;
	/**
	 * The sub-title to display next to the title (when used, a
	 * column ":" will show up after the title automagically)
	 */
	subTitle?: string;
	/**
	 * The release string (e.g. "BETA")
	 */
	release?: string;
	/**
	 * The environment's chip (#SolaceEnvironmentChip) or (#SolaceEnvironmentSelectChip)
	 */
	environment?: JSX.Element;
	/**
	 * The header's top border color (should match the bgColor used with #SolaceEnvironmentChip)
	 */
	borderTop?: string;
	/**
	 * Breadcrumbs where the last path should be the current one. It can be a #SolaceBreadcrumb component
	 */
	breadcrumbs?: SolacePath[] | JSX.Element;
	/**
	 * Array of actions (like #SolaceButton) but can be pretty much anything you want
	 */
	actions?: JSX.Element[];
	/**
	 * The action menu (usually with a "..." icon) that will appear on 2nd row at the far end
	 */
	actionMenu?: JSX.Element;
	/**
	 * The tabs (#SolaceTabs) to be displayed next to the title/sub-title
	 */
	tabs?: JSX.Element;
	/**
	 * The icon tabs (#SolaceIconTabs) to be displayed before the title/sub-title
	 */
	iconTabs?: JSX.Element;
	/**
	 * Used to add a "Return to X" link in front of the breadcrumbs (NOTE: this property may go away in the future)
	 */
	returnTo?: JSX.Element;
}

export default function SolacePageHeader({
	id,
	title,
	subTitle,
	release,
	environment,
	borderTop,
	breadcrumbs,
	actions,
	actionMenu,
	tabs,
	iconTabs,
	returnTo,
	dataQa,
	dataTags
}: SolacePageHeaderProps): JSX.Element {
	const getId = (suffix?: string) => `${id ?? "default"}${suffix ? "-".concat(suffix) : ""}`;
	return (
		<Layout id={getId()} data-qa={dataQa} data-tags={dataTags} borderTop={borderTop}>
			<NavSection>
				{environment}
				{returnTo}
				{(environment || returnTo) && (release || breadcrumbs) && <NavBorder />}
				{release && <SolaceFeatureTag key="releaseTag" text={release} />}
				{Array.isArray(breadcrumbs) ? (
					<SolaceBreadcrumb id={getId("breadcrumbs")} paths={breadcrumbs} />
				) : (
					React.isValidElement(breadcrumbs) && breadcrumbs
				)}
			</NavSection>
			<HeaderSection>
				{iconTabs && <IconTabsSection>{iconTabs}</IconTabsSection>}
				<TitleSection>
					<Title id={getId("title")} data-qa="solace-header-title">
						{title}
						{subTitle ? ":" : ""}
					</Title>
					{subTitle && <SubTitle id={getId("subtitle")}>{subTitle}</SubTitle>}
				</TitleSection>
				{tabs && <TabsSection>{tabs}</TabsSection>}
				{(actions || actionMenu) && (
					<Actions id={getId("actions")}>
						{actions}
						{actionMenu}
					</Actions>
				)}
			</HeaderSection>
		</Layout>
	);
}
