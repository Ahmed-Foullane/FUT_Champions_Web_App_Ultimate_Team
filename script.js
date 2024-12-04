localStorage.clear()   
let sideBar = document.querySelector(".side-bar");
let form = document.querySelector(".add-new-plaer-form ");
let isGoalKeeper = false;
let positionSelect = document.getElementById("playerPosition");
let playersContainerDev = document.querySelector(".pitch");
let allPositions = document.querySelectorAll(".position-placeholder");
let modal = document.querySelector(".alert");
let modalMessage = document.querySelector(".alert-message");
let closeModalBtn = document.querySelector(".closebtn");

closeModalBtn.addEventListener("click", () => {
  modal.style.top = "-200px";
});

let allPlayers = [];
let boardPLayers = [];
function showForm(show) {
  show ? (form.style.display = "flex") : (form.style.display = "none");
}

let positionLabels = {
  GK: ["Diving", "Handling", "Kicking", "Reflexes", "Speed", "Positioning"],
  ATT: ["Pace", "Shooting", "Passing", "Dribbling", "Defending", "Physical"],
};

positionSelect.addEventListener("change", () => {
  let position = positionSelect.value;
  let labels = positionLabels.ATT;
  if (position == "GK") {
    labels = positionLabels[position];
  }
  document.querySelectorAll("#labelPlyaer label").forEach((label, index) => {
    label.innerHTML = labels[index];
  });
});

