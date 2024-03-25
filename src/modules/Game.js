import Ship from "./Ship";
import GameBoard from "./Gameboard";

import {
  displayBoard,
  displayHeader,
  displayBlocks,
  switchBlocks,
  displayName,
  showPosition,
  removeHeader,
  removeBlocks,
  checkPlayer,
  makePopUp,
  makeContainer,
  clickPopUp,
  enterPopUp,
  showHitsOnBlocks,
  machineBlocksGameMode,
  killAll,
  checkGameboards
} from "./UI";

import {
  makePlayer,
  randDirection,
  randomStartingPoint,
  setShipsOnMachineBoard,
  reset,
} from "./Functions";

const text_1 = "Place your Ships on the left board!";
const text_2 = "That is the big one, a carrier";
const text_3 = "That is a battleship";
const text_4 = "A cruiser";
const text_5 = "A green submarine";
const text_6 = "A destroyer";

const playRound = (machine_board, human_board, player, machine) => {
  console.log(player);
  removeHeader();
  removeBlocks();
  machineBlocksGameMode();
  makeContainer();
  killAll(human_board, machine_board);
  checkGameboards();

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
        machine_board.checkGameOver();
        human_board.checkGameOver();
        let redArray = machine_board.getInfo(array);
        console.log(redArray);
        showHitsOnBlocks(redArray);
      } else {
        machine_board.checkGameOver();
        human_board.checkGameOver();
        element.target.style.backgroundColor = "pink";
        element.target.style.opacity = ".6";
        element.target.style.pointerEvents = "none";
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
        alert(`Game Over! ${machine.name} hat gewonnen!`);
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
  const carrier = new Ship(5, "carrier", "human");
  const battleship = new Ship(4, "battleship", "human");
  const cruiser = new Ship(3, "cruiser", "human");
  const sub = new Ship(2, "sub", "human");
  const destroyer = new Ship(2, "destroyer", "human");

  const machine_carrier = new Ship(5, "machine_carrier", "machine");
  const machine_battleship = new Ship(4, "machine_battleship", "machine");
  const machine_cruiser = new Ship(3, "machine_cruiser", "machine");
  const machine_sub = new Ship(2, "machine_sub", "machine");
  const machine_destroyer = new Ship(2, "machine_destroyer", "machine");

  // Set ships with array
  const arrayOfShips_human = [carrier, battleship, cruiser, sub, destroyer];
  const arrayOfShips_machine = [
    machine_carrier,
    machine_battleship,
    machine_cruiser,
    machine_sub,
    machine_destroyer,
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

  settingShip(machine_carrier, shipPositions[0]);
  settingShip(machine_battleship, shipPositions[1]);
  settingShip(machine_cruiser, shipPositions[2]);
  settingShip(machine_sub, shipPositions[3]);
  settingShip(machine_destroyer, shipPositions[4]);

  displayBoard("human");
  displayBoard("machine");

  // It's a drag
  const target = document.getElementById("human");
  const carrierDiv = document.getElementById("carrier");
  const cruiserDiv = document.getElementById("cruiser");
  const battleshipDiv = document.getElementById("battleship");
  const subDiv = document.getElementById("sub");
  const destroyerDiv = document.getElementById("destroyer");
  const dropzones = document.querySelectorAll(".dropzone");
  carrierDiv.setAttribute("draggable", true);
  cruiserDiv.setAttribute("draggable", true);
  battleshipDiv.setAttribute("draggable", true);
  subDiv.setAttribute("draggable", true);
  destroyerDiv.setAttribute("draggable", true);

  carrierDiv.addEventListener("dragstart", (ev) => {
    removeHeader();
    displayHeader(text_2);
    ev.dataTransfer.clearData();
    ev.dataTransfer.setData("text/plain", ev.target.id);
  });

  battleshipDiv.addEventListener("dragstart", (ev) => {
    removeHeader();
    displayHeader(text_3);
    ev.dataTransfer.clearData();
    ev.dataTransfer.setData("text/plain", ev.target.id);
  });

  cruiserDiv.addEventListener("dragstart", (ev) => {
    removeHeader();
    displayHeader(text_4);
    ev.dataTransfer.clearData();
    ev.dataTransfer.setData("text/plain", ev.target.id);
  });

  subDiv.addEventListener("dragstart", (ev) => {
      removeHeader();
      displayHeader(text_5);
      ev.dataTransfer.clearData();
      ev.dataTransfer.setData("text/plain", ev.target.id);
    });

  destroyerDiv.addEventListener("dragstart", (ev) => {
    removeHeader();
    displayHeader(text_6);
    ev.dataTransfer.clearData();
    ev.dataTransfer.setData("text/plain", ev.target.id);
  });

  carrierDiv.addEventListener("dragend", (ev) => {
    ev.preventDefault();
  });

  cruiserDiv.addEventListener("dragend", (ev) => {
    ev.preventDefault();
  });

  battleshipDiv.addEventListener("dragend", (ev) => {
    ev.preventDefault();
  });

  subDiv.addEventListener("dragend", (ev) => {
    ev.preventDefault();
  });

  destroyerDiv.addEventListener("dragend", (ev) => {
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

    if (shipName === "carrier") {
      if (carrier.pos(a, shipDiv.classList[0])) return;
      showPosition(carrier, human_board.name);
      removeHeader();
      displayHeader("Carrier is set!");
      carrierDiv.setAttribute("draggable", false);
    } else if (shipName === "cruiser") {
      if (cruiser.set) return;
      if (cruiser.pos(a, shipDiv.classList[0])) return;
      showPosition(cruiser, human_board.name);
      removeHeader();
      displayHeader("Good! That was the cruiser.");

      cruiserDiv.setAttribute("draggable", false);
    } else if (shipName === "battleship") {
      if (battleship.pos(a, shipDiv.classList[0])) return;
      showPosition(battleship, human_board.name);
      removeHeader();
      displayHeader("Thats a good place for a battleship!");
      battleshipDiv.setAttribute("draggable", false);
    } else if (shipName === "destroyer") {
      if (destroyer.set) return;
      if (destroyer.pos(a, shipDiv.classList[0])) return;
      showPosition(destroyer, human_board.name);
      removeHeader();
      displayHeader("Destroyer set, nice!");
      destroyerDiv.setAttribute("draggable", false);
    } else if (shipName === "sub") {
      if (sub.set) return;
      if (sub.pos(a, shipDiv.classList[0])) return;
      showPosition(sub, human_board.name);
      removeHeader();
      displayHeader("Perfect, submarine set!");
      subDiv.setAttribute("draggable", false);
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
          playRound(machine_board, human_board, player, machine);
          blocksGameMode(player);
          machineBlocksGameMode();
          setBlocksToGameMode();
          
        }, 1000);
      }
      setTimeout(() => {
        playRound(machine_board, human_board, player, machine);
      }, 1000);
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
}
