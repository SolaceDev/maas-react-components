#!/usr/bin/env node
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable sonarjs/no-duplicated-branches */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
	CallToolRequestSchema,
	ListToolsRequestSchema,
	ErrorCode,
	McpError,
	ReadResourceRequestSchema,
	ListResourcesRequestSchema
} from "@modelcontextprotocol/sdk/types.js";
import { getUsageForComponent } from "./tools/getUsageForComponent.js";
import { getAllComponents } from "./tools/getAllComponents.js";
import { getComponentsByApplication } from "./tools/getComponentsByApplication.js";
// import { getComponentsByMfe } from "./tools/getComponentsByMfe.js";
import { getApplicationStats } from "./tools/getApplicationStats.js";
import { getMfeStats } from "./tools/getMfeStats.js";
import { getMfeInfo, listAllMfes } from "./tools/getMfeInfo.js";
import axios from "axios";

// Component data types
interface ComponentData {
	[key: string]: unknown;
}

const APPLICATION_NAME_DESCRIPTION = "The name of the application.";

class MrcUsageServer {
	private server: Server;
	private componentList: string[] = [];
	private componentData: ComponentData = {};
	private lastFetched: Date | null = null;

	constructor() {
		this.server = new Server(
			{
				name: "mrc-usage-mcp",
				version: "0.1.0",
				description:
					"MaaS React Components usage analysis and optimization server - tracks component imports, props usage, and patterns across the codebase",
				keywords: ["react", "components", "usage", "maas", "mrc", "patterns", "props"]
			},
			{
				capabilities: {
					tools: {},
					resources: {}
				}
			}
		);

		this.setupToolHandlers();

		this.server.onerror = (_error) => {
			// console.error("[MCP Error]", _error);
		};
		process.on("SIGINT", async () => {
			await this.server.close();
			process.exit(0);
		});
	}

	private async initializeResources(): Promise<void> {
		try {
			console.error("Initializing component resources...");
			this.componentList = await this.fetchAllComponents();
			this.lastFetched = new Date();
			console.error(`Component resources initialized with ${this.componentList.length} components`);
		} catch (error) {
			console.error(`Failed to initialize component resources: ${error}`);
		}
	}

	private async fetchAllComponents(): Promise<string[]> {
		try {
			const response = await axios.get(
				"https://api.github.com/repos/SolaceDev/maas-react-components/contents/mrc-usage-report-data/per-component?ref=feature/mrc-usage-report-data",
				{
					headers: {
						Accept: "application/vnd.github+json",
						Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
						"X-GitHub-Api-Version": "2022-11-28"
					}
				}
			);

			if (Array.isArray(response.data)) {
				return response.data
					.filter((item: { type: string }) => item.type === "dir")
					.map((item: { name: string }) => item.name);
			}

			return [];
		} catch (error) {
			console.error(`Could not fetch component list from GitHub: ${error}`);
			return [];
		}
	}

	private async fetchComponentData(componentName: string): Promise<unknown> {
		// If already fetched, return from cache
		if (this.componentData[componentName]) {
			return this.componentData[componentName];
		}

		try {
			const data = await getUsageForComponent(componentName);
			if (data) {
				// Cache the data
				this.componentData[componentName] = data;
			}
			return data;
		} catch (error) {
			console.error(`Error fetching component data for ${componentName}: ${error}`);
			return null;
		}
	}

