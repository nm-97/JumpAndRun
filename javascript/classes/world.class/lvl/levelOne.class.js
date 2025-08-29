class levelOne {
  constructor() {
    this.background = BackgroundManager.createRepeatingBackground();
    this.groundTiles = LevelManager.createGroundTiles();
    this.platformTiles = LevelManager.createPlatformTiles();
    this.decorationTiles = LevelManager.createDecorationTiles();
    this.enemies = [new goblin()];
    this.endboss = new endboss();
  }

  getAllTiles() {
    return [
      ...this.groundTiles,
      ...this.platformTiles,
      ...this.decorationTiles,
    ];
  }

  getBackground() {
    return this.background;
  }

  getEnemies() {
    return this.enemies;
  }

  getEndboss() {
    return this.endboss;
  }
}
