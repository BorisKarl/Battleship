export default class GameBoard {
  constructor(name) {
    this.name = name;
    this.ships = [];
    this.missedAttacks = [];
    this.gameOver = false;
    this.attacks = [];
  }

  buildBoard() {
    let battleGround = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        battleGround.push([i, j]);
      }
    }
    return battleGround;
  }

  placeShips(ship) {
    this.ships.push(ship);
  }

  receiveAttack(coord) {
    this.ships.forEach((ship) => {
      ship.position.forEach((pos) => {
        if (pos[0] === coord[0] && pos[1] === coord[1]) {
          ship.hit();
          this.attacks.push(coord);
          return;
        }
      });
      this.missedAttacks.push(coord);
    });
  }

  getAttacks() {
    return this.attacks;
  }

  getMissedAttacks() {
    return this.missedAttacks;
  }

  getShips() {
    return this.ships;
  }

  sinkShips() {
    this.ships.forEach((ship) => {
      let n = ship.health;
      while (n > 0) {
        ship.hit();
        n--;
      }
    });
    this.gameOver = true;
  }

  allShipsGone() {
    //return this.ships.every((ship) => ship.sunk);
    if (this.ships.every((ship) => ship.sunk)) {
      this.gameOver = true;
      return true;
    }
  }

  allShipsSet() {
    return this.ships.every((ship) => ship.position.length !== 0);
  }

  invalidPosition(array) {
    return this.ships.some((ship) => {
      return ship.position.some((element) => {
        return element[0] === array[0] && element[1] === array[1];
      });
    });
  }
}

export { GameBoard };
