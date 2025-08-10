# MRC Usage Report Data

This directory contains usage data for Maas React Components (MRC) categorized by application, MFE, and component.

## Directory Structure

The data is organized in the following hierarchical structure:

```
mrc-usage-report-data/
├── per-application/
|   └── [application-name]/
|       ├── all-components.json
|       ├── total_stats.json
|       └── [mfe-name]/
|           ├── total_stats.json
|           └── [ComponentName]/
|               ├── commonProps.json
|               ├── customization.json
|               ├── files.json
|               ├── instances.json
|               ├── totalUsages.json
|               └── usagesByMfe.json
└── per-component/
    └── [ComponentName]/
        ├── applications.json
        ├── commonProps.json
        ├── customization.json
        ├── totalUsages.json
        └── usagesByMfe.json
```

- `per-application/`: The root directory for all application-specific data.
- `per-component/`: The root directory for all component-specific data, aggregated across all applications.
- `[application-name]/`: A directory for each application that uses MRC components.
- `[mfe-name]/`: A directory for each Micro-Frontend (MFE) within an application.
- `[ComponentName]/`: A directory for each MRC component used in the MFE or aggregated across all applications.

## File Formats

### Application-Level Files

- `all-components.json`: A summary of all components used within the application, including the total number of usages and a list of MFEs that use each component.
- `total_stats.json`: Contains aggregated statistics for the application, such as the total number of components used and the total number of component instances.

### Per-Application Component-Level Files

Each component directory (`[ComponentName]/`) within a `per-application/[application-name]/[mfe-name]/` directory contains the following JSON files:

- `commonProps.json`: Lists the most commonly used props for the component and their frequencies within the MFE.
- `customization.json`: Details how the component has been customized within the MFE, including counts of `styled-component` usages, custom styles, and overridden properties.
- `files.json`: A list of files where the component is used within the MFE.
- `instances.json`: Provides detailed information about each instance of the component within the MFE, including the file path and the specific props used.
- `totalUsages.json`: The total number of times the component is used within the MFE.
- `usagesByMfe.json`: A breakdown of component usage by MFE, including the number of instances in each.

### Per-Component Aggregated Files

Each component directory (`[ComponentName]/`) within the `per-component/` directory contains the following JSON files:

- `applications.json`: A list of applications where the component is used.
- `commonProps.json`: Lists the most commonly used props for the component across all applications.
- `customization.json`: Details how the component has been customized across all applications.
- `totalUsages.json`: The total number of times the component is used across all applications.
- `usagesByApplication.json`: A breakdown of component usage by application.
