export type SolaceEmptyStateBannerProps = {
	bannerImage: React.ReactNode;
	subtitle: string;
	title: string;
	description: string;
	primaryButton: { label: string; onClick: () => void; dataQa?: string };
	secondaryButton: { label: string; onClick: () => void; dataQa?: string };
	dataQa?: string;
};
