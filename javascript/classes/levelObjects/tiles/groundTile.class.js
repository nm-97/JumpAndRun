class GroundTile extends drawableObject {
  width = 64;
  height = 64;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage(
      "../../../../assets/tileSets/oak_woods_v1.0/tileSet/oak_woods_tileset-17.png"
    );
  }

  static createGroundTiles() {
    const tiles = [];
    for (let i = 0; i < 160; i++) {
      tiles.push(new GroundTile(i * 64, 550));
    }
    return tiles;
  }
}
