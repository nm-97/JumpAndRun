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
