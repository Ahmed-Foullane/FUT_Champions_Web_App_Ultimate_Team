// Load players data
localStorage.clear()
let goalKeeper = document.getElementById("a3");
let defence = document.querySelectorAll(".b .item");
let middle = document.querySelectorAll(".c .item");
let attack = document.querySelectorAll(".d .item");
let sideBar = document.querySelector(".side-bar");
let form = document.querySelector(".add-new-plaer-form ");

let positionSelect = document.getElementById("playerPosition");

function showForm(show) {
  show ? (form.style.display = "flex") : (form.style.display = "none");
}

// Define labels for each position
let positionLabels = {
  GK: ["Diving", "Handling", "Kicking", "Reflexes", "Speed", "Positioning"],
  DEF: ["Pace", "Shooting", "Passing", "Dribbling", "Defending", "Physical"],
  MID: ["Pace", "Shooting", "Passing", "Dribbling", "Defending", "Physical"],
  FWD: ["Pace", "Shooting", "Passing", "Dribbling", "Defending", "Physical"],
};

// Handle position change
positionSelect.addEventListener("change", () => {
  let position = positionSelect.value;
  let labels = positionLabels[position];

  // Update labels in the stats container
  document.querySelectorAll("#labelPlyaer label").forEach((label, index) => {
    label.innerHTML = labels[index];
  });
});

