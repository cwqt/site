#local set private variables
if test -f ".env"; then
	set -a
	. ./.env
	set +a
fi

#check if compiler is installed
if ! [ -x "$(command -v bliss)" ]; then
  echo 'Error: jekyll-bliss is not installed.' >&2
  npm install jekyll-bliss -g
fi

node media/js/calender.js
node media/js/week.js

#escape secret key slashes
CAPTCHA_SECRET_KEY=$(echo "$CAPTCHA_SECRET_KEY" | sed 's/\//\\\//g')
#replace config vars with netlify env vars
echo "Replacing CAPTCHA keys with env vars..."
sed -i -e "s/CAPTCHA_SITE_KEY/$CAPTCHA_SITE_KEY/g" ./_config.yml
sed -i -e 's/CAPTCHA_SECRET_KEY/'"$CAPTCHA_SECRET_KEY"'/g' ./_config.yml

bliss b

echo "Pulling data from api..."
COMMIT=$(curl --silent --header "PRIVATE-TOKEN: $GITLAB_API_KEY" "https://gitlab.com/api/v4/projects/13261952/repository/commits/master" | jq '.short_id' | tr -d \")
echo "Current commit: $COMMIT"
sed -i -e "s/GITCOMMIT/$COMMIT/g" $(find ./_site/ -type f)

LOG_COUNT=$(curl --silent -X GET "https://cs-d-api.herokuapp.com/days/total")
echo "Day log count: $LOG_COUNT"
sed -i -e "s/LOG_COUNT/$LOG_COUNT/g" ./_site/index.html

HOUR_COUNT=$(curl --silent -X GET "https://cs-d-api.herokuapp.com/days/hours")
echo "Total hours count: $HOUR_COUNT"
sed -i -e "s/HOUR_COUNT/$HOUR_COUNT/g" ./_site/index.html

#revert back incase we're local & overwritten - hacky...
echo "Reverting _config.yml back to placeholders..."
sed -i -e "s/sitekey:.*/sitekey: CAPTCHA_SITE_KEY/g" ./_config.yml
sed -i -e "s/secretkey:.*/secretkey: CAPTCHA_SECRET_KEY/g" ./_config.yml
rm _config.yml-e

exit 0