	private setupResourceHandlers() {
		// List available resources
		this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
			return {
				resources: [
					{
						uri: "components",
						description: "List of all MRC components"
					},
					{
						uri: "component/{name}",
						description: "Usage data for a specific MRC component"
					},
					{
						uri: "status",
						description: "Status information about the component resources"
					}
				]
			};
		});

		// Access resources
		this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
			const uri = request.params.uri;

			// Resource: List of all components
			if (uri === "components") {
				return {
					content: [
						{
							type: "text",
							text: JSON.stringify(this.componentList, null, 2)
						}
					]
				};
			}

			// Resource: Status information
			if (uri === "status") {
				const status = {
					componentsCount: this.componentList.length,
					cachedComponentsCount: Object.keys(this.componentData).length,
					lastFetched: this.lastFetched,
					cachedComponents: Object.keys(this.componentData)
				};

				return {
					content: [
						{
							type: "text",
							text: JSON.stringify(status, null, 2)
						}
					]
				};
			}

			// Resource: Specific component data
			const componentMatch = uri.match(/^component\/(.+)$/);
			if (componentMatch) {
				const componentName = componentMatch[1];
				const data = await this.fetchComponentData(componentName);

				if (data) {
					return {
						content: [
							{
								type: "text",
								text: JSON.stringify(data, null, 2)
							}
						]
					};
				} else {
					throw new McpError(ErrorCode.InvalidRequest, `Component '${componentName}' not found`);
				}
			}

			throw new McpError(ErrorCode.InvalidRequest, `Resource '${uri}' not found`);
		});
	}

	private setupToolHandlers() {
		this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
			tools: [
				{
					name: "mrc_analyze_component_usage",
					description:
						"Analyze how MaaS React Components are used across the codebase - imports, props, patterns, and usage statistics. Perfect for questions like 'How is SolaceButton used?' or 'What are the usage patterns for this component?'",
					inputSchema: {
						type: "object",
						properties: {
							componentName: {
								type: "string",
								description: "The name of the MRC component to analyze usage for (e.g., 'SolaceButton', 'SolaceCard')"
							},
							analysisType: {
								type: "string",
								enum: ["imports", "props", "patterns", "statistics", "all"],
								description: "Type of usage analysis to perform",
								default: "all"
							}
						},
						required: ["componentName"]
					}
				},
				{
					name: "mrc_get_all_components",
					description:
						"Retrieve a comprehensive list of all MaaS React Components available in the design system. Use this for component discovery, auditing, and getting an overview of the component library.",
					inputSchema: {
						type: "object",
						properties: {
							includeUsageStats: {
								type: "boolean",
								description: "Whether to include basic usage statistics for each component",
								default: false
							}
						}
					}
				},
				{
					name: "mrc_find_component_dependencies",
					description:
						"Find dependencies and relationships between MaaS React Components. Identifies which components depend on others and usage patterns across the codebase.",
					inputSchema: {
						type: "object",
						properties: {
							componentName: {
								type: "string",
								description: "The component to analyze dependencies for"
							},
							direction: {
								type: "string",
								enum: ["depends-on", "used-by", "both"],
								description: "Direction of dependency analysis",
								default: "both"
							}
						},
						required: ["componentName"]
					}
				},
				{
					name: "mrc_usage_diagnostics",
					description:
						"Get diagnostic information about the MRC usage analysis system - cached data, component availability, and system status. Useful for debugging and understanding data freshness.",
					inputSchema: {
						type: "object",
						properties: {
							component: {
								type: "string",
								description:
									"Optional: Get diagnostics for a specific component. If not provided, returns general system diagnostics."
							}
						}
					}
				},
				{
					name: "get_components_by_application",
					description: "Get a list of all components used in a specific application.",
					inputSchema: {
						type: "object",
						properties: {
							applicationName: {
								type: "string",
								description: APPLICATION_NAME_DESCRIPTION
							}
						},
						required: ["applicationName"]
					}
				},
				{
					name: "get_components_by_mfe",
					description: "Get a list of all components used in a specific MFE (Micro Frontend).",
					inputSchema: {
						type: "object",
						properties: {
							applicationName: {
								type: "string",
								description: APPLICATION_NAME_DESCRIPTION
							},
							mfeName: {
								type: "string",
								description: "The name of the MFE (Micro Frontend)."
							}
						},
						required: ["applicationName", "mfeName"]
					}
				},
				{
					name: "get_application_stats",
					description: "Get usage statistics for a specific application.",
					inputSchema: {
						type: "object",
						properties: {
							applicationName: {
								type: "string",
								description: APPLICATION_NAME_DESCRIPTION
							}
						},
						required: ["applicationName"]
					}
				},
				{
					name: "get_mfe_stats",
					description: "Get usage statistics for a specific MFE (Micro Frontend).",
					inputSchema: {
						type: "object",
						properties: {
							applicationName: {
								type: "string",
								description: APPLICATION_NAME_DESCRIPTION
							},
							mfeName: {
								type: "string",
								description: "The name of the MFE (Micro Frontend)."
							}
						},
						required: ["mfeName"]
					}
				},
				{
					name: "get_mfe_info",
					description: "Get information about an MFE, including which application it belongs to.",
					inputSchema: {
						type: "object",
						properties: {
							mfeName: {
								type: "string",
								description: "The name of the MFE (Micro Frontend)."
							},
							forceRefresh: {
								type: "boolean",
								description: "Force refresh of MFE mapping data from GitHub",
								default: false
							}
						},
						required: ["mfeName"]
					}
				},
				{
					name: "list_all_mfes",
					description: "List all available MFEs across all applications.",
					inputSchema: {
						type: "object",
						properties: {
							forceRefresh: {
								type: "boolean",
								description: "Force refresh of MFE mapping data from GitHub",
								default: false
							}
						}
					}
				}
			]
		}));

		this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
			switch (request.params.name) {
				case "mrc_analyze_component_usage":
				case "get_usage_for_component": {
					if (!request.params.arguments) {
						throw new McpError(ErrorCode.InvalidParams, "Missing arguments");
					}

					const componentName = request.params.arguments.componentName as string;
					const result = await this.fetchComponentData(componentName);

					return {
						content: [
							{
								type: "text",
								text: JSON.stringify(result, null, 2)
							}
						]
					};
				}
				case "mrc_get_all_components":
				case "get_all_components": {
					// Use cached component list if available, otherwise fetch from GitHub
					let allComponents;
					if (this.componentList.length > 0) {
						allComponents = this.componentList;
					} else {
						allComponents = await getAllComponents();
						// Update our cache
						if (allComponents.length > 0) {
							this.componentList = allComponents;
							this.lastFetched = new Date();
						}
					}

					return {
						content: [
							{
								type: "text",
								text: JSON.stringify(allComponents, null, 2)
							}
						]
					};
				}
				case "mrc_find_component_dependencies": {
					if (!request.params.arguments) {
						throw new McpError(ErrorCode.InvalidParams, "Missing arguments");
					}

					const componentName = request.params.arguments.componentName as string;
					const result = await this.fetchComponentData(componentName);

					// For now, return the component data - you can enhance this later to specifically analyze dependencies
					return {
						content: [
							{
								type: "text",
								text: JSON.stringify(result, null, 2)
							}
						]
					};
				}
				case "mrc_usage_diagnostics":
				case "get_resource_info": {
					const component = request.params.arguments?.component as string | undefined;

					// If a specific component is requested
					if (component) {
						const info = {
							component,
							isCached: component in this.componentData,
							data: this.componentData[component] || null
						};

						return {
							content: [
								{
									type: "text",
									text: JSON.stringify(info, null, 2)
								}
							]
						};
					}

					// Return general resource information
					const info = {
						isInitialized: this.componentList.length > 0,
						lastFetched: this.lastFetched,
						componentsCount: this.componentList.length,
						cachedComponentsCount: Object.keys(this.componentData).length,
						components: this.componentList,
						cachedComponents: Object.keys(this.componentData)
					};

					return {
						content: [
							{
								type: "text",
								text: JSON.stringify(info, null, 2)
							}
						]
					};
				}
				case "get_components_by_application": {
					const { applicationName } = request.params.arguments as { applicationName: string };
					const result = await getComponentsByApplication(applicationName);
					return {
						content: [
							{
								type: "text",
								text: JSON.stringify(result, null, 2)
							}
						]
					};
				}
				// case "get_components_by_mfe":
				// case "get_components_by_sub_application": {
				// 	const { applicationName, mfeName, subApplicationName } = request.params.arguments as {
				// 		applicationName?: string;
				// 		mfeName?: string;
				// 		subApplicationName?: string;
				// 	};
				// 	// Support both old and new parameter names
				// 	const mfeNameToUse = mfeName || subApplicationName;
				// 	if (!mfeNameToUse) {
				// 		throw new McpError(ErrorCode.InvalidParams, "Missing mfeName parameter");
				// 	}
				// 	const result = await getComponentsByMfe(mfeNameToUse, applicationName);
				// 	return {
				// 		content: [
				// 			{
				// 				type: "text",
				// 				text: JSON.stringify(result, null, 2)
				// 			}
				// 		]
				// 	};
				// }
				case "get_application_stats": {
					const { applicationName } = request.params.arguments as { applicationName: string };
					const result = await getApplicationStats(applicationName);
					return {
						content: [
							{
								type: "text",
								text: JSON.stringify(result, null, 2)
							}
						]
					};
				}
				case "get_mfe_stats":
				case "get_sub_application_stats": {
					const { applicationName, mfeName, subApplicationName } = request.params.arguments as {
						applicationName?: string;
						mfeName?: string;
						subApplicationName?: string;
					};
					// Support both old and new parameter names
					const mfeNameToUse = mfeName || subApplicationName;
					if (!mfeNameToUse) {
						throw new McpError(ErrorCode.InvalidParams, "Missing mfeName parameter");
					}
					const result = await getMfeStats(mfeNameToUse, applicationName);
					return {
						content: [
							{
								type: "text",
								text: JSON.stringify(result, null, 2)
							}
						]
					};
				}
				case "get_mfe_info": {
					const { mfeName, forceRefresh } = request.params.arguments as {
						mfeName: string;
						forceRefresh?: boolean;
					};

					if (!mfeName) {
						throw new McpError(ErrorCode.InvalidParams, "Missing mfeName parameter");
					}

					const result = await getMfeInfo(mfeName, forceRefresh);
					return {
						content: [
							{
								type: "text",
								text: JSON.stringify(result, null, 2)
							}
						]
					};
				}

				case "list_all_mfes": {
					const { forceRefresh } = request.params.arguments as { forceRefresh?: boolean };
					const result = await listAllMfes(forceRefresh);
					return {
						content: [
							{
								type: "text",
								text: JSON.stringify(result, null, 2)
							}
						]
					};
				}

				default:
					throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
			}
		});
	}

	async run() {
		// Setup resource handlers
		this.setupResourceHandlers();

		const transport = new StdioServerTransport();
		await this.server.connect(transport);
		console.error("MRC Usage MCP server running on stdio");

		// Initialize resources after the server is running
		await this.initializeResources();
	}
}

const server = new MrcUsageServer();
server.run().catch(console.error);
