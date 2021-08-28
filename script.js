// API getting by onclick sportsLoad function-
const spinner = document.getElementById("spinner");
const sportsField = document.getElementById("sports-field");
const error = document.getElementById("error");

const sportsLoad = async () => {
  const clubInput = document.getElementById("club-input");
  const clubValue = clubInput.value;
  sportsField.textContent = "";
  spinner.classList.remove("d-none");
  const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${clubValue}
  `;
  const res = await fetch(url);
  const data = await res
    .json()
    .catch((er) => console.log("you got an erros:", er));
  clubInput.value = "";
  setSportsLoad(data.teams);
};

// setting api loaded data-
const setSportsLoad = (clubs) => {
  spinner.classList.add("d-none");
  console.log(clubs);
  if (!clubs) {
    error.classList.remove("d-none");
  } else {
    error.classList.add("d-none");
    clubs.forEach((club) => {
      const {
        strTeam,
        strTeamFanart1,
        strTeamBadge,
        strStadiumDescription,
        strLeague,
        strSport,
        strTeamJersey,
      } = club;
      const div = document.createElement("div");
      div.classList.add("col-md-4", "col-12", "col-sm-6");

      if (club.strTeamFanart1 == null) {
        // if (clubs.strTeamBadge == null) {
        div.innerHTML = `<div class="card m-3">
        <img src="${strTeamBadge}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${strTeam}</h5>
          <p class="card-text">${strStadiumDescription.slice(0, 150)}</p>
          <small class='fw-bold'>${strLeague}</small><small class='fw-bold ms-5 text-secondary'>${strSport}</small>
        </div>
      </div>`;
      } else {
        div.innerHTML = `<div class="card m-3">
    <img src="${strTeamFanart1}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${strTeam}</h5>
      <p class="card-text">${strStadiumDescription.slice(0, 150)}</p>
      <small class='fw-bold'>${strLeague}</small><small class='fw-bold ms-5 text-secondary'>${strSport}</small>
    </div>
  </div>`;
      }
      console.log(club);
      sportsField.appendChild(div);
    });
  }
  // console.log(clubs);
};
