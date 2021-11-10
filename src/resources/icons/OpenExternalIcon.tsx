const SIZE = 16;

function Container() {
	return (
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M8.66667 4.00008H11.1194L7.21643 7.90309L8.15924 8.8459L12 5.00514V7.33341H13.3333V2.66675H8.66667V4.00008ZM2.66667 4.00008H7.33333V5.33341H3.33333V12.6667H10.6667V8.66675H12V13.3334C12 13.7016 11.7015 14.0001 11.3333 14.0001H2.66667C2.29848 14.0001 2 13.7016 2 13.3334V4.66675C2 4.29856 2.29848 4.00008 2.66667 4.00008Z"
		/>
	);
}

export function OpenExternalIcon() {
	return (
		<svg width={`${SIZE}px`} height={`${SIZE}px`} viewBox={`0 0 ${SIZE} ${SIZE}`} className="SolaceOpenExternalIcon">
			<Container></Container>
		</svg>
	);
}
