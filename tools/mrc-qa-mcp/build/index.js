"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const getCategories_js_1 = require("./tools/getCategories.js");
const getComponentsForCategory_js_1 = require("./tools/getComponentsForCategory.js");
const getFileContent_js_1 = require("./tools/getFileContent.js");
class MrcQaServer {
    constructor() {
        this.server = new index_js_1.Server({
            name: "mrc-qa-mcp",
            version: "0.1.0",
            description: "MaaS React Components QA server",
            keywords: ["react", "components", "qa", "maas", "mrc"]
        }, {
            capabilities: {
                tools: {},
                resources: {}
            }
        });
        this.setupToolHandlers();
        this.server.onerror = (error) => {
            // eslint-disable-next-line no-console
            console.error("[MCP Error]", error);
        };
        process.on("SIGINT", () => __awaiter(this, void 0, void 0, function* () {
            yield this.server.close();
            process.exit(0);
        }));
    }
    getTools() {
        return [getCategories_js_1.getCategories, getComponentsForCategory_js_1.getComponentsForCategory, getFileContent_js_1.getFileContent];
    }
    setupToolHandlers() {
        this.server.setRequestHandler(types_js_1.ListToolsRequestSchema, () => __awaiter(this, void 0, void 0, function* () {
            return ({
                tools: this.getTools()
            });
        }));
        this.server.setRequestHandler(types_js_1.CallToolRequestSchema, (request) => __awaiter(this, void 0, void 0, function* () {
            switch (request.params.name) {
                case "get_categories": {
                    const result = yield getCategories_js_1.getCategories.handler();
                    return {
                        content: [
                            {
                                type: "text",
                                text: result
                            }
                        ]
                    };
                }
                case "get_components_for_category": {
                    const { category } = request.params.arguments;
                    const result = yield getComponentsForCategory_js_1.getComponentsForCategory.handler({ category });
                    return {
                        content: [
                            {
                                type: "text",
                                text: result
                            }
                        ]
                    };
                }
                case "get_file_content": {
                    const { category, component } = request.params.arguments;
                    const result = yield getFileContent_js_1.getFileContent.handler({ category, component });
                    return {
                        content: [
                            {
                                type: "text",
                                text: result
                            }
                        ]
                    };
                }
                default:
                    throw new types_js_1.McpError(types_js_1.ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
            }
        }));
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const transport = new stdio_js_1.StdioServerTransport();
            yield this.server.connect(transport);
            // eslint-disable-next-line no-console
            console.error("MRC QA MCP server running on stdio");
        });
    }
}
const server = new MrcQaServer();
// eslint-disable-next-line no-console
server.run().catch(console.error);
