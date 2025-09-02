class Key extends MoveableObject {
  width = 32;
  height = 32;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    // Temporary placeholder - key image doesn't exist yet
    this.loadImage(
      "../../../../assets/tileSets/oak_woods_v1.0/tileSet/oak_woods_tileset-18.png"
    );
  }
}
