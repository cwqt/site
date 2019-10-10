npm install jekyll-bliss -g
node media/js/calender.js
node media/js/week.js

bliss b

echo "Pulling data from api..."
COMMIT=$(curl --silent --header "PRIVATE-TOKEN: $GITLAB_API_KEY" "https://gitlab.com/api/v4/projects/13261952/repository/commits/master" | jq '.short_id' | tr -d \")
echo "Current commit: $COMMIT"
sed -i -e "s/GITCOMMIT/$COMMIT/g" ./_site/index.html

LOG_COUNT=$(curl --silent -X GET "https://cs-d-api.herokuapp.com/days/total")
echo "Day log count: $LOG_COUNT"
sed -i -e "s/LOG_COUNT/$LOG_COUNT/g" ./_site/index.html

HOUR_COUNT=$(curl --silent -X GET "https://cs-d-api.herokuapp.com/days/hours")
echo "Total hours count: $HOUR_COUNT"
sed -i -e "s/HOUR_COUNT/$HOUR_COUNT/g" ./_site/index.html

exit 0
