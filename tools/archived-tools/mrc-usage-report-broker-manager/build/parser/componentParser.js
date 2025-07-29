"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.ComponentParser = void 0;
const parser = __importStar(require("@babel/parser"));
const traverse_1 = __importDefault(require("@babel/traverse"));
const t = __importStar(require("@babel/types"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Parses files for MRC component usage
 */
class ComponentParser {
    constructor(mrcPath, mrcSourceType = "local") {
        this.mrcPath = mrcPath;
        this.mrcSourceType = mrcSourceType;
        this.mrcComponentNames = new Set();
        this.mrcFileNames = new Set();
        this.exportNameToFileNameToExportName = new Map();
        this.fileNameToExportName = new Map();
    }
    /**
     * Initializes the parser by loading all MRC component names
     * @param componentInfo Array of MRC component information with exported names
     */
    initialize(componentInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const component of componentInfo) {
                // Get both the exported name and the file name
                const exportedName = component.name;
                const fileName = path_1.default.basename(component.path);
                const fileNameWithoutExt = path_1.default.parse(fileName).name;
                // Add both to our sets
                this.mrcComponentNames.add(exportedName);
                this.mrcFileNames.add(fileNameWithoutExt);
                // Create mappings between them
                this.exportNameToFileNameToExportName.set(exportedName, fileNameWithoutExt);
                this.fileNameToExportName.set(fileNameWithoutExt, exportedName);
            }
            console.log(`Loaded ${this.mrcComponentNames.size} MRC component names and ${this.mrcFileNames.size} file names`);
            // Log some examples of the mappings for debugging
            let count = 0;
            for (const [exportedName, fileName] of this.exportNameToFileNameToExportName.entries()) {
                if (exportedName !== fileName) {
                    console.log(`Export mapping: ${exportedName} -> ${fileName}`);
                    count++;
                    if (count >= 5)
                        break; // Just log a few examples
                }
            }
        });
    }
    /**
     * Parses a file for MRC component usage
     * @param filePath Path to the file to parse
     * @param mfe The MFE the file belongs to
     * @returns Array of component usages found in the file
     */
    parseFile(filePath, mfe) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const content = fs_1.default.readFileSync(filePath, "utf-8");
                const usages = [];
                // Parse the file
                const ast = parser.parse(content, {
                    sourceType: "module",
                    plugins: ["jsx", "typescript", "decorators-legacy"]
                });
                // Track imported MRC components
                const importedComponents = new Map();
                // Track imported components that are considered used just by being imported
                const importedComponentUsages = new Map();
                // Traverse the AST
                (0, traverse_1.default)(ast, {
                    // Find imports from @SolaceDev/maas-react-components
                    ImportDeclaration: (path) => {
                        var _a;
                        const source = path.node.source.value;
                        if (source === "@SolaceDev/maas-react-components") {
                            // Get the line number of the import declaration
                            const lineNumber = ((_a = path.node.loc) === null || _a === void 0 ? void 0 : _a.start.line) || 0;
                            path.node.specifiers.forEach((specifier) => {
                                if (t.isImportSpecifier(specifier) && t.isIdentifier(specifier.imported)) {
                                    const importedName = specifier.imported.name;
                                    const localName = specifier.local.name;
                                    let componentName = importedName;
                                    let isComponent = false;
                                    // First check if it's a direct match with an exported name
                                    if (this.mrcComponentNames.has(importedName)) {
                                        isComponent = true;
                                    }
                                    // Then check if it matches a file name and get the corresponding exported name
                                    else if (this.mrcFileNames.has(importedName) && this.fileNameToExportName.has(importedName)) {
                                        componentName = this.fileNameToExportName.get(importedName);
                                        isComponent = true;
                                        // console.log(`Found component by file name: ${importedName} -> ${componentName}`);
                                    }
                                    if (isComponent) {
                                        importedComponents.set(localName, componentName);
                                        // Consider the component as used just by being imported
                                        // This handles cases where components are imported but not used as JSX elements
                                        importedComponentUsages.set(componentName, {
                                            componentName: componentName,
                                            filePath: filePath,
                                            mfe: mfe,
                                            lineNumber: lineNumber,
                                            props: []
                                        });
                                    }
                                }
                            });
                        }
                    },
                    // Find JSX elements that use MRC components
                    JSXOpeningElement: (path) => {
                        var _a;
                        let elementName = null;
                        if (t.isJSXIdentifier(path.node.name)) {
                            elementName = path.node.name.name;
                        }
                        else if (t.isJSXMemberExpression(path.node.name)) {
                            // Handle cases like <Namespace.Component>
                            elementName = `${path.node.name.object.name}.${path.node.name.property.name}`;
                        }
                        if (elementName) {
                            let componentName = null;
                            // Check if the element name is an imported MRC component
                            if (importedComponents.has(elementName)) {
                                componentName = importedComponents.get(elementName);
                            }
                            else if (this.mrcComponentNames.has(elementName)) {
                                // Direct usage of an MRC component not necessarily imported with a local name
                                componentName = elementName;
                            }
                            else if (this.mrcFileNames.has(elementName) && this.fileNameToExportName.has(elementName)) {
                                // Usage by file name
                                componentName = this.fileNameToExportName.get(elementName);
                            }
                            if (componentName) {
                                const props = [];
                                // Extract props
                                path.node.attributes.forEach((attr) => {
                                    if (t.isJSXAttribute(attr) && t.isJSXIdentifier(attr.name)) {
                                        const propName = attr.name.name;
                                        let propType = "unknown";
                                        let propValue = ""; // value is always a string now
                                        if (attr.value) {
                                            if (t.isStringLiteral(attr.value)) {
                                                propType = "string";
                                                propValue = attr.value.value;
                                            }
                                            else if (t.isJSXExpressionContainer(attr.value) &&
                                                !t.isJSXEmptyExpression(attr.value.expression)) {
                                                const expression = attr.value.expression;
                                                if (t.isNumericLiteral(expression)) {
                                                    propType = "number";
                                                    propValue = String(expression.value);
                                                }
                                                else if (t.isBooleanLiteral(expression)) {
                                                    propType = "boolean";
                                                    propValue = String(expression.value);
                                                }
                                                else if (t.isNullLiteral(expression)) {
                                                    propType = "null";
                                                    propValue = "null";
                                                }
                                                else if (t.isIdentifier(expression)) {
                                                    propType = "variable";
                                                    propValue = expression.name;
                                                }
                                                else {
                                                    if (t.isObjectExpression(expression)) {
                                                        propType = "object";
                                                    }
                                                    else if (t.isArrayExpression(expression)) {
                                                        propType = "array";
                                                    }
                                                    else if (t.isArrowFunctionExpression(expression) || t.isFunctionExpression(expression)) {
                                                        propType = "function";
                                                    }
                                                    else if (t.isJSXElement(expression) || t.isJSXFragment(expression)) {
                                                        propType = "jsx";
                                                    }
                                                    else {
                                                        propType = "expression";
                                                    }
                                                    propValue = content.substring(expression.start, expression.end);
                                                }
                                            }
                                        }
                                        else {
                                            // Boolean prop without value
                                            propType = "boolean";
                                            propValue = "true";
                                        }
                                        props.push({
                                            name: propName,
                                            type: propType,
                                            value: propValue
                                        });
                                    }
                                    else if (t.isJSXSpreadAttribute(attr)) {
                                        const argument = attr.argument;
                                        props.push({
                                            name: "...",
                                            type: "spread",
                                            value: content.substring(argument.start, argument.end)
                                        });
                                    }
                                });
                                // Get line number
                                const lineNumber = ((_a = path.node.loc) === null || _a === void 0 ? void 0 : _a.start.line) || 0;
                                // Add the usage
                                usages.push({
                                    componentName,
                                    filePath,
                                    mfe,
                                    lineNumber,
                                    props
                                });
                                // Remove from importedComponentUsages since we've found an actual JSX usage
                                importedComponentUsages.delete(componentName);
                            }
                        }
                    }
                });
                // Add all imported components that weren't used as JSX elements
                usages.push(...Array.from(importedComponentUsages.values()));
                return usages;
            }
            catch (error) {
                console.error(`Error parsing file ${filePath}:`, error);
                return [];
            }
        });
    }
}
exports.ComponentParser = ComponentParser;
