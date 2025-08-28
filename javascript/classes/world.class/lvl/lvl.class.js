class lvl {
  ctx;
  canvas;

  groundTiles = this.createGroundTiles();

  // platformTiles = [
  //   new PlatformTile(400, 320),
  //   new PlatformTile(432, 320),
  //   new PlatformTile(464, 320),
  //   new PlatformTile(600, 380),
  //   new PlatformTile(632, 380),
  //   new PlatformTile(664, 380),
  //   new PlatformTile(696, 380),
  // ];

  // decorationTiles = [
  //   new DecorationTile(800, 450),
  //   new DecorationTile(832, 450),
  // ];

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  createGroundTiles() {
    const tiles = new Array(16);
    for (let i = 0; i < 16; i++) {
      tiles[i] = new GroundTile(i * 64, 550);
    }
    return tiles;
  }

  draw() {
    this.drawAllGroundTiles(this.groundTiles);
    // this.drawAllPlatformTiles(this.platformTiles);
    // this.drawAllDecorationTiles(this.decorationTiles);
  }

  drawAllGroundTiles(tiles) {
    tiles.forEach((tile) => {
      this.drawSingleTile(tile);
    });
  }

  drawSingleTile(tile) {
    this.ctx.drawImage(tile.img, tile.x, tile.y, tile.width, tile.height);
  }
}
