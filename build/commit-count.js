const fs = require('fs')
const FILE_LOCATION = __dirname + '/../~includes/commit-count.md'

export default async (config, days) => {
  if (fs.existsSync(FILE_LOCATION)) fs.unlinkSync(FILE_LOCATION)
  const commitCount = days.reduce((acc, curr) => (acc += curr.commit_count), 0)

  fs.writeFileSync(FILE_LOCATION, commitCount)
}
