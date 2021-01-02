

const verified = `<svg height="24" class="octicon octicon-verified mr-2" viewBox="0 0 24 24" version="1.1" width="24" aria-hidden="true"><path d="M17.03 9.78a.75.75 0 00-1.06-1.06l-5.47 5.47-2.47-2.47a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l6-6z"></path><path fill-rule="evenodd" d="M14.136 1.2a3.61 3.61 0 00-4.272 0L8.489 2.21a2.11 2.11 0 01-.929.384l-1.686.259a3.61 3.61 0 00-3.021 3.02L2.594 7.56a2.11 2.11 0 01-.384.929L1.2 9.864a3.61 3.61 0 000 4.272l1.01 1.375c.2.274.333.593.384.929l.259 1.686a3.61 3.61 0 003.02 3.021l1.687.259c.336.051.655.183.929.384l1.375 1.01a3.61 3.61 0 004.272 0l1.375-1.01a2.11 2.11 0 01.929-.384l1.686-.259a3.61 3.61 0 003.021-3.02l.259-1.687a2.11 2.11 0 01.384-.929l1.01-1.375a3.61 3.61 0 000-4.272l-1.01-1.375a2.11 2.11 0 01-.384-.929l-.259-1.686a3.61 3.61 0 00-3.02-3.021l-1.687-.259a2.11 2.11 0 01-.929-.384L14.136 1.2zm-3.384 1.209a2.11 2.11 0 012.496 0l1.376 1.01a3.61 3.61 0 001.589.658l1.686.258a2.11 2.11 0 011.765 1.766l.26 1.686a3.61 3.61 0 00.657 1.59l1.01 1.375a2.11 2.11 0 010 2.496l-1.01 1.376a3.61 3.61 0 00-.658 1.589l-.258 1.686a2.11 2.11 0 01-1.766 1.765l-1.686.26a3.61 3.61 0 00-1.59.657l-1.375 1.01a2.11 2.11 0 01-2.496 0l-1.376-1.01a3.61 3.61 0 00-1.589-.658l-1.686-.258a2.11 2.11 0 01-1.766-1.766l-.258-1.686a3.61 3.61 0 00-.658-1.59l-1.01-1.375a2.11 2.11 0 010-2.496l1.01-1.376a3.61 3.61 0 00.658-1.589l.258-1.686a2.11 2.11 0 011.766-1.766l1.686-.258a3.61 3.61 0 001.59-.658l1.375-1.01z"></path></svg>`

let selectedCommit;
let selectedWeekDay;
let previousSelectedCommit;
let isLoading = false;

document.getElementById("loading").style.display = "none";


document.addEventListener("click", (event) => {
  // Clicked a commit item
  if ([...event.target.classList].includes("commit")) {
    // Clicked a different commit
    if (selectedCommit && event.target.id != selectedCommit.id) {
      selectedCommit.style.filter = "none";
    }

    const dayId = event.target.getAttribute("data-id");
    if (!dayId) return; // just a filler commit

    selectedItem = document.getElementById(event.target.id);


    isLoading = true;
    document.getElementById("loading").style.display = "block";
    document.getElementById("click").style.display = "none";//hide the 'Click to show...' msg;
    document.getElementById("hider").style.visibility = "hidden";// show days stats
    const date = new Date(event.target.id).toISOString().split("T")[0];
    document.getElementById('date').innerHTML = date.toString();

    fetch(`https://awgit.cass.si/days/${dayId}`)
      .then((res) => res.json())
      .then((day) => {
        document.getElementById("click").style.display = "none";

        // Info about selected day
        const commit_count = document.getElementById('commits');
        const hours_count = document.getElementById('hours');
        commit_count.innerHTML = day.commit_count;
        hours_count.innerHTML = Object.values(day.stats).reduce((acc, curr) => acc += curr, 0).toFixed(2);
        document.getElementById("hider").style.visibility = "visible";// show days stats

        // Stats
        document.getElementById("stats-productive").innerHTML = day.stats.productive;
        document.getElementById("stats-nonproductive").innerHTML = day.stats.nonproductive;
        document.getElementById("stats-language").innerHTML = day.stats.language;
        document.getElementById("stats-communications").innerHTML = day.stats.communications;
        document.getElementById("stats-other").innerHTML = day.stats.other;


        const info = document.getElementById("info");
        // Create elements for each commit
        let html = "";
        for(let commit of day.commits) {
          html +=`
            <div class="commit-body" onclick="window.location='${commit.url}'">
              <div class="header">
                <b>${commit.slug}</b>
                <p>${commit.sha.slice(-8)}</p>
                <div class="signed"><p>${commit.signing_key}</p>${commit.signing_key ? verified : ''}</div>
              </div>

              <p class="message">${commit.message}</p>
            </div>
          `
        }

        info.innerHTML = html;
      })
      .catch(e => {
        document.getElementById("click").innerHTML = e.message;
        document.getElementById("click").style.display = "block";
      })
      .finally(() => {
        document.getElementById("loading").style.display = "none";
        isLoading = false;
      });
  } else {
    //deselect
  }
});
