class Tree extends MoveableObject {
  width = 64;
  height = 128;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage(
      "../../../../assets/tileSets/oak_woods_v1.0/tileSet/oak_woods_tileset-11.png"
    );
  }
}
