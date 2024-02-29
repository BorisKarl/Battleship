import Ship from "./modules/Ship";
import { displayBoard } from "./modules/UI";
import GameBoard from "./modules/Gameboard";

const cocaine = new Ship(5, "Cocaine");
const meth = new Ship(4, "Meth");
const crack = new Ship(3, "Crack");
const weed = new Ship(2, "Weed");
const shrooms = new Ship(2, "Shrooms");

const human_board = new GameBoard("human_board");
const machine_board = new GameBoard("machine_board");

const arrayOfShips = [cocaine, meth, crack, weed, shrooms];
arrayOfShips.forEach((e) =>{
    human_board.placeShips(e);
    machine_board.placeShips(e);
});

console.log(machine_board);

displayBoard("gameboard_human");
displayBoard("gameboard_machine");