async function getData() {
  let response = await fetch("/players.json");
  let players = await response.json();
  players = players.players;
  if (!localStorage.getItem("players")) {
    localStorage.setItem("players", JSON.stringify(players));
  }
  let allPlayers = JSON.parse(localStorage.getItem("players"));
  let isGoalKeeper = false;

  let GK = {}
  let DEF = []
  let MID = []
  let FWD = []

  document.getElementById("playerForm").addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission

      // Get the uploaded files
      let photoInput = document.getElementById("playerPhoto").files[0];
      let flagInput = document.getElementById("playerFlag").files[0];
      let logoInput = document.getElementById("playerLogo").files[0];

      // Get object URLs for uploaded files
      let photoUrl = photoInput ? URL.createObjectURL(photoInput) : null;
      let flagUrl = flagInput ? URL.createObjectURL(flagInput) : null;
      let logoUrl = logoInput ? URL.createObjectURL(logoInput) : null;

      // Collect input values
      let playerData = {
        name: document.getElementById("playerName").value,
        photo: photoUrl, // Object URL for the photo
        position: document.getElementById("playerPosition").value,
        flag: flagUrl, // Object URL for the flag
        logo: logoUrl, // Object URL for the logo
        rating: parseInt(document.getElementById("playerRating").value, 10),
        pace: parseInt(document.getElementById("playerPace").value, 10),
        shooting: parseInt(document.getElementById("playerShooting").value, 10),
        passing: parseInt(document.getElementById("playerPassing").value, 10),
        dribbling: parseInt(
          document.getElementById("playerDribbling").value,
          10
        ),
        defending: parseInt(
          document.getElementById("playerDefending").value,
          10
        ),
        physical: parseInt(document.getElementById("playerPhysical").value, 10),
      };

      console.log(playerData); // Log the formatted object
      let playersFromStorage = JSON.parse(localStorage.getItem("players"));
      localStorage.clear();
      playersFromStorage.push(playerData);
      localStorage.setItem("players", JSON.stringify(playersFromStorage));
      addPlayerToSideBar(JSON.parse(localStorage.getItem("players")));
      showForm(false);
    });
  function createPlayerCard(player) {
    if (player.position == "GK") {
      isGoalKeeper = true;
    } else {
      isGoalKeeper = false;
    }

    return `
      <div draggable="true"  class="player">
                  <div class="player-infos flex flex-col items-center">
                    <div class="flex justify-start ml-2 ">
                      <span class="stat-label mt-1 ml-[-3px]  font-light text-[#f5deb3]">
                       <span>${player?.rating}<br>${player.position}</span> 
                      </span>
                      <img class="player-img " src=${player.photo} alt="">
                    </div>  
                    <p class="player-name">${player.name}</p>
                    <div class="player-details flex w-[100%] px-1 justify-between" >
                      <div class="stat-row flex flex-col">
                        <span class="stat-label text-[0.4em] font-thin text-white">${
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


  
  goalKeeper.innerHTML = createPlayerCard(players[25]);
  defence[0].innerHTML = createPlayerCard(players[10]);
  defence[1].innerHTML = createPlayerCard(players[11]);
  defence[3].innerHTML = createPlayerCard(players[12]);
  defence[4].innerHTML = createPlayerCard(players[13]);
  middle[1].innerHTML = createPlayerCard(players[3]);
  middle[2].innerHTML = createPlayerCard(players[8]);
  middle[3].innerHTML = createPlayerCard(players[5]);
  attack[0].innerHTML = createPlayerCard(players[1]);
  attack[2].innerHTML = createPlayerCard(players[7]);
  attack[4].innerHTML = createPlayerCard(players[0]);

  function addPlayerToSideBar(players) {
    // Clear the sidebar content to prevent duplicates
    sideBar.innerHTML = `
        <button onclick="showForm(true)" class=" bg-blue-500 mr-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4" type="submit">
        Add Player
    </button>`;

    players.forEach((player, i) => {
      let isGoalKeeper = player.position === "GK";

      sideBar.innerHTML += `
            <div draggable="true" onclick="addPlayerToBoard(${i})" class="player-out cursor-pointer mb-1 bg-[#222322] h-[15%] flex items-center justify-center flex-wrap">
                <h1 class="w-full ml-4 text-white">player: <span class="font-medium text-orange-500">${
                  player.name
                }<span class="text-white"> |</span> ${
        player.position
      }</span> </h1>
                <div class="w-[60px] h-[60px] ml-1 bg-[#39afca] rounded-full ">
                    <img class="w-[60px] h-[60px] rounded-full" src="${
                      player.photo
                    }" alt="">
                </div>
                <div class="plyer-skiles flex w-[50%] justify-between">
                    <div class="stat-row flex flex-col">
                        <span class="stat-label text-white">Rt</span>
                        <span class="stat-value text-yellow-600">${
                          player.rating
                        }</span>
                    </div>
                    <div class="stat-row flex flex-col">
                        <span class="stat-label text-white">${
                          isGoalKeeper ? "DIV" : "SHO"
                        }</span>
                        <span class="stat-value text-yellow-600">${
                          player.pace || player.diving
                        }</span>
                    </div>
                    <div class="stat-row flex flex-col">
                        <span class="stat-label text-white">${
                          isGoalKeeper ? "HAN" : "PAC"
                        }</span>
                        <span class="stat-value text-yellow-600">${
                          player.shooting || player.handling
                        }</span>
                    </div>
                    <div class="stat-row flex flex-col">
                        <span class="stat-label text-white">${
                          isGoalKeeper ? "KIC" : "PAS"
                        }</span>
                        <span class="stat-value text-yellow-600">${
                          player.passing || player.kicking
                        }</span>
                    </div>
                    <div class="stat-row flex flex-col">
                        <span class="stat-label text-white">${
                          isGoalKeeper ? "REF" : "DRI"
                        }</span>
                        <span class="stat-value text-yellow-600">${
                          player.dribbling || player.reflexes
                        }</span>
                    </div>
                    <div class="stat-row flex flex-col">
                        <span class="stat-label text-white">${
                          isGoalKeeper ? "SPD" : "DEF"
                        }</span>
                        <span class="stat-value text-yellow-600">${
                          player.defending || player.speed
                        }</span>
                    </div>
                    <div class="stat-row flex flex-col">
                        <span class="stat-label text-white">${
                          isGoalKeeper ? "POS" : "PHY"
                        }</span>
                        <span class="stat-value text-yellow-600">${
                          player.physical || player.positioning
                        }</span>
                    </div>
                </div>
                <div class="flex w-[30%] justify-evenly items-center">
                    <img class="player-country-img w-[50px] h-[40px]" src="${
                      player.flag
                    }" alt="">
                    <img class="player-country-img w-[50px] h-[40px]" src="${
                      player.logo
                    }" alt="">
                </div>
            </div>
            `;
    });
  }

  addPlayerToSideBar(allPlayers);
}

getData();

function addPlayerToBoard(index) {
  let plyersLocalStorage = JSON.parse(localStorage.getItem("players"))
  console.log(plyersLocalStorage[index]);
  
}

// Function to create player card HTML
