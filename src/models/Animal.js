let nextId = 1;

class Animal {
  constructor(x, y) {
    this.id = nextId++;
    this.x = x;
    this.y = y;
  }

  move() {
    // Implement movement logic here
  }
}

class Herbivore extends Animal {
  constructor(x, y) {
    super(x, y);
    this.type = 'herbivore';
  }

  // Add additional properties and behaviors specific to herbivores
}

class Carnivore extends Animal {
  constructor(x, y) {
    super(x, y);
    this.type = 'carnivore';
  }

  // Add additional properties and behaviors specific to carnivores
}

export { Herbivore, Carnivore };
