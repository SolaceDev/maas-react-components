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

**Sample Output:**

```json
[
	{
		"filePath": "https://github.com/SolaceDev/maas-ui/blob/develop/micro-frontends/ep/src/utils/schemaUtils.tsx",
		"props": [
			{
				"name": "variant",
				"type": "string",
				"value": "link"
			},
			{
				"name": "dataQa",
				"type": "string",
				"value": "jsonSchemaSpecLink"
			},
			{
				"name": "href",
				"type": "string",
				"value": "https://json-schema.org/specification.html"
			}
		]
	},
	{
		"filePath": "https://github.com/SolaceDev/maas-ui/blob/develop/micro-frontends/ep/src/utils/designer/topicUtils.tsx",
		"props": [
			{
				"name": "variant",
				"type": "string",
				"value": "link"
			},
			{
				"name": "href",
				"type": "expression",
				"value": "brandableTextValueConverter(\"smfTopics\", \"link\")"
			}
		]
	},
	{
		"filePath": "https://github.com/SolaceDev/maas-ui/blob/develop/micro-frontends/ep/src/components/entityList/DownloadAsyncApiDialog.tsx",
		"props": [
			{
				"name": "variant",
				"type": "string",
				"value": "text"
			},
			{
				"name": "onClick",
				"type": "variable",
				"value": "toggleCheckbox"
			}
		]
	}
]
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

**Sample Output (no filter):**

```json
[
	{
		"filePath": "https://github.com/SolaceDev/maas-ui/blob/develop/micro-frontends/mc/src/pages/services/details/components/upgrades/DialogPlanForm.tsx",
		"props": []
	},
	{
		"filePath": "https://github.com/SolaceDev/maas-ui/blob/develop/micro-frontends/mc/src/pages/services/details/components/upgrades/DialogPlanForm.tsx",
		"props": [
			{ "name": "title", "type": "string", "value": "What is an Automated Upgrade?" },
			{ "name": "backgroundColor", "type": "expression", "value": "theme.palette.ux.learning.w10" },
			{ "name": "showCloseButton", "type": "boolean", "value": "true" },
			{ "name": "onClose", "type": "function", "value": "() => setNeedHelp(false)" }
		]
	},
	{
		"filePath": "https://github.com/SolaceDev/maas-ui/blob/develop/micro-frontends/mc/src/pages/services/details/components/upgrades/DialogPlanForm.tsx",
		"props": [
			{ "name": "title", "type": "string", "value": "What is an Automated Upgrade?" },
			{ "name": "backgroundColor", "type": "expression", "value": "theme.palette.background.paper" }
		]
	},
	{
		"filePath": "https://github.com/SolaceDev/maas-ui/blob/develop/micro-frontends/mc/src/pages/services/details/components/upgrades/DialogPlanForm.tsx",
		"props": [{ "name": "title", "type": "string", "value": "Release Notes" }]
	},
	{
		"filePath": "https://github.com/SolaceDev/maas-ui/blob/develop/micro-frontends/mc/src/pages/services/details/components/upgrades/LogsProgress.tsx",
		"props": []
	}
]
```

**Sample Prompt (prop presence filter):** "for the mrc-mcp, get all usage of SolaceErrorbox in EP w/ prop showCloseButton"

**Internal Call (prop presence filter):**

```json
{
	"tool": "get_component_usage_by_mfe",
	"componentName": "SolaceErrorBox",
	"mfeName": "ep",
	"propIdentifier": "showCloseButton"
}
```

**Sample Output (prop presence filter):**

```json
[
	{
		"filePath": "https://github.com/SolaceDev/maas-ui/blob/develop/micro-frontends/ep/src/components/entityList/AddEventApiProductVersionDialog.tsx",
		"props": [
			{
				"name": "message",
				"type": "expression",
				"value": "submitError.message"
			},
			{
				"name": "showCloseButton",
				"type": "boolean",
				"value": "true"
			},
			{
				"name": "onClose",
				"type": "variable",
				"value": "handleErrorBoxClose"
			}
		]
	}
]
```

**Sample Prompt (prop and value filter):** "for the mrc-mcp, get all usage of SolaceErrorbox in EP w/ prop showCloseButton value is false"

**Internal Call (prop and value filter):**

```json
{
	"tool": "get_component_usage_by_mfe",
	"componentName": "SolaceErrorBox",
	"mfeName": "ep",
	"propIdentifier": {
		"name": "showCloseButton",
		"value": "false"
	}
}
```

**Sample Output (prop and value filter):**

```json
[]
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

**Sample Output:**

