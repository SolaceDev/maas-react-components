import { createTheme, ThemeProvider, SolaceTheme, SupportedThemes } from "@SolaceDev/maas-react-components";
import { withDesign } from "storybook-addon-designs";
import { ReactComponent as SolaceSvgs } from "@solacedev/maas-icons/dist/svg/sprite.symbol.svg";

export const decorators = [
	(Story) => {
		const themeName = document.body.classList.contains('sap') ? SupportedThemes.sap : SupportedThemes.solace;
		return <ThemeProvider theme={createTheme(SolaceTheme(themeName))}>
			<div style={{ display: "none" }}>
				<SolaceSvgs />
			</div>
			<Story />
		</ThemeProvider>
	},
	withDesign
];

export const parameters = {
	controls: {
		expanded: true
	},
	themes: {
		default: 'solace',
		list: [
		  { name: 'Solace', color: '#00CCAD' },
		  { name: 'SAP', class: 'sap', color: '#0a6ed1' }
		],
	  }
};
