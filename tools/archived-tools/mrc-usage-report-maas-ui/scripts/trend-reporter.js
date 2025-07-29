/**
 * MRC Usage Report Trend Reporter
 *
 * Generates HTML reports for trend analysis
 */

/**
 * Generate HTML report for first run (no trend data)
 * @param {Object} data Initial report data
 * @returns {string} HTML content
 */
function generateInitialReport(data) {
	return `
  <!DOCTYPE html>
  <html>
  <head>
    <title>MRC Usage Report - Trends</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 20px; }
      .card { background: #f5f5f5; border-radius: 5px; padding: 15px; margin-bottom: 20px; }
      table { width: 100%; border-collapse: collapse; }
      th, td { text-align: left; padding: 8px; border-bottom: 1px solid #ddd; }
      th { background-color: #f2f2f2; }
    </style>
  </head>
  <body>
    <h1>MRC Component Usage Report</h1>
    <p>Generated on: ${new Date().toLocaleString()}</p>
    
    <div class="card">
      <h2>Summary</h2>
      <p>Total Components: ${data.summary.totalComponents}</p>
      <p>Total Usages: ${data.summary.totalUsages}</p>
      <p>Unused Components: ${data.summary.unusedComponents}</p>
      <p>${data.message}</p>
    </div>
    
    <div class="card">
      <h2>Top 10 Most Used Components</h2>
      <table>
        <tr>
          <th>Component</th>
          <th>Usages</th>
        </tr>
        ${data.topComponents
					.map(
						(c) => `
          <tr>
            <td>${c.name}</td>
            <td>${c.usages}</td>
          </tr>
        `
					)
					.join("")}
      </table>
    </div>
    
    <div class="card">
      <h2>View Full Report</h2>
      <p><a href="mrc-usage-report.html">View detailed component usage report</a></p>
    </div>
  </body>
  </html>
  `;
}

/**
 * Generate HTML report for trend analysis
 * @param {Object} trends Trend analysis data
 * @returns {string} HTML content
 */
function generateTrendReport(trends) {
	// First run case
	if (trends.message && trends.message.includes("First report")) {
		return generateInitialReport(trends);
	}

	// Regular trend report
	return `
  <!DOCTYPE html>
  <html>
  <head>
    <title>MRC Usage Report - Trends</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 20px; }
      .card { background: #f5f5f5; border-radius: 5px; padding: 15px; margin-bottom: 20px; }
      .positive { color: green; }
      .negative { color: red; }
      table { width: 100%; border-collapse: collapse; }
      th, td { text-align: left; padding: 8px; border-bottom: 1px solid #ddd; }
      th { background-color: #f2f2f2; }
    </style>
  </head>
  <body>
    <h1>MRC Component Usage Trends</h1>
    <p>Comparing reports from ${new Date(trends.previousDate).toLocaleDateString()} to ${new Date(trends.currentDate).toLocaleDateString()}</p>
    
    <div class="card">
      <h2>Summary Changes</h2>
      <p>Total Components: ${trends.summary.totalComponents.current} 
        <span class="${trends.summary.totalComponents.change >= 0 ? "positive" : "negative"}">
          (${trends.summary.totalComponents.change >= 0 ? "+" : ""}${trends.summary.totalComponents.change})
        </span>
      </p>
      <p>Total Usages: ${trends.summary.totalUsages.current} 
        <span class="${trends.summary.totalUsages.change >= 0 ? "positive" : "negative"}">
          (${trends.summary.totalUsages.change >= 0 ? "+" : ""}${trends.summary.totalUsages.change})
        </span>
      </p>
      <p>Unused Components: ${trends.summary.unusedComponents.current} 
        <span class="${trends.summary.unusedComponents.change <= 0 ? "positive" : "negative"}">
          (${trends.summary.unusedComponents.change >= 0 ? "+" : ""}${trends.summary.unusedComponents.change})
        </span>
      </p>
    </div>
    
    <div class="card">
      <h2>New Components (${trends.newComponents.length})</h2>
      ${
				trends.newComponents.length > 0
					? `
        <ul>
          ${trends.newComponents.map((name) => `<li>${name}</li>`).join("")}
        </ul>
      `
					: "<p>No new components added since last report.</p>"
			}
    </div>
    
    <div class="card">
      <h2>Removed Components (${trends.removedComponents.length})</h2>
      ${
				trends.removedComponents.length > 0
					? `
        <ul>
          ${trends.removedComponents.map((name) => `<li>${name}</li>`).join("")}
        </ul>
      `
					: "<p>No components removed since last report.</p>"
			}
    </div>
    
    <div class="card">
      <h2>Components with Significant Usage Changes</h2>
      ${
				trends.changedComponents.length > 0
					? `
        <table>
          <tr>
            <th>Component</th>
            <th>Previous</th>
            <th>Current</th>
            <th>Change</th>
            <th>% Change</th>
          </tr>
          ${trends.changedComponents
						.slice(0, 20)
						.map(
							(c) => `
            <tr>
              <td>${c.name}</td>
              <td>${c.previous}</td>
              <td>${c.current}</td>
              <td class="${c.change >= 0 ? "positive" : "negative"}">${c.change >= 0 ? "+" : ""}${c.change}</td>
              <td class="${c.change >= 0 ? "positive" : "negative"}">${c.change >= 0 ? "+" : ""}${c.percentChange}%</td>
            </tr>
          `
						)
						.join("")}
        </table>
      `
					: "<p>No significant usage changes detected.</p>"
			}
    </div>
    
    <div class="card">
      <h2>View Full Report</h2>
      <p><a href="mrc-usage-report.html">View detailed component usage report</a></p>
    </div>
  </body>
  </html>
  `;
}

module.exports = {
	generateTrendReport
};
