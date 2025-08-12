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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponentsForCategory = void 0;
const axios_1 = __importDefault(require("axios"));
exports.getComponentsForCategory = {
    name: "get_components_for_category",
    description: "Retrieves the list of components for a given category from Storybook.",
    inputSchema: {
        type: "object",
        properties: {
            category: {
                type: "string",
                description: "The category to retrieve components for."
            }
        },
        required: ["category"]
    },
    handler: (params) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { category, ref } = params;
        const url = `https://api.github.com/repos/SolaceDev/maas-react-components/contents/storybook/src/stories/${category}?ref=${ref}`;
        const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
        if (!token) {
            throw new Error("GITHUB_PERSONAL_ACCESS_TOKEN environment variable not set.");
        }
        try {
            const response = yield axios_1.default.get(url, {
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: `Bearer ${token}`,
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
            if (axios_1.default.isAxiosError(error) && ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 404) {
                return [];
            }
            // eslint-disable-next-line no-console
            console.error("[DEBUG] Error in getComponentsForCategory:", error);
            throw new Error(`Could not fetch directory contents from GitHub: ${url}. Error: ${error}`);
        }
    })
};