async function getData() {
  const defaultPlayers = {
    "players": [
     {
       "name": "Lionel Messi",
       "photo": "https://cdn.sofifa.net/players/158/023/25_120.png",
       "position": "RW",
       "nationality": "Argentina",
       "flag": "https://cdn.sofifa.net/flags/ar.png",
       "club": "Inter Miami",
       "logo": "https://cdn.sofifa.net/meta/team/239235/120.png",
       "rating": 93,
       "pace": 85,
       "shooting": 92,
       "passing": 91,
       "dribbling": 95,
       "defending": 35,
       "physical": 65
     },
     {
       "name": "Cristiano Ronaldo",
       "photo": "https://cdn.sofifa.net/players/020/801/25_120.png",
       "position": "ST",
       "nationality": "Portugal",
       "flag": "https://cdn.sofifa.net/flags/pt.png",
       "club": "Al Nassr",
       "logo": "https://cdn.sofifa.net/meta/team/2506/120.png",
       "rating": 91,
       "pace": 84,
       "shooting": 94,
       "passing": 82,
       "dribbling": 87,
       "defending": 34,
       "physical": 77
     },
     {
       "name": "Kevin De Bruyne",
       "photo": "https://cdn.sofifa.net/players/192/985/25_120.png",
       "position": "CM",
       "nationality": "Belgium",
       "flag": "https://cdn.sofifa.net/flags/be.png",
       "club": "Manchester City",
       "logo": "https://cdn.sofifa.net/players/239/085/25_120.png",
       "rating": 91,
       "pace": 74,
       "shooting": 86,
       "passing": 93,
       "dribbling": 88,
       "defending": 64,
       "physical": 78
     },
     {
       "name": "Kylian Mbappé",
       "photo": "https://cdn.sofifa.net/players/231/747/25_120.png",
       "position": "ST",
       "nationality": "France",
       "flag": "https://cdn.sofifa.net/flags/fr.png",
       "club": "Real Madrid",
       "logo": "https://cdn.sofifa.net/meta/team/3468/120.png",
       "rating": 92,
       "pace": 97,
       "shooting": 89,
       "passing": 80,
       "dribbling": 92,
       "defending": 39,
       "physical": 77
     },
     {
       "name": "Virgil van Dijk",
       "photo": "https://cdn.sofifa.net/players/203/376/25_120.png",
       "position": "CB",
       "nationality": "Netherlands",
       "flag": "https://cdn.sofifa.net/flags/nl.png",
       "club": "Liverpool",
       "logo": "https://cdn.sofifa.net/meta/team/8/120.png",
       "rating": 90,
       "pace": 75,
       "shooting": 60,
       "passing": 70,
       "dribbling": 72,
       "defending": 92,
       "physical": 86
     },
     {
       "name": "Antonio Rudiger",
       "photo": "https://cdn.sofifa.net/players/205/452/25_120.png",
       "position": "CB",
       "nationality": "Germany",
       "flag": "https://cdn.sofifa.net/flags/de.png",
       "club": "Real Madrid",
       "logo": "https://cdn.sofifa.net/meta/team/3468/120.png",
       "rating": 88,
       "pace": 82,
       "shooting": 55,
       "passing": 73,
       "dribbling": 70,
       "defending": 86,
       "physical": 86
     },
     {
       "name": "Neymar Jr",
       "photo": "https://cdn.sofifa.net/players/190/871/25_120.png",
       "position": "LW",
       "nationality": "Brazil",
       "flag": "https://cdn.sofifa.net/flags/br.png",
       "club": "Al-Hilal",
       "logo": "https://cdn.sofifa.net/meta/team/7011/120.png",
       "rating": 90,
       "pace": 91,
       "shooting": 83,
       "passing": 86,
       "dribbling": 94,
       "defending": 37,
       "physical": 61
     },
     {
       "name": "Mohamed Salah",
       "photo": "https://cdn.sofifa.net/players/192/985/25_120.png",
       "position": "RW",
       "nationality": "Egypt",
       "flag": "https://cdn.sofifa.net/flags/eg.png",
       "club": "Liverpool",
       "logo": "https://cdn.sofifa.net/meta/team/8/120.png",
       "rating": 89,
       "pace": 93,
       "shooting": 87,
       "passing": 81,
       "dribbling": 90,
       "defending": 45,
       "physical": 75
     },
     {
       "name": "Joshua Kimmich",
       "photo": "https://cdn.sofifa.net/players/212/622/25_120.png",
       "position": "CM",
       "nationality": "Germany",
       "flag": "https://cdn.sofifa.net/flags/de.png",
       "club": "Bayern Munich",
       "logo": "https://cdn.sofifa.net/meta/team/503/120.png",
       "rating": 89,
       "pace": 70,
       "shooting": 75,
       "passing": 88,
       "dribbling": 84,
       "defending": 84,
       "physical": 81
     },
     {
       "name": "Jan Oblak",
       "photo": "https://cdn.sofifa.net/players/200/389/25_120.png",
       "position": "GK",
       "nationality": "Slovenia",
       "flag": "https://cdn.sofifa.net/flags/si.png",
       "club": "Atletico Madrid",
       "logo": "https://cdn.sofifa.net/meta/team/7980/120.png",
       "rating": 91,
       "diving": 89,
       "handling": 90,
       "kicking": 78,
       "reflexes": 92,
       "speed": 50,
       "positioning": 88
     },
     {
       "name": "Luka Modrić",
       "photo": "https://cdn.sofifa.net/players/177/003/25_120.png",
       "position": "CM",
       "nationality": "Croatia",
       "flag": "https://cdn.sofifa.net/flags/hr.png",
       "club": "Real Madrid",
       "logo": "https://cdn.sofifa.net/meta/team/3468/120.png",
       "rating": 88,
       "pace": 74,
       "shooting": 78,
       "passing": 89,
       "dribbling": 90,
       "defending": 72,
       "physical": 65
     },
     {
       "name": "Vinicius Junior",
       "photo": "https://cdn.sofifa.net/players/238/794/25_120.png",
       "position": "LW",
       "nationality": "Brazil",
       "flag": "https://cdn.sofifa.net/flags/br.png",
       "club": "Real Madrid",
       "logo": "https://cdn.sofifa.net/meta/team/3468/120.png",
       "rating": 89,
       "pace": 91,
       "shooting": 88,
       "passing": 85,
       "dribbling": 94,
       "defending": 39,
       "physical": 61
     },
     {
       "name": "Brahim Diáz",
       "photo": "https://cdn.sofifa.net/players/231/410/25_120.png",
       "position": "LW",
       "nationality": "Morocco",
       "flag": "https://cdn.sofifa.net/flags/ma.png",
       "club": "Real Madrid",
       "logo": "https://cdn.sofifa.net/meta/team/3468/120.png",
       "rating": 82,
       "pace": 85,
       "shooting": 74,
       "passing": 78,
       "dribbling": 85,
       "defending": 31,
       "physical": 56
     },
     {
       "name": "Karim Benzema",
       "photo": "https://cdn.sofifa.net/players/165/153/25_120.png",
       "position": "ST",
       "nationality": "France",
       "flag": "https://cdn.sofifa.net/flags/fr.png",
       "club": "Al-Ittihad",
       "logo" :"https://cdn.sofifa.net/meta/team/476/120.png",
       "rating": 90,
       "pace": 77,
       "shooting": 90,
       "passing": 83,
       "dribbling": 88,
       "defending": 40,
       "physical": 78
     },
     {
       "name": "Erling Haaland",
       "photo": "https://cdn.sofifa.net/players/239/085/25_120.png",
       "position": "ST",
       "nationality": "Norway",
       "flag": "https://cdn.sofifa.net/flags/no.png",
       "club": "Manchester City",
       "logo": "https://cdn.sofifa.net/players/239/085/25_120.png",
       "rating": 91,
       "pace": 89,
       "shooting": 94,
       "passing": 65,
       "dribbling": 80,
       "defending": 45,
       "physical": 88
     },
     {
       "name": "N'Golo Kanté",
       "photo": "https://cdn.sofifa.net/players/215/914/25_120.png",
       "position": "CDM",
       "nationality": "France",
       "flag": "https://cdn.sofifa.net/flags/fr.png",
       "club": "Al-Ittihad",
       "logo": "https://cdn.sofifa.net/meta/team/476/120.png",
       "rating": 87,
       "pace": 77,
       "shooting": 66,
       "passing": 75,
       "dribbling": 82,
       "defending": 88,
       "physical": 82
     },
     {
       "name": "Alphonso Davies",
       "photo": "https://cdn.sofifa.net/players/234/396/25_120.png",
       "position": "LB",
       "nationality": "Canada",
       "flag": "https://cdn.sofifa.net/flags/ca.png",
       "club": "Bayern Munich",
       "logo": "https://cdn.sofifa.net/meta/team/503/120.png",
       "rating": 84,
       "pace": 96,
       "shooting": 68,
       "passing": 77,
       "dribbling": 82,
       "defending": 76,
       "physical": 77
     },
     {
       "name": "Yassine Bounou",
       "photo": "https://cdn.sofifa.net/players/209/981/25_120.png",
       "position": "GK",
       "nationality": "Morocco",
       "flag": "https://cdn.sofifa.net/flags/ma.png",
       "club": "Al-Hilal",
       "logo": "https://cdn.sofifa.net/meta/team/7011/120.png",
       "rating": 84,
       "diving": 81,
       "handling": 82,
       "kicking": 77,
       "reflexes": 86,
       "speed": 38,
       "positioning": 83
     },
     {
       "name": "Bruno Fernandes",
       "photo": "https://cdn.sofifa.net/players/212/198/25_120.png",
       "position": "CM",
       "nationality": "Portugal",
       "flag": "https://cdn.sofifa.net/flags/pt.png",
       "club": "Manchester United",
       "logo": "https://cdn.sofifa.net/meta/team/14/120.png",
       "rating": 88,
       "pace": 75,
       "shooting": 85,
       "passing": 89,
       "dribbling": 84,
       "defending": 69,
       "physical": 77
     },
     {
       "name": "Jadon Sancho",
       "photo": "https://cdn.sofifa.net/players/233/049/25_120.png",
       "position": "LW",
       "nationality": "England",
       "flag": "https://cdn.sofifa.net/flags/gb-eng.png",
       "club": "Manchester United",
       "logo": "https://cdn.sofifa.net/meta/team/14/120.png",
       "rating": 84,
       "pace": 85,
       "shooting": 74,
       "passing": 78,
       "dribbling": 88,
       "defending": 34,
       "physical": 63
     },
     {
       "name": "Trent Alexander-Arnold",
       "photo": "https://cdn.sofifa.net/players/231/281/25_120.png",
       "position": "RB",
       "nationality": "England",
       "flag": "https://cdn.sofifa.net/flags/gb-eng.png",
       "club": "Liverpool",
       "rating": 87,
       "pace": 76,
       "shooting": 66,
       "passing": 89,
       "dribbling": 80,
       "defending": 79,
       "physical": 71
     },
     {
       "name": "Achraf Hakimi",
       "photo": "https://cdn.sofifa.net/players/235/212/25_120.png",
       "position": "RB",
       "nationality": "Morocco",
       "flag": "https://cdn.sofifa.net/flags/ma.png",
       "club": "Paris Saint-Germain",
       "logo": "https://cdn.sofifa.net/meta/team/591/120.png",
       "rating": 84,
       "pace": 91,
       "shooting": 76,
       "passing": 80,
       "dribbling": 80,
       "defending": 75,
       "physical": 78
     },
     {
       "name": "Youssef En-Nesyri",
       "photo": "https://cdn.sofifa.net/players/235/410/25_120.png",
       "position": "ST",
       "nationality": "Morocco",
       "flag": "https://cdn.sofifa.net/flags/ma.png",
       "club": "Fenerbahçe",
       "logo": "https://cdn.sofifa.net/meta/team/88/120.png",
       "rating": 83,
       "pace": 82,
       "shooting": 82,
       "passing": 63,
       "dribbling": 77,
       "defending": 36,
       "physical": 80
     },
     {
       "name": "Noussair Mazraoui",
       "photo": "https://cdn.sofifa.net/players/236/401/25_120.png",
       "position": "LB",
       "nationality": "Morocco",
       "flag": "https://cdn.sofifa.net/flags/ma.png",
       "club": "Manchester United",
       "logo": "https://cdn.sofifa.net/meta/team/14/120.png",
       "rating": 81,
       "pace": 78,
       "shooting": 66,
       "passing": 77,
       "dribbling": 83,
       "defending": 77,
       "physical": 71
     },
     {
       "name": "Ismael Saibari",
       "photo": "https://cdn.sofifa.net/players/259/480/25_120.png",
       "position": "CM",
       "nationality": "Morocco",
       "flag": "https://cdn.sofifa.net/flags/ma.png",
       "club": "PSV",
       "logo": "https://cdn.sofifa.net/meta/team/682/120.png",
       "rating": 83,
       "pace": 89,
       "shooting": 78,
       "passing": 80,
       "dribbling": 86,
       "defending": 55,
       "physical": 84
     },
     {
       "name": "Gianluigi Donnarumma",
       "photo": "https://cdn.sofifa.net/players/230/621/25_120.png",
       "position": "GK",
       "nationality": "Italy",
       "flag": "https://cdn.sofifa.net/flags/it.png",
       "club": "Paris Saint-Germain",
       "logo": "https://cdn.sofifa.net/meta/team/591/120.png",
       "rating": 89,
       "diving": 88,
       "handling": 84,
       "kicking": 75,
       "reflexes": 90,
       "speed": 50,
       "positioning": 85
     }
   ]
 };

 if (localStorage.getItem("players")) {
   allPlayers = JSON.parse(localStorage.getItem("players"));
 } else {
   allPlayers = defaultPlayers.players;
   localStorage.setItem("players", JSON.stringify(allPlayers));
 }

  

  document
    .getElementById("playerForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      let photoInput = document.getElementById("playerPhoto").files[0];
      let flagInput = document.getElementById("playerFlag").files[0];
      let logoInput = document.getElementById("playerLogo").files[0];

      let photoUrl = photoInput ? URL.createObjectURL(photoInput) : null;
      let flagUrl = flagInput ? URL.createObjectURL(flagInput) : null;
      let logoUrl = logoInput ? URL.createObjectURL(logoInput) : null;
      let playerData = {};
      if (document.getElementById("playerPosition").value !== "GK") {
        playerData = {
          name: document.getElementById("playerName").value,
          photo: photoUrl,
          position: document.getElementById("playerPosition").value,
          flag: flagUrl,
          logo: logoUrl,
          rating: document.getElementById("playerRating").value,
          pace: document.querySelector(".Pace-or-Diving").value,
          shooting: document.querySelector(".Shooting-or-Handling").value,
          passing: document.querySelector(".Passing-or-Kicking").value,
          dribbling: document.querySelector(".Dribbling-or-Reflexes").value,
          defending: document.querySelector(".Defending-or-Speed").value,
          physical: document.querySelector(".Physical-or-Positioning").value,
        };
      } else {
        playerData = {
          name: document.getElementById("playerName").value,
          photo: photoUrl,
          position: document.getElementById("playerPosition").value,
          flag: flagUrl,
          logo: logoUrl,
          rating: document.getElementById("playerRating").value,
          diving: document.querySelector(".Pace-or-Diving").value,
          handling: document.querySelector(".Shooting-or-Handling").value,
          kicking: document.querySelector(".Passing-or-Kicking").value,
          reflexes: document.querySelector(".Dribbling-or-Reflexes").value,
          speed: document.querySelector(".Defending-or-Speed").value,
          positioning: document.querySelector(".Physical-or-Positioning").value,
        };
      }

      allPlayers = JSON.parse(localStorage.getItem("players"));
      allPlayers.push(playerData);
      localStorage.setItem("players", JSON.stringify(allPlayers));
      addPlayerToSideBar(allPlayers);

      showForm(false);
    });

  function addPlayerToSideBar(players) {
    sideBar.innerHTML = `
      <div class="p-4 add-player-contianer"> 
      <button onclick="showForm(true)" class="bg-blue-500 mr-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Add Player
        </button>
        <div class="position-toggle">
    <label>Show positions</label>
    <input   onclick="showPositions(this.checked)" type="checkbox">
</div>
        </div>
        `;
    players.forEach((player, index) => {
      const isGoalKeeper = player.position === "GK";
      const playerCard = document.createElement("div");
      playerCard.classList.add("p-out");
      playerCard.setAttribute("position", player.position);
      player.index = index;

      playerCard.draggable = true;
      playerCard.setAttribute("id", index);
      playerCard.classList.add(
        "player-out",
        "cursor-pointer",
        "mb-1",
      );
      playerCard.innerHTML = `
       <div class="p-resonsive">
        <span class="text-white"> ${
        player.position
      } </span> 
        <button class="text-white r-btn delet" id="${index}"> <i class="fa-solid fa-trash"></i></button> 
        <button class="text-white r-btn edit" id="${index}" ><i class="fa-regular fa-pen-to-square"></i></button> 
        </div>
    <h1 class="w-full ml-4 p-name text-white">player: <span class="font-medium text-orange-500">${
      player.name
    }<span class="text-white"> |</span> ${
        player.position
      }</span><button id="${index}"  class="edit"><i class="fa-regular fa-pen-to-square"></i></button><button id="${index}"  class="delet"><i class="fa-solid fa-trash"></i>  </button></h1>
   
      <div class="w-[60px] h-[60px] ml-1 bg-[#39afca] rounded-full">
        <img class="w-[60px] h-[60px] rounded-full" src="${
          player.photo
        }" alt="">
      </div>
      <div class="plyer-skiles flex w-[50%] justify-between">
        <div class="stat-row flex flex-col">
          <span class="stat-label sid-plyaer-info text-white">Rt</span>
          <span class="stat-value side-player-value text-yellow-600">${player.rating}</span>
        </div>
        <div class="stat-row flex flex-col">
          <span class="stat-label sid-plyaer-info text-white">${
            isGoalKeeper ? "DIV" : "SHO"
          }</span>
          <span class="stat-value side-player-value text-yellow-600">${
            player.pace || player.diving
          }</span>
        </div>
        <div class="stat-row flex flex-col">
          <span class="stat-label sid-plyaer-info text-white">${
            isGoalKeeper ? "HAN" : "PAC"
          }</span>
          <span class="stat-value side-player-value text-yellow-600">${
            player.shooting || player.handling
          }</span>
        </div>
        <div class="stat-row flex flex-col">
          <span class="stat-label sid-plyaer-info text-white">${
            isGoalKeeper ? "KIC" : "PAS"
          }</span>
          <span class="stat-value side-player-value text-yellow-600">${
            player.passing || player.kicking
          }</span>
        </div>
        <div class="stat-row flex flex-col">
          <span class="stat-label sid-plyaer-info text-white">${
            isGoalKeeper ? "REF" : "DRI"
          }</span>
          <span class="stat-value side-player-value text-yellow-600">${
            player.dribbling || player.reflexes
          }</span>
        </div>
        <div class="stat-row flex flex-col">
          <span class="stat-label sid-plyaer-info text-white">${
            isGoalKeeper ? "SPD" : "DEF"
          }</span>
          <span class="stat-value side-player-value text-yellow-600">${
            player.defending || player.speed
          }</span>
        </div>
        <div class="stat-row flex flex-col">
          <span class="stat-label sid-plyaer-info text-white">${
            isGoalKeeper ? "POS" : "PHY"
          }</span>
          <span class="stat-value side-player-value text-yellow-600">${
            player.physical || player.positioning
          }</span>
        </div>
      </div>
      <div class="flex w-[30%] justify-evenly items-center">
        <img class="player-country-img  side-plyaer-img w-[50px] h-[40px]" src="${
          player.flag
        }" alt="">
        <img class="player-country-img  side-plyaer-img w-[50px] h-[40px]" src="${
          player.logo
        }" alt="">
       
       
      </div>
    `;

      playerCard.addEventListener("dragstart", () => {
        localStorage.setItem("is-pitch-player", JSON.stringify(false));
        localStorage.setItem(`sidBarDropedPlayerData`, JSON.stringify(player));
        playerCard.classList.add("dragging");
      });

      playerCard.addEventListener("dragend", (e) => {
        playerCard.classList.remove("dragging");
      });

      sideBar.appendChild(playerCard);
    });

    let deletBtns = document.querySelectorAll(".delet");
    deletBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        allPlayers.splice(Number(e.target.getAttribute("id")), 1);
        localStorage.setItem("players", JSON.stringify(allPlayers));
        allPlayers = JSON.parse(localStorage.getItem("players"));
        addPlayerToSideBar(allPlayers);
      });
    });
    let editBtns = document.querySelectorAll(".edit");
    editBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        selected = Number(e.target.getAttribute("id"));
        let playerToEdit = allPlayers[selected];

        showForm(true);

        document.getElementById("playerName").value = playerToEdit.name;
        document.getElementById("playerPosition").value = playerToEdit.position;
        document.getElementById("playerRating").value = playerToEdit.rating;
        document.getElementById("playerPace").value = playerToEdit.pace;
        document.getElementById("playerShooting").value = playerToEdit.shooting;
        document.getElementById("playerPassing").value = playerToEdit.passing;
        document.getElementById("playerDribbling").value =
          playerToEdit.dribbling;
        document.getElementById("playerDefending").value =
          playerToEdit.defending;
        document.getElementById("playerPhysical").value = playerToEdit.physical;

        document.getElementById("playerForm").onsubmit = function (event) {
          event.preventDefault();

          let newPhotoInput = document.getElementById("playerPhoto").files[0];
          let newFlagInput = document.getElementById("playerFlag").files[0];
          let newLogoInput = document.getElementById("playerLogo").files[0];

          if (newPhotoInput) {
            playerToEdit.photo = URL.createObjectURL(newPhotoInput);
          }
          if (newFlagInput) {
            playerToEdit.flag = URL.createObjectURL(newFlagInput);
          }
          if (newLogoInput) {
            playerToEdit.logo = URL.createObjectURL(newLogoInput);
          }

          playerToEdit.name = document.getElementById("playerName").value;
          playerToEdit.position =
            document.getElementById("playerPosition").value;
          playerToEdit.rating = document.getElementById("playerRating").value;
          playerToEdit.pace = document.getElementById("playerPace").value;
          playerToEdit.shooting =
            document.getElementById("playerShooting").value;
          playerToEdit.passing = document.getElementById("playerPassing").value;
          playerToEdit.dribbling =
            document.getElementById("playerDribbling").value;
          playerToEdit.defending =
            document.getElementById("playerDefending").value;
          playerToEdit.physical =
            document.getElementById("playerPhysical").value;
          allPlayers = JSON.parse(localStorage.getItem("players"));
          allPlayers[selected] = playerToEdit;
          allPlayers.splice(selected, 1);
          localStorage.setItem("players", JSON.stringify(allPlayers));
          addPlayerToSideBar(allPlayers);
          showForm(false);
        };
      });
    });
  }

  playersContainerDev.addEventListener("dragstart", (e) => {
    const player = e.target.closest(".player");
    localStorage.setItem("is-pitch-player", JSON.stringify(true));

    player.classList.add("dragging");
  });

  playersContainerDev.addEventListener("dragover", (e) => {
    e.preventDefault();
    let dropTarget = e.target.closest(".placeholder");

    if (dropTarget) {
      dropTarget.classList.add("drag-over");
    }
  });

  playersContainerDev.addEventListener("dragleave", (e) => {
    dropTarget = e.target.closest(".placeholder");
    if (dropTarget) {
      dropTarget.classList.remove("drag-over");
    }
  });

  playersContainerDev.addEventListener("drop", (e) => {
    e.preventDefault();
    dropTarget = e.target.closest(".placeholder");

    let match = dropTarget.innerHTML.match(/id="(\d)"/) || "";

    const draggedPlayer = document.querySelector(".dragging");

    const isPitchPlayer = JSON.parse(localStorage.getItem("is-pitch-player"));
    localStorage.setItem("is-pitch-player", JSON.stringify(false));
    const sidebarPlayerData = JSON.parse(
      localStorage.getItem("sidBarDropedPlayerData")
    );

    if (!isPitchPlayer && sidebarPlayerData) {
      if (sidebarPlayerData.position == dropTarget.getAttribute("id")) {
        const sidebarPlayer = sidebarPlayerData;

        const existingPlayerHtml = dropTarget.innerHTML;

        if (existingPlayerHtml) {
          dropTarget.innerHTML = createPlayerCard(sidebarPlayer, match[1]);

          let temp = boardPLayers[Number(match[1])];

          allPlayers = JSON.parse(localStorage.getItem("players"));

          boardPLayers[Number(match[1])] = allPlayers[sidebarPlayerData.index];
          allPlayers[sidebarPlayerData.index] = temp;
          localStorage.setItem("players", JSON.stringify(allPlayers));
          addPlayerToSideBar(allPlayers, match);
        } else {
          const draggedSidebarPlayer = document.querySelector(
            ".player-out.dragging"
          );
          if (boardPLayers.length < 11) {
            const newIndex = boardPLayers.length;

            dropTarget.innerHTML = createPlayerCard(sidebarPlayer, newIndex);
            if (draggedSidebarPlayer) {
              boardPLayers.push(allPlayers[sidebarPlayerData.index]);
              allPlayers.splice(sidebarPlayerData.index, 1);
              localStorage.setItem("players", JSON.stringify(allPlayers));
              localStorage.setItem(
                "boardPlayers",
                JSON.stringify(boardPLayers)
              );
              addPlayerToSideBar(allPlayers);
            }
          } else {
            modal.style.top = "2%";
            modalMessage.innerHTML = "you can only add 11 players";
            setTimeout(() => {
              modal.style.top = "-200px";
            }, 2000);
          }
        }
      } else {
        modal.style.top = "2%";
        modalMessage.innerHTML = "it's not the same position";
        setTimeout(() => {
          modal.style.top = "-200px";
        }, 2000);
      }
    } else if (draggedPlayer) {
      // Handle pitch-to-pitch swap

      const sourceContainer = draggedPlayer.closest(".placeholder");
      const targetContent = dropTarget.innerHTML;
      if (sourceContainer.getAttribute("id") == dropTarget.getAttribute("id")) {
        dropTarget.innerHTML = sourceContainer.innerHTML;
        sourceContainer.innerHTML = targetContent;
      } else {
        modal.style.top = "2%";
        modalMessage.innerHTML = "it's not the same position";
        setTimeout(() => {
          modal.style.top = "-200px";
        }, 2000);
      }
    }

    document
      .querySelectorAll(".dragging")
      .forEach((el) => el.classList.remove("dragging"));
    document
      .querySelectorAll(".drag-over")
      .forEach((el) => el.classList.remove("drag-over"));
  });

  addPlayerToSideBar(allPlayers);

  // switch players in the sideBare
  sideBar.addEventListener("dragover", (e) => {
    e.preventDefault(); 
  });

  sideBar.addEventListener("drop", (e) => {
    e.preventDefault();
    const draggedPlayer = document.querySelector(".dragging");

    if (draggedPlayer) {
      const dropTarget = e.target.closest(".player-out");
      let indexOfDragedPlayer = Number(draggedPlayer.getAttribute("id"));
      let indexOfDropOnPlayer = Number(dropTarget.getAttribute("id"));
      if (draggedPlayer.parentElement != dropTarget.parentElement) {
        // handle switch from pitch to sideBare
        let allplayersFromTeirran = document.querySelectorAll(".player");
        let dragedPlayerToSidBare = Number(draggedPlayer.getAttribute("id"));
        allplayersFromTeirran.forEach((p) => {
          if (Number(p.getAttribute("id")) > dragedPlayerToSidBare) {
            p.setAttribute("id", `${Number(p.getAttribute("id")) - 1}`);
          }
        });

        allPlayers.splice(
          indexOfDropOnPlayer,
          0,
          boardPLayers[indexOfDragedPlayer]
        );
        localStorage.setItem("players", JSON.stringify(allPlayers));
        allPlayers = JSON.parse(localStorage.getItem("players"));
        addPlayerToSideBar(allPlayers);
        boardPLayers.splice(indexOfDragedPlayer, 1);
        draggedPlayer.parentElement.innerHTML = "";
      } else {
        let indexOfDropedOnSibling = Number(draggedPlayer.getAttribute("id"));
        let temp = allPlayers[indexOfDropOnPlayer];
        allPlayers[indexOfDropOnPlayer] = allPlayers[indexOfDropedOnSibling];
        allPlayers[indexOfDropedOnSibling] = temp;
        localStorage.setItem("players", JSON.stringify(allPlayers));
        allPlayers = JSON.parse(localStorage.getItem("players"));
        addPlayerToSideBar(allPlayers);
      }
    }
  });
  // switch players in the sideBare --
}

