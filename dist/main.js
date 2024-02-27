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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Ship */ \"./src/modules/Ship.js\");\n\n\nconst ship = new _modules_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](5, \"Gorch Fuck\");\n\nconst name = ship.getName();\n\nconsole.log(name);\n\n\n//# sourceURL=webpack://battleship_version_2/./src/index.js?");

/***/ }),

/***/ "./src/modules/Ship.js":
/*!*****************************!*\
  !*** ./src/modules/Ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Ship: () => (/* binding */ Ship),\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\n  constructor(size, name) {\n    this.name = name;\n    this.size = size;\n    this.position = [];\n    this.health = size;\n    this.set = false;\n    this.sunk = false;\n    this.direction = null;\n    this.hits = 0;\n  }\n\n  pos(array, direction) {\n    this.direction = direction;\n    let msg = document.getElementById(\"msg\");\n    if (this.direction === \"h\") {\n      for (let i = 0; i < this.size; i++) {\n        if (array[1] + i > 9) {\n          this.position = [];\n          msg.textContent = \"Invalid position, try again please!\";\n          console.log(\"BOOOM\");\n          return false;\n        }\n        this.position.push([array[0], array[1] + i]);\n        this.set = true;\n      }\n    } else if (this.direction === \"v\") {\n      for (let i = 0; i < this.size; i++) {\n        if (array[0] + i > 9) {\n          this.position = [];\n          msg.textContent = \"Invalid position, try again please!\";\n          console.log(\"BOOOM\");\n          return false;\n        }\n        this.position.push([array[0] + i, array[1]]);\n        this.set = true;\n      }\n    }\n  }\n\n  getPosition() {\n    return this.position;\n  }\n\n  getHealth() {\n    return this.health;\n  }\n\n  hit() {\n    // TODO fill an array with hits\n    this.health -= 1;\n    this.hits += 1;\n    if (this.health === 0) {\n      this.visible = true;\n      this.sunk = true;\n      console.log(`${this.name} sunk!`);\n    }\n  }\n\n  isSunk() {\n    if (this.health === 0) {\n      this.sunk = true;\n      return true;\n    } else {\n      return false;\n    }\n  }\n\n  getName() {\n    return this.name;\n  }\n}\n\n\n\n\n//# sourceURL=webpack://battleship_version_2/./src/modules/Ship.js?");

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