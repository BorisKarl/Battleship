export default class Player {
  constructor(name) {
    this.name = name;
    this.points = 0;
    this.lost = 0;
    this.round = 0;
  }

  changeName(newName) {
      this.name = newName;
  }

  addPoint() {
    this.points += 1;
  }

  addRound() {
    this.round += 1;
  }

  addLostGame() {
    this.lost += 1;
  }

}

export { Player };
