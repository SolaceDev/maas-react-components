# New Components Report Generator

## Prompt for LLM

Use this prompt with your preferred LLM to automatically generate a report of all new components added to the maas-react-components repository in the last quarter.

```
I need a report on all new React components added to the maas-react-components repository during the last quarter (past 3 months). Please follow these steps:

1. Use the GitHub MCP to get a list of commits from the last quarter:
   - Use the list_commits tool with the SolaceDev/maas-react-components repository
   - Filter for commits since [DATE 3 MONTHS AGO]
   - Look for commits with messages indicating new components

2. For each relevant commit:
   - Get the pull request details using the get_pull_request tool
   - Examine the changed files to identify new components (not enhancements to existing ones)
   - For new components, get the file contents to understand their purpose and props

3. Compile a report with the following sections:

## New Components
For each new component:
- Component name
- File path
- Purpose and functionality
- Props and their types
- PR that introduced it

## Summary
- Total number of new components

If no new components were created in the last quarter, clearly state: "No new components were created in the last quarter."

Please format the report in markdown with proper headings and code blocks for examples.
```

## How to Use This Prompt

1. Open your preferred LLM interface that has access to the GitHub MCP tools
2. Copy and paste the above prompt
3. Replace `[DATE 3 MONTHS AGO]` with the appropriate date (e.g., "2025-04-07" if today is July 7, 2025)
4. Submit the prompt
5. The LLM will generate a report of all new components or indicate that none were created
