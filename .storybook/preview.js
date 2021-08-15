import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { withDesign } from "storybook-addon-designs";

import theme from "../src/theme";

export const decorators = [
	(Story) => (
		<ThemeProvider theme={createTheme(theme)}>
			<Story />
		</ThemeProvider>
	),
	withDesign
];
