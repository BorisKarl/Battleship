import { showPosition } from "./UI";
import { Player } from "./Player";

const makePlayer = (name) => {
  const player = new Player(name);
  return player;
};

const getRandomInt = (limit) => {
  return Math.floor(Math.random() * limit);
};

const randDirection = () => {
  let num = Math.floor(Math.random() * 2);
  if (num % 2 === 0) return "v";
  return "h";
};

const possibleDrugPositions = (drug, direction) => {
  console.log(drug);
  let num = 6;
  if (drug === "cocaine") {
    num = 6;
  } else if (drug === "meth") {
    num++;
  } else if (drug === "crack") {
    num += 2;
  } else {
    num += 3;
  }
  const array = [];
  if (direction === "h") {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < num; j++) {
        array.push([i, j]);
      }
    }
  } else if (direction === "v") {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < num; j++) {
        array.push([j, i]);
      }
    }
  }
  return array;
};

const randomStartingPoint = (drug, randomDirection) => {
  let a = possibleDrugPositions(drug, randomDirection);
  let start = a[getRandomInt(a.length)];
  return start;
};



const buildShipPosition = (size, array, direction) => {
  let position = [];
  if (direction === "h") {
    for (let i = 0; i < size; i++) {
      if (array[1] + size - 1 > 9) {
        console.log(
          `Invalid position, position ${array} with direction ${direction} and size ${size} try again please!`,
        );
        return false;
      }
      position.push([array[0], array[1] + i]);
    }
  } else if (direction === "v") {
    for (let i = 0; i < size; i++) {
      if (array[0] + size - 1 > 9) {
        console.log(
          `Invalid position, position ${array} with direction ${direction} and size ${size} try again please!`,
        );
        return false;
      }
      position.push([array[0] + i, array[1]]);
    }
  }
  return position;
};


const validPosition = (pArray, shipPosition) => {
  for (let i = 0; i < pArray.length; i++) {
    for (let j = 0; j < pArray[i].length; j++) {
      for (let k = 0; k < shipPosition.length; k++) {
        // console.log(pArray[i][j]);
        // console.log(shipPosition[k]);
        if (
          pArray[i][j][0] === shipPosition[k][0] &&
          pArray[i][j][1] === shipPosition[k][1]
        ) {
          console.log("DOUBLE!!!!");
          console.log(`${shipPosition} and ${pArray[i][j]}`);
          return false;
        }
      }
    }
  }
  return true;
};

const setShipsOnMachineBoard = (array) => {
  let pArray = [];
  array.forEach((e, index) => {
    let direction = randDirection();
    let start = randomStartingPoint(e.name, direction);
    if (index === 0) pArray.push(buildShipPosition(e.size, start, direction));
    if (index > 0) {
      let tmp = buildShipPosition(e.size, start, direction);
      while (!validPosition(pArray, tmp)) {
        console.log("building new coordinates...");
        direction = randDirection();
        tmp = buildShipPosition(
          e.size,
          randomStartingPoint(e.name, direction),
          direction,
        );
        if (!validPosition(pArray, tmp)) return false;
      }
      pArray.push(tmp);
    }
  });
  return pArray;
};

const reset = () => {
  const body = document.querySelector("body");
  body.innerHTML = "";
};



export {
  makePlayer,
  randDirection,
  randomStartingPoint,
  setShipsOnMachineBoard,
  reset,
};
