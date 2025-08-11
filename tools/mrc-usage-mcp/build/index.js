#!/usr/bin/env node
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable sonarjs/no-duplicated-branches */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, ErrorCode, McpError, ReadResourceRequestSchema, ListResourcesRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { getComponentUsageAll } from "./tools/getComponentUsageAll.js";
import { fetchApplicationStats } from "./tools/getApplicationStats.js";
import { fetchMfeStats } from "./tools/getMfeStats.js";
import { getComponentUsageByApplication } from "./tools/getComponentUsageByApplication.js";
import { getComponentUsageByMfe } from "./tools/getComponentUsageByMfe.js";
import axios from "axios";
import ApplicationMfeCache from "./ApplicationMfeCache.js";
class MrcUsageServer {
    constructor() {
        this.componentList = [];
        this.componentData = {};
        this.lastFetched = null;
        this.applicationMfeCache = ApplicationMfeCache.getInstance();
        this.server = new Server({
            name: "mrc-usage-mcp",
            version: "0.1.0",
            description: "MaaS React Components usage analysis and optimization server - tracks component imports, props usage, and patterns across the codebase",
            keywords: ["react", "components", "usage", "maas", "mrc", "patterns", "props"]
        }, {
            capabilities: {
                tools: {},
                resources: {}
            }
        });
        this.setupToolHandlers();
        this.server.onerror = (_error) => {
            // console.error("[MCP Error]", _error);
        };
        process.on("SIGINT", async () => {
            await this.server.close();
            process.exit(0);
        });
    }
    async initializeResources() {
        try {
            console.error("Initializing component resources...");
            this.componentList = await this.fetchAllComponents();
            this.lastFetched = new Date();
            console.error(`Component resources initialized with ${this.componentList.length} components`);
            // Initialize the ApplicationMfeCache
            await this.applicationMfeCache.initializeCache();
            console.error("Application and MFE cache initialized successfully");
        }
        catch (error) {
            console.error(`Failed to initialize resources: ${error}`);
        }
    }
    async fetchAllComponents() {
        try {
            const response = await axios.get("https://api.github.com/repos/SolaceDev/maas-react-components/contents/mrc-usage-report-data/per-component?ref=feature/mrc-usage-report-data", {
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
                    "X-GitHub-Api-Version": "2022-11-28"
                }
            });
            if (Array.isArray(response.data)) {
                return response.data
                    .filter((item) => item.type === "dir")
                    .map((item) => item.name);
            }
            return [];
        }
        catch (error) {
            console.error(`Could not fetch component list from GitHub: ${error}`);
            return [];
        }
    }
    async fetchComponentData(componentName) {
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
        }
        catch (error) {
            console.error(`Error fetching component data for ${componentName}: ${error}`);
            return null;
        }
    }
    setupResourceHandlers() {
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
                    contents: [
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
                    contents: [
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
                        contents: [
                            {
                                type: "text",
                                text: JSON.stringify(data, null, 2)
                            }
                        ]
                    };
                }
                else {
                    throw new McpError(ErrorCode.InvalidRequest, `Component '${componentName}' not found`);
                }
            }
            throw new McpError(ErrorCode.InvalidRequest, `Resource '${uri}' not found`);
        });
    }
    getTools() {
        const applications = this.applicationMfeCache.getApplications();
        const mfes = this.applicationMfeCache.getAllMfes();
        const applicationList = `Available applications are: ${applications.join(", ")}.`;
        const mfeList = `Available MFEs are: ${mfes.join(", ")}.`;
        return [
            {
                name: "get_component_usage",
                description: `Get usage for a component. Can be scoped to a specific application or MFE. If 'name' is omitted, usage across all applications is returned. ${applicationList} ${mfeList}`,
                keywords: ["usage", "all", ...applications, ...mfes],
                inputSchema: {
                    type: "object",
                    properties: {
                        componentName: {
                            type: "string",
                            description: "The name of the component."
                        },
                        applicationOrMfeName: {
                            type: "string",
                            description: "Optional. The name of the application or MFE."
                        },
                        propName: {
                            type: "string",
                            description: "Optional. The name of the prop to filter by."
                        },
                        propValue: {
                            type: "string",
                            description: "Optional. The value of the prop to filter by. Requires propName to be set."
                        }
                    },
                    required: ["componentName"]
                }
            },
            {
                name: "get_usage_stats",
                description: "Get usage statistics for an application or MFE. If 'name' is omitted, stats for all applications are returned.",
                keywords: ["usage", "stats", "statistics", ...applications, ...mfes],
                inputSchema: {
                    type: "object",
                    properties: {
                        applicationOrMfeName: {
                            type: "string",
                            description: "Optional. The name of the application or MFE."
                        }
                    }
                }
            },
            {
                name: "list_all_tools",
                description: "Returns a list of all available tools in the MCP server.",
                keywords: ["list", "tools"],
                inputSchema: {
                    type: "object",
                    properties: {}
                }
            },
            {
                name: "list_applications_and_mfes",
                description: "Returns a list of all applications and their associated Micro-Frontends (MFEs).",
                keywords: ["list", "applications", "mfes"],
                inputSchema: {
                    type: "object",
                    properties: {}
                }
            }
        ];
    }
    setupToolHandlers() {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
            tools: this.getTools()
        }));
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            const tools = this.getTools();
            switch (request.params.name) {
                case "get_component_usage": {
                    const { componentName, applicationOrMfeName, propName, propValue } = request.params.arguments;
                    let result;
                    if (applicationOrMfeName) {
                        const lowerCaseName = applicationOrMfeName.toLowerCase();
                        const applications = this.applicationMfeCache.getApplications();
                        const allMfes = this.applicationMfeCache.getAllMfes();
                        if (applications.includes(lowerCaseName)) {
                            result = await getComponentUsageByApplication(lowerCaseName, componentName);
                        }
                        else if (allMfes.includes(lowerCaseName)) {
                            const applicationName = this.applicationMfeCache.getApplicationForMfe(lowerCaseName);
                            if (applicationName) {
                                result = await getComponentUsageByMfe(applicationName, lowerCaseName, componentName);
                            }
                            else {
                                throw new McpError(ErrorCode.InvalidParams, `Could not determine application for MFE '${lowerCaseName}'`);
                            }
                        }
                        else {
                            throw new McpError(ErrorCode.InvalidParams, `Could not find application or MFE '${lowerCaseName}'`);
                        }
                    }
                    else {
                        result = await getComponentUsageAll(componentName);
                    }
                    if (propName && Array.isArray(result)) {
                        result = result.filter((usage) => {
                            const prop = usage.props?.find((p) => p.name === propName);
                            if (!prop) {
                                return false;
                            }
                            if (propValue) {
                                return prop.value === propValue;
                            }
                            return true;
                        });
                    }
                    return {
                        content: result.map((item) => ({
                            type: "text",
                            text: JSON.stringify(item, null, 2)
                        }))
                    };
                }
                case "get_usage_stats": {
                    const { applicationOrMfeName } = request.params.arguments;
                    if (applicationOrMfeName) {
                        const lowerCaseName = applicationOrMfeName.toLowerCase();
                        const applications = this.applicationMfeCache.getApplications();
                        const allMfes = this.applicationMfeCache.getAllMfes();
                        let result;
                        if (applications.includes(lowerCaseName)) {
                            result = await fetchApplicationStats(lowerCaseName);
                        }
                        else if (allMfes.includes(lowerCaseName)) {
                            const applicationName = this.applicationMfeCache.getApplicationForMfe(lowerCaseName);
                            if (applicationName) {
                                result = await fetchMfeStats(lowerCaseName, applicationName);
                            }
                            else {
                                throw new McpError(ErrorCode.InvalidParams, `Could not determine application for MFE '${lowerCaseName}'`);
                            }
                        }
                        else {
                            throw new McpError(ErrorCode.InvalidParams, `Could not find application or MFE '${lowerCaseName}'`);
                        }
                        return {
                            content: [
                                {
                                    type: "text",
                                    text: JSON.stringify(result, null, 2)
                                }
                            ]
                        };
                    }
                    else {
                        // New logic to handle no name provided
                        const applications = this.applicationMfeCache.getApplications();
                        let totalInstances = 0;
                        const componentUsage = {};
                        const uniqueComponents = new Set();
                        for (const app of applications) {
                            const stats = await fetchApplicationStats(app);
                            if (stats) {
                                totalInstances += stats.totalInstances;
                                for (const [component, count] of Object.entries(stats.componentUsage)) {
                                    if (componentUsage[component]) {
                                        componentUsage[component] += count;
                                    }
                                    else {
                                        componentUsage[component] = count;
                                    }
                                    uniqueComponents.add(component);
                                }
                            }
                        }
                        const result = {
                            totalInstances,
                            componentUsage,
                            uniqueComponents: uniqueComponents.size
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
                }
                case "list_all_tools": {
                    return {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify(this.getTools(), null, 2)
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
