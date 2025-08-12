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
exports.getAllComponentsByCategory = void 0;
const axios_1 = __importDefault(require("axios"));
exports.getAllComponentsByCategory = {
    name: "get_all_components_by_category",
    description: "Retrieves all component categories and their components from Storybook.",
    inputSchema: {
        type: "object",
        properties: {},
        required: []
    },
    handler: (params) => __awaiter(void 0, void 0, void 0, function* () {
        const { ref } = params;
        const headers = {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
            "X-GitHub-Api-Version": "2022-11-28"
        };
        try {
            const categoriesUrl = `https://api.github.com/repos/SolaceDev/maas-react-components/contents/storybook/src/stories`;
            const categoriesResponse = yield axios_1.default.get(categoriesUrl, { headers, params: { ref } });
            let categories = [];
            if (Array.isArray(categoriesResponse.data)) {
                categories = categoriesResponse.data
                    .filter((item) => item.type === "dir")
                    .map((item) => item.name);
            }
            const allComponents = {};
            const componentPromises = categories.map((category) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const componentsUrl = `https://api.github.com/repos/SolaceDev/maas-react-components/contents/storybook/src/stories/${category}`;
                    const componentsResponse = yield axios_1.default.get(componentsUrl, { headers, params: { ref } });
                    if (Array.isArray(componentsResponse.data)) {
                        allComponents[category] = componentsResponse.data
                            .filter((item) => item.type === "dir")
                            .map((item) => item.name);
                    }
                    else {
                        allComponents[category] = [];
                    }
                }
                catch (error) {
                    // eslint-disable-next-line no-console
                    console.error(`Error fetching components for category ${category}:`, error);
                    allComponents[category] = [];
                }
            }));
            yield Promise.all(componentPromises);
            return allComponents;
        }
        catch (error) {
            // eslint-disable-next-line no-console
            console.error("Error fetching categories:", error);
            return {};
        }
    })
};
