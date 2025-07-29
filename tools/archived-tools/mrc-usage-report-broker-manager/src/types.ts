export interface AnalysisConfig {
	mfes: string[];
	mrcPath: string;
	outputDir: string;
	outputFormats: string[];
	mrcSourceType: MrcSourceType;
	mrcGithubUrl?: string;
	mrcGithubBranch?: string;
}

export type MrcSourceType = "local" | "github";

// Represents a prop passed to a component
export interface ComponentProp {
	name: string;
	value: string; // The value of the prop
	type?: string; // This can remain as is
}

// Represents a single instance of a component being used
export interface ComponentInstance {
	filePath: string;
	line: number;
	props: ComponentProp[];
}

// Represents the aggregated usage data for a component
export interface ComponentUsage {
	component: string;
	count: number;
	instances: ComponentInstance[];
}

// Aggregated data for a component
export interface ComponentStats {
	componentName: string;
	totalUsages: number;
	usagesByMfe: Record<string, number>;
	commonProps: { name: string; count: number }[];
	files: string[];
	customization: {
		styledComponentCount: number;
		customStylesCount: number;
		overriddenPropertiesCounts: Record<string, number>;
	};
	// All instances of the component
	instances: ComponentInstance[];
}

export interface ReportData {
	generatedAt: string;
	config: AnalysisConfig;
	mrcVersions: Record<string, string>;
	componentStats: ComponentStats[];
	unusedComponents: { name: string; path: string }[];
	unusedComponentsByMfe: Record<string, string[]>;
	overallStats: OverallStats;
	rawData: {
		componentUsages: ComponentUsage[];
	};
}

export interface OverallStats {
	totalUsages: number;
	mostUsedComponents: { name: string; count: number }[];
	mostUsedProps: { name: string; count: number }[];
	mfeUsages: Record<string, number>;
	totalUnusedComponents: number;
}

export interface MrcComponentInfo {
	name: string;
	path: string;
}
