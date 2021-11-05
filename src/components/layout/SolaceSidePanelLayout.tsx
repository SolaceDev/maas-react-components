import React from "react";
import { styled } from "@material-ui/core";

const Container = styled("div")(({ theme }) => ({
	height: "calc(100% - 80px)",
	width: "100%",
	minWidth: "920px",
	padding: `0 ${theme.spacing(0.5)} ${theme.spacing(1)} ${theme.spacing(1)}`,
	display: "grid",
	backgroundColor: "white",
	overflowY: "auto"
}));

const SidePanelSection = styled("div")({
	height: "100%",
	overflowY: "auto",
	border: "1px solid rgba(0,0,0,0.1)",
	boxShadow: "0 1px 4px rgba(0,0,0,0.2)"
});

const MainSection = styled("div")(({ theme }) => ({
	display: "flex",
	height: "100%",
	overflowY: "auto",
	flexDirection: "column",
	alignItems: "left",
	padding: theme.spacing(2)
}));

type LayoutProps = {
	mainContent: React.ReactNode;
	sidePanelContent?: React.ReactNode;
	showSidePanel?: boolean;
	sidePanelWidth?: number;
};

function SolaceSidePanelLayout({ mainContent, sidePanelContent, showSidePanel }: LayoutProps): JSX.Element {
	return (
		<Container sx={{ gridTemplateColumns: `${showSidePanel ? "4fr minmax(320px, 1fr)" : "1fr"}` }}>
			<MainSection>{mainContent}</MainSection>
			{showSidePanel && <SidePanelSection>{sidePanelContent}</SidePanelSection>}
		</Container>
	);
}

export default SolaceSidePanelLayout;
