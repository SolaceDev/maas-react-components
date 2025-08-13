# MRC QA MCP Server

This server provides tools to query MRC component documentation and usage.

## Prerequisites

Before you begin, ensure you have the following installed and configured on your machine:

- **Visual Studio Code**: The recommended code editor for using this tool.
- **AI Coding Assistant**: An AI coding assistant like Roo, Cline, or GitHub Copilot, integrated into VS Code.
- **LiteLLM Key**: Your coding assistant must be configured with a valid LiteLLM key.
- **Node.js and npm**: This project is a Node.js application, so you'll need Node.js and npm to install dependencies and run the server. You can download them from [https://nodejs.org/](https://nodejs.org/).
- **Docker or Podman**: To build and run the server as a container, you will need Docker or a compatible container engine like Podman.

## Available Tools

- `get_all_components_by_category`: Retrieves all component categories and their components from Storybook.
- `get_file_content`: Retrieves the content of a component's story or documentation file from Storybook.

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
cd tools/mrc-qa-mcp

# Build the image
docker build -t mrc-qa-mcp .
```

2.  Tag the image for GitHub Container Registry:

```bash
# Tag the image with the SolaceDev organization
docker tag mrc-qa-mcp ghcr.io/solacedev/mrc-qa-mcp:latest
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
docker push ghcr.io/solacedev/mrc-qa-mcp:latest
```

5.  Make the package public (if needed): After pushing, you may need to go to the GitHub repository settings and make the package public if you want others to be able to use it without authentication.

### Using with AI Assistants

To use this MCP server with Cline, Roo or GitHub Copilot, you need to add a configuration to the settings file.

**Settings File Path:**

- **Cline (macOS):** `~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`
- **Roo (macOS):** `~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`
- **GitHub Copilot (macOS):** `~/Library/Application Support/Code/User/settings.json`

#### Roo

Add the following configuration to Roo's MCP settings file:

```json
"mrc-qa-ghcr": {
  "disabled": false,
  "timeout": 60,
  "type": "stdio",
  "command": "sh",
  "args": [
    "-c",
    "docker pull ghcr.io/solacedev/mrc-qa-mcp:latest && docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN ghcr.io/solacedev/mrc-qa-mcp:latest"
  ],
  "env": {
    "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_GITHUB_TOKEN"
  }
}
```

#### GitHub Copilot

For GitHub Copilot, you can use a similar configuration in its settings file. Ensure that you have the appropriate extensions and settings to allow Copilot to use local MCP servers.

## Tool Reference and Sample Prompts

### `get_all_components_by_category`

**Description:** Retrieves all component categories and their components from Storybook.

**Sample Prompt:** "get all components by category"

**Internal Call:**

```json
{
	"tool": "get_all_components_by_category"
}
```

**Sample Output:**

```json
{
	"accessiblity": ["form"],
	"style": ["colors", "typography"],
	"layout": [
		"detailMessage",
		"emptyStateBanner",
		"grid",
		"jsonSchemaForm",
		"responsiveItemList",
		"sidePanelLayout",
		"stack"
	],
	"navigation": [
		"breadcrumb",
		"buttonLink",
		"iconTabs",
		"menu",
		"pageHeader",
		"pagination",
		"stepper",
		"tabs",
		"truncatableLink"
	],
	"messaging": ["circularProgress", "learningBanner", "linearProgress", "messageBox", "toasts"],
	"data-visualization": ["donutchart"],
	"container": ["accordion", "card", "dialog", "drawer", "popover"],
	"input": [
		"attributevaluepairform",
		"button",
		"catogorizedsearch",
		"checkbox",
		"chiptextarea",
		"codeeditor",
		"colorpicker",
		"datePicker",
		"environmentlabel",
		"environmentselectchip",
		"fileUploader",
		"label",
		"learningbutton",
		"picker",
		"radioButton",
		"searchAndFilter",
		"select",
		"selectAutocomplete",
		"stackLabel",
		"textField",
		"textarea",
		"textdiff",
		"toggle",
		"toggleButtonGroup"
	],
	"data-display": [
		"attributebadge",
		"chip-choice",
		"chip-input",
		"chip",
		"environmentchip",
		"featuretag",
		"gridlist",
		"gridlistmultiselect",
		"list",
		"notificationcounter",
		"table",
		"tag",
		"tooltip"
	]
}
```

### `get_file_content`

**Description:** Retrieves the content of a component's story or documentation file from Storybook.

**Sample Prompt:** "get the file content for the button component in the input category"

**Internal Call:**

```json
{
	"tool": "get_file_content",
	"category": "input",
	"component": "button"
}
```
