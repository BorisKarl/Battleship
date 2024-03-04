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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Ship */ \"./src/modules/Ship.js\");\n/* harmony import */ var _modules_UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/UI */ \"./src/modules/UI.js\");\n/* harmony import */ var _modules_Gameboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/Gameboard */ \"./src/modules/Gameboard.js\");\n\n\n\n\n\n(0,_modules_UI__WEBPACK_IMPORTED_MODULE_1__.displayHeader)();\n(0,_modules_UI__WEBPACK_IMPORTED_MODULE_1__.displayBlocks)();\n(0,_modules_UI__WEBPACK_IMPORTED_MODULE_1__.switchBlocks)();\n\n\nconst button = document.getElementById(\"button\");\n\n// Start Game\nbutton.addEventListener(\"click\", () => {\n    let human = (0,_modules_UI__WEBPACK_IMPORTED_MODULE_1__.makePlayer)(\"Human\");\n    const header = document.getElementById(\"header\");\n    header.style.color = \"green\";\n\n    (0,_modules_UI__WEBPACK_IMPORTED_MODULE_1__.displayText)(human.name);\n\n    // Define \"Ships\" aka drugs\n    const cocaine = new _modules_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](5, \"Cocaine\");\n    const meth = new _modules_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](4, \"Meth\");\n    const crack = new _modules_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](3, \"Crack\");\n    const weed = new _modules_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](2, \"Weed\");\n    const shrooms = new _modules_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](2, \"Shrooms\");\n\n    (0,_modules_UI__WEBPACK_IMPORTED_MODULE_1__.displayText)(crack.name);\n    // Make new boards\n    const human_board = new _modules_Gameboard__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"human_board\");\n    const machine_board = new _modules_Gameboard__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"machine_board\");\n\n    // Set ships with array\n    const arrayOfShips = [cocaine, meth, crack, weed, shrooms];\n    arrayOfShips.forEach((e) => {\n      human_board.placeShips(e);\n      machine_board.placeShips(e);\n    });\n\n    console.log(human_board, machine_board);\n\n    (0,_modules_UI__WEBPACK_IMPORTED_MODULE_1__.displayBoard)(\"human\");\n    (0,_modules_UI__WEBPACK_IMPORTED_MODULE_1__.displayBoard)(\"machine\");\n    (0,_modules_UI__WEBPACK_IMPORTED_MODULE_1__.drag)(\"human\", human_board);\n});\n\n\n\n\n//# sourceURL=webpack://battleship_version_2/./src/index.js?");

/***/ }),

/***/ "./src/modules/Gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/Gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameBoard: () => (/* binding */ GameBoard),\n/* harmony export */   \"default\": () => (/* binding */ GameBoard)\n/* harmony export */ });\nclass GameBoard {\n  constructor(name) {\n    this.name = name;\n    this.ships = [];\n    this.missedAttacks = [];\n    this.gameOver = false;\n    this.attacks = [];\n  }\n\n  buildBoard() {\n    let battleGround = [];\n    for (let i = 0; i < 10; i++) {\n      for (let j = 0; j < 10; j++) {\n        battleGround.push([i, j]);\n      }\n    }\n    return battleGround;\n  }\n\n  placeShips(ship) {\n    this.ships.push(ship);\n  }\n\n  receiveAttack(coord) {\n    this.ships.forEach((ship) => {\n      ship.position.forEach((pos) => {\n        if (pos[0] === coord[0] && pos[1] === coord[1]) {\n          ship.hit();\n          this.attacks.push(coord);\n          return;\n        }\n      });\n      this.missedAttacks.push(coord);\n    });\n  }\n\n  getAttacks() {\n    return this.attacks;\n  }\n\n  getMissedAttacks() {\n    return this.missedAttacks;\n  }\n\n  getShips() {\n    return this.ships;\n  }\n\n  sinkShips() {\n    this.ships.forEach((ship) => {\n      let n = ship.health;\n      while (n > 0) {\n        ship.hit();\n        n--;\n      }\n    });\n    this.gameOver = true;\n  }\n\n  allShipsGone() {\n    //return this.ships.every((ship) => ship.sunk);\n    if (this.ships.every((ship) => ship.sunk)) {\n      this.gameOver = true;\n      return true;\n    }\n  }\n\n  allShipsSet() {\n    return this.ships.every((ship) => ship.position.length !== 0);\n  }\n\n  invalidPosition(array) {\n    return this.ships.some((ship) => {\n      return ship.position.some((element) => {\n        return element[0] === array[0] && element[1] === array[1];\n      });\n    });\n  }\n}\n\n\n\n\n//# sourceURL=webpack://battleship_version_2/./src/modules/Gameboard.js?");

