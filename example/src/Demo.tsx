import { Container, SolaceButton, Stack } from "maas-react-components";

const Demo = () => {
	return (
		<Container sx={{ padding: "16px" }}>
			<Stack spacing={2} direction="column">
				<Stack spacing={2} direction="row">
					<SolaceButton variant="text">Text</SolaceButton>
					<SolaceButton variant="call-to-action">Call to Action</SolaceButton>
					<SolaceButton variant="outline">Outlined</SolaceButton>
				</Stack>
			</Stack>
		</Container>
	);
};

export default Demo;
