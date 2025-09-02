class Coin extends MoveableObject {
  width = 24;
  height = 24;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    // Temporary placeholder - coin image doesn't exist yet
    this.loadImage(
      "../../../../assets/tileSets/oak_woods_v1.0/tileSet/oak_woods_tileset-19.png"
    );
  }
}
