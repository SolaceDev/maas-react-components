# ComponentParser

The `ComponentParser` class is responsible for parsing source files to identify and extract information about the usage of Maas React Components (MRC). It uses the `@babel/parser` and `@babel/traverse` libraries to analyze the Abstract Syntax Tree (AST) of each file.

## `initialize`

This asynchronous method initializes the parser by loading the names of all available MRC components. It creates a mapping between the exported component names and their corresponding file names to handle cases where components are imported using a different name.

### Parameters

- `componentInfo`: An array of objects, where each object contains the `name` and `path` of an MRC component.

## `parseFile`

This asynchronous method parses a single file to find all instances of MRC component usage. It reads the file content, generates an AST, and then traverses the tree to find relevant information.

### Parameters

- `filePath`: The path to the file to be parsed.
- `mfe`: The name of the Micro-Frontend (MFE) that the file belongs to.

### Returns

An array of `FoundComponentInstance` objects, where each object represents a single usage of an MRC component.

### How it Works

The `parseFile` method performs the following steps:

1.  **Reads the File**: It reads the content of the specified file.
2.  **Generates AST**: It uses `@babel/parser` to create an AST from the file content. It automatically handles both TypeScript and JSX syntax.
3.  **Finds Imports**: It traverses the AST to find `ImportDeclaration` nodes that import from `@SolaceDev/maas-react-components`. It records the imported components and their local names.
4.  **Finds JSX Usages**: It looks for `JSXOpeningElement` nodes to identify where the imported MRC components are used.
5.  **Extracts Props**: For each component usage, it extracts the props that are passed to it, including their names and values.
6.  **Handles Import-Only Usages**: It also considers components that are imported but not used as JSX elements as a valid usage. This is important for components that might be used in other ways (e.g., programmatically).
7.  **Transforms File Paths**: It uses the `transformFilePath` utility to convert local file paths into clickable GitHub URLs.

The method returns an array of `FoundComponentInstance` objects, each containing detailed information about a specific component usage, including the component name, file path, line number, and the props that were passed to it.
