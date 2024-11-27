// Load players data
localStorage.clear()
let goalKeeper = document.getElementById("a3");
let defence = document.querySelectorAll(".b .item");
let middle = document.querySelectorAll(".c .item");
let attack = document.querySelectorAll(".d .item");
let sideBar = document.querySelector(".side-bar");
let form = document.querySelector(".add-new-plaer-form ");

let positionSelect = document.getElementById("playerPosition");

let formations = [{
  DEF: [0,1,3,4],
  MID: [1,2,3],
  FWD: [0,2,4],
}]
let gk = {
  name: "Gianluigi Donnarumma",
  photo: "https://cdn.sofifa.net/players/230/621/25_120.png",
  position: "GK",
  nationality: "Italy",
  flag: "https://cdn.sofifa.net/flags/it.png",
  club: "Paris Saint-Germain",
  logo: "https://cdn.sofifa.net/meta/team/591/120.png",
  rating: 89,
  diving: 88,
  handling: 84,
  kicking: 75,
  reflexes: 90,
  speed: 50,
  positioning: 85
}
let def = [
  {
    name: "Antonio Rudiger",
    photo: "https://cdn.sofifa.net/players/205/452/25_120.png",
    position: "CB",
    nationality: "Germany",
    flag: "https://cdn.sofifa.net/flags/de.png",
    club: "Real Madrid",
    logo: "https://cdn.sofifa.net/meta/team/3468/120.png",
    rating: 88,
    pace: 82,
    shooting: 55,
    passing: 73,
    dribbling: 70,
    defending: 86,
    physical: 86
  },
  {
    name: "Alphonso Davies",
    photo: "https://cdn.sofifa.net/players/234/396/25_120.png",
    position: "LB",
    nationality: "Canada",
    flag: "https://cdn.sofifa.net/flags/ca.png",
    club: "Bayern Munich",
    logo: "https://cdn.sofifa.net/meta/team/503/120.png",
    rating: 84,
    pace: 96,
    shooting: 68,
    passing: 77,
    dribbling: 82,
    defending: 76,
    physical: 77
  },
  {
    name: "Trent Alexander-Arnold",
    photo: "https://cdn.sofifa.net/players/231/281/25_120.png",
    position: "RB",
    nationality: "England",
    flag: "https://cdn.sofifa.net/flags/gb-eng.png",
    club: "Liverpool",
    rating: 87,
    pace: 76,
    shooting: 66,
    passing: 89,
    dribbling: 80,
    defending: 79,
    physical: 71
  },
  {
    name: "Noussair Mazraoui",
    photo: "https://cdn.sofifa.net/players/236/401/25_120.png",
    position: "LB",
    nationality: "Morocco",
    flag: "https://cdn.sofifa.net/flags/ma.png",
    club: "Manchester United",
    logo: "https://cdn.sofifa.net/meta/team/14/120.png",
    rating: 81,
    pace: 78,
    shooting: 66,
    passing: 77,
    dribbling: 83,
    defending: 77,
    physical: 71
  }
];

let mid =[
  {
    name: "Joshua Kimmich",
    photo: "https://cdn.sofifa.net/players/212/622/25_120.png",
    position: "CM",
    nationality: "Germany",
    flag: "https://cdn.sofifa.net/flags/de.png",
    club: "Bayern Munich",
    logo: "https://cdn.sofifa.net/meta/team/503/120.png",
    rating: 89,
    pace: 70,
    shooting: 75,
    passing: 88,
    dribbling: 84,
    defending: 84,
    physical: 81
  },
  {
    name: "N'Golo Kanté",
    photo: "https://cdn.sofifa.net/players/215/914/25_120.png",
    position: "CDM",
    nationality: "France",
    flag: "https://cdn.sofifa.net/flags/fr.png",
    club: "Al-Ittihad",
    logo: "https://cdn.sofifa.net/meta/team/476/120.png",
    rating: 87,
    pace: 77,
    shooting: 66,
    passing: 75,
    dribbling: 82,
    defending: 88,
    physical: 82
  },
  {
    name: "Ismael Saibari",
    photo: "https://cdn.sofifa.net/players/259/480/25_120.png",
    position: "CM",
    nationality: "Morocco",
    flag: "https://cdn.sofifa.net/flags/ma.png",
    club: "PSV",
    logo: "https://cdn.sofifa.net/meta/team/682/120.png",
    rating: 83,
    pace: 89,
    shooting: 78,
    passing: 80,
    dribbling: 86,
    defending: 55,
    physical: 84
  }
];

let fwd = [
  {
    name: "Erling Haaland",
    photo: "https://cdn.sofifa.net/players/239/085/25_120.png",
    position: "ST",
    nationality: "Norway",
    flag: "https://cdn.sofifa.net/flags/no.png",
    club: "Manchester City",
    logo: "https://cdn.sofifa.net/players/239/085/25_120.png",
    rating: 91,
    pace: 89,
    shooting: 94,
    passing: 65,
    dribbling: 80,
    defending: 45,
    physical: 88
  },
  {
    name: "Jadon Sancho",
    photo: "https://cdn.sofifa.net/players/233/049/25_120.png",
    position: "LW",
    nationality: "England",
    flag: "https://cdn.sofifa.net/flags/gb-eng.png",
    club: "Manchester United",
    logo: "https://cdn.sofifa.net/meta/team/14/120.png",
    rating: 84,
    pace: 85,
    shooting: 74,
    passing: 78,
    dribbling: 88,
    defending: 34,
    physical: 63
  },
  {
    name: "Youssef En-Nesyri",
    photo: "https://cdn.sofifa.net/players/235/410/25_120.png",
    position: "ST",
    nationality: "Morocco",
    flag: "https://cdn.sofifa.net/flags/ma.png",
    club: "Fenerbahçe",
    logo: "https://cdn.sofifa.net/meta/team/88/120.png",
    rating: 83,
    pace: 82,
    shooting: 82,
    passing: 63,
    dribbling: 77,
    defending: 36,
    physical: 80
  }
];


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


  for (let i = 0; i < formations[0].MID.length; i++) {
    
      middle[formations[0].MID[i]].innerHTML = createPlayerCard(mid[i]);
    
  }
  
  // Loop for FWD players
  for (let i = 0; i < formations[0].FWD.length; i++) {
    
      attack[formations[0].FWD[i]].innerHTML = createPlayerCard(fwd[i]);
    
  }
  
  // Loop for DEF players
  for (let i = 0; i < formations[0].DEF.length; i++) {
    
      defence[formations[0].DEF[i]].innerHTML = createPlayerCard(def[i]);
    
  }
  

  function addPlayerToSideBar(players) {
    // Clear the sidebar content to prevent duplicates
    sideBar.innerHTML = `
    <div class="flex items-center p-4"> 
    <button onclick="showForm(true)" class=" bg-blue-500 mr-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " type="submit">
    Add Player
    </button>
    <form class="w-[80%] mx-auto">
    <select id="formations" class="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option selected>formations</option>
    <option value="US">4-3-3 </option>
    <option value="CA">4-4-2</option>
    </select>
    </form>
    </div>
`
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
