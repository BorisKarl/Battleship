import { GameBoard } from "./Gameboard.js";
import { Player } from "./Player.js";

const displayHeader = () => {
    const body = document.querySelector("body");
    const header = document.createElement("h1");
    const p = document.createElement("p");
    const button = document.createElement("button");
    header.setAttribute("id", "header");
    header.textContent = "Drug Run";
    p.textContent = "Play against the biggest druglords and become the next Kingpin of Rotterdam!";
    button.setAttribute("id", "button");
    button.textContent = "START";
    header.appendChild(p);
    header.appendChild(button);
    body.insertBefore(header, body.firstChild);
}

const makePlayer = (name) => {
        const player = new Player(name);
        return player;
}

const displayText = (text) => {
    const p = document.createElement("p");
    const body = document.querySelector("body");
    p.textContent = text;
    body.appendChild(p);
}

// TODO
const displayPlayerName = (name) => {
    const nameDiv = document.createElement("div");
}


function displayBoard(id) {
    const content = document.getElementById("content");
    const board = document.createElement("div");
    board.setAttribute("id", id);
    const gameBoard = new GameBoard("human");
    const array = gameBoard.buildBoard();
    array.forEach((e) => {
        let element = document.createElement("div");
        element.setAttribute("id", id);
        element.setAttribute("data-id", e);
        element.className = "dropzone";
        element.addEventListener("mouseover", (e) => {
        console.log(e.target.getAttribute("data-id"));
    });
        board.appendChild(element);
  });
  content.appendChild(board);
  console.log(`${id} ready!`);
}
// ship," human" oder " machine"
const showPosition = (ship) => {
  let position = ship.position;
  console.log("showPosition()");
  console.log("position: " + position);
  position.forEach((e) => {
    let id = e.toString();
    console.log(`ShowPosition Funktion e mit dem Wert: ${e}.`);
    let div = document.querySelector(`[data-id="${id}"]`);
    console.log(div);
    div.style.backgroundColor = "green";
  });
};

const clickShip = (ship, player) => {
  let position = ship.position;
  position.forEach((e) => {
    let id = player + e.toString();
    let div = document.getElementById(id);
    console.log("clickShip: " + id + div);
    div.addEventListener("click", function () {
      this.style.backgroundColor = "black";
    });
  });
};

const buildBlock = (string, length) => {
  let block_content = document.createElement("div");
  block_content.setAttribute("id", string);
  block_content.setAttribute("class", "v");

  for (let i = 0; i < length; i++ ){
      let div = document.createElement("div");
      div.setAttribute("class", "block");
      block_content.appendChild(div);
  }

  return block_content;
}

const displayBlocks = () => {
  const button = document.createElement("button");
  button.setAttribute("id", "switch_button");
  button.textContent = "SWITCH POSITION";
  const content = document.getElementById("UI-content");
  const block_wrapper = document.createElement('div');
  block_wrapper.setAttribute("class", "block_wrapper");

  const cocaine = buildBlock("cocaine", 5);
  const meth = buildBlock("meth", 4);
  const crack = buildBlock("crack", 3);
  const weed = buildBlock("weed", 2);
  const shrooms = buildBlock("shrooms", 2);

  block_wrapper.appendChild(cocaine);
  block_wrapper.appendChild(meth);
  block_wrapper.appendChild(crack);
  block_wrapper.appendChild(weed);
  block_wrapper.appendChild(shrooms);
  content.appendChild(button);
  content.appendChild(block_wrapper);
}


const switchBlocks = () => {
  const button = document.getElementById("switch_button");
  const block = document.querySelectorAll(".v");
  button.addEventListener("click", () => {
    block.forEach((e) => {
      if (e.classList.contains("v")) {
        e.classList.remove("v");
        e.classList.add("h");
      } else {
        e.classList.remove("h");
        e.classList.add("v");
      }
    });
  });
}



export { displayBoard, showPosition, clickShip, displayHeader, displayText, makePlayer, displayBlocks, switchBlocks };


/*

const dragAndSet = (id, playersBoard) => {
  const msg = document.createElement("p");
  const h1 = document.querySelector("h1");
  h1.appendChild(msg);
  const target = document.getElementById(id);
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
    // e.target.style.backgroundColor = "orange";
    console.log(`ZielId ${boardId}`);
  });

  target.addEventListener("drop", (ev) => {
    console.log("Drop");
    ev.preventDefault();
    // Get the data, which is the id of the source element
    /*
    let shipName = ev.dataTransfer.getData("text");
    console.log("Shipname 1 : " + shipName);
    let id = ev.target.id;
    const shipDiv = document.getElementById(shipName);
    const id1 = parseInt(id[0]);
    const id2 = parseInt(id[2]);
    let a = [];
    a.push(id1, id2);
    console.log("invalid " + playersBoard.invalidPosition(a));
    if (playersBoard.invalidPosition(a)) {
      msg.textContent = "Invalid position, try again!";
      return;
    }
    if (shipName === "cocaine") {
      if (cocaine.set) return;
      if (!cocaine.pos(a, shipDiv.classList[0])) return;
      cocaine.pos(a, shipDiv.classList[0]);
      showPosition(cocaine);
      msg.textContent = "Cocaine is hidden";
    } else if (shipName === "meth") {
      if (meth.set) return;
      if (!meth.pos(a, shipDiv.classList[0])) return;
      meth.pos(a, shipDiv.classList[0]);
      showPosition(meth);
      msg.textContent = "A lot of meth!";
    } else if (shipName === "shrooms") {
      if (shrooms.set) return;
      if (!shrooms.pos(a, shipDiv.classList[0])) return;
      shrooms.pos(a, shipDiv.classList[0]);
      showPosition(shrooms);
      msg.textContent = "Shrooms for the Hippies...";
    } else if (shipName === "mary_jane") {
      if (mary_jane.set) return;
      if (!mary_jane.pos(a, shipDiv.classList[0])) return;
      mary_jane.pos(a, shipDiv.classList[0]);
      showPosition(mary_jane);
      msg.textContent = "Some weed";
    } else if (shipName === "mary_jane2") {
      if (mary_jane2.set) return;
      if (!mary_jane2.pos(a, shipDiv.classList[0])) return;
      mary_jane2.pos(a, shipDiv.classList[0]);
      showPosition(mary_jane2);
      msg.textContent = "More weed";
    } else return;

    console.log(playersBoard);
    console.log(shipName);
    let result = playersBoard.allShipsSet();
    if (result) msg.textContent = "Alright, all set!";
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

}

 */
