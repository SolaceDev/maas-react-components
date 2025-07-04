"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportMerger = void 0;
class ReportMerger {
    mergeReports(reports) {
        if (reports.length === 0) {
            throw new Error("Cannot merge an empty list of reports.");
        }
        if (reports.length === 1) {
            return reports[0];
        }
        // Deep copy the initial report to avoid modifying the original object
        const initialReport = reports[0];
        let mergedReport = JSON.parse(JSON.stringify(initialReport));
        mergedReport.generatedAt = new Date().toISOString();
        for (let i = 1; i < reports.length; i++) {
            const nextReport = reports[i];
            mergedReport = {
                generatedAt: new Date().toISOString(), // Use current time for merged report
                config: this.mergeConfigs(mergedReport.config, nextReport.config),
                mrcVersions: { ...mergedReport.mrcVersions, ...nextReport.mrcVersions }, // Later versions overwrite earlier ones
                componentStats: this.mergeComponentStats(mergedReport.componentStats, nextReport.componentStats),
                unusedComponents: this.mergeUnusedComponents(mergedReport.unusedComponents, nextReport.unusedComponents),
                unusedComponentsByMfe: this.mergeUnusedComponentsByMfe(mergedReport.unusedComponentsByMfe, nextReport.unusedComponentsByMfe),
                overallStats: {}, // Will be recalculated
                rawData: {
                    componentUsages: [
                        ...mergedReport.rawData.componentUsages,
                        ...nextReport.rawData.componentUsages
                    ]
                }
            };
        }
        // Recalculate overallStats based on the final merged data
        mergedReport.overallStats = this.recalculateOverallStats(mergedReport);
        return mergedReport;
    }
    mergeConfigs(config1, config2) {
        const mergedMfes = Array.from(new Set([...config1.mfes, ...config2.mfes]));
        return {
            ...config1, // Prefer config1 (maas-ops-ui) for other properties
            mfes: mergedMfes
        };
    }
    mergeComponentStats(stats1, stats2) {
        const mergedStatsMap = new Map();
        [...stats1, ...stats2].forEach((stats) => {
            if (mergedStatsMap.has(stats.componentName)) {
                const existingStats = mergedStatsMap.get(stats.componentName);
                existingStats.totalUsages += stats.totalUsages;
                // Merge usagesByMfe
                for (const mfe in stats.usagesByMfe) {
                    existingStats.usagesByMfe[mfe] =
                        (existingStats.usagesByMfe[mfe] || 0) + stats.usagesByMfe[mfe];
                }
                // Merge commonProps
                stats.commonProps.forEach((prop) => {
                    const existingProp = existingStats.commonProps.find((p) => p.name === prop.name);
                    if (existingProp) {
                        existingProp.count += prop.count;
                    }
                    else {
                        existingStats.commonProps.push({ ...prop });
                    }
                });
                // Merge files and deduplicate
                existingStats.files = Array.from(new Set([...existingStats.files, ...stats.files]));
                // Merge customization
                existingStats.customization.styledComponentCount +=
                    stats.customization.styledComponentCount;
                existingStats.customization.customStylesCount += stats.customization.customStylesCount;
                for (const prop in stats.customization.overriddenPropertiesCounts) {
                    existingStats.customization.overriddenPropertiesCounts[prop] =
                        (existingStats.customization.overriddenPropertiesCounts[prop] || 0) +
                            stats.customization.overriddenPropertiesCounts[prop];
                }
            }
            else {
                // Deep copy the stats object to avoid modifying the original
                mergedStatsMap.set(stats.componentName, JSON.parse(JSON.stringify(stats)));
            }
        });
        return Array.from(mergedStatsMap.values());
    }
    mergeUnusedComponents(unused1, unused2) {
        const allUnused = [...unused1, ...unused2];
        const uniqueUnused = new Map();
        allUnused.forEach((comp) => {
            const key = `${comp.name}-${comp.path}`;
            if (!uniqueUnused.has(key)) {
                uniqueUnused.set(key, comp);
            }
        });
        return Array.from(uniqueUnused.values());
    }
    mergeUnusedComponentsByMfe(unusedByMfe1, unusedByMfe2) {
        const merged = {};
        // Add all from unusedByMfe1
        for (const mfe in unusedByMfe1) {
            merged[mfe] = [...unusedByMfe1[mfe]];
        }
        // Merge with unusedByMfe2
        for (const mfe in unusedByMfe2) {
            if (merged[mfe]) {
                merged[mfe] = Array.from(new Set([...merged[mfe], ...unusedByMfe2[mfe]]));
            }
            else {
                merged[mfe] = [...unusedByMfe2[mfe]];
            }
        }
        return merged;
    }
    recalculateOverallStats(reportData) {
        let totalUsages = 0;
        const mfeUsages = {};
        const componentUsageMap = new Map();
        const propUsageMap = new Map();
        reportData.componentStats.forEach((compStat) => {
            totalUsages += compStat.totalUsages;
            componentUsageMap.set(compStat.componentName, compStat.totalUsages);
            for (const mfe in compStat.usagesByMfe) {
                mfeUsages[mfe] = (mfeUsages[mfe] || 0) + compStat.usagesByMfe[mfe];
            }
            compStat.commonProps.forEach((prop) => {
                propUsageMap.set(prop.name, (propUsageMap.get(prop.name) || 0) + prop.count);
            });
        });
        const mostUsedComponents = Array.from(componentUsageMap.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10); // Top 10
        const mostUsedProps = Array.from(propUsageMap.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10); // Top 10
        return {
            totalUsages: totalUsages,
            mostUsedComponents: mostUsedComponents,
            mostUsedProps: mostUsedProps,
            mfeUsages: mfeUsages,
            totalUnusedComponents: reportData.unusedComponents.length
        };
    }
}
exports.ReportMerger = ReportMerger;
