import Ship from "./Ship";
import GameBoard from "./Gameboard";

import {
  displayBoard,
  displayHeader,
  displayText,
  displayBlocks,
  switchBlocks,
  displayName,
  showPosition,
  removeHeader,
  removeBlocks,
  removeText,
  checkPlayer,
  makePopUp,
  makeContainer,
  clickPopUp,
  enterPopUp,
  changeHeaderText,
  setBlocksToGameMode,
  showHitsOnBlocks
} from "./UI";

import {
  makePlayer,
  randDirection,
  randomStartingPoint,
  setShipsOnMachineBoard,
  reset,
} from "./Functions";

const text_1 = "Become the next Kingpin of Rotterdam!";
const text_2 = "Stash your drugs away, so your enemy can't find them...";
const text_3 = "Ohwee thats a lot of coke!";
const text_4 = "Take that crack and hide it!";
const text_5 = "Put the crystal away, so nobody can't see it!";
const text_6 = "Magic mushroom, gonna hide it!";
const text_7 = "Hide that Hokus Pokus!";

const playRound = (machine_board, human_board, player, machine) => {
  removeHeader();
  setBlocksToGameMode();
  removeText();
  makeContainer();

  const machineBoardArray = document.querySelectorAll(".machine");
  machineBoardArray.forEach((e) => {
    e.addEventListener("click", (element) => {
      let coord = element.target.getAttribute("data-id");
      let array = [];
      array.push(parseInt(coord[0]), parseInt(coord[2]));
      if (machine_board.receiveAttack(array)) {
        element.target.style.backgroundColor = "red";
        element.target.style.opacity = ".6";
        element.target.style.pointerEvents = "none";
        displayText("Hit!");
        machine_board.checkGameOver();
        human_board.checkGameOver();
        // showHitsOnBlocks(human_board.getInfo());
        setTimeout(() => {
          removeText();
        }, 1500);
      } else {
        machine_board.checkGameOver();
        human_board.checkGameOver();
        element.target.style.backgroundColor = "pink";
        element.target.style.opacity = ".6";
        displayText("Nothing!");
        element.target.style.pointerEvents = "none";
        setTimeout(() => {
          removeText();
        }, 1500);
      }

      if (machine_board.checkGameOver() === true) {
        player.addRound();
        machine.addRound();
        player.addPoint();
        machine.addLostGame();
        alert(`Game Over! ${player.name} hat gewonnen. 
              Es steht ${machine.points} zu ${player.points} für ${player.name}!`);
        setTimeout(() => {
          reset();
          game();
        }, 1000);
        //setTimeout(() => {
        //  location.reload();
        //}, 1000);
      } else if (human_board.checkGameOver() === true) {
        player.addRound();
        machine.addRound();
        player.addLostGame();
        machine.addPoint();
        alert(`Game Over! ${machine.name} hat gewonnen
        Es steht ${machine.points} zu ${player.points} für ${machine.name}!`);
        setTimeout(() => {
          reset();
          game();
        }, 1000);
      } else {
        setTimeout(() => {
          let test = human_board.randomShot();
          console.log(test);
          showHitsOnBlocks(test);
        }, 1000);
      }
    });
  });
};
let player;
let machine;
export function game() {
  displayHeader(text_1);
  displayBlocks();
  switchBlocks();
  makeContainer();

  window.addEventListener("mousemove", changeHeaderText);

  if (typeof machine === "undefined") {
    machine = makePlayer("Machine");
  }
  if (typeof player === "undefined") {
    player = makePlayer("Player");
  }

  const header = document.getElementById("header");
  header.style.color = "green";
  checkPlayer(player);

  // Make new boards
  const human_board = new GameBoard("human");
  human_board.createRandomArray();
  const machine_board = new GameBoard("machine");
  machine_board.createRandomArray();

  // Define "Ships" aka drugs
  const cocaine = new Ship(5, "cocaine", "human");
  const meth = new Ship(4, "meth", "human");
  const crack = new Ship(3, "crack", "human");
  const weed = new Ship(2, "weed", "human");
  const shrooms = new Ship(2, "shrooms", "human");

  const machine_cocaine = new Ship(5, "cocaine", "machine");
  const machine_meth = new Ship(4, "meth", "machine");
  const machine_crack = new Ship(3, "crack", "machine");
  const machine_weed = new Ship(2, "weed", "machine");
  const machine_shrooms = new Ship(2, "shrooms", "machine");

  // Set ships with array
  const arrayOfShips_human = [cocaine, meth, crack, weed, shrooms];
  const arrayOfShips_machine = [
    machine_cocaine,
    machine_meth,
    machine_crack,
    machine_weed,
    machine_shrooms,
  ];

  arrayOfShips_human.forEach((e) => {
    human_board.placeShips(e);
  });

  arrayOfShips_machine.forEach((e) => {
    machine_board.placeShips(e);
  });

  // Set ships on random position
  const shipPositions = setShipsOnMachineBoard(arrayOfShips_machine);

  const settingShip = (ship, array) => {
    if (!array || !Array.isArray(array)) {
      let direction = randDirection();
      let start = randomStartingPoint(ship.name, direction);
      ship.position = [];
      ship.pos(start, direction);
      ship.direction = direction;
      console.log(ship);
      return;
    }
    ship.position = array;
    ship.set = true;
    showPosition(ship);
  };

  settingShip(machine_cocaine, shipPositions[0]);
  settingShip(machine_meth, shipPositions[1]);
  settingShip(machine_crack, shipPositions[2]);
  settingShip(machine_weed, shipPositions[3]);
  settingShip(machine_shrooms, shipPositions[4]);

  displayBoard("human");
  displayBoard("machine");

  // It's a drag
  const target = document.getElementById("human");
  const cocaineDiv = document.getElementById("cocaine");
  const crackDiv = document.getElementById("crack");
  const methDIV = document.getElementById("meth");
  const weedDiv = document.getElementById("weed");
  const shroomsDiv = document.getElementById("shrooms");
  const dropzones = document.querySelectorAll(".dropzone");
  cocaineDiv.setAttribute("draggable", true);
  crackDiv.setAttribute("draggable", true);
  methDIV.setAttribute("draggable", true);
  weedDiv.setAttribute("draggable", true);
  shroomsDiv.setAttribute("draggable", true);

  cocaineDiv.addEventListener("dragstart", (ev) => {
    removeHeader();
    displayHeader(text_3);
    ev.dataTransfer.clearData();
    ev.dataTransfer.setData("text/plain", ev.target.id);
  });

  crackDiv.addEventListener("dragstart", (ev) => {
    removeHeader();
    displayHeader(text_4);
    ev.dataTransfer.clearData();
    ev.dataTransfer.setData("text/plain", ev.target.id);
  });

  methDIV.addEventListener("dragstart", (ev) => {
    removeHeader();
    displayHeader(text_5);
    ev.dataTransfer.clearData();
    ev.dataTransfer.setData("text/plain", ev.target.id);
  });

  weedDiv.addEventListener("dragstart", (ev) => {
    removeHeader();
    displayHeader(text_7);
    ev.dataTransfer.clearData();
    ev.dataTransfer.setData("text/plain", ev.target.id);
  });

  shroomsDiv.addEventListener("dragstart", (ev) => {
    removeHeader();
    displayHeader(text_6);
    ev.dataTransfer.clearData();
    ev.dataTransfer.setData("text/plain", ev.target.id);
  });

  cocaineDiv.addEventListener("dragend", (ev) => {
    ev.preventDefault();
  });

  crackDiv.addEventListener("dragend", (ev) => {
    ev.preventDefault();
  });

  methDIV.addEventListener("dragend", (ev) => {
    ev.preventDefault();
  });

  weedDiv.addEventListener("dragend", (ev) => {
    ev.preventDefault();
  });

  shroomsDiv.addEventListener("dragend", (ev) => {
    ev.preventDefault();
  });

  target.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  target.addEventListener("drop", (e) => {
    e.preventDefault();
    const boardId = e.target.id;
  });

  target.addEventListener("drop", (ev) => {
    ev.preventDefault();

    let shipName = ev.dataTransfer.getData("text");
    let id = ev.target.id;
    const shipDiv = document.getElementById(shipName);
    const id1 = parseInt(id[0]);
    const id2 = parseInt(id[2]);
    let a = [];
    a.push(id1, id2);
    if (human_board.invalidPosition(a)) {
      msg.textContent = "Invalid position, try again!";
      return;
    }

    if (shipName === "cocaine") {
      if (cocaine.pos(a, shipDiv.classList[0])) return;
      showPosition(cocaine, human_board.name);
      removeHeader();
      window.removeEventListener("mousemove", changeHeaderText);
      displayHeader("Cocaine is hidden!");
      cocaineDiv.setAttribute("draggable", false);
    } else if (shipName === "crack") {
      if (crack.set) return;
      if (crack.pos(a, shipDiv.classList[0])) return;
      showPosition(crack, human_board.name);
      removeHeader();
      displayHeader("Nobody gonna find that Crack!");
      window.removeEventListener("mousemove", changeHeaderText);
      crackDiv.setAttribute("draggable", false);
    } else if (shipName === "meth") {
      if (meth.pos(a, shipDiv.classList[0])) return;
      showPosition(meth, human_board.name);
      removeHeader();
      window.removeEventListener("mousemove", changeHeaderText);
      displayHeader("Good!");
      methDIV.setAttribute("draggable", false);
    } else if (shipName === "shrooms") {
      if (shrooms.set) return;
      if (shrooms.pos(a, shipDiv.classList[0])) return;
      showPosition(shrooms, human_board.name);
      removeHeader();
      window.removeEventListener("mousemove", changeHeaderText);
      displayHeader("Nice!");
      shroomsDiv.setAttribute("draggable", false);
    } else if (shipName === "weed") {
      if (weed.set) return;
      if (weed.pos(a, shipDiv.classList[0])) return;
      showPosition(weed, human_board.name);
      removeHeader();
      window.removeEventListener("mousemove", changeHeaderText);
      displayHeader("Perfect!");
      weedDiv.setAttribute("draggable", false);
    } else return;

    // Auto set ship
    /*
    const setShip = (ship, coord) => {
      ship.pos(coord, "v");
      showPosition(ship);
    };
    setShip(cocaine, [0, 0]);
    setShip(crack, [0, 1]);
    setShip(meth, [0, 2]);
    setShip(weed, [0, 3]);
    setShip(shrooms, [0, 4]);

    const popUpButton = document.getElementById("submitPopup");
        popUpButton.addEventListener("click", () => {
          let popUpValue = document.getElementById("popUpInput").value;
          player.changeName(popUpValue);
          closePopUp();
          displayName(player);
        });

    */
    let result = human_board.allShipsSet();
    if (result) {
      if (player.round === 0) {
        setTimeout(() => {
          makePopUp();
          clickPopUp(player);
          enterPopUp(player);
        }, 1000);
      } else {
        setTimeout(() => {
          displayName(player);
        }, 1000);
      }
      setTimeout(() => {
        playRound(machine_board, human_board, player, machine);
      }, 1100);
    }
  });

  // W3 docs
  dropzones.forEach((item) => {
    item.addEventListener("dragenter", (event) => {
      // highlight potential drop target when the draggable element enters it
      if (event.target.classList.contains("dropzone")) {
        event.target.classList.add("dragover");
      }
    });
  });

  dropzones.forEach((item) => {
    item.addEventListener("dragleave", (event) => {
      // reset background of potential drop target when the draggable element leaves it
      if (event.target.classList.contains("dropzone")) {
        event.target.classList.remove("dragover");
      }
    });
  });

  const control_button = document.createElement("button");
  const con = document.querySelector("body");
  control_button.textContent = "Check Gameboards";
  control_button.addEventListener("click", () => {
    console.log(human_board);
    console.log(machine_board.getInfo());
  });
  con.appendChild(control_button);

  const getAll = document.createElement("button");
  getAll.textContent = "Attack Human";
  human_board.createRandomArray();
  machine_board.createRandomArray();

  getAll.addEventListener("click", () => {
    let n = 100;
    while (n > 0) {
      human_board.randomShot();
      if (human_board.allShipsGone() === true) return;
      n--;
    }
  });
  con.appendChild(getAll);
}
