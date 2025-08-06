# Utility Functions

This file contains utility functions that are used across the `mrc-usage-report` tool.

##### `transformFilePath(filePath: string): { url: string }`

This function transforms a local file path into a clickable GitHub URL. This is useful for generating links in the final report that point directly to the source code on GitHub.

### Parameters

- `filePath`: The local file path to be transformed.

### Returns

An object containing the `url` of the transformed file path. If the path cannot be transformed, it returns the original file path.

### How it Works

The function checks for the presence of `maas-ui`, `maas-ops-ui`, or `broker-manager` in the file path to determine the correct repository and branch. It then constructs the GitHub URL using the base URL `https://github.com/SolaceDev/`.

- If the path contains `maas-ui`, it uses the `develop` branch.
- If the path contains `maas-ops-ui`, it uses the `develop` branch.
- If the path contains `broker-manager`, it uses the `main` branch.

If the provided `filePath` is already a GitHub URL, the function returns it as is. If the repository cannot be determined, a warning is logged, and the original path is returned.
