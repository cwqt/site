window.onload = function() {
  var d = document.getElementsByClassName("d"),
      len = d !== null ? d.length : 0,
      i = 0;
  for(i; i < len; i++) {
      d[i].className += " selected"; 
  }


}

let selectedItem;
let selectedWeekItem;
let prevBg;
let loadedData = false;

document.addEventListener('click', function (event) {
	//update calender stuff
	if ([...event.target.classList].includes('item')) {

		if (selectedItem && event.target.id != selectedItem.id) {
			selectedItem.style.background = prevBg;
		}

		var item = document.getElementById(event.target.id);
		selectedItem = item;
		prevBg = selectedItem.style.background;
		selectedItem.style.background = "#333";

		let week = document.getElementById("w"+event.target.id); 
		if(week) week.classList.add('selected')
		selectedWeekItem = document.getElementById("w"+event.target.id);

		const Http = new XMLHttpRequest();
		const url = 'https://cs-d-api.herokuapp.com/days/' + event.target.id;
		Http.open("GET", url);
		Http.send();
		Http.onload = (e) => {
			document.getElementById("click").style.display = 'none';
			var commit_count = document.getElementById('commits')
			var hours_count = document.getElementById('hours')
			var date = document.getElementById('date')

			document.getElementById("hider").style.visibility = "visible";
			document.getElementById("click").getElementsByTagName('p')[0].innerText = "Loading..."

			day = JSON.parse(Http.responseText)
			commit_count.innerHTML = day["commits"].length
			c = 0
			for (var k in day["info"]) {
				c += day["info"][k]
			}

			c = c.toFixed(2)
			hours_count.innerHTML = c			

			d = new Date(event.target.id)
			date.innerHTML = `<b>${d.getFullYear()}</b>년<b>${d.getMonth()}</b>달<b>${d.getDate()}</b>일`
			// date.innerHTML = d.getFullYear() + "년" + d.getMonth() + "달" + d.getDay() + "일";

			var info = document.getElementById("info");
			info.innerHTML = ""
			for (var k in day["commits"]) {
				var repo_url = day["commits"][k]["url"].toString()
				console.log(repo_url)
				// REGEX http://gitlab.com/ [ username/my.project_whatever ]
				var repo_name = repo_url.match(/\w+\/+(?!.*\/).+$/g)[0].toString()
				repo_url += '/commit/' + day["commits"][k]["sha"]
				console.log(repo_name)
				var s = ""
				//ew.
				s = '<div class="commit" onclick="window.location='+ "'" + repo_url + "'" +'">'
				s += '<div class="header">'
				s += '<a href="' + repo_url + '">' + repo_name + '</a>'
				s += '<p>'+day["commits"][k]["sha"]+'</p>'
				s += '</div>'
				s += '<div class="message">'
				s += '<p>'+day["commits"][k]["message"]+'</p>'
				s += '</div>'
				s += '</div>'

				info.innerHTML += s
			}
		}
	} else {
		//deselect
	}
}, false);
