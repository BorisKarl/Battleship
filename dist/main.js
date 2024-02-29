/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Ship */ \"./src/modules/Ship.js\");\n/* harmony import */ var _modules_UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/UI */ \"./src/modules/UI.js\");\n/* harmony import */ var _modules_Gameboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/Gameboard */ \"./src/modules/Gameboard.js\");\n\n\n\n\nconst cocaine = new _modules_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](5, \"Cocaine\");\nconst meth = new _modules_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](4, \"Meth\");\nconst crack = new _modules_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](3, \"Crack\");\nconst weed = new _modules_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](2, \"Weed\");\nconst shrooms = new _modules_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](2, \"Shrooms\");\n\nconst human_board = new _modules_Gameboard__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"human_board\");\nconst machine_board = new _modules_Gameboard__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"machine_board\");\n\nconst arrayOfShips = [cocaine, meth, crack, weed, shrooms];\narrayOfShips.forEach((e) =>{\n    human_board.placeShips(e);\n    machine_board.placeShips(e);\n});\n\nconsole.log(machine_board);\n\n(0,_modules_UI__WEBPACK_IMPORTED_MODULE_1__.displayBoard)(\"gameboard_human\");\n(0,_modules_UI__WEBPACK_IMPORTED_MODULE_1__.displayBoard)(\"gameboard_machine\");\n\n\n\n//# sourceURL=webpack://battleship_version_2/./src/index.js?");

/***/ }),

/***/ "./src/modules/Gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/Gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameBoard: () => (/* binding */ GameBoard),\n/* harmony export */   \"default\": () => (/* binding */ GameBoard)\n/* harmony export */ });\nclass GameBoard {\n  constructor(name) {\n    this.name = name;\n    this.ships = [];\n    this.missedAttacks = [];\n    this.gameOver = false;\n    this.attacks = [];\n  }\n\n  buildBoard() {\n    let battleGround = [];\n    for (let i = 0; i < 10; i++) {\n      for (let j = 0; j < 10; j++) {\n        battleGround.push([i, j]);\n      }\n    }\n    return battleGround;\n  }\n\n  placeShips(ship) {\n    this.ships.push(ship);\n  }\n\n  receiveAttack(coord) {\n    this.ships.forEach((ship) => {\n      ship.position.forEach((pos) => {\n        if (pos[0] === coord[0] && pos[1] === coord[1]) {\n          ship.hit();\n          this.attacks.push(coord);\n          return;\n        }\n      });\n      this.missedAttacks.push(coord);\n    });\n  }\n\n  getAttacks() {\n    return this.attacks;\n  }\n\n  getMissedAttacks() {\n    return this.missedAttacks;\n  }\n\n  getShips() {\n    return this.ships;\n  }\n\n  sinkShips() {\n    this.ships.forEach((ship) => {\n      let n = ship.health;\n      while (n > 0) {\n        ship.hit();\n        n--;\n      }\n    });\n    this.gameOver = true;\n  }\n\n  allShipsGone() {\n    //return this.ships.every((ship) => ship.sunk);\n    if (this.ships.every((ship) => ship.sunk)) {\n      this.gameOver = true;\n      return true;\n    }\n  }\n\n  allShipsSet() {\n    return this.ships.every((ship) => ship.position.length !== 0);\n  }\n\n  invalidPosition(array) {\n    return this.ships.some((ship) => {\n      return ship.position.some((element) => {\n        return element[0] === array[0] && element[1] === array[1];\n      });\n    });\n  }\n}\n\n\n\n\n//# sourceURL=webpack://battleship_version_2/./src/modules/Gameboard.js?");

/***/ }),

/***/ "./src/modules/Ship.js":
/*!*****************************!*\
  !*** ./src/modules/Ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Ship: () => (/* binding */ Ship),\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\n  constructor(size, name) {\n    this.name = name;\n    this.size = size;\n    this.position = [];\n    this.health = size;\n    this.set = false;\n    this.sunk = false;\n    this.direction = null;\n    this.hits = 0;\n  }\n\n  pos(array, direction) {\n    this.direction = direction;\n    if (this.direction === \"h\") {\n      for (let i = 0; i < this.size; i++) {\n        if (array[1] + i > 9) {\n          this.position = [];\n          console.log(\"Invalid position, try again please!\");\n          return false;\n        }\n        this.position.push([array[0], array[1] + i]);\n        this.set = true;\n      }\n    } else if (this.direction === \"v\") {\n      for (let i = 0; i < this.size; i++) {\n        if (array[0] + i > 9) {\n          this.position = [];\n          console.log(\"Invalid position, try again please!\");\n          return false;\n        }\n        this.position.push([array[0] + i, array[1]]);\n        this.set = true;\n      }\n    }\n  }\n\n  getPosition() {\n    return this.position;\n  }\n\n  getHealth() {\n    return this.health;\n  }\n\n  hit() {\n    // TODO fill an array with hits\n    this.health -= 1;\n    this.hits += 1;\n    if (this.health === 0) {\n      this.visible = true;\n      this.sunk = true;\n      console.log(`${this.name} sunk!`);\n    }\n  }\n\n  isSunk() {\n    if (this.health === 0) {\n      this.sunk = true;\n      return true;\n    } else {\n      return false;\n    }\n  }\n\n  getName() {\n    return this.name;\n  }\n}\n\n\n\n\n//# sourceURL=webpack://battleship_version_2/./src/modules/Ship.js?");

/***/ }),

/***/ "./src/modules/UI.js":
/*!***************************!*\
  !*** ./src/modules/UI.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   clickShip: () => (/* binding */ clickShip),\n/* harmony export */   displayBoard: () => (/* binding */ displayBoard),\n/* harmony export */   showPosition: () => (/* binding */ showPosition)\n/* harmony export */ });\n/* harmony import */ var _Gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard.js */ \"./src/modules/Gameboard.js\");\n\n\nfunction displayBoard(id) {\n    const content = document.getElementById(\"content\");\n    const board_one = document.createElement(\"div\");\n    board_one.setAttribute(\"id\", id);\n    const gameBoard = new _Gameboard_js__WEBPACK_IMPORTED_MODULE_0__.GameBoard();\n    const array = gameBoard.buildBoard();\n    array.forEach((e) => {\n    let element = document.createElement(\"div\");\n    element.setAttribute(\"id\", e);\n    element.className = id;\n    element.addEventListener(\"mouseover\", (e) => {\n      console.log(e.target.id);\n    });\n    board_one.appendChild(element);\n  });\n  content.appendChild(board_one);\n  console.log(`Building board ${id}`);\n}\n\nconst showPosition = (ship) => {\n  let position = ship.position;\n  console.log(\"position: \" + position);\n  position.forEach((e) => {\n    let id = e.toString();\n    console.log(id);\n    let div = document.getElementById(id);\n    console.log(div);\n    div.style.backgroundColor = \"red\";\n  });\n};\n\nconst clickShip = (ship, player) => {\n  let position = ship.position;\n  position.forEach((e) => {\n    let id = player + e.toString();\n    let div = document.getElementById(id);\n    console.log(\"clickShip: \" + id + div);\n    div.addEventListener(\"click\", function () {\n      this.style.backgroundColor = \"black\";\n    });\n  });\n};\n\nconst setShipOnDiv = (coord) => {\n  // Eventlistener checkt feld, bei klick wird das Schiff gesetzt\n};\n\n\n\n\n//# sourceURL=webpack://battleship_version_2/./src/modules/UI.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;