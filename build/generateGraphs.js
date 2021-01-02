export const API_ENDPOINT = "https://awgit.cass.si";
import activityGraph from "./activityGraph";
import commitGraph from "./commitGraph";

(async () => {
  const days = await (await fetch(`${API_ENDPOINT}/days`)).json();
  const config = await (await fetch(`${API_ENDPOINT}/days/config`)).json();

  await Promise.all([activityGraph(config, days), commitGraph(config, days)]);
})();
