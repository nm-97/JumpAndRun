class lvl {
  ctx;
  canvas;

  groundTiles = this.createGroundTiles();

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  createGroundTiles() {
    const tiles = new Array(160);
    for (let i = 0; i < 160; i++) {
      tiles[i] = new GroundTile(i * 64, 550);
    }
    return tiles;
  }

  draw() {
    this.drawAllGroundTiles(this.groundTiles);
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
