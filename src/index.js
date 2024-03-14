import Ship from "./modules/Ship";
import GameBoard from "./modules/Gameboard";
import {game} from "./modules/Game";

import {
  displayBoard,
  displayHeader,
  displayText,
  makePlayer,
  displayBlocks,
  switchBlocks,
  showPosition,
  button,
} from "./modules/UI";


import {
  possibleDrugPositions,
  getRandomInt,
  randDirection,
  randomStartingPoint,
  randomSetShip,
  isArrayInArray,
  checkArrays,
  buildShipPosition,
  validPosition,
  setShipsOnMachineBoard
} from "./modules/Functions";


// Show Header and Blocks for dragging
displayHeader();
displayBlocks();
switchBlocks();

// Start Game
game();
