#!/usr/bin/env node
/* eslint-disable unused-imports/no-unused-imports */
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
import { getComponentUsageAll } from "./tools/getComponentUsageAll.js";
import { getApplicationStats } from "./tools/getApplicationStats.js";
import { getMfeStats } from "./tools/getMfeStats.js";
import { getMfeInfo, listAllMfes } from "./tools/getMfeInfo.js";
import { getComponentUsageByApplication } from "./tools/getComponentUsageByApplication.js";
import { getComponentUsageByMfe } from "./tools/getComponentUsageByMfe.js";
import axios from "axios";
import ApplicationMfeCache from "./ApplicationMfeCache.js";

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
	private applicationMfeCache: ApplicationMfeCache;

	constructor() {
		this.applicationMfeCache = ApplicationMfeCache.getInstance();
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

			// Initialize the ApplicationMfeCache
			await this.applicationMfeCache.initializeCache();
			console.error("Application and MFE cache initialized successfully");
		} catch (error) {
			console.error(`Failed to initialize resources: ${error}`);
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
			const data = await getComponentUsageAll(componentName);
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

	private tools = [
		{
			name: "get_component_usage_by_application",
			description: "Get usage for a component in a specific application.",
			inputSchema: {
				type: "object",
				properties: {
					componentName: {
						type: "string",
						description: "The name of the component."
					},
					applicationName: {
						type: "string",
						description: APPLICATION_NAME_DESCRIPTION,
						tool_name: "list_all_applications"
					}
				},
				required: ["componentName", "applicationName"]
			}
		},
		{
			name: "get_component_usage_by_mfe",
			description: "Get usage for a component in a specific MFE.",
			inputSchema: {
				type: "object",
				properties: {
					componentName: {
						type: "string",
						description: "The name of the component."
					},
					mfeName: {
						type: "string",
						description: "The name of the MFE."
					}
				},
				required: ["componentName", "mfeName"]
			}
		},
		{
			name: "get_component_usage_all",
			description: "Get usage for a component across applications.",
			inputSchema: {
				type: "object",
				properties: {
					componentName: {
						type: "string",
						description: "The name of the component."
					}
				},
				required: ["componentName"]
			}
		},
		{
			name: "get_application_stats",
			description:
				"Returns usage statistics for a specified application, including component counts and other metrics.",
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
			description:
				"Returns usage statistics for a specified Micro-Frontend (MFE), including component counts and other metrics. The `applicationName` is optional but helps to disambiguate if MFE names are not unique across applications.",
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
			description: "Retrieves information about a specified Micro-Frontend (MFE), including its parent application.",
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
			// Lists all available MFEs and their parent applications
			// Useful for discovering MFEs and their relationships to applications
			name: "list_all_mfes",
			description: "Returns a list of all available Micro-Frontends (MFEs) across all applications.",
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
		},
		{
			name: "list_all_applications",
			description: "Returns a list of all applications with available usage data.",
			inputSchema: {
				type: "object",
				properties: {}
			}
		},
		{
			name: "list_all_tools",
			description: "Returns a list of all available tools in the MCP server.",
			inputSchema: {
				type: "object",
				properties: {}
			}
		},
		{
			name: "list_applications_and_mfes",
			description: "Returns a list of all applications and their associated Micro-Frontends (MFEs).",
			inputSchema: {
				type: "object",
				properties: {}
			}
		}
	];

	private setupToolHandlers() {
		this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
			tools: this.tools
		}));

		this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
			switch (request.params.name) {
				case "get_component_usage_by_application": {
					const { componentName, applicationName } = request.params.arguments as {
						componentName: string;
						applicationName: string;
					};
					const result = await getComponentUsageByApplication(applicationName, componentName);
					return {
						content: [
							{
								type: "text",
								text: JSON.stringify(result, null, 2)
							}
						]
					};
				}
				case "get_component_usage_by_mfe": {
					const { componentName, mfeName } = request.params.arguments as { componentName: string; mfeName: string };
					const mfeInfo = await getMfeInfo(mfeName);
					if (!mfeInfo.applicationName) {
						throw new McpError(ErrorCode.InvalidParams, `Could not determine application for MFE '${mfeName}'`);
					}
					const result = await getComponentUsageByMfe(mfeInfo.applicationName, mfeName, componentName);
					return {
						content: [
							{
								type: "text",
								text: JSON.stringify(result, null, 2)
							}
						]
					};
				}
				case "get_component_usage_all": {
					if (!request.params.arguments) {
						throw new McpError(ErrorCode.InvalidParams, "Missing arguments");
					}

					const componentName = request.params.arguments.componentName as string;
					const result = await getComponentUsageAll(componentName);

					return {
						content: [
							{
								type: "text",
								text: JSON.stringify(result, null, 2)
							}
						]
					};
				}
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
				case "get_mfe_stats": {
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
					const { mfeName } = request.params.arguments as { mfeName: string };

					if (!mfeName) {
						throw new McpError(ErrorCode.InvalidParams, "Missing mfeName parameter");
					}

					const applicationName = this.applicationMfeCache.getApplicationForMfe(mfeName);
					const result = { mfeName, applicationName };
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
					const result = {
						applications: this.applicationMfeCache.getApplications(),
						mfes: this.applicationMfeCache.getAllMfes()
					};
					return {
						content: [
							{
								type: "text",
								text: JSON.stringify(result, null, 2)
							}
						]
					};
				}

				case "list_all_applications": {
					const applications = this.applicationMfeCache.getApplications();
					return {
						content: [
							{
								type: "text",
								text: JSON.stringify(applications, null, 2)
							}
						]
					};
				}

				case "list_all_tools": {
					return {
						content: [
							{
								type: "text",
								text: JSON.stringify(this.tools, null, 2)
							}
						]
					};
				}

				case "list_applications_and_mfes": {
					const result = this.applicationMfeCache.getApplicationsAndMfes();
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

		// Ensure the ApplicationMfeCache is initialized
		if (!this.applicationMfeCache.isInitialized()) {
			await this.applicationMfeCache.initializeCache();
		}
		console.error("Application and MFE cache initialized");
	}
}

const server = new MrcUsageServer();
server.run().catch(console.error);
