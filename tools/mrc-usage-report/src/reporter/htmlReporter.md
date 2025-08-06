# HtmlReporter

The `HtmlReporter` class is responsible for generating an interactive HTML report from the aggregated component usage data. The report is designed to be user-friendly and provide a clear visualization of the data.

## `generateReport`

This asynchronous method is the main entry point for generating the HTML report. It takes the `ReportData` and the desired output path, generates the HTML content, and writes it to a file.

### Parameters

- `reportData`: The `ReportData` object containing all the aggregated data and statistics.
- `outputPath`: The file path where the HTML report will be saved.

## `generateHtml`

This private method generates the HTML content for the report. It uses a template string to create the structure of the HTML document and injects the data from the `ReportData` object.

### Key Features of the HTML Report

- **Interactive Tabs**: The report is organized into tabs for "Components," "MFEs," and "Unused Components," making it easy to navigate between different sections.
- **Data Visualization**: It uses the D3.js library to create bar charts that visualize the most used components and the component usage by MFE.
- **Search and Filter**: The report includes search inputs to filter the component list by component name, prop name, and prop value.
- **Collapsible Sections**: The details for each component are presented in collapsible sections, allowing users to expand and view more information as needed.
- **Clickable Links**: File paths are converted into clickable GitHub URLs, providing direct access to the source code.
- **Downloadable JSON**: A "Download JSON" button is included to allow users to download the raw `ReportData` for further analysis.
- **Responsive Design**: The report is designed to be responsive and work well on different screen sizes.

### Report Structure

The generated HTML report includes the following sections:

- **Header**: Displays the report title, generation date, and the "Download JSON" button.
- **Summary**: Provides a high-level overview of the key metrics, such as total component usages, number of MFEs analyzed, and the number of unused components.
- **Overview**: Contains the main content of the report, organized into tabs:
  - **Components Tab**: Shows a chart of the most used components and a detailed list of all components with their usage statistics.
  - **MFEs Tab**: Displays a chart of component usage by MFE and a table with more detailed information about each MFE.
  - **Unused Components Tab**: Lists all the MRC components that were not used in any of the analyzed MFEs.
- **Footer**: Contains information about when the report was generated.
