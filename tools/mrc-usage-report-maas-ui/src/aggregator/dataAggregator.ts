import { ComponentUsage, ComponentStats, ReportData, AnalysisConfig } from "../types";

/**
 * Aggregates component usage data into statistics
 */
export class DataAggregator {
	/**
	 * Aggregates component usage data into statistics
	 * @param usages Array of component usages
	 * @param config Analysis configuration
	 * @param allComponents All available MRC components
	 * @param mrcVersions MRC version information by MFE
	 * @returns Report data
	 */
	aggregate(usages: ComponentUsage[], config: AnalysisConfig, allComponents: { name: string; path: string }[], mrcVersions: Record<string, string>): ReportData {
		// Group usages by component name
		const usagesByComponent = new Map<string, ComponentUsage[]>();

		for (const usage of usages) {
			const { componentName } = usage;
			if (!usagesByComponent.has(componentName)) {
				usagesByComponent.set(componentName, []);
			}
			usagesByComponent.get(componentName)!.push(usage);
		}

		// Generate component stats
		const componentStats: ComponentStats[] = [];

		for (const [componentName, componentUsages] of usagesByComponent.entries()) {
			// Count usages by MFE
			const usagesByMfe: Record<string, number> = {};
			for (const usage of componentUsages) {
				usagesByMfe[usage.mfe] = (usagesByMfe[usage.mfe] || 0) + 1;
			}

			// Count prop usage
			const propCounts = new Map<string, number>();
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
			const overriddenPropertiesCounts: Record<string, number> = {};

			for (const usage of componentUsages) {
				if (usage.customization?.styledComponent) {
					styledComponentCount++;
				}
				if (usage.customization?.customStyles) {
					customStylesCount++;
				}
				if (usage.customization?.overriddenProperties) {
					for (const prop of usage.customization.overriddenProperties) {
						overriddenPropertiesCounts[prop] = (overriddenPropertiesCounts[prop] || 0) + 1;
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
					overriddenPropertiesCounts
				}
			});
		}

		// Sort component stats by total usages
		componentStats.sort((a, b) => b.totalUsages - a.totalUsages);

		// Generate overall stats
		const totalUsages = usages.length;

		// Most used components
		const mostUsedComponents = componentStats.slice(0, 10).map((stats) => ({
			name: stats.componentName,
			count: stats.totalUsages
		}));

		// Most used props
		const propCounts = new Map<string, number>();
		for (const usage of usages) {
			for (const prop of usage.props) {
				propCounts.set(prop.name, (propCounts.get(prop.name) || 0) + 1);
			}
		}

		const mostUsedProps = Array.from(propCounts.entries())
			.map(([name, count]) => ({ name, count }))
			.sort((a, b) => b.count - a.count)
			.slice(0, 10);

		// MFE usage counts
		const mfeUsages: Record<string, number> = {};
		for (const usage of usages) {
			mfeUsages[usage.mfe] = (mfeUsages[usage.mfe] || 0) + 1;
		}

		// Find unused components
		const usedComponentNames = new Set(componentStats.map((stat) => stat.componentName));
		const unusedComponents = allComponents.filter((comp) => !usedComponentNames.has(comp.name));

		// Find unused components by MFE
		const unusedComponentsByMfe: Record<string, string[]> = {};

		// Initialize with all MFEs
		for (const mfe of config.mfes) {
			unusedComponentsByMfe[mfe] = [];
		}

		// For each component, check which MFEs don't use it
		for (const component of allComponents) {
			const stat = componentStats.find((s) => s.componentName === component.name);

			if (!stat) {
				// If component is not used at all, add to all MFEs
				for (const mfe of config.mfes) {
					unusedComponentsByMfe[mfe].push(component.name);
				}
			} else {
				// If component is used in some MFEs but not others
				for (const mfe of config.mfes) {
					if (!stat.usagesByMfe[mfe]) {
						unusedComponentsByMfe[mfe].push(component.name);
					}
				}
			}
		}

		// Generate report data
		const reportData: ReportData = {
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
				totalUnusedComponents: unusedComponents.length
			},
			rawData: {
				componentUsages: usages
			}
		};

		return reportData;
	}
}
