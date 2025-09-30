// Ensure endboss is available
// If using ES modules:
// import endboss from '../../enemys.class/endboss.class.js';
// If using browser globals, ensure script is loaded before this file.
// For classic browser usage, reference via window.endboss if needed.

// For browser script order, just declare:
// Assumes endboss is globally available

class levelOne {
  getAllDecorations() {
    return this.decorationTiles;
  }
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
    this.fireblazers = this.createFireblazers();
    this.jumpers = this.createJumpers();
    this.enemies = this.createEnemies();
    this.endboss = new endboss();
  }

  createPlatformTiles() {
    return [
      ...LevelManager.createThreePlatformGroup(850, 430),
      ...LevelManager.createFourPlatformGroup(1050, 350),
      ...LevelManager.createThreePlatformGroup(850, 300),
      ...LevelManager.createThreePlatformGroup(650, 240),
      ...LevelManager.createThreePlatformGroup(1350, 430),
      ...LevelManager.createThreePlatformGroup(1700, 380),
      ...LevelManager.createFourPlatformGroup(2000, 320),
      ...LevelManager.createThreePlatformGroup(2300, 250),
      ...LevelManager.createThreePlatformGroup(2600, 400),
      ...LevelManager.createThreePlatformGroup(2900, 320),
    ];
  }

  createCoins() {
    return [
      LevelManager.createCoin(687, 210),
      LevelManager.createCoin(1100, 330),
      LevelManager.createCoin(1700, 360),
      LevelManager.createCoin(2300, 230),
      LevelManager.createCoin(2900, 300),
    ];
  }

  createEnemies() {
    return [
      LevelManager.createGoblin(700, 450),
      LevelManager.createDemon(1050, 270),
      LevelManager.createGoblin(1200, 550 - 160),
      LevelManager.createDemon(1600, 550 - 160),
      LevelManager.createGoblin(2000, 550 - 160),
    ];
  }

  createDecorationTiles() {
    return [
      // LevelManager.createDecorationTile(800, 450),
      // LevelManager.createDecorationTile(832, 450),
    ];
  }

  createHealthPotions() {
    return [
      LevelManager.createHealthPotion(1200, 500),
      LevelManager.createHealthPotion(2500, 450),
    ];
  }

  createMovingPlatforms() {
    return [
      LevelManager.createMovingPlatform(900, 400, 1100),
      LevelManager.createMovingPlatform(2000, 350, 2300),
    ];
  }

  createRocks() {
    return [
      LevelManager.createRock(350, 520),
      LevelManager.createRock(1150, 520),
      LevelManager.createRock(2350, 520),
    ];
  }

  createSpikes() {
    return [
      LevelManager.createSpike(900, 490),
      LevelManager.createSpike(1000, 490),
      LevelManager.createSpike(1096, 490),
      LevelManager.createSpike(1196, 490),
      LevelManager.createSpike(1296, 490),
      LevelManager.createSpike(1700, 550),
      LevelManager.createSpike(2000, 550),
      LevelManager.createSpike(2300, 550),
    ];
  }

  createFireblazers() {
    return [
      LevelManager.createFireblazer(2064, 510),
      LevelManager.createFireblazer(2100, 510),
      LevelManager.createFireblazer(2600, 520),
    ];
  }

  createJumpers() {
    return [
      LevelManager.createJumper(800, 502),
      LevelManager.createJumper(1800, 502),
      LevelManager.createJumper(2700, 502),
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
  getAllTiles() {
    return [
      ...this.groundTiles,
      ...this.platformTiles,
      ...this.decorationTiles,
    ];
  }

  getAllTraps() {
    return [...this.spikes, ...this.fireblazers, ...this.jumpers];
  }

  getAllCollectibles() {
    return [...this.coins, ...this.healthPotions];
  }

  getAllInteractables() {
    return [
      LevelManager.createGoblin(700, 450),
      LevelManager.createDemon(1050, 270),
      LevelManager.createGoblin(1200, 390),
      LevelManager.createDemon(1600, 390),
      LevelManager.createGoblin(2000, 390),
      LevelManager.createGoblin(2300, 230),
      LevelManager.createDemon(2600, 320),
      LevelManager.createGoblin(2900, 300),
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
