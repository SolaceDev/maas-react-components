# MRC Usage MCP Server

This server provides tools to query MaaS React Component (MRC) usage across our entire codebase. It is a valuable resource for understanding how and where components are used, which can inform decisions about refactoring, deprecation, and overall component library health.

## Use Cases

### Refactoring Components

When a component's API needs to be changed, you can use this server to find all instances of that component. This allows you to understand the impact of the change and update all usages accordingly. For example, you can find all instances of a `SolaceButton` to update a prop that is being renamed.

### Deprecating Props

If you plan to deprecate a prop on a component, you can use this server to find all usages of that prop. This helps ensure that all instances are updated before the prop is removed. For example, you can find all `SolaceCard` components that use a deprecated `shadow` prop.

### Prerequisites

- **GitHub PAT Token**: A GitHub Personal Access Token with `repo` and `package` scope is required. You can create one by following [this guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).
- **Podman**: The Podman engine must be installed, open, and running.
- **Podman Login**: You must be logged into `ghcr.io` using your GitHub username and PAT token.
  ```bash
  podman login ghcr.io -u YOUR_GITHUB_USERNAME -p YOUR_GITHUB_PAT
  ```
- **AI Coding Assistant**: An AI coding assistant (e.g., Cline) is recommended for interacting with the server.

### Using with Cline

Add the following configuration to your Cline MCP settings file:

```json
"mrc-usage-mcp": {
  "disabled": false,
  "timeout": 60,
  "type": "stdio",
  "command": "podman",
  "args": [
    "run",
    "-i",
    "--rm",
    "-e",
    "GITHUB_PERSONAL_ACCESS_TOKEN",
    "ghcr.io/solacedev/mrc-usage-mcp:latest"
  ],
  "env": {
    "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_GITHUB_TOKEN"
  }
}
```

After adding the configuration, reload the VS Code window by opening the command palette (`Cmd+Shift+P` or `Ctrl+Shift+P`) and typing `>Reload Window`.

## Usage Tips

Start all prompts to this MCP with "Using the mrc-usage-mcp" for consistency

## Available Tools

- `get_component_usage`: Get usage for a component. Can be scoped to a specific application or MFE.
- `get_usage_stats`: Get usage statistics for an application or MFE.
- `list_all_tools`: Returns a list of all available tools in the MCP server.
- `list_applications_and_mfes`: Returns a list of all applications and their associated Micro-Frontends (MFEs).

---

## Tool Reference and Sample Prompts

### `get_component_usage`

**Description:** Get usage for a component. Can be scoped to a specific application or MFE.

**Sample Prompt (All Applications):** "Get all usages of the SolaceButton"

**Internal Call:**

```json
{
	"tool": "get_component_usage",
	"componentName": "SolaceButton"
}
```

**Sample Prompt (Scoped to Application):** "Get all usages of SolaceButton in maas-ui"

**Internal Call:**

```json
{
	"tool": "get_component_usage",
	"componentName": "SolaceButton",
	"applicationOrMfeName": "maas-ui"
}
```

### `get_usage_stats`

**Description:** Get usage statistics for an application or MFE.

**Sample Prompt (Application):** "Get usage stats for maas-ui"

**Internal Call:**

```json
{
	"tool": "get_usage_stats",
	"applicationOrMfeName": "maas-ui"
}
```

### `list_all_tools`

**Description:** Returns a list of all available tools in the MCP server.

**Sample Prompt:** "list all available tools"

**Internal Call:**

```json
{
	"tool": "list_all_tools"
}
```

### `list_applications_and_mfes`

**Description:** Returns a list of all applications and their associated Micro-Frontends (MFEs).

**Sample Prompt:** "list all applications and mfes"

**Internal Call:**

```json
{
	"tool": "list_applications_and_mfes"
}
```

## Running Locally

```bash
# Build and run the server
npm run build && node build/index.js
```

## Podman Container

### Building and Pushing to GitHub Container Registry

1.  Build the Podman image:

    ```bash
    # Navigate to the MCP directory
    cd tools/mrc-usage-mcp

    # Build the image
    podman build -t mrc-usage-mcp .
    ```

2.  Tag the image for GitHub Container Registry:

    ```bash
    # Tag the image with the SolaceDev organization
    podman tag mrc-usage-mcp ghcr.io/solacedev/mrc-usage-mcp:latest
    ```

3.  Login to GitHub Container Registry:

    ```bash
    # Login to GitHub Container Registry
    # Replace YOUR_GITHUB_TOKEN with a token that has package write permissions
    echo $GITHUB_TOKEN | podman login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin

    # Alternatively, you can login interactively
    podman login ghcr.io -u YOUR_GITHUB_USERNAME
    ```

4.  Push the image to GitHub Container Registry:

    ```bash
    # Push the image
    podman push ghcr.io/solacedev/mrc-usage-mcp:latest
    ```

5.  Make the package public (if needed):
    After pushing, you may need to go to the GitHub repository settings and make the package public if you want others to be able to use it without authentication.
