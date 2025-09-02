class Chest extends MoveableObject {
  width = 48;
  height = 32;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    // Temporary placeholder - chest image doesn't exist yet
    this.loadImage(
      "../../../../assets/tileSets/oak_woods_v1.0/tileSet/oak_woods_tileset-16.png"
    );
  }
}
