const fetch = require("node-fetch");

export const API_ENDPOINT = "https://awgit.cass.si";
import activityGraph from "./activity-graph";
import commitCount from "./commit-count";
import commitGraph from "./commit-graph";

export const formatNumber = (num) => {
  return parseFloat(num.toFixed(2));
}

(async () => {
  console.log("Creating graphs --------------------------------------------------------------------");
  const days = await (await fetch(`${API_ENDPOINT}/days`)).json();
  const config = await (await fetch(`${API_ENDPOINT}/days/config`)).json();

  await activityGraph(config, days);
  await commitGraph(config, days);
  await commitCount(config, days);
  console.log("Finished creating graphs -----------------------------------------------------------");
})();
