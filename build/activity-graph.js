const fs = require("fs");
const fetch = require("node-fetch");

import { API_ENDPOINT, formatNumber } from ".";
const FILE_LOCATION = __dirname + '/../~includes/activity-graph.html';


// +        +
// +        +
//++  +  ++++
//+++ +++++++
// generates bar graph of one days activity
export default async (config, days) => {
  console.log("Creating ACTIVITYGRAPH...");
  try {
    if(fs.existsSync(FILE_LOCATION)) fs.unlinkSync(FILE_LOCATION);    
  } catch (error) {}

  const longestDay = await (await fetch(`${API_ENDPOINT}/days/${config.longest_day}`)).json();
  const longestDayTime = Object.values(longestDay.stats).reduce((acc, curr) => acc += curr, 0);

  let html = [];

  const tips = ["⠄","⠆","⠇","⠠","⠤","⠦","⠧","⠰","⠶","⠷","⠸","⠴","⠶","⠼","⠾"];

  for(let day of days) {
    const totalDayTime = Object.values(day.stats).reduce((acc, curr) => acc += curr, 0);
    const scaledDayHeight = (totalDayTime / longestDayTime) * 10; // 0-10 blocks

    // Find most dominant activity
    const dominantActivty = Object.keys(day.stats).reduce((a, b) => day.stats[a] > day.stats[b] ? a : b);

    html.push(`
      <div
        class="day dominant-${dominantActivty}"
        data-id="${day._id}"
        id="${new Date(day.date.seconds * 1000).toISOString().split("T")[0]}">
    `);

    if(formatNumber(scaledDayHeight)) html.push(`<span>${tips[~~(tips.length * Math.random())]}</span>`)
    html.push("<span>⠿</span>".repeat(formatNumber(scaledDayHeight)));

    html.push(`</div>`);
  }

  fs.writeFileSync(FILE_LOCATION, html.join('\n'))
}