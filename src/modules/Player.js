export default class Player {
  constructor(name) {
    this.name = name;
    this.points = null;
    this.move = false;
    this.won = false;
    this.lost = false;
  }

  attack(coord) {
    return coord;
  }

  setShip(coord) {
    return coord;
  }

  setAlignment(string) {
    return string;
  }

  getName() {
    return this.name;
  }

  addPoint() {
    this.points += 1;
  }

  onMove() {
    this.move = true;
  }

  onHold() {
    this.move = false;
  }

  getPoints() {
    return this.points;
  }

  win() {
    this.win = true;
  }

  lost() {
    this.lost = true;
  }
}

export { Player };
