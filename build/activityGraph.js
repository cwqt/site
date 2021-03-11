const fs = require("fs");
const fetch = require("node-fetch");

import { type } from "os";
import { API_ENDPOINT, formatNumber } from "./generateGraphs";
const FILE_LOCATION = __dirname + '/../_includes/activitygraph.html';

export default async (config, days) => {
  console.log("Creating ACTIVITYGRAPH...");
  try {
    if(fs.existsSync(FILE_LOCATION)) fs.unlinkSync(FILE_LOCATION);    
  } catch (error) {}

  const longestDay = await (await fetch(`${API_ENDPOINT}/days/${config.longest_day}`)).json();
  const longestDayTime = Object.values(longestDay.stats).reduce((acc, curr) => acc += curr, 0);

  let html = [];
  for(let day of days) {
    const totalDayTime = Object.values(day.stats).reduce((acc, curr) => acc += curr, 0);
    const scaledDayHeight = (totalDayTime / longestDayTime) * 100; // 0-100% height

    // Find most dominant activity
    const dominantActivty = Object.keys(day.stats).reduce((a, b) => day.stats[a] > day.stats[b] ? a : b);

    html.push(`
      <div
        class="day dominant-${dominantActivty}"
        data-id="${day._id}"
        id="${new Date(day.date.seconds * 1000).toISOString().split("T")[0]}"
        style="height: ${formatNumber(scaledDayHeight)}%">
    `);

    html.push(`</div>`);
  }

  fs.writeFileSync(FILE_LOCATION, html.join('\n'))
}