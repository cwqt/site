const fs = require('fs');
const https = require('https');

console.log("\nRunning week...")

//html string for file
var s = ""

//attempt to delete old compiled calender
try {
  if (fs.existsSync("_includes/week.html")) {
	 fs.unlinkSync("_includes/week.html")
  }
} catch(err) {
  console.error(err)
}

https.get('https://cs-d-api.herokuapp.com/days', (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => {
    days = JSON.parse(data);
    longestDay = getLongestDay(days.length-183, days);//should really async await
  });
});

function getLongestDay(duration) {
	let longest = "";
	https.get("https://cs-d-api.herokuapp.com/days/longest?duration="+duration, (resp) => {
		console.log("Getting the longest day...")
		resp.on('data', (chunk) => { longest	+= chunk; })
		resp.on('end', () => {
			longest = parseFloat(longest);
			console.log(longest)
	    buildWeeks(days, longest);//aaaahhhhhh!!!!!!!
		});
	});
}

function buildWeeks(days, longestDay) {
  console.log("Got days: " + days.length)
  console.log(days.length-182 + " too many, splicing.")
  days = days.splice(days.length-182, days.length)
	for (i=0; i<days.length; i++) {
    t = days[i].info
    //get total hours in all categories
		sum = 0
		for(var index in t) { sum += t[index] }

		//TOFIX: something to do with app.py date list direction & longest day
		//lst[-direction:] from top or bottom?
		ratio = (sum/longestDay)*60//100

		ratio = parseFloat(ratio).toFixed(2)
		x = "";
		x += `<div class="d" id="w${days[i].date}" style="height: ${ratio}%">\n`

		for(var index in t) {
			var height = ((t[index]/sum)*100).toFixed(2)
			if (isNaN(height)) { height = 0 }
			if (height < 1) { height += 1}
			if (height >= 98 ) { height -= 2}
			height = parseFloat(height).toFixed(2)
	    x += `\t<div class="${index}" style="height: ${height}% "></div>\n`
		}

		x += '</div>\n'
		s = s + x
	}
	// console.log(s);
	// for (i=0; i<(182-days.length); i++) {
	// 	s += '<div class="item"></div>\n'
	// }
	// write fresh file
	fs.writeFile('_includes/week.html', s, function (err) {
	  if (err) throw err;
	  console.log('WEEK is created successfully.\n');
	});
}

