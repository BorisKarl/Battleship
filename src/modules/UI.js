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

const displayPlayerName = (name) => {
    const nameDiv = document.createElement("div");
}

function displayBoard(id) {
    const player_h2 = document.createElement("h2");
    player_h2.textContent = id;
    const content = document.getElementById("content");
    const wrapper = document.createElement("span");
    wrapper.style.backgroundColor ="red";
    const board_one = document.createElement("div");
    board_one.setAttribute("id", id);
    const gameBoard = new GameBoard();
    const array = gameBoard.buildBoard();
    array.forEach((e) => {
        let element = document.createElement("div");
        element.setAttribute("id", e);
        element.className = id;
        element.addEventListener("mouseover", (e) => {
        console.log(e.target.id);
    });
        board_one.appendChild(element);
  });
  wrapper.insertBefore(player_h2, wrapper.firstChild);
  content.appendChild(wrapper);
  content.appendChild(board_one);
  console.log(`${id} ready!`);
}

const showPosition = (ship) => {
  let position = ship.position;
  console.log("position: " + position);
  position.forEach((e) => {
    let id = e.toString();
    console.log(id);
    let div = document.getElementById(id);
    console.log(div);
    div.style.backgroundColor = "red";
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

const setShipOnDiv = (coord) => {
  // Eventlistener checkt feld, bei klick wird das Schiff gesetzt
};

export { displayBoard, showPosition, clickShip, displayHeader, displayText, makePlayer, displayBlocks, switchBlocks };
