# `mrc-usage-report` CLI Tool

This script is the main entry point for the `mrc-usage-report` command-line interface (CLI) tool. It is responsible for generating a report on the usage of Maas React Components (MRC) across various Micro-Frontends (MFEs).

## Overview

The tool works by scanning specified MFEs, parsing their files to identify which MRC components are used, and then generating a report in various formats (HTML, JSON, YAML, or CSV).

## Key Features

- **CLI Interface**: Uses the `commander` library to provide a user-friendly command-line interface with options to customize the report generation.
- **MFE Discovery**: Automatically discovers MFEs from `maas-ui`, `maas-ops-ui`, and `broker-manager` repositories, or allows specifying a custom list of MFEs.
- **Component Scanning**: Scans for both local and remote (GitHub) MRC components.
- **Usage Parsing**: Parses source files to detect how and where MRC components are used.
- **Version Detection**: Identifies the version of `@SolaceDev/maas-react-components` used in each MFE by inspecting its `package.json` file.
- **Data Aggregation**: Consolidates all collected data into a comprehensive report.
- **Multiple Report Formats**: Generates reports in HTML, JSON, YAML, and CSV formats.

## Tasks

The script follows these steps to generate the report:

1.  **Parse CLI Options**: It starts by parsing the command-line arguments provided by the user.
2.  **Discover MFEs**: Based on the options, it identifies the MFEs to be analyzed.
3.  **Scan for Files**: The `FileScanner` is used to locate all relevant files within the specified MFEs.
4.  **Scan for MRC Components**: The `FileScanner` also identifies all available MRC components.
5.  **Parse for Component Usage**: The `ComponentParser` analyzes the files to find instances of MRC component usage.
6.  **Detect MRC Versions**: It determines the version of the MRC package for each MFE.
7.  **Aggregate Data**: The `DataAggregator` compiles all the information into a structured format.
8.  **Generate Report**: Finally, it generates the report in the user-specified format(s). The `HtmlReporter` is used for creating the HTML version of the report.
