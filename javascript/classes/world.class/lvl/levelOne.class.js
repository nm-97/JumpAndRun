class levelOne {
  constructor() {
    this.background = BackgroundManager.createRepeatingBackground();
    this.groundTiles = this.createGroundTiles();
    this.platformTiles = this.createPlatformTiles();
    this.decorationTiles = this.createDecorationTiles();
    this.coins = this.createCoins();
    this.healthPotions = this.createHealthPotions();
    this.movingPlatforms = this.createMovingPlatforms();
    this.rocks = this.createRocks();
    this.spikes = this.createSpikes();
    this.speers = this.createSpeers();
    this.fireblazers = this.createFireblazers();
    this.jumpers = this.createJumpers();
    this.enemies = [new goblin()];
    this.endboss = new endboss();
  }

  createPlatformTiles() {
    return [
      ...LevelManager.createThreePlatformGroup(850, 430),
      ...LevelManager.createFourPlatformGroup(1050, 350),
      ...LevelManager.createThreePlatformGroup(850, 300),
      ...LevelManager.createThreePlatformGroup(650, 240),
      ...LevelManager.createThreePlatformGroup(1350, 430),
    ];
  }

  createGroundTiles() {
    return [
      ...LevelManager.createFourGroundTileGroup(0, 550, 64, 64),
      ...LevelManager.createFourGroundTileGroup(250, 550, 64, 64),
      ...LevelManager.createFourGroundTileGroup(500, 550, 64, 64),
      ...LevelManager.createFourGroundTileGroup(750, 550, 64, 64),
      ...LevelManager.createFourGroundTileGroup(1000, 550, 64, 64),
      ...LevelManager.createFourGroundTileGroup(1250, 550, 64, 64),
      ...LevelManager.createFourGroundTileGroup(1500, 550, 64, 64),
      ...LevelManager.createFourGroundTileGroup(1750, 550, 64, 64),
      ...LevelManager.createFourGroundTileGroup(2000, 550, 64, 64),
      ...LevelManager.createFourGroundTileGroup(2250, 550, 64, 64),
      ...LevelManager.createFourGroundTileGroup(2500, 550, 64, 64),
      ...LevelManager.createFourGroundTileGroup(2750, 550, 64, 64),
      ...LevelManager.createFourGroundTileGroup(3000, 550, 64, 64),
      ...LevelManager.createFourGroundTileGroup(3250, 550, 64, 64),
      ...LevelManager.createFourGroundTileGroup(3500, 550, 64, 64),
      ...LevelManager.createFourGroundTileGroup(3750, 550, 64, 64),
      ...LevelManager.createFourGroundTileGroup(4000, 550, 64, 64),
    ];
  }

  createDecorationTiles() {
    return [
      // LevelManager.createDecorationTile(800, 450),
      // LevelManager.createDecorationTile(832, 450),
    ];
  }

  createCoins() {
    return [
      // LevelManager.createCoin(450, 280),
      // LevelManager.createCoin(650, 340),
      // LevelManager.createCoin(850, 410),
      // LevelManager.createCoin(1200, 500),
      // LevelManager.createCoin(1800, 450),
    ];
  }

  createHealthPotions() {
    return [
      // LevelManager.createHealthPotion(1000, 500),
      // LevelManager.createHealthPotion(2200, 450),
    ];
  }

  createMovingPlatforms() {
    return [
      // LevelManager.createMovingPlatform(900, 400, 1100),
      // LevelManager.createMovingPlatform(2000, 350, 2300),
    ];
  }

  createRocks() {
    return [
      // LevelManager.createRock(350, 520),
      // LevelManager.createRock(1150, 520),
      // LevelManager.createRock(2350, 520),
    ];
  }

  createSpikes() {
    return [
      LevelManager.createSpike(900, 490),
      LevelManager.createSpike(1000, 490),
      LevelManager.createSpike(1096, 490),
      LevelManager.createSpike(1196, 490),
      LevelManager.createSpike(1296, 490),
    ];
  }

  createSpeers() {
    return [
      LevelManager.createSpeer(700, 470),
      LevelManager.createSpeer(1600, 470),
    ];
  }

  createFireblazers() {
    return [
      LevelManager.createFireblazer(2064, 510),
      LevelManager.createFireblazer(2100, 510),
    ];
  }

  createJumpers() {
    return [
      // LevelManager.createJumper(800, 502),
      // LevelManager.createJumper(1800, 502),
    ];
  }

  getAllTiles() {
    return [
      ...this.groundTiles,
      ...this.platformTiles,
      ...this.decorationTiles,
      // ...this.movingPlatforms,
    ];
  }

  getAllTraps() {
    return [
      ...this.spikes,
      ...this.speers,
      ...this.fireblazers,
      ...this.jumpers,
    ];
  }

  getAllCollectibles() {
    return [...this.coins, ...this.healthPotions];
  }

  getAllInteractables() {
    return [];
  }

  getAllDecorations() {
    return [...this.rocks];
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
