const fs = require("fs");
const COMMIT_COLOUR = "746e65";
const FILE_LOCATION = __dirname + "/../~includes/commit-graph.html";

export default async (config, days) => {
  console.log("Creating COMMITGRAPH...");

  const BRAILLE = [
    "⠀", // 0 commits
    "⠁",
    "⠂",
    "⠃",
    "⠄",
    "⠅",
    "⠆",
    "",
    "⠈",
    "⠉",
    "⠊",
    "⠋",
    "⠌",
    "⠍",
    "⠎",
    "⠏",
    "⠐",
    "⠑",
    "⠒",
    "⠓",
    "⠔",
    "⠕",
    "⠖",
    "⠗",
    "⠘",
    "⠙",
    "⠚",
    "⠛",
    "⠜",
    "⠝",
    "⠞",
    "⠟",
    "⠠",
    "⠡",
    "⠢",
    "⠣",
    "⠤",
    "⠥",
    "⠦",
    "⠧",
    "⠨",
    "⠩",
    "⠪",
    "⠫",
    "⠬",
    "⠭",
    "⠮",
    "⠯",
    "⠰",
    "⠱",
    "⠲",
    "⠳",
    "⠴",
    "⠵",
    "⠶",
    "⠷",
    "⠸",
    "⠹",
    "⠺",
    "⠻",
    "⠼",
    "⠽",
    "⠾",
    "⠿", // max commits
  ];

  if (fs.existsSync(FILE_LOCATION)) fs.unlinkSync(FILE_LOCATION);

  // Get day with most commits in days
  const highestCommitCount = Math.max(...days.map((o) => o.commit_count), 0);

  // Generate partial html
  const html = days.reduce((acc, curr) => {
    // get braille char
    const char =
      curr.commit_count == highestCommitCount
        ? BRAILLE[BRAILLE.length - 1]
        : BRAILLE[Math.ceil(BRAILLE.length * (curr.commit_count / highestCommitCount))];

    acc.push(
      `<div class="commit" data-id="${curr._id}" id="${
        new Date(curr.date.seconds * 1000).toISOString().split("T")[0]
      }">${char}</div>`
    );
    return acc;
  }, []);

  // Fill out graph with days that have not yet been reached
  for (let i = 0; i < 182 - days.length; i++) {
    html.push(`<div class="commit">${BRAILLE[0]}</div>`);
  }

  fs.writeFileSync(FILE_LOCATION, html.join("\n"));
};
