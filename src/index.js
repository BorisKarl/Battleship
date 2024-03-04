import Ship from "./modules/Ship";
import { displayBoard, displayHeader, displayText, makePlayer, displayBlocks, switchBlocks, drag } from "./modules/UI";
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

    displayText(human.name);

    // Define "Ships" aka drugs
    const cocaine = new Ship(5, "Cocaine");
    const meth = new Ship(4, "Meth");
    const crack = new Ship(3, "Crack");
    const weed = new Ship(2, "Weed");
    const shrooms = new Ship(2, "Shrooms");

    displayText(crack.name);
    // Make new boards
    const human_board = new GameBoard("human_board");
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
    drag("human", human_board);
});


