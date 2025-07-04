"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataAggregator = void 0;
/**
 * Aggregates component usage data into statistics
 */
class DataAggregator {
    /**
     * Aggregates component usage data into statistics
     * @param usages Array of component usages
     * @param config Analysis configuration
     * @param allComponents All available MRC components
     * @param mrcVersions MRC version information by MFE
     * @returns Report data
     */
    aggregate(usages, config, allComponents, mrcVersions) {
        var _a, _b, _c;
        // Group usages by component name
        const usagesByComponent = new Map();
        for (const usage of usages) {
            const { componentName } = usage;
            if (!usagesByComponent.has(componentName)) {
                usagesByComponent.set(componentName, []);
            }
            usagesByComponent.get(componentName).push(usage);
        }
        // Generate component stats
        const componentStats = [];
        for (const [componentName, componentUsages,] of usagesByComponent.entries()) {
            // Count usages by MFE
            const usagesByMfe = {};
            for (const usage of componentUsages) {
                usagesByMfe[usage.mfe] = (usagesByMfe[usage.mfe] || 0) + 1;
            }
            // Count prop usage
            const propCounts = new Map();
            for (const usage of componentUsages) {
                for (const prop of usage.props) {
                    propCounts.set(prop.name, (propCounts.get(prop.name) || 0) + 1);
                }
            }
            // Get most common props
            const commonProps = Array.from(propCounts.entries())
                .map(([name, count]) => ({ name, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 10);
            // Get files where the component is used
            const files = Array.from(new Set(componentUsages.map((usage) => usage.filePath)));
            // Count customization stats
            let styledComponentCount = 0;
            let customStylesCount = 0;
            const overriddenPropertiesCounts = {};
            for (const usage of componentUsages) {
                if ((_a = usage.customization) === null || _a === void 0 ? void 0 : _a.styledComponent) {
                    styledComponentCount++;
                }
                if ((_b = usage.customization) === null || _b === void 0 ? void 0 : _b.customStyles) {
                    customStylesCount++;
                }
                if ((_c = usage.customization) === null || _c === void 0 ? void 0 : _c.overriddenProperties) {
                    for (const prop of usage.customization.overriddenProperties) {
                        overriddenPropertiesCounts[prop] =
                            (overriddenPropertiesCounts[prop] || 0) + 1;
                    }
                }
            }
            // Add component stats
            componentStats.push({
                componentName,
                totalUsages: componentUsages.length,
                usagesByMfe,
                commonProps,
                files,
                customization: {
                    styledComponentCount,
                    customStylesCount,
                    overriddenPropertiesCounts,
                },
            });
        }
        // Sort component stats by total usages
        componentStats.sort((a, b) => b.totalUsages - a.totalUsages);
        // Generate overall stats
        const totalUsages = usages.length;
        // Most used components
        const mostUsedComponents = componentStats.slice(0, 10).map((stats) => ({
            name: stats.componentName,
            count: stats.totalUsages,
        }));
        // Most used props
        const allPropCounts = new Map();
        for (const usage of usages) {
            for (const prop of usage.props) {
                allPropCounts.set(prop.name, (allPropCounts.get(prop.name) || 0) + 1);
            }
        }
        const mostUsedProps = Array.from(allPropCounts.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);
        // MFE usage counts
        const mfeUsages = {};
        for (const usage of usages) {
            mfeUsages[usage.mfe] = (mfeUsages[usage.mfe] || 0) + 1;
        }
        // Find unused components
        const usedComponentNames = new Set(componentStats.map((s) => s.componentName));
        const unusedComponents = allComponents.filter((comp) => !usedComponentNames.has(comp.name));
        // Find unused components by MFE
        const unusedComponentsByMfe = {};
        // Initialize with all MFEs
        const mfeList = config.mfes.length > 0 ? config.mfes : ["broker-manager"];
        for (const mfe of mfeList) {
            unusedComponentsByMfe[mfe] = [];
        }
        // For each component, check which MFEs don't use it
        for (const component of allComponents) {
            const stat = componentStats.find((s) => s.componentName === component.name);
            if (!stat) {
                // If component is not used at all, add to all MFEs
                for (const mfe of mfeList) {
                    unusedComponentsByMfe[mfe].push(component.name);
                }
            }
            else {
                // If component is used in some MFEs but not others
                for (const mfe of mfeList) {
                    if (!stat.usagesByMfe[mfe]) {
                        unusedComponentsByMfe[mfe].push(component.name);
                    }
                }
            }
        }
        // Generate report data
        const reportData = {
            generatedAt: new Date().toISOString(),
            config,
            mrcVersions,
            componentStats,
            unusedComponents,
            unusedComponentsByMfe,
            overallStats: {
                totalUsages,
                mostUsedComponents,
                mostUsedProps,
                mfeUsages,
                totalUnusedComponents: unusedComponents.length,
            },
            rawData: {
                componentUsages: usages,
            },
        };
        return reportData;
    }
}
exports.DataAggregator = DataAggregator;
