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
  setBackground,
  changeHeaderText
} from "./UI";

import {
  makePlayer,
  randDirection,
  randomStartingPoint,
  setShipsOnMachineBoard,
  reset,
} from "./Functions";

const text_1 = "Play against the biggest druglords and become the next Kingpin of Rotterdam!";
const text_2 = "Stash your drugs away, so your enemy can't find them...";

const playRound = (machine_board, human_board, player, machine) => {
  removeHeader();
  removeBlocks();
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
        displayText("Treffer!");
        machine_board.checkGameOver();
        human_board.checkGameOver();
        setTimeout(() => {
          removeText();
        }, 1300);
      } else {
        machine_board.checkGameOver();
        human_board.checkGameOver();
        element.target.style.backgroundColor = "pink";
        element.target.style.opacity = ".6";
        displayText("Nada!");
        element.target.style.pointerEvents = "none";
        setTimeout(() => {
          removeText();
        }, 1300);
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
          human_board.randomShot();
        }, 500);
      }
    });
  });
};
let player;
let machine;
export function game() {
  setBackground();
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
  const cocaine = new Ship(5, "Cocaine", "human");
  const meth = new Ship(4, "Meth", "human");
  const crack = new Ship(3, "Crack", "human");
  const weed = new Ship(2, "Weed", "human");
  const shrooms = new Ship(2, "Shrooms", "human");

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
  const msg = document.createElement("p");
  const h1 = document.querySelector("h1");
  h1.appendChild(msg);
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
    msg.textContent = "";
    ev.dataTransfer.clearData();
    ev.dataTransfer.setData("text/plain", ev.target.id);
  });

  crackDiv.addEventListener("dragstart", (ev) => {
    msg.textContent = "";
    ev.dataTransfer.clearData();
    ev.dataTransfer.setData("text/plain", ev.target.id);
  });

  methDIV.addEventListener("dragstart", (ev) => {
    msg.textContent = "";
    ev.dataTransfer.clearData();
    ev.dataTransfer.setData("text/plain", ev.target.id);
  });

  weedDiv.addEventListener("dragstart", (ev) => {
    msg.textContent = "";

    ev.dataTransfer.clearData();
    ev.dataTransfer.setData("text/plain", ev.target.id);
  });

  shroomsDiv.addEventListener("dragstart", (ev) => {
    msg.textContent = "";
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
      displayHeader("Cocaine is hidden");
      cocaineDiv.setAttribute("draggable", false);
    } else if (shipName === "crack") {
      if (crack.set) return;
      if (crack.pos(a, shipDiv.classList[0])) return;
      showPosition(crack, human_board.name);
      msg.textContent = "Some weed";
      removeHeader();
      window.removeEventListener("mousemove", changeHeaderText);
      displayHeader("Nobody gonna find that Crack!");
      crackDiv.setAttribute("draggable", false);
    } else if (shipName === "meth") {
      if (meth.pos(a, shipDiv.classList[0])) return;
      showPosition(meth, human_board.name);
      msg.textContent = "A lot of meth!";
      removeHeader();
      window.removeEventListener("mousemove", changeHeaderText);
      displayHeader("That's lot of meth!");
      methDIV.setAttribute("draggable", false);
    } else if (shipName === "shrooms") {
      if (shrooms.set) return;
      if (shrooms.pos(a, shipDiv.classList[0])) return;
      showPosition(shrooms, human_board.name);
      removeHeader();
      window.removeEventListener("mousemove", changeHeaderText);
      displayHeader("Some shrooms for th Hippies");
      msg.textContent = "Shrooms for the Hippies...";
      shroomsDiv.setAttribute("draggable", false);
    } else if (shipName === "weed") {
      if (weed.set) return;
      if (weed.pos(a, shipDiv.classList[0])) return;
      showPosition(weed, human_board.name);
      msg.textContent = "More weed";
      removeHeader();
      window.removeEventListener("mousemove", changeHeaderText);
      displayHeader("Some weed put away");
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
        makePopUp();
        clickPopUp(player);
        enterPopUp(player);
      }else {
        displayName(player)
      }

      msg.textContent = "Alright, let's go!";
      playRound(machine_board, human_board, player, machine);
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
    console.log(machine_board);
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
