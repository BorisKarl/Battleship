import GameBoard from "../modules/Gameboard.js";
import Ship from "../modules/Ship.js";
import Player from "../modules/Player.js";

test("Player name", () => {
  let karl = new Player("Karl");
  expect(karl.name).toEqual("Karl");
});

test("Set ship", () => {
  let karl = new Player("Karl");
  let ship = new Ship(3, "ship");
  ship.pos(karl.setShip([3, 3]), karl.setAlignment("v"));
  expect(ship.getPosition()).toEqual([
    [3, 3],
    [4, 3],
    [5, 3],
  ]);
});
