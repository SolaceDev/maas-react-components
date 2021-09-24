import { CssBaseline, ThemeProvider, createTheme, SolaceTheme } from "maas-react-components";
import Demo from "./Demo";

const App = () => {
	return (
		<ThemeProvider theme={createTheme(SolaceTheme)}>
			<CssBaseline />
			<Demo />
		</ThemeProvider>
	);
};

export default App;
