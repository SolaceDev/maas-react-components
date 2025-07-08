# New Components Report Generator

## Prompt for LLM

Use this prompt with your preferred LLM to automatically generate a report of all new components added to the maas-react-components repository in the last quarter.

```
I need a report on all new React components added to the maas-react-components repository during the last quarter (past 3 months). The report should be generated in two formats: a markdown file and a corresponding HTML page.

Please follow these steps:

1.  **Gather Data:**
    *   Use the GitHub MCP to get a list of commits from the last quarter for the `SolaceDev/maas-react-components` repository.
    *   Filter for commits since `[DATE 3 MONTHS AGO]`.

2.  **Analyze Commits:**
    *   For each commit, get the pull request details using the `get_pull_request` tool.
    *   Examine the commit message and the changed files to identify the addition of **brand new components**.
    *   Look for keywords like "add", "create", or "introduce" in the commit message, even if they have prefixes like "SOLACEMINOR".
    *   Pay special attention to the creation of new `.tsx` files within the `src/components` directory and its subdirectories, as this is a strong indicator of a new component.
    *   Enhancements or modifications to existing components should be ignored.
    *   For each new component, get the file contents to understand its purpose and props.
    *   If the file for a new component is not available locally, gather the necessary information from the pull request details and commit history.

3.  **Generate Markdown Report:**
    *   Compile a markdown report with the following sections:
        *   **New Components:** For each new component, list its name, file path, purpose, props (and their types), and the PR that introduced it.
        *   **Summary:** A count of the total number of new components.
    *   If no new components were found, the report should state: "No new components were created in the last quarter."

4.  **Generate HTML Report:**
    *   Create a corresponding HTML page that is well-styled and presents the data in a clear, easy-to-read format.
    *   The HTML should mirror the content of the markdown report.
    *   Use tables to present the component details (name, path, purpose, props, PR).
    *   Include CSS within a `<style>` tag to ensure the page is visually appealing.
    *   If no new components were found, the HTML page should display a clear message indicating this.

5.  **Save Files**: Save the markdown report as `prompts/new-components-report/new-components-report.md` and the HTML report as `prompts/new-components-report/new-components-report.html`.

Please provide the content for both the markdown file and the HTML file in separate, clearly labeled code blocks.
```

## How to Use This Prompt

1. Open your preferred LLM interface that has access to the GitHub MCP tools
2. Copy and paste the above prompt.
3. Replace `[DATE 3 MONTHS AGO]` with the appropriate date (e.g., "2025-04-07" if today is July 7, 2025).
4. Submit the prompt.
5. The LLM will generate the content for both a markdown report and an HTML report, or indicate that no new components were created.
