# FileScanner

The `FileScanner` class is responsible for scanning the file system to find relevant files for the analysis. It can scan for both the source files within the Micro-Frontends (MFEs) and the Maas React Components (MRC) themselves.

## `scanForFiles`

This asynchronous method scans for all TypeScript and JavaScript files within the specified MFEs. It uses the `find` command to efficiently locate the files while excluding `node_modules`, test files, and type definition files.

### Returns

An array of file paths for all the files found in the MFEs.

## `scanForMrcComponents`

This asynchronous method scans for all MRC components. It can source the components from either a local directory or a GitHub repository, depending on the `mrcSourceType` configuration.

### Parameters

- `mrcPath`: The path to the MRC repository (used for the `local` source type).

### Returns

An array of file paths for all the MRC components found.

### How it Works

- **GitHub Source**: If the `mrcSourceType` is `github`, it uses the GitHub API to fetch the contents of the `src/components` directory in the specified repository. It then filters the files to exclude tests, type definitions, and other non-component files.
- **Local Source**: If the `mrcSourceType` is `local`, it uses the `find` command to locate all component files in the `src/components` directory of the local MRC repository. It applies the same filtering logic as the GitHub source.

## `getMrcComponentInfo`

This asynchronous method retrieves information about the MRC components, including their exported names and file paths. It uses the `getExportMappings` method to understand how components are exported from the main `index.tsx` file.

### Parameters

- `componentFiles`: An array of file paths for the MRC components.
- `mrcPath`: The path to the MRC repository.

### Returns

An array of objects, where each object contains the `name` and `path` of an MRC component.

## `getExportMappings`

This private asynchronous method extracts the export mappings from the `index.tsx` file of the MRC repository. It uses a regular expression to parse the `export` statements and create a map of the exported component names to their relative file paths.

### Parameters

- `mrcPath`: The path to the MRC repository.

### Returns

A `Map` where the keys are the exported component names and the values are their relative file paths.
