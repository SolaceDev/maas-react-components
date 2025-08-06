# DataAggregator

The `DataAggregator` class is responsible for processing the raw component usage data and transforming it into a structured format suitable for generating the final report. It calculates various statistics and metrics based on the collected data.

## `aggregate`

This is the main method of the `DataAggregator` class. It takes the raw usage data, the analysis configuration, a list of all available MRC components, and the MRC version information for each MFE, and returns a comprehensive `ReportData` object.

### Parameters

- `usages`: An array of component usage objects, where each object represents a single instance of a component being used.
- `config`: The `AnalysisConfig` object containing the configuration for the analysis.
- `allComponents`: An array of all available MRC components.
- `mrcVersions`: A record of the MRC version used in each MFE.

### Returns

A `ReportData` object containing the aggregated statistics and data for the report.

### Key Tasks

The `aggregate` method performs the following key tasks:

- **Groups Usages by Component**: It groups all component usage instances by the component name.
- **Generates Component Statistics**: For each component, it calculates:
  - The total number of usages.
  - A breakdown of usages by MFE.
  - The most common props used with the component.
  - A list of all files where the component is used.
  - Statistics on how the component is customized (e.g., using `styled-components`).
- **Calculates Overall Statistics**: It computes overall statistics for the report, including:
  - The total number of component usages across all MFEs.
  - The most frequently used components.
  - The most frequently used props.
  - A summary of component usages per MFE.
- **Identifies Unused Components**: It determines which MRC components are not used in any of the analyzed MFEs, both overall and on a per-MFE basis.
- **Constructs the Final Report Data**: It assembles all the aggregated data into a single `ReportData` object, which is then used to generate the final report.
