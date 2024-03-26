import { GameBoard } from "./Gameboard.js";
import { randDirection, randomStartingPoint, makePlayer } from "./Functions.js";
import { doc } from "prettier";

const body = document.querySelector("body");

// HEADER

const displayHeader = (text) => {
  const header_wrapper = document.createElement("div");
  header_wrapper.setAttribute("id", "header_wrapper");
  const header = document.createElement("h1");
  header.setAttribute("id", "header");
  header.textContent = text;
  header.style.backgroundColor = "white";
  header.style.opacity = "0.9";
  header_wrapper.appendChild(header);
  body.insertBefore(header_wrapper, body.firstChild);
};

const removeHeader = () => {
  const header = document.getElementById("header_wrapper");
  body.removeChild(header);
};

// BLOCKS

const buildBlock = (string, length) => {
  let block_content = document.createElement("div");
  block_content.setAttribute("id", string);
  block_content.setAttribute("class", "v");

  for (let i = 0; i < length; i++) {
    let div = document.createElement("div");
    div.setAttribute("class", "block");
    div.setAttribute("id", string + "_" + i);
    div.style.backgroundColor = "green";
    div.style.opacity = ".8";
    block_content.appendChild(div);
  }
  return block_content;
};

const displayBlocks = () => {
  const button = document.createElement("button");
  button.setAttribute("id", "switch_button");
  button.textContent = "SWITCH POSITION";
  const content = document.createElement("div");
  content.setAttribute("id", "UI-content");
  const block_wrapper = document.createElement("div");
  block_wrapper.setAttribute("class", "block_wrapper");

  const carrier = buildBlock("carrier", 5);
  const battleship = buildBlock("battleship", 4);
  const cruiser = buildBlock("cruiser", 3);
  const sub = buildBlock("sub", 2);
  const destroyer = buildBlock("destroyer", 2);

  block_wrapper.appendChild(button);
  block_wrapper.appendChild(carrier);
  block_wrapper.appendChild(battleship);
  block_wrapper.appendChild(cruiser);
  block_wrapper.appendChild(sub);
  block_wrapper.appendChild(destroyer);
  // content.appendChild(button);
  content.appendChild(block_wrapper);
  body.appendChild(content);
};

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
};

// BLOCKS GAME MODE

const setBlocksToGameMode = () => {
  const blocks = document.querySelectorAll(".v");
  blocks.forEach((block) => {
    if (block.classList.contains("v")) {
      block.classList.remove("v");
      block.classList.add("h");
    }
  });
  const ui_content = document.getElementById("UI-content");
  ui_content.style.height = "100px";
};

const blocksGameMode = (player) => {
  const content = document.createElement("div");
  content.setAttribute("id", "UI-content");
  const block_wrapper = document.createElement("div");
  block_wrapper.setAttribute("class", "block_wrapper");

  const name = document.createElement("div");
  name.setAttribute("id", "player_name_div");
  name.setAttribute("class", "h");
  name.textContent = player.name;

  const carrier = buildBlock("carrier", 5);
  const battleship = buildBlock("battleship", 4);
  const cruiser = buildBlock("cruiser", 3);
  const sub = buildBlock("sub", 2);
  const destroyer = buildBlock("destroyer", 2);

  block_wrapper.appendChild(name);
  block_wrapper.appendChild(carrier);
  block_wrapper.appendChild(battleship);
  block_wrapper.appendChild(cruiser);
  block_wrapper.appendChild(sub);
  block_wrapper.appendChild(destroyer);
  content.appendChild(block_wrapper);
  body.appendChild(content);
};

// MACHINE BLOCKS

const machineBlocksGameMode = () => {
  const content = document.createElement("div");
  content.setAttribute("id", "machine_ui_content");
  const block_wrapper = document.createElement("div");
  block_wrapper.setAttribute("class", "machine_blockwrapper");

  const name = document.createElement("div");
  name.setAttribute("id", "machine_name_div");
  name.setAttribute("class", "h");
  name.textContent = "Machine";

  const carrier = buildBlock("machine_carrier", 5);
  const battleship = buildBlock("machine_battleship", 4);
  const cruiser = buildBlock("machine_cruiser", 3);
  const sub = buildBlock("machine_sub", 2);
  const destroyer = buildBlock("machine_destroyer", 2);

  block_wrapper.appendChild(name);
  block_wrapper.appendChild(carrier);
  block_wrapper.appendChild(battleship);
  block_wrapper.appendChild(cruiser);
  block_wrapper.appendChild(sub);
  block_wrapper.appendChild(destroyer);
  content.appendChild(block_wrapper);
  body.insertBefore(content, body.firstChild);
};

const showHitsOnBlocks = (array) => {
  if (array.length === 0) {
    return;
  } 
  for (let i = 0; i < array[1]; i++) {
      let el = document.getElementById(array[0] + "_" + i);
      el.style.backgroundColor = "red";
      if (array[2] === true) {
      let el = document.getElementById(array[0]);
      setTimeout(() => {
        el.classList.add("block_hit");
      }, 1000);
    }
  }
};

const removeBlocks = () => {
  const body = document.querySelector("body");
  const content = document.getElementById("UI-content");
  body.removeChild(content);
};

const makeContainer = () => {
  const flexContainer = document.createElement("div");
  flexContainer.setAttribute("id", "flexContainer");
  body.appendChild(flexContainer);
};

