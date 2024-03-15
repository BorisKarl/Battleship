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


// Show Header and Blocks for dragging
displayHeader();
displayBlocks();
switchBlocks();

// Start Game
game();
