# MRC Usage Report

This tool generates a comprehensive usage report for MaaS React Components (MRC) across multiple applications with micro-frontends

## Overview

The MRC Usage Report tool is a command-line utility that scans specified application codebases to identify how and where `maas-react-components` are being used. It helps answer questions like:

- Which MRC components are used in a specific application or MFE?
- How many times is a particular component used?
- What props are being passed to each component instance?
- Which components are not being used at all?
- What version of MRC is each MFE using?

This information is crucial for maintaining the component library, understanding the impact of changes, planning deprecations, and ensuring consistency across different applications.

## How It Works

The tool performs the following steps:

1.  **Discover MFEs**: It identifies the MFEs to be analyzed based on the provided paths.
2.  **Scan Files**: It scans the source code of the target MFEs for relevant files (`.ts`, `.tsx`).
3.  **Parse Components**: It parses the files to find instances of MRC component usage and extracts information about props.
4.  **Aggregate Data**: It aggregates the collected data to create a comprehensive overview of component usage statistics.
5.  **Generate Report**: It generates a report in various formats (HTML, JSON, YAML, CSV) summarizing the findings.

## Usage

### Prerequisites

Ensure you have Node.js installed and have run `npm install` in the `maas-react-components` repository.

### Running Locally

To run the report generator locally, follow these steps:

