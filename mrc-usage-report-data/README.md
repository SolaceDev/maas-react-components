# MRC Usage Report Data

This directory contains usage data for Maas React Components (MRC) categorized by application, MFE, and component.

## Directory Structure

The data is organized in the following hierarchical structure:

```
mrc-usage-report-data/
└── per-application/
    └── [application-name]/
        ├── total_stats.json
        └── [mfe-name]/
            ├── total_stats.json
            └── [ComponentName]/
                ├── commonProps.json
                ├── customization.json
                ├── files.json
                ├── instances.json
                ├── totalUsages.json
                └── usagesByMfe.json
```

- `per-application/`: The root directory for all application-specific data.
- `[application-name]/`: A directory for each application that uses MRC components.
- `[mfe-name]/`: A directory for each Micro-Frontend (MFE) within an application.
- `[ComponentName]/`: A directory for each MRC component used in the MFE.

## File Formats

### Application-Level Files

- `all-components.json`: A summary of all components used within the application, including the total number of usages and a list of MFEs that use each component.
- `total_stats.json`: Contains aggregated statistics for the application, such as the total number of components used and the total number of component instances.

### Component-Level Files

Each component directory (`[ComponentName]/`) contains the following JSON files:

- `commonProps.json`: Lists the most commonly used props for the component and their frequencies.
- `customization.json`: Details how the component has been customized, including counts of `styled-component` usages, custom styles, and overridden properties.
- `files.json`: A list of files where the component is used.
- `instances.json`: Provides detailed information about each instance of the component, including the file path and the specific props used.
- `totalUsages.json`: The total number of times the component is used within the MFE.
- `usagesByMfe.json`: A breakdown of component usage by MFE, including the number of instances in each.
