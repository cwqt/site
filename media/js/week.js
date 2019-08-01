const fs = require('fs');
const https = require('https');

console.log("Running week...")

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

https.get("https://cs-d-api.herokuapp.com/longest", (resp) => {
	let longest = "";
	resp.on('data', (chunk) => {
		longest	+= chunk;
	})

	resp.on('end', () => {
		longest = parseFloat(longest);
		buildWeeks(longest);
	})
})

function buildWeeks(longestDay) {
	//request all days
	https.get('https://cs-d-api.herokuapp.com/days', (resp) => {
	  let data = '';
	  // A chunk of data has been recieved.
	  resp.on('data', (chunk) => {
	    data += chunk;
	  });

	  //got whole response, generate html for week
	  resp.on('end', () => {
	    days = JSON.parse(data)
			for (i=0; i<days.length; i++) {
				sum = 0
	      t = days[i].info
				for(var index in t) {
	        sum += t[index]
				}

				// console.log(sum, longestDay)
				ratio = (sum/longestDay)*100
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
			  console.log('File is created successfully.');
			}); 
	  });
	}).on("error", (err) => {
	  console.log("Error: " + err.message);
	});	
}

