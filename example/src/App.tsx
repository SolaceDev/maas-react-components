import { CssBaseline, ThemeProvider } from "maas-react-components";
import Demo from "./Demo";
import theme from "./theme";

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Demo />
		</ThemeProvider>
	);
};

export default App;
