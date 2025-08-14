# MRC Usage MCP Server

This server provides tools to query MaaS React Component (MRC) usage across our entire codebase. It is a valuable resource for understanding how and where components are used, which can inform decisions about refactoring, deprecation, and overall component library health.

## Use Cases

### Refactoring Components

When a component's API needs to be changed, you can use this server to find all instances of that component. This allows you to understand the impact of the change and update all usages accordingly. For example, you can find all instances of a `SolaceButton` to update a prop that is being renamed.

### Deprecating Props

If you plan to deprecate a prop on a component, you can use this server to find all usages of that prop. This helps ensure that all instances are updated before the prop is removed. For example, you can find all `SolaceCard` components that use a deprecated `shadow` prop.

## Dynamic MFE Discovery

The server now dynamically discovers MFEs and their parent applications from GitHub. This means:

1.  You no longer need to specify the application name when querying MFE information
2.  The `get_components_by_mfe` and `get_mfe_stats` tools now only require the MFE name
3.  New MFEs are automatically discovered without code changes
4.  The `get_mfe_info` tool can be used to look up which application an MFE belongs to
5.  The `list_all_mfes` tool provides a list of all available MFEs across all applications

## Available Tools

- `mrc_analyze_component_usage`: Analyze how MaaS React Components are used across the codebase
- `mrc_get_all_components`: Retrieve a comprehensive list of all MaaS React Components
- `mrc_find_component_dependencies`: Find dependencies and relationships between components
- `mrc_usage_diagnostics`: Get diagnostic information about the MRC usage analysis system
- `get_components_by_application`: Get components used in a specific application
- `get_components_by_mfe`: Get components used in a specific MFE (now only requires MFE name)
- `get_application_stats`: Get usage statistics for a specific application
- `get_mfe_stats`: Get usage statistics for a specific MFE (now only requires MFE name)
- `get_mfe_info`: Get information about an MFE, including which application it belongs to
- `list_all_mfes`: List all available MFEs across all applications

---

## Tool Reference and Sample Prompts

### `get_component_usage_by_application`

**Description:** Get usage for a component in a specific application.

**Sample Prompt:** "For the Solace Button, give me all usages in maas-ui"

**Internal Call:**

```json
{
	"tool": "get_component_usage_by_application",
	"componentName": "SolaceButton",
	"applicationName": "maas-ui"
}
```

### `get_component_usage_by_mfe`

**Description:** Get usage for a component in a specific MFE. You can optionally filter by a prop's presence, or by a prop's name and value.

**Sample Prompt (no filter):** "Get the usage for the Solace Card component in the mc mfe"

**Internal Call (no filter):**

```json
{
	"tool": "get_component_usage_by_mfe",
	"componentName": "SolaceCard",
	"mfeName": "mc"
}
```

### `get_component_usage_all`

**Description:** Get usage for a component across all applications.

**Sample Prompt:** "get the full usage of the Solace Checkbox component across all applications"

**Internal Call:**

```json
{
	"tool": "get_component_usage_all",
	"componentName": "SolaceCheckBox"
}
```

### `get_application_stats`

**Description:** Returns usage statistics for a specified application, including component counts and other metrics.

**Sample Prompt:** "get the component usage for the maas-ops-ui repo"

**Internal Call:**

```json
{
	"tool": "get_application_stats",
	"applicationName": "maas-ops-ui"
}
```

### `get_mfe_stats`

**Description:** Returns usage statistics for a specified Micro-Frontend (MFE), including component counts and other metrics.

**Sample Prompt:** "get the overal componet usage information for the saas mfe"

**Internal Call:**

```json
{
	"tool": "get_mfe_stats",
	"mfeName": "saas"
}
```

## Running Locally

```bash
# Build and run the server
npm run build && node build/index.js
```

## Docker Container

### Building and Pushing to GitHub Container Registry

1.  Build the Docker image:

    ```bash
    # Navigate to the MCP directory
    cd tools/mrc-usage-mcp

    # Build the image
    docker build -t mrc-usage-mcp .
    ```

2.  Tag the image for GitHub Container Registry:

    ```bash
    # Tag the image with the SolaceDev organization
    docker tag mrc-usage-mcp ghcr.io/solacedev/mrc-usage-mcp:latest
    ```

3.  Login to GitHub Container Registry:

    ```bash
    # Login to GitHub Container Registry
    # Replace YOUR_GITHUB_TOKEN with a token that has package write permissions
    echo $GITHUB_TOKEN | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin

    # Alternatively, you can login interactively
    docker login ghcr.io -u YOUR_GITHUB_USERNAME
    ```

4.  Push the image to GitHub Container Registry:

    ```bash
    # Push the image
    docker push ghcr.io/solacedev/mrc-usage-mcp:latest
    ```

5.  Make the package public (if needed):
    After pushing, you may need to go to the GitHub repository settings and make the package public if you want others to be able to use it without authentication.

### Using with Cline

Add the following configuration to your Cline MCP settings file:

```json
"mrc-usage-mcp": {
  "disabled": false,
  "timeout": 60,
  "type": "stdio",
  "command": "docker",
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
