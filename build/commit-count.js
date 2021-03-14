const fs = require("fs");
const FILE_LOCATION = __dirname + "/../~includes/commit-count.html";

export default async (config, days) => {
  if (fs.existsSync(FILE_LOCATION)) fs.unlinkSync(FILE_LOCATION);

  const commitCount = days.reduce((acc, curr) => acc += curr.commit_count, 0);
  const html = `<b>${commitCount}</b>`;

  fs.writeFileSync(FILE_LOCATION, html);
}