class Bush extends MoveableObject {
  width = 48;
  height = 32;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage(
      "../../../../assets/tileSets/oak_woods_v1.0/tileSet/oak_woods_tileset-10.png"
    );
  }
}
