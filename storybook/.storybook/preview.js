import { createTheme, ThemeProvider, SolaceTheme } from "@SolaceDev/maas-react-components";
import { withDesign } from "storybook-addon-designs";

export const decorators = [
	(Story) => (
		<ThemeProvider theme={createTheme(SolaceTheme)}>
			<Story />
		</ThemeProvider>
	),
	withDesign
];
