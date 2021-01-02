const fs = require("fs");
const COMMIT_COLOUR = "746e65";

export default async (config, days) => {
  console.log("\nCreating COMMITGRAPH...");
  if (fs.existsSync("_includes/commitgraph.html")) fs.unlinkSync("_includes/commitgraph.html");

  // Get day with most commits in days
  const highestCommitCount = Math.max(...days.map((o) => o.commit_count), 0);

  // Generate partial html
  const html = days.reduce((acc, curr) => {
    // tween colour from 100% brightness to 0% brightness depending on commit count
    // at highestCommitCount tween amount = 0; at lowest tween amount = -90; at 0 commits colour = transparent
    const tweenAmount = highestCommitCount == 0 ? 0 : Math.ceil(curr.commit_count * (100 / highestCommitCount));

    acc.push(
      `<div class="item" style="background-color: ${
        curr.commit_count == 0 ? "rgba(0,0,0,.12)" : `#${LightenDarkenColor(COMMIT_COLOUR, 100 - tweenAmount)}`
      }" id=${new Date(curr.date).toISOString().split("T")[0]}`
    );
    return acc;
  }, []);

  // Fill out graph with days that have not yet been reached
  for (i = 0; i < 182 - html.length; i++) {
    html.push('<div class="item" style="background-color: rgba(0,0,0,.12)"></div>');
  }

  await fs.writeFile("_includes/commitgraph.html", html.join('\n'));
};

// https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
// between -100 and 100
const LightenDarkenColor = (col, amt) => {
  const num = parseInt(col, 16);
  const r = (num >> 16) + amt;
  const b = ((num >> 8) & 0x00ff) + amt;
  const g = (num & 0x0000ff) + amt;
  const newColor = g | (b << 8) | (r << 16);
  return newColor.toString(16);
};
