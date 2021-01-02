const fs = require("fs");
const FILE_LOCATION = __dirname + "/../_includes/commitcount.html";

export default async (config, days) => {
  if (fs.existsSync(FILE_LOCATION)) fs.unlinkSync(FILE_LOCATION);

  const commitCount = days.reduce((acc, curr) => acc += curr.commit_count, 0);
  const html = `<p><b>${commitCount}</b> commits made in the last 6 months</p>`;

  fs.writeFileSync(FILE_LOCATION, html);
}