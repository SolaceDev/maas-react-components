#!/usr/bin/env node
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
import axios from "axios";

// Component data types
interface ComponentData {
	[key: string]: unknown;
}

class MrcUsageServer {
	private server: Server;
	private componentList: string[] = [];
	private componentData: ComponentData = {};
	private lastFetched: Date | null = null;

	constructor() {
		this.server = new Server(
			{
				name: "mrc-usage-mcp",
				version: "0.1.0"
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
				"https://api.github.com/repos/SolaceDev/maas-react-components/contents/mrc-usage-report-data?ref=feature/mrc-usage-report-data",
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
					name: "get_usage_for_component",
					description: "Retrieves usage data for a specific MRC component from the maas-react-components repository.",
					inputSchema: {
						type: "object",
						properties: {
							componentName: {
								type: "string",
								description: "The name of the MRC component (e.g., 'SolaceButton')."
							}
						},
						required: ["componentName"]
					}
				},
				{
					name: "get_all_components",
					description: "Retrieves a list of all MRC components.",
					inputSchema: {
						type: "object",
						properties: {}
					}
				},
				{
					name: "get_resource_info",
					description: "Get information about the cached component resources for debugging purposes.",
					inputSchema: {
						type: "object",
						properties: {
							component: {
								type: "string",
								description:
									"Optional: Get information about a specific component. If not provided, returns general resource information."
							}
						}
					}
				}
			]
		}));

		this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
			switch (request.params.name) {
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
