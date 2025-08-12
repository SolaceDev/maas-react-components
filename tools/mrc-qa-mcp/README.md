# MRC QA MCP Server

## Project Overview

The `mrc-qa-mcp` server is a Node.js application that provides a set of tools for quality assurance and testing of the MaaS React Components. It interacts with the project's Storybook to retrieve information about component categories, individual components, and their source files.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)

## Setup Instructions

1.  **Install Dependencies:**

    Navigate to the `tools/mrc-qa-mcp` directory and run the following command to install the required dependencies:

    ```bash
    npm install
    ```

2.  **Set Up Environment Variables:**

    This project requires a GitHub Personal Access Token to be set as an environment variable. You can set it in your shell for the current session like this:

    ```bash
    export GITHUB_PERSONAL_ACCESS_TOKEN=your_github_token
    ```

    Or you can prepend it to the start command.

## Running the Server

To start the MCP server, run the following command from the `tools/mrc-qa-mcp` directory:

```bash
GITHUB_PERSONAL_ACCESS_TOKEN=your_github_token npm start
```

The server will start and listen for requests on standard I/O.

## Available Tools

The following tools are available through the `mrc-qa-mcp` server:

### `get_categories`

- **Description:** Retrieves a list of all component categories from the Storybook.
- **Parameters:** None.

### `get_components_for_category`

- **Description:** Retrieves a list of components for a given category from Storybook.
- **Parameters:**
  - `category` (string, required): The category to retrieve components for.

### `get_file_content`

- **Description:** Retrieves the content of a component's story or documentation file from Storybook.
- **Parameters:**
  - `category` (string, required): The category of the component.
  - `component` (string, required): The name of the component.
