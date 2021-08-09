const fs = require("fs");
const fetch = require("node-fetch");

import { API_ENDPOINT, formatNumber } from ".";
const FILE_LOCATION = __dirname + "/../~includes/activity-graph.md";
const GRAPH_HEIGHT = 10;

//      ⠸
// ⠾    ⠿
// ⠿⠧   ⠿
// ⠿⠿ ⠦ ⠿⠧
// ⠿⠿⠿⠿⠿⠿⠿⠧
// generates bar graph of one days activity
export default async (config, days) => {
  console.log("Creating ACTIVITYGRAPH...");
  try {
    if (fs.existsSync(FILE_LOCATION)) fs.unlinkSync(FILE_LOCATION);
  } catch (error) {}

  const longestDay = await (await fetch(`${API_ENDPOINT}/days/${config.longest_day}`)).json();
  const longestDayTime = Object.values(longestDay.stats).reduce((acc, curr) => (acc += curr), 0);

  const heads = ["⠄", "⠆", "⠇", "⠠", "⠤", "⠦", "⠧", "⠰", "⠶", "⠷", "⠸", "⠴", "⠶", "⠼", "⠾"];

  // create a 2d array of width n height GRAPH_HEIGHT
  const map = [];

  for (let day of days) {
    const totalDayTime = Object.values(day.stats).reduce((acc, curr) => (acc += curr), 0);
    const scaledDayHeight = (totalDayTime / longestDayTime) * GRAPH_HEIGHT; // 0-GRAPH_HEIGHT blocks

    // Find most dominant activity
    const dominantActivty = Object.keys(day.stats).reduce((a, b) => (day.stats[a] > day.stats[b] ? a : b));

    // gives us each day as some abitrary length + a tip
    // [⠿,⠿,⠿,⠿,⠿,⠿,⠿,⠧]
    let pixels = [..."⠿".repeat(formatNumber(scaledDayHeight)).split(""), heads[~~(heads.length * Math.random())]];
    // pad out with spaces so that every row has exactly GRAPH_HEIGHT characters
    if (pixels.length < GRAPH_HEIGHT) {
      pixels = [...pixels, ..." ".repeat(GRAPH_HEIGHT - pixels.length).split("")];
    }
    map.push(pixels);
  }

  // now map the rows into a grid by rotating them
  // e.g. GRAPH_HEIGHT = 3, map.length = 2
  // [⠿,⠿,⠧]
  // [⠿,⠧, ]
  // rotates to
  // [⠧, ]
  // [⠿,⠿]
  // [⠿,⠿]
  const rotated = [];
  for (let y = 0; y < GRAPH_HEIGHT; y++) {
    rotated.unshift([]);

    // go backwards from head of each map row to tail
    for (let x = map.length - 1; x >= 0; x--) {
      rotated[0].push(map[x][y]);
    }
  }

  // join all rows to make the full graph
  const r = rotated.reduce(
    // don't add \n to last para
    (acc, curr, idx, arr) => ((acc += curr.join("") + (idx !== arr.length - 1 ? "\n" : "")), acc),
    ""
  );

  // wrap in <pre> tags
  fs.writeFileSync(FILE_LOCATION, ["```", r, "```"].join("\n"));
};
