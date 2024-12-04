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
  if (localStorage.getItem("players")) {
    allPlayers = JSON.parse(localStorage.getItem("players"));
  } else {
    let response = await fetch("/players.json");
    let data = await response.json();
    allPlayers = data.players;
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