```json
[
  {
    "filePath": "https://github.com/SolaceDev/maas-ops-ui/blob/develop/micro-frontends/maas-ops-react/src/pages/createBizOrganization/components/reviewDialog/ReviewDialog.tsx",
    "props": [
      { "name": "checked", "type": "expression", "value": "isAdvancedInsightSelected ? true : false" },
      { "name": "readOnly", "type": "boolean", "value": "true" },
      { "name": "label", "type": "jsx", "value": "<Box marginTop={\\"2px\\"}>{createBizOrganization.requests.checkBoxLabel}</Box>" },
      { "name": "name", "type": "string", "value": "advInsights" },
      { "name": "title", "type": "string", "value": "Advanced Insights Checkbox" }
    ]
  },
  {
    "filePath": "https://github.com/SolaceDev/maas-ops-ui/blob/develop/micro-frontends/maas-ops-react/src/pages/search/SearchForm.tsx",
    "props": [
      { "name": "name", "type": "string", "value": "all" },
      { "name": "label", "type": "expression", "value": "searchStr.searchArea.types.all" },
      { "name": "checked", "type": "expression", "value": "infra && orgs && services && users" },
      { "name": "onChange", "type": "variable", "value": "searchIndicesChangeHandler" },
      { "name": "dataQa", "type": "string", "value": "search-all-checkbox" }
    ]
  },
  {
    "filePath": "https://github.com/SolaceDev/maas-ops-ui/blob/develop/micro-frontends/maas-ops-react/src/pages/automaticUpgrades/runs/components/SystemControls.tsx",
    "props": [
      { "name": "name", "type": "string", "value": "Automated Upgrades" },
      { "name": "label", "type": "string", "value": "Automated Upgrades" },
      { "name": "checked", "type": "variable", "value": "autoChecked" }
    ]
  },
  {
    "filePath": "https://github.com/SolaceDev/maas-ui/blob/develop/micro-frontends/ep/src/components/entityList/DownloadAsyncApiDialog.tsx",
    "props": [
      { "name": "key", "type": "expression", "value": "option.value" },
      { "name": "name", "type": "expression", "value": "option.name" },
      { "name": "checked", "type": "expression", "value": "checkedItems[option.value]" },
      { "name": "onChange", "type": "variable", "value": "handleCheckboxChange" },
      { "name": "dataQa", "type": "expression", "value": "option.name" },
      { "name": "disabled", "type": "expression", "value": "optionDisabled(option, selectedMessagingService)" },
      { "name": "label", "type": "expression", "value": "option.name" }
    ]
  },
  {
    "filePath": "https://github.com/SolaceDev/maas-ui/blob/develop/micro-frontends/mc/src/pages/services/compare/CompareServices.tsx",
    "props": [
      { "name": "id", "type": "string", "value": "showDiffs" },
      { "name": "name", "type": "string", "value": "showDiffs" },
      { "name": "label", "type": "expression", "value": "t({ id: \\"id_show_differences\\", message: \\"Show only differences\\" })" },
      { "name": "checked", "type": "variable", "value": "showDiffs" },
      { "name": "onChange", "type": "variable", "value": "handleShowDiffs" }
    ]
  },
  {
    "filePath": "https://github.com/SolaceDev/maas-ui/blob/develop/micro-frontends/saas/src/pages/tokenManagement/components/CategorySection.tsx",
    "props": [
      { "name": "onChange", "type": "expression", "value": "onBulkPermissionCheckboxChange(readPermissions)" },
      { "name": "name", "type": "expression", "value": "`${categoryName}-read`" },
      { "name": "checked", "type": "variable", "value": "readChecked" },
      { "name": "indeterminate", "type": "expression", "value": "!readChecked && readIndeterminate" },
      { "name": "readOnly", "type": "expression", "value": "!!readOnly" }
    ]
  }
]
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

**Sample Output:**

```json
{
	"totalInstances": 996,
	"componentUsage": {
		"SolaceTypography": 201,
		"SolaceButton": 107,
		"SolaceGrid": 178,
		"SolaceTooltip": 87,
		"SolaceLabel": 2,
		"SolaceMessageBox": 50,
		"SolaceConfirmationDialog": 43,
		"SolaceTextField": 36,
		"SolaceStack": 25,
		"SolaceSelect": 20,
		"SolaceCheckBox": 17,
		"SolaceAccordion": 11,
		"SolaceMenu": 3,
		"SolaceTable": 36,
		"SolaceAttributeBadge": 14,
		"SolaceSelectAutocompleteItem": 5,
		"SolaceSelectAutocomplete": 4,
		"SolacePagination": 17,
		"SolaceChip": 15,
		"SolaceTabs": 7,
		"SolaceCircularProgress": 10,
		"SolaceToggle": 3,
		"SolaceDetailMessage": 10,
		"SolaceGridList": 7,
		"SolaceRadio": 3,
		"SolaceListItem": 9,
		"SolaceSidePanelLayout": 2,
		"SolaceTextArea": 1,
		"SolacePageHeader": 5,
		"SolaceCodeEditor": 7,
		"SolaceList": 5,
		"SolaceEnvironmentLabel": 1,
		"SolaceBackDrop": 7,
		"SolaceRadioGroup": 1,
		"SolaceBreadcrumb": 7,
		"SolaceErrorBox": 5,
		"SolaceSearchAndFilter": 3,
		"SolaceToggleButtonGroup": 1,
		"SolaceTag": 6,
		"SolaceStackLabel": 8,
		"SolaceLearningBanner": 7,
		"SolaceToasts": 4,
		"SolaceLinearProgress": 1,
		"SolaceDatePicker": 3,
		"SolaceAttributeValuePairForm": 1,
		"SolaceChipTextArea": 1
	},
	"uniqueComponents": 46
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

**Sample Output:**

```json
{
	"totalInstances": 695,
	"componentUsage": {
		"SolaceTypography": 191,
		"SolaceButton": 109,
		"SolaceGrid": 70,
		"SolaceTooltip": 29,
		"SolaceLabel": 11,
		"SolaceMessageBox": 33,
		"SolaceConfirmationDialog": 34,
		"SolaceTextField": 34,
		"SolaceStack": 12,
		"SolaceSelect": 10,
		"SolaceCheckBox": 27,
		"SolaceAccordion": 7,
		"SolaceMenu": 8,
		"SolaceTable": 9,
		"SolaceAttributeBadge": 4,
		"SolaceSelectAutocompleteItem": 9,
		"SolaceCard": 10,
		"SolaceSelectAutocomplete": 7,
		"SolacePagination": 6,
		"SolaceChip": 6,
		"SolaceTabs": 2,
		"SolaceCircularProgress": 6,
		"SolaceToggle": 2,
		"SolaceDetailMessage": 4,
		"SolaceGridList": 6,
		"SolaceRadio": 3,
		"SolaceListItem": 5,
		"SolaceSidePanelLayout": 1,
		"SolaceTextArea": 9,
		"SolacePageHeader": 2,
		"SolaceList": 2,
		"SolaceEnvironmentChip": 1,
		"SolaceEnvironmentLabel": 6,
		"SolaceBackDrop": 7,
		"SolaceDrawer": 1,
		"SolaceRadioGroup": 1,
		"SolaceBreadcrumb": 2,
		"SolacePicker": 2,
		"SolaceErrorBox": 2,
		"SolaceToggleButtonGroup": 1,
		"SolaceStackLabel": 2,
		"SolaceDatePicker": 1,
		"SolaceAttributeValuePairForm": 1
	},
	"uniqueComponents": 43
}
```

### `get_mfe_info`

**Description:** Retrieves information about a specified Micro-Frontend (MFE), including its parent application.

**Sample Prompt:** "Get information about the 'mesh-manager' MFE."

**Internal Call:**

```json
{
	"tool": "get_mfe_info",
	"mfeName": "mesh-manager"
}
```

**Sample Output:**

```json
{
	"mfeName": "mesh-manager",
	"applicationName": "maas-ui",
	"isValid": true
}
```

### `list_all_mfes`

**Description:** Returns a list of all available Micro-Frontends (MFEs) across all applications.

**Sample Prompt:** "List all MFEs."

**Internal Call:**

```json
{
	"tool": "list_all_mfes"
}
```

**Sample Output:**

```json
{
	"applications": ["broker-manager", "maas-ops-ui", "maas-ui"],
	"mfes": ["broker-manager", "infra", "maas-ops-react", "ep", "intg", "mc", "saas"]
}
```

### `list_all_applications`

**Description:** Returns a list of all applications with available usage data.

**Sample Prompt:** "List all applications."

**Internal Call:**

```json
{
	"tool": "list_all_applications"
}
```

**Sample Output:**

```json
["maas-ui", "maas-ops-ui", "broker-manager"]
```

### `list_all_tools`

**Description:** Returns a list of all available tools in the MCP server.

**Sample Prompt:** "What tools are available in the mrc-mcp server?"

**Internal Call:**

```json
{
	"tool": "list_all_tools"
}
```

**Sample Output:**

```json
[
	"get_component_usage_by_application",
	"get_component_usage_by_mfe",
	"get_component_usage_all",
	"get_application_stats",
	"get_mfe_stats",
	"get_mfe_info",
	"list_all_mfes",
	"list_all_applications",
	"list_all_tools",
	"list_applications_and_mfes"
]
```

### `list_applications_and_mfes`

**Description:** Returns a list of all applications and their associated Micro-Frontends (MFEs).

**Sample Prompt:** "List all applications and their MFEs."

**Internal Call:**

```json
{
	"tool": "list_applications_and_mfes"
}
```

**Sample Output:**

```json
{
	"applications": ["broker-manager", "maas-ops-ui", "maas-ui"],
	"mfes": {
		"broker-manager": ["broker-manager"],
		"maas-ops-ui": ["infra", "maas-ops-react"],
		"maas-ui": ["ep", "intg", "mc", "saas"]
	}
}
```
