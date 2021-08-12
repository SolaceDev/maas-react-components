import "maas-react-components/dist/index.css";
import { Container, SolaceButton, SolaceTextField, Stack } from "maas-react-components";

import MenuItem from "@material-ui/core/MenuItem";

const currencies = [
	{
		value: "USD",
		label: "$"
	},
	{
		value: "EUR",
		label: "€"
	},
	{
		value: "BTC",
		label: "฿"
	},
	{
		value: "JPY",
		label: "¥"
	}
];

const Demo = () => {
	return (
		<Container sx={{ padding: "16px" }}>
			<Stack spacing={2} direction="column">
				<Stack spacing={2} direction="row">
					<SolaceButton variant="text">Text</SolaceButton>
					<SolaceButton variant="contained">Contained</SolaceButton>
					<SolaceButton variant="outlined">Outlined</SolaceButton>
				</Stack>

				<SolaceTextField label="TextField" />
				<SolaceTextField label="Select" select sx={{ width: "169px" }}>
					{currencies.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</SolaceTextField>
				<SolaceTextField label="Multiline" multiline rows={4} />
			</Stack>
		</Container>
	);
};

export default Demo;
