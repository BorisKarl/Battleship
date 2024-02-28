import { GameBoard } from "./Gameboard.js";

function displayBoard(id) {
    const content = document.getElementById("content");
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
  content.appendChild(board_one);
  console.log("display board");
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

const setShipOnDiv = (coord) => {
  // Eventlistener checkt feld, bei klick wird das Schiff gesetzt
};

export { displayBoard, showPosition, clickShip };
