"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonMerger = void 0;
class JsonMerger {
    /**
     * Merges multiple ReportData objects into a single consolidated ReportData object.
     * @param reports An array of ReportData objects to merge.
     * @returns A new ReportData object containing the merged data.
     */
    mergeReports(reports) {
        if (reports.length === 0) {
            throw new Error("No reports provided for merging.");
        }
        // Initialize with the first report's structure
        const mergedReport = JSON.parse(JSON.stringify(reports[0]));
        // Clear dynamic data for aggregation
        mergedReport.componentStats = [];
        mergedReport.overallStats.totalUsages = 0;
        mergedReport.overallStats.mfeUsages = {};
        mergedReport.unusedComponents = [];
        mergedReport.unusedComponentsByMfe = {};
        mergedReport.mrcVersions = {};
        const componentMap = new Map();
        const allUnusedComponents = [];
        const allUnusedComponentsByMfe = {};
        for (const report of reports) {
            // Aggregate componentStats
            for (const compStat of report.componentStats) {
                if (componentMap.has(compStat.componentName)) {
                    const existingStat = componentMap.get(compStat.componentName);
                    existingStat.totalUsages += compStat.totalUsages;
                    for (const mfe in compStat.usagesByMfe) {
                        existingStat.usagesByMfe[mfe] =
                            (existingStat.usagesByMfe[mfe] || 0) + compStat.usagesByMfe[mfe];
                    }
                    existingStat.files.push(...compStat.files);
                    // Simple concatenation for commonProps, might need more sophisticated merging if props have complex structures
                    existingStat.commonProps.push(...compStat.commonProps);
                    existingStat.customization.styledComponentCount +=
                        compStat.customization.styledComponentCount;
                    existingStat.customization.customStylesCount += compStat.customization.customStylesCount;
                    for (const prop in compStat.customization.overriddenPropertiesCounts) {
                        existingStat.customization.overriddenPropertiesCounts[prop] =
                            (existingStat.customization.overriddenPropertiesCounts[prop] || 0) +
                                compStat.customization.overriddenPropertiesCounts[prop];
                    }
                }
                else {
                    componentMap.set(compStat.componentName, JSON.parse(JSON.stringify(compStat)));
                }
            }
            // Aggregate overallStats
            mergedReport.overallStats.totalUsages += report.overallStats.totalUsages;
            for (const mfe in report.overallStats.mfeUsages) {
                mergedReport.overallStats.mfeUsages[mfe] =
                    (mergedReport.overallStats.mfeUsages[mfe] || 0) + report.overallStats.mfeUsages[mfe];
            }
            // Aggregate unusedComponents
            allUnusedComponents.push(...report.unusedComponents);
            // Aggregate unusedComponentsByMfe
            for (const mfe in report.unusedComponentsByMfe) {
                if (!allUnusedComponentsByMfe[mfe]) {
                    allUnusedComponentsByMfe[mfe] = [];
                }
                allUnusedComponentsByMfe[mfe].push(...report.unusedComponentsByMfe[mfe]);
            }
            // Aggregate mrcVersions (take the latest or first encountered for each MFE)
            for (const mfe in report.mrcVersions) {
                mergedReport.mrcVersions[mfe] = report.mrcVersions[mfe];
            }
        }
        mergedReport.componentStats = Array.from(componentMap.values());
        mergedReport.unusedComponents = this.deduplicateComponents(allUnusedComponents);
        mergedReport.unusedComponentsByMfe =
            this.deduplicateUnusedComponentsByMfe(allUnusedComponentsByMfe);
        // Update generatedAt to current time
        mergedReport.generatedAt = new Date().toISOString();
        return mergedReport;
    }
    deduplicateComponents(components) {
        const seen = new Set();
        return components.filter((comp) => {
            const key = `${comp.name}-${comp.path}`;
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
    }
    deduplicateUnusedComponentsByMfe(unusedByMfe) {
        const result = {};
        for (const mfe in unusedByMfe) {
            result[mfe] = Array.from(new Set(unusedByMfe[mfe]));
        }
        return result;
    }
}
exports.JsonMerger = JsonMerger;
