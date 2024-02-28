import Ship from "./modules/Ship";
import { displayBoard } from "./modules/UI";

const ship = new Ship(5, "Gorch Fuck");

const name = ship.getName();

console.log(name);

displayBoard("gameboard_human");
displayBoard("gameboard_machine");

