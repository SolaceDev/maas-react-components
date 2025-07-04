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

// Represents a usage of an MRC component in a file
export interface ComponentUsage {
	// The name of the component (e.g., SolaceButton)
	componentName: string;
	// The file where the component is used
	filePath: string;
	// The MFE where the component is used
	mfe: string;
	// The line number where the component is used
	lineNumber: number;
	// The props passed to the component
	props: ComponentProp[];
	// Any custom styling or overrides applied to the component
	customization?: {
		// If the component is wrapped in a styled component
		styledComponent?: boolean;
		// If the component has custom styles applied
		customStyles?: boolean;
		// The CSS properties that are overridden
		overriddenProperties?: string[];
	};
}

// Represents a prop passed to a component
export interface ComponentProp {
	name: string;
	// The type of the prop value (string, number, boolean, object, function, etc.)
	type: string;
	// The actual value of the prop (if it's a literal)
	value?: any;
	// If the prop is a spread operator
	isSpread?: boolean;
	// If the prop is a function
	isFunction?: boolean;
	// If the prop is a JSX element
	isJSX?: boolean;
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
	files: string[];
	// Customization stats
	customization: {
		styledComponentCount: number;
		customStylesCount: number;
		overriddenPropertiesCounts: Record<string, number>;
	};
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
