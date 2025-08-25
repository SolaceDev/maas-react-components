# MRC Usage Report

## Overview

The MRC Usage Report is a command-line tool that analyzes the usage of MaaS React Components (MRC) across multiple Micro-Frontends (MFEs). It scans the codebase, identifies which components are being used, and generates a report in various formats. This tool is essential for understanding component adoption, identifying unused components, and maintaining a healthy design system.

## Features

- **Component Usage Analysis**: Scans files to identify how and where MRC components are used.
- **MFE Discovery**: Automatically discovers MFEs within specified application repositories.
- **Multiple Output Formats**: Generates reports in HTML, JSON, and YAML formats.
- **Flexible Configuration**: Allows specifying target MFEs, repository paths, and report output locations.
- **Local and GitHub Sources**: Can analyze components from a local repository or directly from GitHub.
- **Version Detection**: Detects the version of `@SolaceDev/maas-react-components` used in each MFE.

## Installation

To install the tool's dependencies, run the following command in the `tools/mrc-usage-report` directory:

```bash
npm install
```

## Usage

You can run the tool using `ts-node` for development or by building it first and running the compiled JavaScript.

### Development

```bash
npx ts-node src/index.ts [options]
```

### Production

First, build the tool:

```bash
npm run build
```

Then, run the compiled output:

```bash
node dist/index.js [options]
```

### Command-Line Arguments

| Option                         | Description                                                          | Default                                              |
| ------------------------------ | -------------------------------------------------------------------- | ---------------------------------------------------- |
| `-o, --output <path>`          | Output directory for the report.                                     | `./reports`                                          |
| `-f, --format <format...>`     | Output format (html, json, yaml, csv).                               | `html`                                               |
| `-m, --mfes <mfes>`            | Comma-separated list of MFEs to analyze.                             |                                                      |
| `--all`                        | Scan all MFEs across `maas-ui`, `maas-ops-ui`, and `broker-manager`. |                                                      |
| `--mrc-path <path>`            | Path to the `maas-react-components` repository.                      | `path.resolve(process.cwd(), "../..")`               |
| `--maas-ui-path <path>`        | Path to the `maas-ui` repository.                                    | `../../maas-ui`                                      |
| `--maas-ops-ui-path <path>`    | Path to the `maas-ops-ui` repository.                                | `../../maas-ops-ui`                                  |
| `--broker-manager-path <path>` | Path to the `broker-manager` repository.                             | `../../broker-manager`                               |
| `--base-path <path>`           | Base path for the project.                                           | `process.cwd()`                                      |
| `-s, --source <type>`          | Source type for MRC components (local or github).                    | `local`                                              |
| `-g, --github`                 | Use GitHub as the source for MRC components.                         |                                                      |
| `--github-url <url>`           | GitHub repository URL for MRC components.                            | `https://github.com/SolaceDev/maas-react-components` |
| `--github-branch <branch>`     | Branch name for GitHub repository.                                   | `main`                                               |

## GitHub Workflow Commands

```bash
gh workflow run "MRC Usage Report - Scheduler" --ref iphadte/DATAGO-108450-MRC-Usage-Report-Workflow-Scheduler

gh workflow run "MRC Usage Report - Scheduler"  --ref feature/mrc-usage-report-data

gh workflow run "MRC Usage Report Generation" --ref feature/mrc-usage-report-data
```

## Output

The tool generates a report in the specified format(s) in the output directory.

- **HTML**: An interactive report that can be viewed in a web browser.
- **JSON**: A machine-readable format containing detailed usage data.
- **YAML**: A human-readable format that is easy to inspect.
- **CSV**: (Not yet implemented) A tabular format suitable for spreadsheets.

The report includes statistics on component usage, a list of unused components, and the MRC version detected in each MFE.
