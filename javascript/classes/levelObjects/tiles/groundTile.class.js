class GroundTile extends drawableObject {
  constructor(x, y, width = 64, height = 64) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.loadImage(
      "../../../../assets/tileSets/oak_woods_v1.0/tileSet/oak_woods_tileset-17.png"
    );
  }
}
