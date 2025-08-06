# MRC Usage Report JSON Splitter

## Overview

This tool splits a merged MRC (Maas React Components) usage report JSON file into a structured hierarchy of individual JSON files. The output is organized into two main directories: `per-component` and `per-application`, providing granular data on component usage.

## Prerequisites

- Node.js
- npm

## Installation

1.  Navigate to the tool's directory:

    ```bash
    cd tools/mrc-usage-report-json-splitter
    ```

2.  Install the required dependencies:
    ```bash
    npm install
    ```

## Build

Before running the tool, you need to compile the TypeScript source code:

```bash
npm run build
```

This will create a `dist` directory containing the compiled JavaScript files.

## Usage

Run the tool using the `npm start` script. You can specify the input and output paths using command-line options.

```bash
npm run start -- [options]
```

### Options

- `-i, --input <path>`: Specifies the path to the merged MRC usage report JSON file.
  - **Default**: `../../merged-mrc-usage-report.json`
- `-o, --output <path>`: Specifies the directory where the split files and folders will be generated. The directory will be cleared before writing new files.
  - **Default**: `output/`

### Examples

- **Using default paths**:

  ```bash
  npm run start
  ```

- **Specifying a custom input file**:

  ```bash
  npm run start -- --input /path/to/your/merged-report.json
  ```

- **Specifying custom input and output paths**:

  ```bash
  npm run start -- --input ./my-report.json --output ./my-output-data
  ```

## Output Structure

The tool generates the following directory structure in the specified output path:

```
<output-directory>/
├── per-application/
│   └── [application-name]/
│       ├── [mfe-name]/
│       │   └── [ComponentName]/
│       │       ├── commonProps.json
│       │       ├── customization.json
│       │       ├── files.json
│       │       ├── instances.json
│       │       └── totalUsages.json
│       └── total_stats.json
└── per-component/
    └── [ComponentName]/
        ├── commonProps.json
        ├── customization.json
        ├── files.json
        ├── instances.json
        ├── totalUsages.json
        └── usagesByMfe.json
```

- **`per-application/`**: Contains data broken down by application and then by Micro-Frontend (MFE).
- **`per-component/`**: Contains aggregated data for each component across all applications and MFEs.
