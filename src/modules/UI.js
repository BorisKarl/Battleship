import { GameBoard } from "./Gameboard.js";
import { Player } from "./Player.js";
import { randDirection, randomStartingPoint } from "./Functions.js";

const displayHeader = () => {
  const body = document.querySelector("body");
  const header = document.createElement("h1");
  const p = document.createElement("p");
  const button = document.createElement("button");
  header.setAttribute("id", "header");
  header.textContent = "Drug Run";
  p.textContent =
    "Play against the biggest druglords and become the next Kingpin of Rotterdam!";
  button.setAttribute("id", "button");
  button.textContent = "START";
  header.appendChild(p);
  header.appendChild(button);
  body.insertBefore(header, body.firstChild);
};

const removeHeader = () => {
  const body = document.querySelector("body");
  const header = document.querySelector("h1");
  body.removeChild(header);
};

const button = document.getElementById("button");

const makePlayer = (name) => {
  const player = new Player(name);
  return player;
};

const displayText = (text) => {
  const p = document.createElement("p");
  const body = document.querySelector("body");
  p.textContent = text;
  p.style.fontFamily = "Arial";
  p.style.textAlign = "center";
  body.insertBefore(p, body.firstChild);
};

const removeText = () => {
  const text = document.querySelectorAll("p");
  const body = document.querySelector("body");
  text.forEach((e) =>  body.removeChild(e));
};

// TODO
const displayPlayerName = (name) => {
  const nameDiv = document.createElement("div");
};
const buildBlock = (string, length) => {
  let block_content = document.createElement("div");
  block_content.setAttribute("id", string);
  block_content.setAttribute("class", "v");

  for (let i = 0; i < length; i++) {
    let div = document.createElement("div");
    div.setAttribute("class", "block");
    block_content.appendChild(div);
  }

  return block_content;
};

const displayBlocks = () => {
  const button = document.createElement("button");
  button.setAttribute("id", "switch_button");
  button.textContent = "SWITCH POSITION";
  const content = document.getElementById("UI-content");
  const block_wrapper = document.createElement("div");
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

const removeBlocks = () => {
  const body = document.querySelector("body");
  const content = document.getElementById("UI-content");
  body.removeChild(content);
};

function displayBoard(id) {
  const content = document.getElementById("content");
  const board = document.createElement("div");
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
    });
    board.appendChild(element);
  });
  content.appendChild(board);
  console.log(`${id} ready!`);
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
      if (e.dataset.id === id) e.style.backgroundColor = "green";
    });
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

export {
  displayBoard,
  showPosition,
  clickShip,
  displayHeader,
  displayText,
  makePlayer,
  displayBlocks,
  switchBlocks,
  button,
  removeHeader,
  removeBlocks,
  removeText,
};
