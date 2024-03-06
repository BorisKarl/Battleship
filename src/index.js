import Ship from "./modules/Ship";
import { displayBoard, displayHeader, displayText, makePlayer, displayBlocks, switchBlocks, showPosition } from "./modules/UI";
import GameBoard from "./modules/Gameboard";


displayHeader();
displayBlocks();
switchBlocks();



const button = document.getElementById("button");

// Start Game
button.addEventListener("click", () => {
    let human = makePlayer("Human");
    const header = document.getElementById("header");
    header.style.color = "green";
    button.setAttribute('disabled', true);

    
    // Define "Ships" aka drugs
    const cocaine = new Ship(5, "Cocaine");
    const meth = new Ship(4, "Meth");
    const crack = new Ship(3, "Crack");
    const weed = new Ship(2, "Weed");
    const shrooms = new Ship(2, "Shrooms");

    // displayText(crack.name);
    // displayText(human.name);
    // Make new boards
    const human_board = new GameBoard("human_board");
    human_board.createRandomArray();
    const machine_board = new GameBoard("machine_board");

    // Set ships with array
    const arrayOfShips = [cocaine, meth, crack, weed, shrooms];
    arrayOfShips.forEach((e) => {
      human_board.placeShips(e);
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
    console.log("invalid " + human_board.invalidPosition(a));
    if (human_board.invalidPosition(a)) {
      msg.textContent = "Invalid position, try again!";
      return;
    }

    if (shipName === "cocaine") {
      if (cocaine.pos(a, shipDiv.classList[0])) return;
      // cocaine.pos(a, shipDiv.classList[0]);
      showPosition(cocaine);
      msg.textContent = "Cocaine is hidden";
      cocaineDiv.setAttribute("draggable", false);
    }

    else if (shipName === "crack") {
      if (crack.set) return;
      if (crack.pos(a, shipDiv.classList[0])) return;
      // crack.pos(a, shipDiv.classList[0]);
      showPosition(crack);
      msg.textContent = "Some weed";
      crackDiv.setAttribute("draggable", false);
    } 
      else if (shipName === "meth") {
      if (meth.pos(a, shipDiv.classList[0])) return;
      // meth.pos(a, shipDiv.classList[0]);
      showPosition(meth);
      msg.textContent = "A lot of meth!";
      methDIV.setAttribute("draggable", false);
    } else if (shipName === "shrooms") {
      if (shrooms.set) return;
      if (shrooms.pos(a, shipDiv.classList[0])) return;
      // shrooms.pos(a, shipDiv.classList[0]);
      showPosition(shrooms);
      msg.textContent = "Shrooms for the Hippies...";
      shroomsDiv.setAttribute("draggable", false);
    } else if (shipName === "weed") {
      if (weed.set) return;
      if (weed.pos(a, shipDiv.classList[0])) return;
      // weed.pos(a, shipDiv.classList[0]);
      showPosition(weed);
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

    const control_button = document.createElement('button');
    const con = document.getElementById('UI-content');
    control_button.textContent = "Check Gameboards";
    control_button.addEventListener('click', ()  =>  console.log(human_board));
    con.appendChild(control_button);

    const setShip = (ship, coord) => {
      ship.pos(coord, "v");
      showPosition(ship);
    }

    setShip(cocaine, [0,0]);
    setShip(crack, [0, 1]);
    setShip(meth, [0, 2]);
    setShip(weed, [0, 3]);
    setShip(shrooms, [0, 4]);

    const attack_human = document.createElement("button");
    attack_human.textContent = "Attack Human";
    human_board.createRandomArray();
    attack_human.addEventListener("click", () => {
      let n = 100;
      while (n > 0) {
        human_board.shootRandom();
        n--;
      }
    });

    con.appendChild(attack_human);
    
});


