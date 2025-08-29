class lvl {
  currentLevel;
  ctx;

  constructor(ctx) {
    this.ctx = ctx;
    this.currentLevel = new levelOne();
  }

  // MAIN DRAW METHOD
  draw() {
    this.drawBackground();
    this.drawAllTiles();
    this.drawEnemies();
  }

  // BACKGROUND DRAWING
  drawBackground() {
    const backgrounds = this.currentLevel.getBackground();
    backgrounds.forEach((bg) => {
      this.drawObject(bg);
    });
  }

  // TILES DRAWING
  drawAllTiles() {
    const tiles = this.currentLevel.getAllTiles();
    tiles.forEach((tile) => {
      this.drawObject(tile);
    });
  }

  // ENEMIES DRAWING
  drawEnemies() {
    const enemies = this.currentLevel.getEnemies();
    enemies.forEach((enemy) => {
      this.drawObject(enemy);
    });
  }

  // UNIVERSAL OBJECT DRAWING
  drawObject(obj) {
    if (obj.otherDirection) {
      this.ctx.save();
      this.ctx.translate(obj.width, 0);
      this.ctx.scale(-1, 1);
      obj.x = obj.x * -1;
    }
    this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
    if (obj.otherDirection) {
      obj.x = obj.x * -1;
      this.ctx.restore();
    }
  }

  // DATA ACCESS METHODS
  getAllTiles() {
    return this.currentLevel.getAllTiles();
  }

  getBackground() {
    return this.currentLevel.getBackground();
  }

  getEnemies() {
    return this.currentLevel.getEnemies();
  }

  getEndboss() {
    return this.currentLevel.getEndboss();
  }
}
