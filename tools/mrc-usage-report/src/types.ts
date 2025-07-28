/**
 * Types for MRC Usage Report
 */

// Source type for MRC components
export type MrcSourceType = "local" | "github";

// Configuration for the analysis
export interface AnalysisConfig {
	// MFEs to analyze (excluding api-products as requested)
	mfes: string[];
	// Path to the MRC repository
	mrcPath: string;
	// Output directory for the report
	outputDir: string;
	// Output format (html, json, yaml, csv, etc.)
	outputFormat: "html" | "json" | "yaml" | "csv";
	// Source type for MRC components
	mrcSourceType: MrcSourceType;
	// GitHub repository URL for MRC components
	mrcGithubUrl?: string;
	// GitHub branch name for MRC components
	mrcGithubBranch?: string;
	mfeInfos: MfeInfo[];
}

export interface MfeInfo {
	name: string;
	path: string;
	repository: string;
}

// Represents a component from the MRC library
export interface MrcComponent {
	name: string;
	path: string;
	// Additional metadata about the component
	metadata?: {
		description?: string;
		category?: string;
	};
}

// Represents a prop passed to a component
export interface ComponentProp {
	name: string;
	value: string; // The value of the prop
	type?: string; // This can remain as is
}

// Represents a single instance of a component being used
export interface ComponentInstance {
	filePath: {
		original: string;
		url: string;
	};
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
	// Total number of usages across all MFEs
	totalUsages: number;
	// Usages by MFE
	usagesByMfe: Record<string, number>;
	// Most common props
	commonProps: {
		name: string;
		count: number;
	}[];
	// Files where the component is used
	files: {
		original: string;
		url: string;
	}[];
	// Customization stats
	customization: {
		styledComponentCount: number;
		customStylesCount: number;
		overriddenPropertiesCounts: Record<string, number>;
	};
	// All instances of the component
	instances: ComponentInstance[];
}

// The final report data
export interface ReportData {
	// When the report was generated
	generatedAt: string;
	// Configuration used for the analysis
	config: AnalysisConfig;
	// MRC version information by MFE
	mrcVersions: Record<string, string>;
	// Stats for each component
	componentStats: ComponentStats[];
	// List of unused components
	unusedComponents: {
		// Component name
		name: string;
		// Component path
		path: string;
	}[];
	// Unused components by MFE
	unusedComponentsByMfe: Record<string, string[]>;
	// Overall stats
	overallStats: {
		// Total number of component usages
		totalUsages: number;
		// Most used components
		mostUsedComponents: {
			name: string;
			count: number;
		}[];
		// Most used props
		mostUsedProps: {
			name: string;
			count: number;
		}[];
		// MFEs with the most component usages
		mfeUsages: Record<string, number>;
		// Total number of unused components
		totalUnusedComponents: number;
	};
	// Raw data for debugging or further analysis
	rawData?: {
		componentUsages: ComponentUsage[];
	};
}
