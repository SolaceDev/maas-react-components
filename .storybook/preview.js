import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { withDesign } from "storybook-addon-designs";

import theme from "../src/theme";

const solaceTheme = createTheme(theme);

export const decorators = [
	(Story) => (
		<ThemeProvider theme={solaceTheme}>
			<Story />
		</ThemeProvider>
	),
	withDesign
];
