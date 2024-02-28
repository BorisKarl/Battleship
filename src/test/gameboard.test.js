import GameBoard from "../modules/Gameboard.js";
import Ship from "../modules/Ship.js";

test("name ship", () => {
  let ship = new Ship(3, "ship");
  expect(ship.name).toEqual("ship");
});

test("check vertical positiion", () => {
  let ship2 = new Ship(3, "ship2");
  ship2.pos([3, 3], "v");
  expect(ship2.position).toEqual([
    [3, 3],
    [4, 3],
    [5, 3],
  ]);
});

test("check horizontal positiion", () => {
  const ship = new Ship(5, "ship");
  ship.pos([1, 1], "h");
  expect(ship.position).toEqual([
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
  ]);
});

test("check gameboard receiveAttack", () => {
  let ship = new Ship(3, "ship");
  ship.pos([3, 3], "v");
  let g = new GameBoard("boris");
  g.placeShips(ship);
  g.receiveAttack([3, 3]);
  expect(ship.health).toEqual(2);
});

test("check missed attacks", () => {
  let ship = new Ship(3, "ship");
  ship.pos([3, 3], "v");
  let g = new GameBoard("boris");
  g.placeShips(ship);
  g.receiveAttack([5, 5]);
  g.receiveAttack([5, 4]);
  expect(g.missedAttacks).toEqual([
    [5, 5],
    [5, 4],
  ]);
});

test("check attacks", () => {
  let ship = new Ship(3, "ship");
  ship.pos([3, 3], "v");
  let g = new GameBoard("boris");
  g.placeShips(ship);
  g.receiveAttack([3, 3]);
  g.receiveAttack([4, 3]);
  expect(g.attacks).toEqual([
    [3, 3],
    [4, 3],
  ]);
});

test("check gameover function", () => {
  let ship1 = new Ship("ship1");
  let ship2 = new Ship("ship2");
  let ship3 = new Ship("ship3");
  ship1.pos([1, 2], "v");
  ship2.pos([0, 0], "v");
  ship3.pos([3, 3], "v");
  let g = new GameBoard("boris");
  g.placeShips(ship1);
  g.placeShips(ship2);
  g.placeShips(ship3);
  g.sinkShips();
  expect(g.gameOver).toBe(true);
});

test("check gameboard invalid position", () => {
  let ship = new Ship(3, "ship");
  ship.pos([3, 3], "v");
  let g = new GameBoard("boris");
  g.placeShips(ship);
  expect(g.invalidPosition([3, 3])).toBe(true);
});

test("check gameboard invalid position, first position", () => {
  let ship = new Ship(3, "ship");
  let g = new GameBoard("boris");
  g.placeShips(ship);
  expect(g.invalidPosition([0, 0])).toBe(false);
});