1.  **Navigate to the tool's directory:**

    ```bash
    cd tools/mrc-usage-report
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Build the tool:**

    ```bash
    npm run build
    ```

4.  **Run the report generator with the desired options:**
    ```bash
    npm start -- --all \
      --maas-ui-path ../../../maas-ui \
      --maas-ops-ui-path ../../../maas-ops-ui \
      --broker-manager-path ../../../broker-manager \
      -f json
    ```

### Local Directory Structure Example

For the local scanner to work correctly, your directory structure should be set up as follows. The `maas-react-components`, `maas-ui`, `maas-ops-ui`, and `broker-manager` repositories should be siblings in the same parent directory.

```
/path/to/your/projects/
├── maas-react-components/
│   └── tools/
│       └── mrc-usage-report/  <-- You are here
├── maas-ui/
├── maas-ops-ui/
└── broker-manager/
```

### Scannable Applications

The tool is configured to scan the following applications and their micro-frontends:

- **maas-ui**: Scans all MFEs found within the `micro-frontends` directory.
- **maas-ops-ui**: Scans all MFEs found within the `micro-frontends` directory.
- **broker-manager**: Scanned as a single application.

When using the `--all` flag, the tool will automatically discover and analyze all the MFEs within these applications.

### Command-Line Options

For a typical local run, you will primarily use the following options. The tool provides sensible defaults for other parameters.

| Option                         | Alias | Description                                                          | Default                |
| ------------------------------ | ----- | -------------------------------------------------------------------- | ---------------------- |
| `--all`                        |       | Scan all MFEs across `maas-ui`, `maas-ops-ui`, and `broker-manager`. | `false`                |
| `--mfes <mfes>`                | `-m`  | Comma-separated list of specific MFEs to analyze.                    |                        |
| `--output <path>`              | `-o`  | Output directory for the report.                                     | `./reports`            |
| `--format <format...>`         | `-f`  | Output format(s). Supported: `html`, `json`, `yaml`, `csv`.          | `html`                 |
| `--maas-ui-path <path>`        |       | Path to the `maas-ui` repository.                                    | `../../maas-ui`        |
| `--maas-ops-ui-path <path>`    |       | Path to the `maas-ops-ui` repository.                                | `../../maas-ops-ui`    |
| `--broker-manager-path <path>` |       | Path to the `broker-manager` repository.                             | `../../broker-manager` |
| `--help`                       |       | Display help for all available commands.                             |                        |

## GitHub Actions Workflow

The MRC Usage Report is automatically generated and updated via a sophisticated GitHub Actions workflow setup that ensures reliability and development flexibility.

### Architecture: Scheduler and Worker

The system uses a two-workflow (master-slave) architecture:

1.  **Scheduler Workflow (`mrc-usage-report-scheduler.yml`)**

    - **Purpose**: This workflow acts as a simple, reliable timer. Its sole responsibility is to trigger the main worker workflow on a schedule.
    - **Trigger**: It runs daily at 8 AM EST (12 PM UTC) based on a `cron` schedule. It can also be triggered manually.
    - **Constraint**: GitHub requires scheduled workflows to exist on the default branch (`main`) to run reliably. This scheduler meets that requirement.

2.  **Worker Workflow (`mrc-usage-report-worker.yml`)**
    - **Purpose**: This is the main workflow that contains all the logic for checking out the required repositories, running the report generation script, and committing the updated data.
    - **Trigger**: It is triggered by the Scheduler workflow via a `workflow_dispatch` event. It is designed to run on a specific feature branch (`feature/mrc-usage-report-data`).

### Why this Architecture?

This separation allows for continuous development and testing of the report generation logic on the `feature/mrc-usage-report-data` branch without impacting the stability of the `main` branch. The scheduler on `main` remains untouched and reliably triggers the worker, which always uses the latest code from the feature branch.

A key reason for this design is to **allow the workflow to autonomously commit its generated data back to the repository**. By operating on a feature branch, the workflow can push updates without needing a pull request or manual approval, ensuring the report data is always up-to-date.

### How It Works

1.  The **Scheduler** workflow runs automatically every day at 12 PM UTC.
2.  It checks out the `feature/mrc-usage-report-data` branch.
3.  It then triggers the **Worker** workflow, instructing it to run using the code from that same feature branch.
4.  The **Worker** workflow executes, generates the report data, and commits it back to the `feature/mrc-usage-report-data` branch.

### Workflow Outputs

When the workflow completes, it produces two primary outputs:

1.  **Committed Data**: The raw JSON data is automatically committed and pushed to the `mrc-usage-report-data` directory in the `feature/mrc-usage-report-data` branch. This provides a persistent, version-controlled history of component usage.
2.  **Downloadable Artifacts**: The generated HTML and JSON reports are uploaded as a downloadable artifact named `merged-reports`. You can find this artifact on the summary page of the workflow run. This allows for easy access to the human-readable reports without needing to check out the repository.

### Manual Trigger

You can manually trigger the report generation at any time. This is useful for testing changes or forcing an update outside of the scheduled run. Here are the different ways to do it:

**1. Triggering the Scheduler from `main` (Standard Manual Run)**

This command simulates the scheduled run. It triggers the Scheduler workflow from the `main` branch, which in turn will trigger the Worker workflow on the `feature/mrc-usage-report-data` branch.

```bash
gh workflow run "MRC Usage Report - Scheduler" --ref main
```

**2. Triggering the Scheduler from the feature branch**

This is less common. It runs the Scheduler workflow using the code from the feature branch. This is useful for testing changes to the scheduler workflow itself before merging to main.

```bash
gh workflow run "MRC Usage Report - Scheduler" --ref feature/mrc-usage-report-data
```

**3. Triggering the Worker Directly (Most Common for Development)**

This command bypasses the scheduler and triggers the report generation worker directly. This is the most direct way to test the reporting logic.

```bash
gh workflow run "MRC Usage Report Generation" --ref feature/mrc-usage-report-data
```

- **`gh workflow run "..."`**: This command initiates a run of the specified workflow.
- **`--ref <branch>`**: This is a crucial parameter that tells GitHub Actions to use the version of the workflow file that exists on the specified branch. This ensures that you are always running the correct version of the logic.

## References

- [maas-ui MRC Usage Report Tool](https://github.com/SolaceDev/maas-ui/tree/sthomas/mrc-usage-report/tools/mrc-usage-report)
