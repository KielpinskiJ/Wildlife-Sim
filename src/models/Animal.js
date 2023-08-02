let nextId = 1;

class Animal {
  constructor(x, y) {
    this.id = nextId++;
    this.x = x;
    this.y = y;
    this.gender = Math.random() < 0.5 ? 'male' : 'female';
  }

  move(boardSize) {
    // Randomly selecting new x and y coordinates
    const dx = Math.floor(Math.random() * 3) - 1;
    const dy = Math.floor(Math.random() * 3) - 1;
    const newX = this.x + dx;
    const newY = this.y + dy;

    // Checking if the new coordinates are within the board boundaries
    if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize) {
      // Updating the animal's coordinates
      this.x = newX;
      this.y = newY;
    }
  }
}

class Herbivore extends Animal {
  constructor(x, y) {
    super(x, y);
    this.type = 'herbivore';
  }
}

class Carnivore extends Animal {
  constructor(x, y) {
    super(x, y);
    this.type = 'carnivore';
    this.turnsSinceEating = 0;
  }
}

export { Herbivore, Carnivore };
