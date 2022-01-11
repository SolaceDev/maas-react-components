import { createTheme, ThemeProvider, SolaceTheme, SupportedThemes } from "@SolaceDev/maas-react-components";
import { withDesign } from "storybook-addon-designs";

export const decorators = [
	(Story) => (
		// Change passed theme here for eg to "sap" for testing
		<ThemeProvider theme={createTheme(SolaceTheme(SupportedThemes.solace))}>
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
