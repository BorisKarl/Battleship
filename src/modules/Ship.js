export default class Ship {
  constructor(size, name) {
    this.name = name;
    this.size = size;
    this.position = [];
    this.health = size;
    this.set = false;
    this.sunk = false;
    this.direction = null;
    this.hits = 0;
  }

  pos(array, direction) {
    this.direction = direction;
    let msg = document.getElementById("msg");
    if (this.direction === "h") {
      for (let i = 0; i < this.size; i++) {
        if (array[1] + i > 9) {
          this.position = [];
          msg.textContent = "Invalid position, try again please!";
          console.log("BOOOM");
          return false;
        }
        this.position.push([array[0], array[1] + i]);
        this.set = true;
      }
    } else if (this.direction === "v") {
      for (let i = 0; i < this.size; i++) {
        if (array[0] + i > 9) {
          this.position = [];
          msg.textContent = "Invalid position, try again please!";
          console.log("BOOOM");
          return false;
        }
        this.position.push([array[0] + i, array[1]]);
        this.set = true;
      }
    }
  }

  getPosition() {
    return this.position;
  }

  getHealth() {
    return this.health;
  }

  hit() {
    // TODO fill an array with hits
    this.health -= 1;
    this.hits += 1;
    if (this.health === 0) {
      this.visible = true;
      this.sunk = true;
      console.log(`${this.name} sunk!`);
    }
  }

  isSunk() {
    if (this.health === 0) {
      this.sunk = true;
      return true;
    } else {
      return false;
    }
  }

  getName() {
    return this.name;
  }
}

export { Ship };
