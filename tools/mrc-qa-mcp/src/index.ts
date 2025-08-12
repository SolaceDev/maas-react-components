import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { getFileContent } from "./tools/getFileContent.js";
import { getAllComponentsByCategory } from "./tools/getAllComponentsByCategory.js";

class MrcQaServer {
	private server: Server;
	private ref = "main";

	constructor() {
		this.server = new Server(
			{
				name: "mrc-qa-mcp",
				version: "0.1.0",
				description: "MaaS React Components QA server",
				keywords: ["react", "components", "qa", "maas", "mrc"]
			},
			{
				capabilities: {
					tools: {},
					resources: {}
				}
			}
		);

		this.setupToolHandlers();

		this.server.onerror = (error) => {
			// eslint-disable-next-line no-console
			console.error("[MCP Error]", error);
		};
		process.on("SIGINT", async () => {
			await this.server.close();
			process.exit(0);
		});
	}

	private getTools() {
		return [getFileContent, getAllComponentsByCategory];
	}

	private setupToolHandlers() {
		this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
			tools: this.getTools()
		}));

		this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
			switch (request.params.name) {
				case "get_file_content": {
					const { category, component } = request.params.arguments as {
						category: string;
						component: string;
					};
					const result = await getFileContent.handler({ category, component, ref: this.ref });
					const text = typeof result === "string" ? result : JSON.stringify(result, null, 2);
					return {
						content: [
							{
								type: "text",
								text
							}
						]
					};
				}
				case "get_all_components_by_category": {
					const result = await getAllComponentsByCategory.handler({ ref: this.ref });
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
		const transport = new StdioServerTransport();
		await this.server.connect(transport);
		// eslint-disable-next-line no-console
		console.error("MRC QA MCP server running on stdio");
	}
}

const server = new MrcQaServer();
// eslint-disable-next-line no-console
server.run().catch(console.error);
