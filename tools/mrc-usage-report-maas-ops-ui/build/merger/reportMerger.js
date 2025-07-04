"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportMerger = void 0;
class ReportMerger {
    mergeReports(report1, report2) {
        const mergedReport = {
            generatedAt: new Date().toISOString(), // Use current time for merged report
            config: this.mergeConfigs(report1.config, report2.config),
            mrcVersions: Object.assign(Object.assign({}, report1.mrcVersions), report2.mrcVersions), // Desktop versions overwrite maas-ops-ui
            componentStats: this.mergeComponentStats(report1.componentStats, report2.componentStats),
            unusedComponents: this.mergeUnusedComponents(report1.unusedComponents, report2.unusedComponents),
            unusedComponentsByMfe: this.mergeUnusedComponentsByMfe(report1.unusedComponentsByMfe, report2.unusedComponentsByMfe),
            overallStats: {}, // Will be recalculated
            rawData: {
                componentUsages: [...report1.rawData.componentUsages, ...report2.rawData.componentUsages]
            }
        };
        // Recalculate overallStats based on merged data
        mergedReport.overallStats = this.recalculateOverallStats(mergedReport);
        return mergedReport;
    }
    mergeConfigs(config1, config2) {
        const mergedMfes = Array.from(new Set([...config1.mfes, ...config2.mfes]));
        return Object.assign(Object.assign({}, config1), { mfes: mergedMfes });
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
                        existingStats.commonProps.push(Object.assign({}, prop));
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
                mergedStatsMap.set(stats.componentName, Object.assign({}, stats));
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
