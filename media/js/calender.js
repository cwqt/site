const fs = require('fs');
const https = require('https');

console.log("Running calender...")

colors = {
	"writing": "#7b6f9d",
	"visual": "#4b4363",
	"audio": "#222222",
	"none": "#333"
}

//html string for file
var s = ""

//attempt to delete old compiled calender
try {
  if (fs.existsSync("_includes/calender.html")) {
	 fs.unlinkSync("_includes/calender.html")
  }
} catch(err) {
  console.error(err)
}

//request all days
https.get('https://cs-d-api.herokuapp.com/days', (resp) => {
  let data = '';
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  //got whole response, generate html for calender
  resp.on('end', () => {
    days = JSON.parse(data)
  	console.log("Got days." + console.log(days.length))
		for (i=0; i<days.length; i++) {
			x = "";
			x += `<div class="item" id="${days[i].date}" `

			var sum = 0.00
      t = days[i].info
			var max = "writing"
			for(var index in t) {
        sum += t[index]
				if (t[index] > t[max]) {
					max = index
				}
			}
      //tiny hours shoud be ignored
      if (sum < 1) {
        max = "none";
      }

			x += `style="background-color: ${colors[max]}; cursor:pointer;">`
			if (days[i].commits.length > 0) {
				x += '●';
			}
			x += '</div>\n'
			s = s + x
		}
		console.log(`Inserted ${days.length} days into calender.`)
		console.log(`Padding with ${182-days.length} empty days.`)
		for (i=0; i<(182-days.length); i++) {
			s += '<div class="item"></div>\n'
		}
		// write fresh file
		fs.writeFile('_includes/calender.html', s, function (err) {
		  if (err) throw err;
		  console.log('File is created successfully.');
		}); 
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
