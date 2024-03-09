import Ship from "./modules/Ship";
import { displayBoard, displayHeader, displayText, makePlayer, displayBlocks, switchBlocks, showPosition } from "./modules/UI";
import GameBoard from "./modules/Gameboard";


displayHeader();
displayBlocks();
switchBlocks();
let human = new GameBoard("human");
console.log(human.buildBoard());


const button = document.getElementById("button");

// Start Game
button.addEventListener("click", () => {
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

  const machine_cocaine = new Ship(5, "Cocaine", "machine");
  const machine_meth = new Ship(4, "Meth", "machine");
  const machine_crack = new Ship(3, "Crack", "machine");
  const machine_weed = new Ship(2, "Weed", "machine");
  const machine_shrooms = new Ship(2, "Shrooms", "machine");

  // Set ships with array
  const arrayOfShips_human = [cocaine, meth, crack, weed, shrooms];
  arrayOfShips_human.forEach((e) => {
    human_board.placeShips(e);
  });
   const arrayOfShips_machine = [
     machine_cocaine, machine_meth, machine_crack, machine_weed, machine_shrooms];
   arrayOfShips_machine.forEach((e) => {
     machine_board.placeShips(e);
   });

  console.log(human_board, machine_board);

  displayBoard("human");
  displayBoard("machine");
  // dragAndSet("human", human_board);

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
    console.log(`ZielId ${boardId}`);
  });

  target.addEventListener("drop", (ev) => {
    console.log("Drop");
    ev.preventDefault();
    // Get the data, which is the id of the source element

    let shipName = ev.dataTransfer.getData("text");
    console.log("Shipname: " + shipName);
    let id = ev.target.id;
    const shipDiv = document.getElementById(shipName);
    const id1 = parseInt(id[0]);
    const id2 = parseInt(id[2]);
    let a = [];
    a.push(id1, id2);
    console.log(a[0], a[1]);
    console.log("invalid " + human_board.invalidPosition(a));
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

    console.log(human_board);
    console.log(shipName);
    let result = human_board.allShipsSet();
    if (result) msg.textContent = "Alright, let's go!";
    console.log(result);
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
  const con = document.getElementById("UI-content");
  control_button.textContent = "Check Gameboards";
  control_button.addEventListener("click", () => {
    console.log(human_board);
    console.log(machine_board);
  });
  con.appendChild(control_button);

  const setShip = (ship, coord, selector) => {
    ship.pos(coord, "v");
    showPosition(ship, selector);
  };

  // set ships for player
  setShip(cocaine, [0,0]);
  setShip(crack, [0,1]);
  setShip(meth, [0,2]);
  setShip(weed, [0,3]);
  setShip(shrooms, [0,4]);

  // seetShip for machine
  setShip(machine_cocaine, [0,0]);
  setShip(machine_crack, [0, 1]);
  setShip(machine_meth, [0, 2]);
  setShip(machine_weed, [0, 3]);
  setShip(machine_shrooms, [0, 4]);

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
});


// cocaine vertical borders 5,0/5,9 
// cocaine horizontal borders 0,5/9,5
// meth borders v 6,0/6,9 || h 0,6/9,6
// crack border v 7,0/7,9 || h 0,7/9,7
// weed border v 8,0/8,9  || h 0,8/9,8

const possibleDrugPositions = (drug, direction) => {
  let num = 6;
  if(drug === "cocaine") {
    num = 6;
  }else if (drug === "meth") {
    num--;
  } else if(drug === "crack") {
    num -= 2;
  } else {
    num -= 3;
  }
  const array = [];
  if (direction === "v") {
    for (let i = 0; i < num; i++) {
      for (let j = 0; j < 10; j++) {
        array.push([i, j]);
      }
    }
  } else {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < num; j++) {
        array.push([i, j]);
      }
    }
  }
  return array;
};

let hj = possibleDrugPositions("crack", "v");
console.log(hj);


const getRandomInt = (limit) => {
  return Math.floor(Math.random() * limit);
};

const position = (direction, drug) => {
  let result = [];
  let num = getRandomInt(60);
  if (direction === "v") {
    let array = possibleDrugPositions(drug, "v");
    // console.log(array);
    let tmp = array[num][0];
    let secondInt = array[num][1];
    console.log("tmp : " + tmp);
    result.push([tmp, secondInt]);
    for (let i = 0; i < 4; i++) {
      tmp++;
      console.log("tmp aus dem loop 'v': " + tmp);
      result.push([tmp, secondInt]);
    }
  } else if (direction === "h") {
    let array = possibleDrugPositions(drug, "h");
    // console.log(array);
    let tmp = array[num][1];
    let first_int = array[num][0];
    console.log("tmp : " + tmp);
    result.push([first_int, tmp]);
    for (let i = 0; i < 4; i++) {
      tmp++;
      console.log("tmp aus dem loop 'h': " + tmp);
      result.push([first_int, tmp]);
    }
  }
  console.log(result);
  return result;
};

const randDirection = () => {
  let num = Math.floor(Math.random() * 2);
  if (num % 2 === 0) return "v";
  return "h";
};

console.log(randDirection());

let position_cocaine = position(randDirection(), "cocaine");

console.log(" position " + position_cocaine);

// console.log(result_h, result_v);
/**
 * const possiblePositionsCocaine = (direction) => {
  const array = [];
  if (direction === "v") {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 10; j++) {
        array.push([i, j]);
      }
    }
  } else {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 6; j++) {
        array.push([i, j]);
      }
    }
  }
  return array;
};

const possiblePositionsCrack = (direction) => {
  const array = [];
  if (direction === "v") {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 10; j++) {
        array.push([i, j]);
      }
    }
  } else {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 5; j++) {
        array.push([i, j]);
      }
    }
  }
  return array;
};

const possiblePositionsMeth = (direction) => {
  const array = [];
  if (direction === "v") {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 10; j++) {
        array.push([i, j]);
      }
    }
  } else {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 4; j++) {
        array.push([i, j]);
      }
    }
  }
  return array;
};

 */
