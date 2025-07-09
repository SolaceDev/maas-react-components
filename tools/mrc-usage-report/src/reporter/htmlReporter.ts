import fs from "fs";
import path from "path";
import { ReportData } from "../types";

/**
 * Generates an HTML report from the component usage data
 */
export class HtmlReporter {
	/**
	 * Generates an HTML report from the component usage data
	 * @param reportData The report data
	 * @param outputPath The path to write the report to
	 */
	async generateReport(reportData: ReportData, outputPath: string): Promise<void> {
		const html = this.generateHtml(reportData);

		// Create the output directory if it doesn't exist
		const outputDir = path.dirname(outputPath);
		if (!fs.existsSync(outputDir)) {
			fs.mkdirSync(outputDir, { recursive: true });
		}

		// Write the HTML to the output file
		fs.writeFileSync(outputPath, html);

		// console.log(`HTML report generated at ${outputPath}`);
	}

	/**
	 * Generates the HTML for the report
	 * @param reportData The report data
	 * @returns The HTML string
	 */
	private generateHtml(reportData: ReportData): string {
		const { componentStats, overallStats, generatedAt, config } = reportData;

		// Format date
		const formattedDate = new Date(generatedAt).toLocaleString();

		// Generate HTML
		return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MRC Component Usage Report</title>
  <style>
    :root {
      --primary-color: #0066cc;
      --secondary-color: #f0f0f0;
      --text-color: #333;
      --border-color: #ddd;
      --hover-color: #f9f9f9;
      --header-bg: #0066cc;
      --header-text: white;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: var(--text-color);
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background-color: white;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    
    header {
      background-color: var(--header-bg);
      color: var(--header-text);
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 5px;
    }
    
    h1, h2, h3 {
      margin-top: 0;
    }
    
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .summary-card {
      background-color: white;
      border: 1px solid var(--border-color);
      border-radius: 5px;
      padding: 15px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    }
    
    .chart-container {
      height: 300px;
      margin-bottom: 30px;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }
    
    th, td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid var(--border-color);
    }
    
    th {
      background-color: var(--secondary-color);
      font-weight: bold;
    }
    
    tr:hover {
      background-color: var(--hover-color);
    }
    
    .component-details {
      margin-bottom: 40px;
      border: 1px solid var(--border-color);
      border-radius: 5px;
      overflow: hidden;
    }
    
    .component-header {
      background-color: var(--secondary-color);
      padding: 15px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .component-content {
      padding: 0 15px;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-out;
    }
    
    .component-content.active {
      max-height: 500px;
      padding: 15px;
      overflow-y: auto;
    }

    .instance-details {
      border: 1px solid #eee;
      padding: 10px;
      margin-top: 10px;
      border-radius: 4px;
    }
    
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 12px;
      background-color: var(--primary-color);
      color: white;
      font-size: 0.8em;
    }
    
    .tabs {
      display: flex;
      border-bottom: 1px solid var(--border-color);
      margin-bottom: 20px;
    }
    
    .tab {
      padding: 10px 20px;
      cursor: pointer;
      border: 1px solid transparent;
      border-bottom: none;
      margin-right: 5px;
      border-radius: 5px 5px 0 0;
    }
    
    .tab.active {
      background-color: white;
      border-color: var(--border-color);
      border-bottom: 1px solid white;
      margin-bottom: -1px;
    }
    
    .tab-content {
      display: none;
    }
    
    .tab-content.active {
      display: block;
    }
    
    .search-container {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 10px;
      align-items: center;
      margin-bottom: 20px;
    }

    .search-container input {
      width: 100%;
      padding: 10px;
      border: 1px solid var(--border-color);
      border-radius: 5px;
      font-size: 16px;
    }
    
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid var(--border-color);
      text-align: center;
      font-size: 0.9em;
      color: #666;
    }
    
    /* Charts */
    .bar {
      fill: var(--primary-color);
    }
    
    .bar:hover {
      fill: #004c99;
    }
    
    .axis text {
      font-size: 12px;
    }
    
    .axis path,
    .axis line {
      fill: none;
      stroke: #000;
      shape-rendering: crispEdges;
    }

    #downloadJsonBtn {
      background-color: #4CAF50; /* Green */
      border: none;
      color: white;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      border-radius: 5px;
    }
  </style>
  <script src="https://d3js.org/d3.v7.min.js"></script>
