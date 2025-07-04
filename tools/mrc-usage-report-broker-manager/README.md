# MRC Usage Report

A tool to analyze and report on the usage of MRC (maas-react-components) components across different micro-frontends.

## Features

- Scans TypeScript/JavaScript files for MRC component usage
- Analyzes how components are used (props, customization, etc.)
- Identifies unused components (globally and per MFE)
- Detects components that are imported but not directly used as JSX elements
- Generates detailed HTML reports with interactive charts
- Configurable to analyze specific MFEs
- Supports different output formats (HTML, JSON, YAML)
- Includes trend analysis to track component usage changes over time
- Can be run as a GitHub Action with automatic GitHub Pages deployment

## Installation

1. Navigate to the tool directory:

```bash
cd tools/mrc-usage-report
```

2. Install dependencies:

```bash
npm install
```

3. Build the tool:

```bash
npm run build
```

## Usage

Run the tool with default settings:

```bash
npm start
```

This will analyze all MFEs (except api-products) and generate an HTML report in the `./reports` directory.

### Command Line Options

You can customize the behavior with the following options:

```
Options:
  -o, --output <path>        Output directory for the report (default: "./reports")
  -f, --format <format>      Output format (html, json, yaml, csv) (default: "html")
  -m, --mfes <mfes>          Comma-separated list of MFEs to analyze (default: "ep,intg,mc,saas")
  --mfe-paths <paths>        JSON string mapping MFE names to their repository paths (default: "{}")
  -r, --mrc-path <path>      Path to the MRC repository (default: "../../maas-react-components")
  -b, --base-path <path>     Base path for the project (default: current working directory)
  -s, --source <type>        Source type for MRC components (local or github) (default: "local")
  -g, --github               Use GitHub as the source for MRC components (shorthand for -s github)
  --github-url <url>         GitHub repository URL for MRC components (default: "https://github.com/SolaceDev/maas-react-components")
  --github-branch <branch>   Branch name for GitHub repository (default: "main")
  -h, --help                 Display help for command
  -V, --version              Output the version number
```

### Examples

Analyze only the 'ep' and 'saas' MFEs:

```bash
npm start -- -m ep,saas
```

Generate a JSON or YAML report:

```bash
# JSON format
npm start -- -f json

# YAML format
npm start -- -f yaml
```

Specify custom paths:

```bash
npm start -- -b /path/to/project -r /path/to/mrc -o /path/to/output
```

Use GitHub as the source for MRC components:

```bash
# Using the -g flag (shorthand)
GITHUB_TOKEN=your_github_token npm start -- -g

# Or using the --source option
GITHUB_TOKEN=your_github_token npm start -- -s github

# Optionally specify a different GitHub repository URL
GITHUB_TOKEN=your_github_token npm start -- -g --github-url https://github.com/your-org/your-repo

# Optionally specify a different branch name
GITHUB_TOKEN=your_github_token npm start -- -g --github-branch develop
```

This is particularly useful in CI/CD environments or GitHub Actions where you don't want to clone the repository manually.

**Note:** If the MRC repository is private, you need to provide a GitHub personal access token with the `repo` scope via the `GITHUB_TOKEN` environment variable. This token is used to authenticate with the GitHub API.

## Report Structure

The HTML report includes:

- Summary statistics (total usages, MFEs analyzed, unique components, unused components)
- Interactive charts showing component usage distribution
- Detailed breakdown of each component's usage
- Analysis of props used with each component
- Information about customization and styling overrides
- File references where components are used
- List of unused components (not used in any MFE)
- Per-MFE analysis of unused components (components used in some MFEs but not others)
- MRC version information for each MFE

## Component Usage Detection

The tool detects component usage in two ways:

1.  **Direct JSX Usage:** When a component is used directly in JSX elements within a file.
2.  **Import-Only Usage:** When a component is imported from the MRC library but not directly used as a JSX element in the same file. This accounts for components that might be:
    - Used conditionally in code paths
    - Passed as props to other components
    - Imported for future use or as a precaution
    - Used in ways other than direct JSX elements

## Development

### Project Structure

- `src/index.ts` - Main entry point
- `src/types.ts` - TypeScript interfaces
- `src/scanner/` - File scanning functionality
- `src/parser/` - Code parsing and analysis
- `src/aggregator/` - Data aggregation and statistics
- `src/reporter/` - Report generation

### Adding New Features

To add support for a new output format:

1.  Update the `outputFormat` type in `src/types.ts`
2.  Add a new reporter class in `src/reporter/`
3.  Update the report generation logic in `src/index.ts`

### GitHub Action Integration

This tool can be run automatically as a GitHub Action. A workflow file is included at `.github/workflows/mrc-usage-report.yml` that:

1.  Runs on every push to the main branch (and can be triggered manually)
2.  Generates both HTML and JSON reports
3.  Creates a trend analysis comparing the current report with previous ones
4.  Publishes the reports to GitHub Pages

### Setting Up GitHub Pages Deployment

To enable the GitHub Pages deployment:

1.  Go to your repository settings
2.  Navigate to "Pages" in the sidebar
3.  Under "Build and deployment", select "GitHub Actions" as the source
4.  The reports will be available at `https://[username].github.io/[repo-name]/mrc-usage-report/`

### Testing Locally

To test the report generation and trend analysis locally:

```bash
# Navigate to the tool directory
cd tools/mrc-usage-report

# Build the tool
npm run build

# Generate the HTML report with correct base path
npm start -- -g -f html -o ./reports -b /path/to/repository/root

# Generate the JSON report with correct base path
npm start -- -g -f json -o ./reports -b /path/to/repository/root

# Run the trend analysis script
node ./scripts/trend-analyzer.js
```

Note: The `-b` parameter is crucial as it tells the tool where to look for the MFEs to analyze. Without it, the tool will use the current directory as the base path, which may not contain any MFEs to analyze.

### Trend Analysis

The trend analysis feature tracks changes in component usage over time:

- On the first run, it creates a baseline report
- On subsequent runs, it compares the current report with the previous one
- The analysis shows:
  - New components added
  - Components removed
  - Components with significant usage changes
  - Overall statistics changes

The trend report is set as the landing page, with a link to the detailed component usage report.

## License

ISC
