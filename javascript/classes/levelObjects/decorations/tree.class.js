class Tree extends MoveableObject {
  width = 64;
  height = 128;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    // Temporary placeholder - tree image doesn't exist yet
    this.loadImage(
      "../../../../assets/tileSets/oak_woods_v1.0/tileSet/oak_woods_tileset-11.png"
    );
  }
}