/***/ }),

/***/ "./src/modules/Player.js":
/*!*******************************!*\
  !*** ./src/modules/Player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Player: () => (/* binding */ Player),\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\nclass Player {\n  constructor(name) {\n    this.name = name;\n    this.points = null;\n    this.move = false;\n    this.won = false;\n    this.lost = false;\n  }\n\n  attack(coord) {\n    return coord;\n  }\n\n  setShip(coord) {\n    return coord;\n  }\n\n  setAlignment(string) {\n    return string;\n  }\n\n  getName() {\n    return this.name;\n  }\n\n  addPoint() {\n    this.points += 1;\n  }\n\n  onMove() {\n    this.move = true;\n  }\n\n  onHold() {\n    this.move = false;\n  }\n\n  getPoints() {\n    return this.points;\n  }\n\n  win() {\n    this.win = true;\n  }\n\n  lost() {\n    this.lost = true;\n  }\n}\n\n\n\n\n//# sourceURL=webpack://battleship_version_2/./src/modules/Player.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   clickShip: () => (/* binding */ clickShip),\n/* harmony export */   displayBlocks: () => (/* binding */ displayBlocks),\n/* harmony export */   displayBoard: () => (/* binding */ displayBoard),\n/* harmony export */   displayHeader: () => (/* binding */ displayHeader),\n/* harmony export */   displayText: () => (/* binding */ displayText),\n/* harmony export */   drag: () => (/* binding */ drag),\n/* harmony export */   makePlayer: () => (/* binding */ makePlayer),\n/* harmony export */   showPosition: () => (/* binding */ showPosition),\n/* harmony export */   switchBlocks: () => (/* binding */ switchBlocks)\n/* harmony export */ });\n/* harmony import */ var _Gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard.js */ \"./src/modules/Gameboard.js\");\n/* harmony import */ var _Player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player.js */ \"./src/modules/Player.js\");\n\n\n\nconst displayHeader = () => {\n    const body = document.querySelector(\"body\");\n    const header = document.createElement(\"h1\");\n    const p = document.createElement(\"p\");\n    const button = document.createElement(\"button\");\n    header.setAttribute(\"id\", \"header\");\n    header.textContent = \"Drug Run\";\n    p.textContent = \"Play against the biggest druglords and become the next Kingpin of Rotterdam!\";\n    button.setAttribute(\"id\", \"button\");\n    button.textContent = \"START\";\n    header.appendChild(p);\n    header.appendChild(button);\n    body.insertBefore(header, body.firstChild);\n}\n\nconst makePlayer = (name) => {\n        const player = new _Player_js__WEBPACK_IMPORTED_MODULE_1__.Player(name);\n        return player;\n}\n\nconst displayText = (text) => {\n    const p = document.createElement(\"p\");\n    const body = document.querySelector(\"body\");\n    p.textContent = text;\n    body.appendChild(p);\n}\n\nconst displayPlayerName = (name) => {\n    const nameDiv = document.createElement(\"div\");\n}\n\nfunction displayBoard(id) {\n    const content = document.getElementById(\"content\");\n    const board_one = document.createElement(\"div\");\n    board_one.setAttribute(\"id\", id);\n    const gameBoard = new _Gameboard_js__WEBPACK_IMPORTED_MODULE_0__.GameBoard();\n    const array = gameBoard.buildBoard();\n    array.forEach((e) => {\n        let element = document.createElement(\"div\");\n        element.setAttribute(\"id\", e);\n        element.className = \"dropzone\";\n        element.addEventListener(\"mouseover\", (e) => {\n        console.log(e.target.id);\n    });\n        board_one.appendChild(element);\n  });\n  content.appendChild(board_one);\n  console.log(`${id} ready!`);\n}\n\nconst showPosition = (ship) => {\n  let position = ship.position;\n  console.log(\"position: \" + position);\n  position.forEach((e) => {\n    let id = e.toString();\n    console.log(id);\n    let div = document.getElementById(id);\n    console.log(div);\n    div.style.backgroundColor = \"red\";\n  });\n};\n\nconst clickShip = (ship, player) => {\n  let position = ship.position;\n  position.forEach((e) => {\n    let id = player + e.toString();\n    let div = document.getElementById(id);\n    console.log(\"clickShip: \" + id + div);\n    div.addEventListener(\"click\", function () {\n      this.style.backgroundColor = \"black\";\n    });\n  });\n};\n\nconst buildBlock = (string, length) => {\n  let block_content = document.createElement(\"div\");\n  block_content.setAttribute(\"id\", string);\n  block_content.setAttribute(\"class\", \"v\");\n\n  for (let i = 0; i < length; i++ ){\n      let div = document.createElement(\"div\");\n      div.setAttribute(\"class\", \"block\");\n      block_content.appendChild(div);\n  }\n\n  return block_content;\n}\n\nconst displayBlocks = () => {\n  const button = document.createElement(\"button\");\n  button.setAttribute(\"id\", \"switch_button\");\n  button.textContent = \"SWITCH POSITION\";\n  const content = document.getElementById(\"UI-content\");\n  const block_wrapper = document.createElement('div');\n  block_wrapper.setAttribute(\"class\", \"block_wrapper\");\n\n  const cocaine = buildBlock(\"cocaine\", 5);\n  const meth = buildBlock(\"meth\", 4);\n  const crack = buildBlock(\"crack\", 3);\n  const weed = buildBlock(\"weed\", 2);\n  const shrooms = buildBlock(\"shrooms\", 2);\n\n  block_wrapper.appendChild(cocaine);\n  block_wrapper.appendChild(meth);\n  block_wrapper.appendChild(crack);\n  block_wrapper.appendChild(weed);\n  block_wrapper.appendChild(shrooms);\n  content.appendChild(button);\n  content.appendChild(block_wrapper);\n}\n\n\nconst switchBlocks = () => {\n  const button = document.getElementById(\"switch_button\");\n  const block = document.querySelectorAll(\".v\");\n  button.addEventListener(\"click\", () => {\n    block.forEach((e) => {\n      if (e.classList.contains(\"v\")) {\n        e.classList.remove(\"v\");\n        e.classList.add(\"h\");\n      } else {\n        e.classList.remove(\"h\");\n        e.classList.add(\"v\");\n      }\n    });\n  });\n}\n\nconst drag = (id, playersBoard) => {\n  const msg = document.createElement(\"p\");\n  const h1 = document.querySelector(\"h1\");\n  h1.appendChild(msg);\n  const target = document.getElementById(id);\n  const cocaineDiv = document.getElementById(\"cocaine\");\n  const methDiv = document.getElementById(\"crack\");\n  const shroomsDiv = document.getElementById(\"meth\");\n  const mary_janeDiv = document.getElementById(\"weed\");\n  const mary_jane2Div = document.getElementById(\"shrooms\");\n  const dropzones = document.querySelectorAll(\".dropzone\");\n  cocaineDiv.setAttribute(\"draggable\", true); \n  methDiv.setAttribute(\"draggable\", true); \n  shroomsDiv.setAttribute(\"draggable\", true); \n  mary_janeDiv.setAttribute(\"draggable\", true); \n  mary_jane2Div.setAttribute(\"draggable\", true); \n\n  cocaineDiv.addEventListener(\"dragstart\", (ev) => {\n    msg.textContent = \"\";\n    ev.dataTransfer.clearData();\n    ev.dataTransfer.setData(\"text/plain\", ev.target.id);\n  });\n\n  methDiv.addEventListener(\"dragstart\", (ev) => {\n    msg.textContent = \"\";\n    ev.dataTransfer.clearData();\n    ev.dataTransfer.setData(\"text/plain\", ev.target.id);\n  });\n\n  shroomsDiv.addEventListener(\"dragstart\", (ev) => {\n    msg.textContent = \"\";\n    ev.dataTransfer.clearData();\n    ev.dataTransfer.setData(\"text/plain\", ev.target.id);\n  });\n\n  mary_janeDiv.addEventListener(\"dragstart\", (ev) => {\n    msg.textContent = \"\";\n\n    ev.dataTransfer.clearData();\n    ev.dataTransfer.setData(\"text/plain\", ev.target.id);\n  });\n\n  mary_jane2Div.addEventListener(\"dragstart\", (ev) => {\n    msg.textContent = \"\";\n\n    ev.dataTransfer.clearData();\n    ev.dataTransfer.setData(\"text/plain\", ev.target.id);\n  });\n\n  cocaineDiv.addEventListener(\"dragend\", (ev) => {\n    ev.preventDefault();\n  });\n\n  methDiv.addEventListener(\"dragend\", (ev) => {\n    ev.preventDefault();\n  });\n\n  shroomsDiv.addEventListener(\"dragend\", (ev) => {\n    ev.preventDefault();\n  });\n\n  mary_janeDiv.addEventListener(\"dragend\", (ev) => {\n    ev.preventDefault();\n  });\n\n  mary_jane2Div.addEventListener(\"dragend\", (ev) => {\n    ev.preventDefault();\n  });\n\n  target.addEventListener(\"dragover\", (e) => {\n    e.preventDefault();\n  });\n\n  target.addEventListener(\"drop\", (e) => {\n    e.preventDefault();\n    const boardId = e.target.id;\n    // e.target.style.backgroundColor = \"orange\";\n    console.log(`ZielId ${boardId}`);\n  });\n\n  target.addEventListener(\"drop\", (ev) => {\n    console.log(\"Drop\");\n    ev.preventDefault();\n    // Get the data, which is the id of the source element\n    /*\n    let shipName = ev.dataTransfer.getData(\"text\");\n    console.log(\"Shipname 1 : \" + shipName);\n    let id = ev.target.id;\n    const shipDiv = document.getElementById(shipName);\n    const id1 = parseInt(id[0]);\n    const id2 = parseInt(id[2]);\n    let a = [];\n    a.push(id1, id2);\n    console.log(\"invalid \" + playersBoard.invalidPosition(a));\n    if (playersBoard.invalidPosition(a)) {\n      msg.textContent = \"Invalid position, try again!\";\n      return;\n    }\n    if (shipName === \"cocaine\") {\n      if (cocaine.set) return;\n      if (!cocaine.pos(a, shipDiv.classList[0])) return;\n      cocaine.pos(a, shipDiv.classList[0]);\n      showPosition(cocaine);\n      msg.textContent = \"Cocaine is hidden\";\n    } else if (shipName === \"meth\") {\n      if (meth.set) return;\n      if (!meth.pos(a, shipDiv.classList[0])) return;\n      meth.pos(a, shipDiv.classList[0]);\n      showPosition(meth);\n      msg.textContent = \"A lot of meth!\";\n    } else if (shipName === \"shrooms\") {\n      if (shrooms.set) return;\n      if (!shrooms.pos(a, shipDiv.classList[0])) return;\n      shrooms.pos(a, shipDiv.classList[0]);\n      showPosition(shrooms);\n      msg.textContent = \"Shrooms for the Hippies...\";\n    } else if (shipName === \"mary_jane\") {\n      if (mary_jane.set) return;\n      if (!mary_jane.pos(a, shipDiv.classList[0])) return;\n      mary_jane.pos(a, shipDiv.classList[0]);\n      showPosition(mary_jane);\n      msg.textContent = \"Some weed\";\n    } else if (shipName === \"mary_jane2\") {\n      if (mary_jane2.set) return;\n      if (!mary_jane2.pos(a, shipDiv.classList[0])) return;\n      mary_jane2.pos(a, shipDiv.classList[0]);\n      showPosition(mary_jane2);\n      msg.textContent = \"More weed\";\n    } else return;\n\n    console.log(playersBoard);\n    console.log(shipName);\n    let result = playersBoard.allShipsSet();\n    if (result) msg.textContent = \"Alright, all set!\";\n    console.log(result);\n    */\n  });\n  \n\n  // W3 docs\n  dropzones.forEach((item) => {\n    item.addEventListener(\"dragenter\", (event) => {\n      // highlight potential drop target when the draggable element enters it\n      if (event.target.classList.contains(\"dropzone\")) {\n        event.target.classList.add(\"dragover\");\n      }\n    });\n  });\n\n  dropzones.forEach((item) => {\n    item.addEventListener(\"dragleave\", (event) => {\n      // reset background of potential drop target when the draggable element leaves it\n      if (event.target.classList.contains(\"dropzone\")) {\n        event.target.classList.remove(\"dragover\");\n      }\n    });\n  });\n\n}\n\n\nconst setShipOnDiv = (coord) => {\n  // Eventlistener checkt feld, bei klick wird das Schiff gesetzt\n};\n\n\n\n\n//# sourceURL=webpack://battleship_version_2/./src/modules/UI.js?");

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