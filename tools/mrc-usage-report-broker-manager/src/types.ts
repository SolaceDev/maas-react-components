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

export interface ComponentUsage {
  componentName: string;
  filePath: string;
  mfe: string;
  lineNumber: number;
  props: ComponentProp[];
  customization: {
    styledComponent: boolean;
    customStyles: boolean;
    overriddenProperties: string[];
  };
}

export interface ComponentProp {
  name: string;
  type: string;
  value?: any;
  isFunction?: boolean;
  isJSX?: boolean;
  isSpread?: boolean;
}

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
