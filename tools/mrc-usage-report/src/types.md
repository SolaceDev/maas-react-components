# Type Definitions for MRC Usage Report

This file defines the TypeScript types and interfaces used throughout the `mrc-usage-report` tool. These types ensure data consistency and provide clear data structures for the different parts of the application.

## `MrcSourceType`

A string literal type that specifies the source of the MRC components.

- `"local"`: The components are sourced from a local directory.
- `"github"`: The components are sourced from a GitHub repository.

## Interfaces

### `AnalysisConfig`

This interface defines the configuration options for the analysis process.

- `mfes`: An array of strings representing the Micro-Frontends (MFEs) to be analyzed.
- `mrcPath`: The file path to the Maas React Components (MRC) repository.
- `outputDir`: The directory where the generated report will be saved.
- `outputFormat`: The desired format for the report (`html`, `json`, `yaml`, or `csv`).
- `mrcSourceType`: The source type for the MRC components (`local` or `github`).
- `mrcGithubUrl` (optional): The URL of the MRC GitHub repository.
- `mrcGithubBranch` (optional): The branch of the MRC GitHub repository to use.
- `mfeInfos`: An array of `MfeInfo` objects, providing details about each MFE.

### `MfeInfo`

Provides detailed information about a single MFE.

- `name`: The name of the MFE.
- `path`: The file path to the MFE's source code.
- `repository`: The name of the repository where the MFE is located.

### `MrcComponent`

Represents a component from the MRC library.

- `name`: The name of the component.
- `path`: The file path to the component's source code.
- `metadata` (optional): Additional information about the component, such as its `description` and `category`.

### `ComponentProp`

Represents a prop passed to a component instance.

- `name`: The name of the prop.
- `value`: The value assigned to the prop.
- `type` (optional): The type of the prop's value.

### `ComponentInstance`

Represents a single usage of a component within a file.

- `filePath`: The path to the file where the component is used.
- `line`: The line number where the component is instantiated.
- `props`: An array of `ComponentProp` objects representing the props passed to the component.

### `ComponentUsage`

Aggregates usage data for a single component.

- `component`: The name of the component.
- `count`: The total number of times the component is used.
- `instances`: An array of `ComponentInstance` objects.

### `ComponentStats`

Provides detailed statistics for a single component's usage.

- `componentName`: The name of the component.
- `totalUsages`: The total number of times the component is used across all MFEs.
- `usagesByMfe`: A record of how many times the component is used in each MFE.
- `commonProps`: A list of the most commonly used props for the component.
- `files`: A list of files where the component is used.
- `customization`: Statistics on how the component is customized (e.g., with `styled-components`).
- `instances`: All instances of the component's usage.

### `ReportData`

The main data structure for the final report.

- `generatedAt`: The timestamp of when the report was generated.
- `config`: The `AnalysisConfig` used for the report.
- `mrcVersions`: The version of the MRC package used in each MFE.
- `componentStats`: An array of `ComponentStats` for each component.
- `unusedComponents`: A list of MRC components that are not used in any of the analyzed MFEs.
- `unusedComponentsByMfe`: A record of unused components per MFE.
- `overallStats`: High-level statistics, including the most used components and props.
- `rawData` (optional): The raw `ComponentUsage` data for debugging or further analysis.
