import { showPosition } from "./UI";

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
  let num = 5;
  if (drug === "cocaine") {
    num = 5;
  } else if (drug === "meth") {
    num++;
  } else if (drug === "crack") {
    num += 2;
  } else {
    num += 3;
  }
  const array = [];
  if (direction === "v") {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < num; j++) {
        array.push([i, j]);
      }
    }
  } else {
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
    console.log("Aus der randomStartingPoint Funktion: " + start);
    return start;
  };

  const randomSetShip = (ship, direction, coord) => {
    
    ship.pos(coord, direction);
    if(ship.set) {
      showPosition(ship);
      return true;
    }
    return false;

  };

export { possibleDrugPositions, randDirection, getRandomInt, randomStartingPoint, randomSetShip };
