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
exports.getFileContent = void 0;
const axios_1 = __importDefault(require("axios"));
exports.getFileContent = {
    name: "get_file_content",
    description: "Retrieves the content of a component's story or documentation file from Storybook.",
    inputSchema: {
        type: "object",
        properties: {
            category: {
                type: "string",
                description: "The category of the component."
            },
            component: {
                type: "string",
                description: "The name of the component."
            }
        },
        required: ["category", "component"]
    },
    handler: (params) => __awaiter(void 0, void 0, void 0, function* () {
        const { category, component } = params;
        const url = `https://api.github.com/repos/SolaceDev/maas-react-components/contents/storybook/src/stories/${category}/${component}`;
        const headers = {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
            "X-GitHub-Api-Version": "2022-11-28"
        };
        const response = yield axios_1.default.get(url, { headers });
        if (Array.isArray(response.data)) {
            let file = response.data.find((file) => file.name.endsWith(".stories.tsx"));
            if (!file) {
                file = response.data.find((file) => file.name.endsWith(".mdx"));
            }
            if (file) {
                const contentResponse = yield axios_1.default.get(file.download_url);
                return contentResponse.data;
            }
        }
        throw new Error(`Story or documentation file not found for ${category}/${component}`);
    })
};
