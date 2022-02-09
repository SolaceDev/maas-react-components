import { createTheme, ThemeProvider, SolaceTheme, SupportedThemes } from "@solacedev/maas-react-components";
import { withDesign } from "storybook-addon-designs";
import { ReactComponent as SolaceSvgs } from "@solacedev/maas-icons/dist/svg/sprite.symbol.svg";

export const decorators = [
	(Story) => (
		// Change passed theme here for eg to "sap" for testing
		<ThemeProvider theme={createTheme(SolaceTheme(SupportedThemes.solace))}>
			<div style={{ display: "none" }}>
				<SolaceSvgs />
			</div>
			<Story />
		</ThemeProvider>
	),
	withDesign
];

export const parameters = {
	controls: {
		expanded: true
	}
};
