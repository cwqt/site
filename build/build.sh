# ran from root directory ../build

#local set private variables
if test -f ".env"; then
	set -a
	. ./.env
	set +a
fi

# babel transpiles into src/_transpiled & files put .html in _includes
node src/_transpiled/generateGraphs.js
rm -rf src/_transpiled

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
sed -i -e "s/GITCOMMIT/$COMMIT/g" $(find ../_site/ -type f)

DAYS_CONFIG=$(curl --silent -X GET "https://awgit.cass.si/days/config")
LOG_COUNT=$(echo $DAYS_CONFIG | jq -r ".total_days")
HOUR_COUNT=$(echo $DAYS_CONFIG | jq -r ".total_hours")

echo "Day log count: $LOG_COUNT"
sed -i -e "s/LOG_COUNT/$LOG_COUNT/g" ./_site/index.html

echo "Total hours count: $HOUR_COUNT"
sed -i -e "s/HOUR_COUNT/$HOUR_COUNT/g" ./_site/index.html

#revert back incase we're local & overwritten - hacky...
echo "Reverting _config.yml back to placeholders..."
sed -i -e "s/sitekey:.*/sitekey: CAPTCHA_SITE_KEY/g" ./_config.yml
sed -i -e "s/secretkey:.*/secretkey: CAPTCHA_SECRET_KEY/g" ./_config.yml
rm _config.yml-e

exit 0