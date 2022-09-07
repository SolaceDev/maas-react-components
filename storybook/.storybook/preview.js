import { createTheme, ThemeProvider, SolaceTheme, SupportedThemes } from "@SolaceDev/maas-react-components";
import { withDesign } from "storybook-addon-designs";
import { ReactComponent as SolaceSvgs } from "@solacedev/maas-icons/dist/svg/sprite.symbol.svg";
import isChromatic from "chromatic/isChromatic";

export const decorators = [
	(Story) => {
		let themeName = SupportedThemes.solace;
		if (document.body.classList.contains("sap")) {
			themeName = SupportedThemes.sap;
		} else if (document.body.classList.contains("new-solace")) {
			themeName = SupportedThemes.newSolace;
		}
		return (
			<ThemeProvider theme={createTheme(SolaceTheme(themeName))}>
				<div style={{ display: "none" }}>
					<SolaceSvgs />
				</div>
				{Story()}
			</ThemeProvider>
		);
	},
	withDesign
];

export const parameters = {
	controls: {
		expanded: true
	},
	themes: {
		default: "solace",
		list: [
			{ name: "Solace", color: "#00CCAD" },
			{ name: "SAP", class: "sap", color: "#0a6ed1" },
			{ name: "New Solace", class: "new-solace", color: "#00C895" }
		]
	}
};

// Use the document.fonts API to check if fonts have loaded
// https://developer.mozilla.org/en-US/docs/Web/API/Document/fonts API to
const fontLoader = async () => ({
	fonts: await document.fonts.ready
});

export const loaders = isChromatic() && document.fonts ? [fontLoader] : [];
