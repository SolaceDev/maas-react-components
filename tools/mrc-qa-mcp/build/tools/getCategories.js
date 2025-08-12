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
exports.getCategories = void 0;
const axios_1 = __importDefault(require("axios"));
exports.getCategories = {
    name: "get_categories",
    description: "Retrieves the list of component categories from Storybook.",
    inputSchema: {
        type: "object",
        properties: {},
        required: []
    },
    handler: () => __awaiter(void 0, void 0, void 0, function* () {
        const url = "https://api.github.com/repos/SolaceDev/maas-react-components/contents/storybook/src/stories";
        const headers = {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
            "X-GitHub-Api-Version": "2022-11-28"
        };
        const response = yield axios_1.default.get(url, { headers });
        if (Array.isArray(response.data)) {
            const categories = response.data
                .filter((item) => item.type === "dir")
                .map((item) => item.name);
            return JSON.stringify(categories, null, 2);
        }
        return JSON.stringify([], null, 2);
    })
};
