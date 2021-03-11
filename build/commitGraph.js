const fs = require("fs");
const COMMIT_COLOUR = "746e65";
const FILE_LOCATION = __dirname + "/../_includes/commitgraph.html";

export default async (config, days) => {
  console.log("Creating COMMITGRAPH...");
  if (fs.existsSync(FILE_LOCATION)) fs.unlinkSync(FILE_LOCATION);

  // Get day with most commits in days
  const highestCommitCount = Math.max(...days.map((o) => o.commit_count), 0);

  // Generate partial html
  const html = days.reduce((acc, curr) => {
    // tween colour from 100% brightness to 0% brightness depending on commit count
    // at highestCommitCount tween amount = 0; at lowest tween amount = -90; at 0 commits colour = transparent
    const tweenAmount = highestCommitCount == 0 ? 0 : Math.ceil(curr.commit_count * (100 / highestCommitCount));

    acc.push(
      `<div class="commit" style="background-color: ${
        curr.commit_count == 0 ? "rgba(0,0,0,.12)" : `#${LightenDarkenColor(COMMIT_COLOUR, 100 - tweenAmount)}`
      }" data-id="${curr._id}" id="${new Date(curr.date.seconds * 1000).toISOString().split("T")[0]}"></div>`
    );
    return acc;
  }, []);

  // Fill out graph with days that have not yet been reached
  for (let i = 0; i < 182 - days.length; i++) {
    html.push('<div class="commit" style="background-color: rgba(0,0,0,.12)"></div>');
  }

  fs.writeFileSync(FILE_LOCATION, html.join("\n"));
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
