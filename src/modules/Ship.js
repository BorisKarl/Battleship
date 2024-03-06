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
    if (this.direction === "h") {
      for (let i = 0; i < this.size; i++) {
        if (array[1] + i > 9) {
          this.position = [];
          console.log("Invalid position, try again please!");
          return false;
        }
        this.position.push([array[0], array[1] + i]);
        this.set = true;
      }
    } else if (this.direction === "v") {
      for (let i = 0; i < this.size; i++) {
        if (array[0] + i > 9) {
          this.position = [];
          console.log("Invalid position, try again please!");
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
    if (this.health === 0) return;
    this.health -= 1;
    this.hits += 1;
    console.log("Damn!");
     if (this.health === 0) {
       this.visible = true;
       this.sunk = true;
       console.log(`Your ${this.name} was discovered!`);
       return;
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