</head>
<body>
  <div class="container">
    <header>
      <h1>MRC Component Usage Report</h1>
      <p>Generated on ${formattedDate}</p>
      <button id="downloadJsonBtn">Download JSON</button>
    </header>
    
    <div class="summary">
      <div class="summary-card">
        <h3>Total Component Usages</h3>
        <p style="font-size: 2em;">${overallStats.totalUsages}</p>
      </div>
      <div class="summary-card">
        <h3>MFEs Analyzed</h3>
        <p style="font-size: 2em;">${config.mfes.length}</p>
        <p>${config.mfes.join(", ")}</p>
      </div>
      <div class="summary-card">
        <h3>Unique Components Used</h3>
        <p style="font-size: 2em;">${componentStats.length}</p>
      </div>
      <div class="summary-card">
        <h3>Unused Components</h3>
        <p style="font-size: 2em;">${reportData.unusedComponents.length}</p>
        <p>Components not used in any MFE</p>
      </div>
    </div>
    
    <h2>Overview</h2>
    
    <div class="tabs">
      <div class="tab active" data-tab="components">Components</div>
      <div class="tab" data-tab="mfes">MFEs</div>
      <div class="tab" data-tab="unused">Unused Components</div>
    </div>
    
    <div class="tab-content active" id="components-tab">
      <h3>Most Used Components</h3>
      <div id="components-chart" class="chart-container"></div>
      
      <div class="search-container">
        <label for="componentNameSearch">Component Name:</label>
        <input type="text" id="componentNameSearch" placeholder="Search components...">
        <label for="propNameSearch">Prop Name:</label>
        <input type="text" id="propNameSearch" placeholder="Search by prop name...">
        <label for="propValueSearch">Prop Value:</label>
        <input type="text" id="propValueSearch" placeholder="Search by prop value...">
      </div>
      
      <h3>Component Details</h3>
      ${componentStats
				.map(
					(stats) => `
        <div class="component-details" data-component="${stats.componentName}">
          <div class="component-header">
            <div>
              <strong>${stats.componentName}</strong>
              <span class="badge">${stats.totalUsages} usages</span>
            </div>
            <span class="toggle-icon">▼</span>
          </div>
          <div class="component-content">
            <h4>Usage by MFE</h4>
            <table>
              <thead>
                <tr>
                  <th>MFE</th>
                  <th>Repository</th>
                  <th>Usages</th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(stats.usagesByMfe)
									.map(
										([mfe, count]) => `
                  <tr>
                    <td>${mfe}</td>
                    <td>${reportData.config.mfeInfos.find((info) => info.name === mfe)?.repository || "N/A"}</td>
                    <td>${count}</td>
                  </tr>
                `
									)
									.join("")}
              </tbody>
            </table>
            
            <h4>Common Props</h4>
            <table>
              <thead>
                <tr>
                  <th>Prop Name</th>
                  <th>Occurrences</th>
                </tr>
              </thead>
              <tbody>
                ${stats.commonProps
									.map(
										(prop) => `
                  <tr>
                    <td>${prop.name}</td>
                    <td>${prop.count}</td>
                  </tr>
                `
									)
									.join("")}
              </tbody>
            </table>
            
            <h4>Customization</h4>
            <p>
              Styled Components: ${stats.customization.styledComponentCount}<br>
              Custom Styles: ${stats.customization.customStylesCount}
            </p>
            
            ${
							Object.keys(stats.customization.overriddenPropertiesCounts).length > 0
								? `
              <h5>Overridden Properties</h5>
              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Occurrences</th>
                  </tr>
                </thead>
                <tbody>
                  ${Object.entries(stats.customization.overriddenPropertiesCounts)
										.map(
											([prop, count]) => `
                    <tr>
                      <td>${prop}</td>
                      <td>${count}</td>
                    </tr>
                  `
										)
										.join("")}
                </tbody>
              </table>
            `
								: ""
						}
            
            <h4>Instances (${stats.instances.length})</h4>
            ${stats.instances
							.map(
								(instance) => `
              <div class="instance-details">
                <p><strong>File:</strong> ${instance.filePath}:${instance.line}</p>
                <table>
                  <thead>
                    <tr>
                      <th>Prop Name</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${instance.props
											.map(
												(prop) => `
                      <tr>
                        <td>${prop.name}</td>
                        <td><pre>${prop.value}</pre></td>
                      </tr>
                    `
											)
											.join("")}
                  </tbody>
                </table>
              </div>
            `
							)
							.join("")}
          </div>
        </div>
      `
				)
				.join("")}
    </div>
    
    <div class="tab-content" id="mfes-tab">
      <h3>Component Usage by MFE</h3>
      <div id="mfes-chart" class="chart-container"></div>
      
      <table>
        <thead>
          <tr>
            <th>MFE</th>
            <th>Repository</th>
            <th>Component Usages</th>
            <th>MRC Version</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(overallStats.mfeUsages)
						.map(
							([mfe, count]) => `
            <tr>
              <td>${mfe}</td>
              <td>${reportData.config.mfeInfos.find((info) => info.name === mfe)?.repository || "N/A"}</td>
              <td>${count}</td>
              <td>${reportData.mrcVersions[mfe] || "N/A"}</td>
            </tr>
          `
						)
						.join("")}
        </tbody>
      </table>
    </div>
    
    
    <div class="tab-content" id="unused-tab">
      <h3>Unused Components (${reportData.unusedComponents.length})</h3>
      <p>These components are not used in any of the analyzed MFEs. Consider reviewing them for potential removal or promotion.</p>
      
      <table>
        <thead>
          <tr>
            <th>Component Name</th>
            <th>Path</th>
          </tr>
        </thead>
        <tbody>
          ${reportData.unusedComponents
						.map(
							(comp) => `
            <tr>
              <td>${comp.name}</td>
              <td>${comp.path}</td>
            </tr>
          `
						)
						.join("")}
        </tbody>
      </table>
      
      <h3>Unused Components by MFE</h3>
      <p>These components are used in some MFEs but not in others. Consider standardizing component usage across MFEs.</p>
      
      ${Object.entries(reportData.unusedComponentsByMfe)
				.map(
					([mfe, components]) => `
        <div class="component-details">
          <div class="component-header">
            <div>
              <strong>${mfe}</strong>
              <span class="badge">${components.length} unused components</span>
            </div>
            <span class="toggle-icon">▼</span>
          </div>
          <div class="component-content">
            <table>
              <thead>
                <tr>
                  <th>Component Name</th>
                </tr>
              </thead>
              <tbody>
                ${components
									.map(
										(comp) => `
                  <tr>
                    <td>${comp}</td>
                  </tr>
                `
									)
									.join("")}
              </tbody>
            </table>
          </div>
        </div>
      `
				)
				.join("")}
    </div>
    
    <div class="footer">
      <p>MRC Usage Report | &copy; 2023</p>
    </div>
  </div>
  
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const tabs = document.querySelectorAll('.tab');
      const tabContents = document.querySelectorAll('.tab-content');
      
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          
          tabContents.forEach(content => {
            content.classList.remove('active');
          });
          
          document.getElementById(tab.dataset.tab + '-tab').classList.add('active');
        });
      });
      
      const componentDetails = document.querySelectorAll('.component-details');
      componentDetails.forEach(detail => {
        const header = detail.querySelector('.component-header');
        const content = detail.querySelector('.component-content');
        const icon = header.querySelector('.toggle-icon');
        
        header.addEventListener('click', () => {
          content.classList.toggle('active');
          icon.textContent = content.classList.contains('active') ? '▲' : '▼';
        });
      });
      
      const componentNameSearch = document.getElementById('componentNameSearch');
      const propNameSearch = document.getElementById('propNameSearch');
      const propValueSearch = document.getElementById('propValueSearch');
      
      function filterComponents() {
        const nameFilter = componentNameSearch.value.toLowerCase();
        const propNameFilter = propNameSearch.value.toLowerCase();
        const propValueFilter = propValueSearch.value.toLowerCase();
        
        componentDetails.forEach(detail => {
          const componentName = detail.dataset.component.toLowerCase();
          const instances = detail.querySelectorAll('.instance-details');
          let show = componentName.includes(nameFilter);
          
          if (propNameFilter || propValueFilter) {
            let hasMatch = false;
            instances.forEach(instance => {
              const props = instance.querySelectorAll('tbody tr');
              let instanceMatch = false;
              props.forEach(prop => {
                const propName = prop.children[0].textContent.toLowerCase();
                const propValue = prop.children[1].textContent.toLowerCase();
                
                if (propName.includes(propNameFilter) && propValue.includes(propValueFilter)) {
                  instanceMatch = true;
                }
              });
              if (instanceMatch) {
                hasMatch = true;
              }
            });
            show = show && hasMatch;
          }
          
          detail.style.display = show ? '' : 'none';
        });
      }
      
      componentNameSearch.addEventListener('input', filterComponents);
      propNameSearch.addEventListener('input', filterComponents);
      propValueSearch.addEventListener('input', filterComponents);

      // D3 Charts
      const reportDataJson = ${JSON.stringify(reportData, null, 2)};
      const componentData = reportDataJson.componentStats;
      const mfeUsageData = reportDataJson.overallStats.mfeUsages;

      const mostUsedComponents = componentData
        .map(c => ({ name: c.componentName, count: c.totalUsages }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 20);
        
      const mfeUsages = Object.entries(mfeUsageData).map(([name, count]) => ({ name, count }));

      function createBarChart(selector, data, xKey, yKey, title) {
        const margin = { top: 20, right: 20, bottom: 100, left: 40 };
        const width = 800 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;
        
        const svg = d3.select(selector)
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          
        const x = d3.scaleBand()
          .range([0, width])
          .padding(0.1)
          .domain(data.map(d => d[xKey]));
          
        const y = d3.scaleLinear()
          .range([height, 0])
          .domain([0, d3.max(data, d => d[yKey])]);
          
        svg.selectAll(".bar")
          .data(data)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("x", d => x(d[xKey]))
          .attr("width", x.bandwidth())
          .attr("y", d => y(d[yKey]))
          .attr("height", d => height - y(d[yKey]));
          
        svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
          .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", "rotate(-45)");
          
        svg.append("g")
          .attr("class", "axis")
          .call(d3.axisLeft(y));
      }
      
      createBarChart('#components-chart', mostUsedComponents, 'name', 'count', 'Most Used Components');
      createBarChart('#mfes-chart', mfeUsages, 'name', 'count', 'Component Usage by MFE');

      document.getElementById('downloadJsonBtn').addEventListener('click', () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportDataJson, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "mrc-usage-report.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      });
    });
  </script>
</body>
</html>
		`;
	}
}
