# MRC Usage MCP Server

This server provides tools to query MRC component usage.

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

## Dynamic MFE Discovery

The server now dynamically discovers MFEs and their parent applications from GitHub. This means:

1. You no longer need to specify the application name when querying MFE information
2. The `get_components_by_mfe` and `get_mfe_stats` tools now only require the MFE name
3. New MFEs are automatically discovered without code changes
4. The `get_mfe_info` tool can be used to look up which application an MFE belongs to
5. The `list_all_mfes` tool provides a list of all available MFEs across all applications

## Running Locally

```bash
# Build and run the server
npm run build && node build/index.js
```

## Docker Container

### Building and Pushing to GitHub Container Registry

1. Build the Docker image:

```bash
# Navigate to the MCP directory
cd tools/mrc-usage-mcp

# Build the image
docker build -t mrc-usage-mcp .
```

2. Tag the image for GitHub Container Registry:

```bash
# Tag the image with the SolaceDev organization
docker tag mrc-usage-mcp ghcr.io/solacedev/mrc-usage-mcp:latest
```

3. Login to GitHub Container Registry:

```bash
# Login to GitHub Container Registry
# Replace YOUR_GITHUB_TOKEN with a token that has package write permissions
echo $GITHUB_TOKEN | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin

# Alternatively, you can login interactively
docker login ghcr.io -u YOUR_GITHUB_USERNAME
```

4. Push the image to GitHub Container Registry:

```bash
# Push the image
docker push ghcr.io/solacedev/mrc-usage-mcp:latest
```

5. Make the package public (if needed):
   After pushing, you may need to go to the GitHub repository settings and make the package public if you want others to be able to use it without authentication.

### Using with Cline

Add the following configuration to your Cline MCP settings file:

```json
"mrc-usage-ghcr": {
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

## Known Issues

### File Access in Container

Some tools (`getApplicationStats.ts` and `getMfeStats.ts`) are currently implemented to read data from the local filesystem:

- `getApplicationStats.ts` uses: `path.join(process.cwd(), "mrc-usage-report-data", ...)`
- `getMfeStats.ts` uses: `path.join(process.cwd(), "../../", "mrc-usage-report-data", ...)`

This inconsistency causes issues when running in a container. To fix this:

1. Modify these files to fetch data from GitHub API instead of local filesystem
2. Or mount the data directory when running the container:
   ```bash
   docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN -v /path/to/mrc-usage-report-data:/app/mrc-usage-report-data ghcr.io/solacedev/mrc-usage-mcp:latest
   ```

### Path Resolution

The inconsistent path resolution between different tools needs to be fixed:

- `getApplicationStats.ts` looks for data in the current working directory
- `getMfeStats.ts` goes up two levels to reach the project root

This should be standardized to ensure consistent behavior across all tools.
