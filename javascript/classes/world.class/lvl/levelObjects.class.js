class GroundTile extends MoveableObject {
  width = 64;
  height = 64;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage(
      "../assets/tileSets/oak_woods_v1.0/tileSet/oak_woods_tileset-17.png"
    );
  }
}

class PlatformTile extends MoveableObject {
  width = 32;
  height = 32;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage(
      "../assets/tileSets/oak_woods_v1.0/tileSet/oak_woods_tileset-2.png"
    );
  }
}

class DecorationTile extends MoveableObject {
  width = 32;
  height = 32;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage(
      "../assets/tileSets/oak_woods_v1.0/tileSet/oak_woods_tileset-2.png"
    );
  }
}

class Coin extends MoveableObject {
  width = 24;
  height = 24;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage("../assets/coins/coin-gold.png");
  }
}

class Key extends MoveableObject {
  width = 32;
  height = 32;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage("../assets/items/key.png");
  }
}

class HealthPotion extends MoveableObject {
  width = 24;
  height = 32;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage("../assets/items/health-potion.png");
  }
}

class Chest extends MoveableObject {
  width = 48;
  height = 32;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage("../assets/items/chest-closed.png");
  }
}

class Door extends MoveableObject {
  width = 64;
  height = 96;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage("../assets/items/door.png");
  }
}

class Lever extends MoveableObject {
  width = 32;
  height = 48;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage("../assets/items/lever-off.png");
  }
}

class Spike extends MoveableObject {
  width = 32;
  height = 32;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage("../assets/hazards/spike.png");
  }
}

class Lava extends MoveableObject {
  width = 64;
  height = 32;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage("../assets/hazards/lava.png");
  }
}

class MovingPlatform extends MoveableObject {
  width = 96;
  height = 24;
  speed = 2;
  direction = 1;
  startX;
  endX;

  constructor(x, y, endX) {
    super();
    this.x = x;
    this.y = y;
    this.startX = x;
    this.endX = endX;
    this.loadImage("../assets/platforms/moving-platform.png");
  }

  update() {
    this.x += this.speed * this.direction;
    if (this.x >= this.endX || this.x <= this.startX) {
      this.direction *= -1;
    }
  }
}

class Tree extends MoveableObject {
  width = 64;
  height = 128;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage("../assets/decorations/tree.png");
  }
}

class Bush extends MoveableObject {
  width = 48;
  height = 32;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage("../assets/decorations/bush.png");
  }
}

class Rock extends MoveableObject {
  width = 32;
  height = 32;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage("../assets/decorations/rock.png");
  }
}

class LevelManager {
  static createGroundTiles() {
    const tiles = [];
    for (let i = 0; i < 160; i++) {
      tiles.push(new GroundTile(i * 64, 550));
    }
    return tiles;
  }

  static createPlatformTiles() {
    return [
      new PlatformTile(400, 320),
      new PlatformTile(432, 320),
      new PlatformTile(464, 320),
      new PlatformTile(600, 380),
      new PlatformTile(632, 380),
      new PlatformTile(664, 380),
      new PlatformTile(696, 380),
    ];
  }

  static createDecorationTiles() {
    return [new DecorationTile(800, 450), new DecorationTile(832, 450)];
  }

  static createCoins() {
    return [
      new Coin(450, 280),
      new Coin(650, 340),
      new Coin(850, 410),
      new Coin(1200, 500),
      new Coin(1800, 450),
    ];
  }

  static createKeys() {
    return [new Key(1500, 400), new Key(2800, 350)];
  }

  static createHealthPotions() {
    return [new HealthPotion(1000, 500), new HealthPotion(2200, 450)];
  }

  static createChests() {
    return [new Chest(750, 500), new Chest(2500, 480)];
  }

  static createDoors() {
    return [new Door(3000, 456)];
  }

  static createLevers() {
    return [new Lever(1800, 500)];
  }

  static createSpikes() {
    return [new Spike(1400, 520), new Spike(1432, 520), new Spike(2000, 520)];
  }

  static createLava() {
    return [new Lava(1600, 520), new Lava(1664, 520)];
  }

  static createMovingPlatforms() {
    return [
      new MovingPlatform(900, 400, 1100),
      new MovingPlatform(2000, 350, 2300),
    ];
  }

  static createTrees() {
    return [new Tree(300, 424), new Tree(1200, 424), new Tree(2400, 424)];
  }

  static createBushes() {
    return [new Bush(200, 520), new Bush(500, 520), new Bush(1600, 520)];
  }

  static createRocks() {
    return [new Rock(350, 520), new Rock(1150, 520), new Rock(2350, 520)];
  }
}
