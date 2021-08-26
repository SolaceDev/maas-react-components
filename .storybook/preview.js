import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { themes } from "@storybook/theming";
import { withDesign } from "storybook-addon-designs";

import theme from "../src/resources/theme";

export const parameters = {
	// add this
	docs: {
		theme: themes.dark
	}
};

export const decorators = [
	(Story) => (
		<ThemeProvider theme={createTheme(theme)}>
			<Story />
		</ThemeProvider>
	),
	withDesign
];