getData();

function createPlayerCard(player, id) {
  if (player.position == "GK") {
    isGoalKeeper = true;
  } else {
    isGoalKeeper = false;
  }
  return `
    <div draggable="true"  class="player" id=${
      id ? id : boardPLayers.length || 0
    }>
                <div class="player-infos flex flex-col items-center">
                  <div class="flex justify-start ml-2 ">
                    <span class="stat-label rp mt-1 ml-[-3px]  font-light text-[#f5deb3]">
                     <span>${player?.rating}<br>${player.position}</span> 
                    </span>
                    <img class="player-img rounded-full" src=${
                      player.photo
                    } alt="">
                  </div>  
                  <p class="player-name">${player.name}</p>
                  <div class="player-details flex w-[100%] px-1 justify-between" >
                    <div class="stat-row flex flex-col">
                      <span class="stat-label  text-[0.4em] font-thin text-white">${
                        isGoalKeeper ? "DIV" : "PAC"
                      }</span>
                      <span class="stat-value text-[0.6em] text-yellow-600 font-thin">${
                        player?.pace || player.diving
                      }</span>
                    </div>
                    <div class="stat-row flex flex-col">
                      <span class="stat-label text-[0.4em] font-thin text-white">${
                        isGoalKeeper ? "HAN" : "SHO"
                      }</span>
                      <span class="stat-value text-[0.6em] text-yellow-600 font-thin">${
                        player?.shooting || player?.handling
                      }</span>
                    </div>
                    <div class="stat-row flex flex-col">
                      <span class="stat-label text-[0.4em] font-thin text-white">${
                        isGoalKeeper ? "KIC" : "PAS"
                      }</span>
                      <span class="stat-value text-[0.6em] text-yellow-600 font-thin">${
                        player?.passing || player?.kicking
                      }</span>
                    </div>
                    <div class="stat-row flex flex-col">
                      <span class="stat-label text-[0.4em] font-thin text-white">${
                        isGoalKeeper ? "FEF" : "DRI"
                      }</span>
                      <span class="stat-value text-[0.6em] text-yellow-600 font-thin">${
                        player?.dribbling || player?.reflexes
                      }</span>
                    </div>
                    <div class="stat-row flex flex-col">
                      <span class="stat-label text-[0.4em] font-thin text-white">${
                        isGoalKeeper ? "SPD" : "DEF"
                      }</span>
                      <span class="stat-value text-[0.6em] text-yellow-600 font-thin">${
                        player?.defending || player?.speed
                      }</span>
                    </div>
                    <div class="stat-row flex flex-col">
                      <span class="stat-label text-[0.4em] font-thin text-white">${
                        isGoalKeeper ? "POS" : "PHY"
                      }</span>
                      <span class="stat-value text-[0.6em] text-yellow-600 font-thin">${
                        player?.physical || player?.positioning
                      }</span>
                    </div>
                  </div>
                  <div class="flex w-[60%] justify-between">
                    <img class="player-country-img rounded-full" src=${
                      player.flag
                    } alt="">
                    <img class="player-country-img rounded-full" src=${
                      player.logo
                    } alt="">
                  </div>
                </div>
              </div>
      `;
}

function showPositions(isChecked) {
  if (isChecked) {
    allPositions.forEach((p) => (p.style.display = "flex"));
  } else {
    allPositions.forEach((p) => (p.style.display = "none"));
  }
}

showPositions(false);


