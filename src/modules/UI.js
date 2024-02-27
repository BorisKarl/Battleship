import { GameBoard } from "./Gameboard.js";

function displayBoard(id, classname) {
  const gameBoard = new GameBoard();
  const div = document.getElementById(id);
  const array = gameBoard.buildBoard();
  array.forEach((e) => {
    let element = document.createElement("div");
    // element.setAttribute("id", classname + e);
    element.setAttribute("id", e);
    element.className = classname;
    // element.innerHTML = `<img src="../src/imgs/container.png"/>`;
    element.addEventListener("mouseover", (e) => {
      console.log(e.target.id);
    });
    div.appendChild(element);
  });
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
