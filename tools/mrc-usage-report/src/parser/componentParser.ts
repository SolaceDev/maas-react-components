/* eslint-disable no-console */
/* eslint-disable sonarjs/cognitive-complexity */
import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import * as t from "@babel/types";
import fs from "fs";
import path from "path";
import { ComponentProp } from "../types";
import { MrcSourceType } from "../types";
import { transformFilePath } from "../utils";

// Represents a single found instance of a component
export interface FoundComponentInstance {
	componentName: string;
	filePath: string;
	mfe: string;
	lineNumber: number;
	props: ComponentProp[];
}

/**
 * Parses files for MRC component usage
 */
export class ComponentParser {
	private mrcComponentNames: Set<string>;
	private mrcFileNames: Set<string>;
	private mrcPath: string;
	private mrcSourceType: MrcSourceType;
	private exportNameToFileName: Map<string, string>;
	private fileNameToExportName: Map<string, string>;

	constructor(mrcPath: string, mrcSourceType: MrcSourceType = "local") {
		this.mrcPath = mrcPath;
		this.mrcSourceType = mrcSourceType;
		this.mrcComponentNames = new Set<string>();
		this.mrcFileNames = new Set<string>();
		this.exportNameToFileName = new Map<string, string>();
		this.fileNameToExportName = new Map<string, string>();
	}

	/**
	 * Initializes the parser by loading all MRC component names
	 * @param componentInfo Array of MRC component information with exported names
	 */
	async initialize(componentInfo: { name: string; path: string }[]): Promise<void> {
		for (const component of componentInfo) {
			// Get both the exported name and the file name
			const exportedName = component.name;
			const fileName = path.basename(component.path);
			const fileNameWithoutExt = path.parse(fileName).name;

			// Add both to our sets
			this.mrcComponentNames.add(exportedName);
			this.mrcFileNames.add(fileNameWithoutExt);

			// Create mappings between them
			this.exportNameToFileName.set(exportedName, fileNameWithoutExt);
			this.fileNameToExportName.set(fileNameWithoutExt, exportedName);
		}

		console.log(`Loaded ${this.mrcComponentNames.size} MRC component names and ${this.mrcFileNames.size} file names`);

		// Log some examples of the mappings for debugging
		let count = 0;
		for (const [exportName, fileName] of this.exportNameToFileName.entries()) {
			if (exportName !== fileName) {
				console.log(`Export mapping: ${exportName} -> ${fileName}`);
				count++;
				if (count >= 5) break; // Just log a few examples
			}
		}
	}

	/**
	 * Parses a file for MRC component usage
	 * @param filePath Path to the file to parse
	 * @param mfe The MFE the file belongs to
	 * @returns Array of component usages found in the file
	 */
	async parseFile(filePath: string, mfe: string): Promise<FoundComponentInstance[]> {
		try {
			const content = fs.readFileSync(filePath, "utf-8");
			const usages: FoundComponentInstance[] = [];

			// Parse the file
			const ast = parser.parse(content, {
				sourceType: "module",
				plugins: [
					"typescript",
					"jsx",
					"decorators-legacy",
					"classProperties",
					"classPrivateMethods",
					"classPrivateProperties",
					"numericSeparator",
					"optionalChaining",
					"nullishCoalescingOperator",
					"throwExpressions",
					"topLevelAwait",
					"logicalAssignment"
				]
			});

			// Track imported MRC components
			const importedComponents = new Map<string, string>();
			// Track imported components that are considered used just by being imported
			const importedComponentUsages = new Map<string, FoundComponentInstance>();

			// Traverse the AST
			traverse(ast, {
				// Find imports from @SolaceDev/maas-react-components
				ImportDeclaration: (path) => {
					const source = path.node.source.value;
					if (source === "@SolaceDev/maas-react-components") {
						// Get the line number of the import declaration
						const lineNumber = path.node.loc?.start.line || 0;

						path.node.specifiers.forEach((specifier) => {
							if (t.isImportSpecifier(specifier) && t.isIdentifier(specifier.imported)) {
								const importedName = specifier.imported.name;
								const localName = specifier.local.name;

								// Check if this is an MRC component by exported name or file name
								let componentName = importedName;
								let isComponent = false;

								// First check if it's a direct match with an exported name
								if (this.mrcComponentNames.has(importedName)) {
									isComponent = true;
								}
								// Then check if it matches a file name and get the corresponding export name
								else if (this.mrcFileNames.has(importedName) && this.fileNameToExportName.has(importedName)) {
									componentName = this.fileNameToExportName.get(importedName)!;
									isComponent = true;
									console.log(`Found component by file name: ${importedName} -> ${componentName}`);
								}

								if (isComponent) {
									importedComponents.set(localName, componentName);

									// Consider the component as used just by being imported
									// This handles cases where components are imported but not used as JSX elements
									importedComponentUsages.set(componentName, {
										componentName,
										filePath: transformFilePath(filePath).url,
										mfe,
										lineNumber,
										props: []
									});
								}
							}
						});
					}
				},

				// Find JSX elements that use MRC components
				JSXOpeningElement: (path) => {
					const elementName = path.node.name;
					let componentName: string | null = null;

					// Handle different types of JSX element names
					if (t.isJSXIdentifier(elementName)) {
						const localName = elementName.name;
						componentName = importedComponents.get(localName) || null;
					}

					// If this is an MRC component, extract usage information
					if (componentName) {
						const props: ComponentProp[] = [];

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
									} else if (t.isJSXExpressionContainer(attr.value) && !t.isJSXEmptyExpression(attr.value.expression)) {
										const expression = attr.value.expression;
										if (t.isNumericLiteral(expression)) {
											propType = "number";
											propValue = String(expression.value);
										} else if (t.isBooleanLiteral(expression)) {
											propType = "boolean";
											propValue = String(expression.value);
										} else if (t.isNullLiteral(expression)) {
											propType = "null";
											propValue = "null";
										} else if (t.isIdentifier(expression)) {
											propType = "variable";
											propValue = expression.name;
										} else {
											if (t.isObjectExpression(expression)) {
												propType = "object";
											} else if (t.isArrayExpression(expression)) {
												propType = "array";
											} else if (t.isArrowFunctionExpression(expression) || t.isFunctionExpression(expression)) {
												propType = "function";
											} else if (t.isJSXElement(expression) || t.isJSXFragment(expression)) {
												propType = "jsx";
											} else {
												propType = "expression";
											}
											propValue = content.substring(expression.start!, expression.end!);
										}
									}
								} else {
									// Boolean prop without value
									propType = "boolean";
									propValue = "true";
								}

								props.push({
									name: propName,
									type: propType,
									value: propValue
								});
							} else if (t.isJSXSpreadAttribute(attr)) {
								const argument = attr.argument;
								props.push({
									name: "...",
									type: "spread",
									value: content.substring(argument.start!, argument.end!)
								});
							}
						});

						// Get line number
						const lineNumber = path.node.loc?.start.line || 0;

						// Add the usage
						usages.push({
							componentName,
							filePath: transformFilePath(filePath).url,
							mfe,
							lineNumber,
							props
						});

						// Remove from importedComponentUsages since we've found an actual JSX usage
						importedComponentUsages.delete(componentName);
					}
				}
			});

			// Add all imported components that weren't used as JSX elements
			usages.push(...importedComponentUsages.values());

			return usages;
		} catch (error) {
			console.error(`Error parsing file ${filePath}:`, error);
			return [];
		}
	}
}
