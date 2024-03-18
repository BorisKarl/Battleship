import Ship from "./Ship";
import GameBoard from "./Gameboard";

import {
  displayBoard,
  displayHeader,
  displayText,
  makePlayer,
  displayBlocks,
  switchBlocks,
  showPosition,
  removeHeader,
  removeBlocks,
  removeText,
  makeContainer,
} from "./UI";

import {
  possibleDrugPositions,
  getRandomInt,
  randDirection,
  randomStartingPoint,
  randomSetShip,
  isArrayInArray,
  checkArrays,
  buildShipPosition,
  validPosition,
  setShipsOnMachineBoard,
} from "./Functions";

const reset = () => {
  const body = document.querySelector("body");
  body.innerHTML = "";
}

const playRound = (brett, brett2) => {
  removeHeader();
  removeBlocks();
  brett.checkGameOver();
  brett2.checkGameOver();
  makeContainer();

  alert("Game begins, click Pablo`s stash to find some drugs!!!! ");
  const machineBoardArray = document.querySelectorAll(".machine");
  machineBoardArray.forEach((e) => {
    e.addEventListener("click", (element) => {
      console.log(element.target.id);
      removeText();
      let coord = element.target.getAttribute("data-id");
      let array = [];
      array.push(parseInt(coord[0]), parseInt(coord[2]));
      console.log(array);
      if (brett.receiveAttack(array)) {
        element.target.style.backgroundColor = "pink";
        setTimeout(() => {
          displayText("Du hast was gefunden");
        }, 500);
      } else {
        element.target.textContent = "X";
        element.target.style.color = "red";
      }
      setTimeout(() => {
        brett2.randomShot();
      }, 500);
      if (brett.checkGameOver() === true) {
        reset();
        alert(`Game Over! ${brett2.name} hat gewonnen`);
      } else if (brett2.checkGameOver() === true ) {
        reset();
        alert(`Game Over! ${brett.name} hat gewonnen`);
      } 
    });
  });
};

export function game() {
  // button.addEventListener("click", () => {
  let human = makePlayer("Human");
  let machine = makePlayer("Machine");
  const header = document.getElementById("header");
  header.style.color = "green";
  button.setAttribute("disabled", true);

  // displayText(crack.name);
  // displayText(human.name);
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

  //

  //

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

  console.log(human_board, machine_board);

  displayBoard("human");
  displayBoard("machine");

  // Set ship on random position

  const shipPositions = setShipsOnMachineBoard(arrayOfShips_machine);

  const settingShip = (ship, array) => {
    if (!array || !Array.isArray(array)) {
      let direction = randDirection();
      let start = randomStartingPoint(ship.name, direction);
      ship.position = [];
      //console.log(start);
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

  // arrayOfShips_machine.forEach((e) => showPosition(e));

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
    // console.log(`ZielId ${boardId}`);
  });

  target.addEventListener("drop", (ev) => {
    // console.log("Drop");
    ev.preventDefault();
    // Get the data, which is the id of the source element

    let shipName = ev.dataTransfer.getData("text");
    // console.log("Shipname: " + shipName);
    let id = ev.target.id;
    const shipDiv = document.getElementById(shipName);
    const id1 = parseInt(id[0]);
    const id2 = parseInt(id[2]);
    let a = [];
    a.push(id1, id2);
    // console.log(a[0], a[1]);
    // console.log("invalid " + human_board.invalidPosition(a));
    if (human_board.invalidPosition(a)) {
      msg.textContent = "Invalid position, try again!";
      return;
    }

    if (shipName === "cocaine") {
      if (cocaine.pos(a, shipDiv.classList[0])) return;
      // cocaine.pos(a, shipDiv.classList[0]);
      showPosition(cocaine, human_board.name);
      msg.textContent = "Cocaine is hidden";
      cocaineDiv.setAttribute("draggable", false);
    } else if (shipName === "crack") {
      if (crack.set) return;
      if (crack.pos(a, shipDiv.classList[0])) return;
      // crack.pos(a, shipDiv.classList[0]);
      showPosition(crack, human_board.name);
      msg.textContent = "Some weed";
      crackDiv.setAttribute("draggable", false);
    } else if (shipName === "meth") {
      if (meth.pos(a, shipDiv.classList[0])) return;
      // meth.pos(a, shipDiv.classList[0]);
      showPosition(meth, human_board.name);
      msg.textContent = "A lot of meth!";
      methDIV.setAttribute("draggable", false);
    } else if (shipName === "shrooms") {
      if (shrooms.set) return;
      if (shrooms.pos(a, shipDiv.classList[0])) return;
      // shrooms.pos(a, shipDiv.classList[0]);
      showPosition(shrooms, human_board.name);
      msg.textContent = "Shrooms for the Hippies...";
      shroomsDiv.setAttribute("draggable", false);
    } else if (shipName === "weed") {
      if (weed.set) return;
      if (weed.pos(a, shipDiv.classList[0])) return;
      // weed.pos(a, shipDiv.classList[0]);
      showPosition(weed, human_board.name);
      msg.textContent = "More weed";
      weedDiv.setAttribute("draggable", false);
    } else return;

    // console.log(human_board);
    // console.log(shipName);
    const setShip = (ship, coord) => {
      ship.pos(coord, "v");
      showPosition(ship);
    };
    setShip(cocaine, [0, 0]);
    setShip(crack, [0, 1]);
    setShip(meth, [0, 2]);
    setShip(weed, [0, 3]);
    setShip(shrooms, [0, 4]);
    let result = human_board.allShipsSet();
    if (result) {
      msg.textContent = "Alright, let's go!";
      playRound(machine_board, human_board);
    }
    // console.log(result);
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

  // !!! TODO rewrite for random placement, merge with possibleDrugPositions Function !!!
  // randDirection als drittes Argument

  // setShip for machine
  // setShip(machine_cocaine, [0,0]);
  // setShip(machine_crack, [0, 1]);
  // setShip(machine_meth, [0, 2]);
  // setShip(machine_weed, [0, 3]);
  // setShip(machine_shrooms, [0, 4]);

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
  // });
}