// GAMEBOARD

function displayBoard(id) {
  const content = document.getElementById("flexContainer");
  const board = document.createElement("div");
  const url = "../src/assets/imgs/claire-fischer-unsplash.jpg";
  board.style.backgroundImage = `url('${url}')`;
  board.style.backgroundSize = "cover";
  board.setAttribute("id", id);
  const gameBoard = new GameBoard("human");
  const array = gameBoard.buildBoard();
  array.forEach((e) => {
    let element = document.createElement("div");
    element.setAttribute("id", e);
    element.setAttribute("data-id", e);
    element.className = "dropzone";
    element.classList.add(id);
    element.addEventListener("mouseover", (e) => {
      console.log(e.target.getAttribute("data-id"));
      e.target.style.transform = "scale(1.2)";
      //e.target.style.backgroundColor = "yellow";
      //e.target.style.opacity = "0.3";
    });
    element.addEventListener("mouseout", (e) => {
      e.target.style.transform = "scale(1)";
      //e.target.style.backgroundColor = "transparent";
    });

    board.appendChild(element);
  });
  content.appendChild(board);
  //body.appendChild(content);
}

const showPosition = (ship) => {
  let selector = ship.board;
  let position = ship.position;
  if (!position || !Array.isArray(position)) {
    let direction = randDirection();
    let start = randomStartingPoint(ship.name, direction);
    ship.position = [];
    //console.log(start);
    ship.pos(start, direction);
    console.log(ship);
    return;
  }
  let selector_class = "." + selector;
  let array = document.querySelectorAll(selector_class);
  // array.forEach((e) => console.log(e));
  position.forEach((e) => {
    let id = e.toString();
    // console.log(`ShowPosition(). Value e hat den Wert: ${e}.`);
    let div = document.querySelector(`[data-id="${id}"]`);
    array.forEach((e) => {
      if (e.dataset.id === id) {
        e.style.backgroundColor = "green";
        e.style.opacity = "0.7";
      }
    });
  });
};

// ???
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

// Check Buttons

const checkPlayer = (player) => {
  const checkPlayerButton = document.createElement("button");
  checkPlayerButton.textContent = "Check Player";
  checkPlayerButton.addEventListener("click", () => {
    console.log(player);
  });
  body.insertBefore(checkPlayerButton, body.firstChild);
};

const killAll = (human_board, machine_board) => {
  const button = document.createElement("button");
  button.textContent = "Kill switch";
  human_board.createRandomArray();
  machine_board.createRandomArray();

  button.addEventListener("click", () => {
    let n = 100;
    while (n > 0) {
      human_board.randomShot();
      if (human_board.allShipsGone() === true) return;
      n--;
    }
  });
  body.insertBefore(button, body.firstChild);
};
const checkGameboards = (human_board, machine_board) => {
  const control_button = document.createElement("button");
  control_button.textContent = "Check Gameboards";
  control_button.addEventListener("click", () => {
    console.log(human_board);
    console.log(machine_board);
  });
  body.insertBefore(control_button, body.firstChild);
};

// POPUP

const makePopUp = () => {
  const popUp = document.createElement("div");
  popUp.innerHTML = `
    <div id="popUp" class="modal">
      <div class="modal-content">
        <p>Well done! Let's go! Input your name!</p>
        <input type="text" id="popUpInput" autofocus>
        <button id="submitPopup">Submit</button>
      </div>
    </div>
`;
  body.appendChild(popUp);
  const pop = document.getElementById("popUp");
  pop.style.display = "block";
};

const closePopUp = () => {
  const popUp = document.getElementById("popUp");
  popUp.style.display = "none";
};

const clickPopUp = (player) => {
  const popUpButton = document.getElementById("submitPopup");
  popUpButton.addEventListener("click", () => {
    let popUpValue = document.getElementById("popUpInput").value;
    player.changeName(popUpValue);
    closePopUp();
    blocksGameMode(player);
    machineBlocksGameMode();
    setBlocksToGameMode();
     displayRound(player, machine);
  });
};

const enterPopUp = (player) => {
  const input = document.getElementById("popUpInput");
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      player.changeName(input.value);
      closePopUp();
      machineBlocksGameMode();
      blocksGameMode(player);
      setBlocksToGameMode();
       displayRound(player, machine);
    }
  });
};

// ROUND

const displayRound = (player, machine) => {
  const roundHeader = document.createElement("h1");
  roundHeader.setAttribute("class", "round_header");
  roundHeader.style.color = "green";
  if (typeof(machine) !==  'undefined') roundHeader.textContent = `Round : ${player.round} | ${player.name} : ${player.points} | ${machine.name} : ${machine.points}`;
  roundHeader.textContent = `Round : ${player.round} | ${player.name} : ${player.points}`;
  
  body.insertBefore(roundHeader, body.firstChild);
} 


export {
  displayBoard,
  showPosition,
  clickShip,
  displayHeader,
  displayBlocks,
  switchBlocks,
  removeHeader,
  removeBlocks,
  checkPlayer,
  makePopUp,
  closePopUp,
  makeContainer,
  clickPopUp,
  enterPopUp,
  setBlocksToGameMode,
  showHitsOnBlocks,
  blocksGameMode,
  machineBlocksGameMode,
  killAll,
  checkGameboards,
  displayRound
};
