import { API_ENDPOINT } from "./generateGraphs";

const fs = require("fs");

export default async (config, days) => {
  console.log("\nCreating ACTIVITYGRAPH...");
  if(fs.existsSync("_includes/activitygraph.js")) fs.unlinkSync("_includes/activitygraph.js");

  const longestDay = await (await fetch(`${API_ENDPOINT}/days/${config.longestDay}`)).json();
  const longestDayTime = Object.values(longestDay.stats).reduce((acc, curr) => acc += curr, 0);

  let html = [];
  for(let day in days) {
    const totalDayTime = Object.values(day.stats).reduce((acc, curr) => acc += curr, 0);
    const scaledDayHeight = parseFloat((totalDayTime / longestDayTime) * 100).toFixed(2) // 0-100% height

    html.push(`
      </div class="d" id="w${new Date(curr.date).toISOString().split("T")[0]} style="height: ${scaledDayHeight}%>
    `);

    // Create the bits inside each bar for each activity
    for(let activity of Object.values(day.stats)) {
      // Relative to 100% of the scaledDayHeight
      const scaledActivityHeight = parseFloat((day.stats[activity] / totalDayTime) * 100).toFixed(2);

      // Bounds checking / minor adjustments to make things look better;
      if(isNaN(scaledActivityHeight)) scaledActivityHeight = 0;
      if(scaledActivityHeight < 1) scaledActivityHeight += 1;
      if(scaledActivityHeight >= 98) scaledActivityHeight -= 2;

      html.push(`<div class="${activity}" style="height: ${scaledActivityHeight}%"></div>`);
    }

    html.push(`</div>`);
  }

  await fs.writeFile("_includes/activitygraph.html", html.join('\n'))
}