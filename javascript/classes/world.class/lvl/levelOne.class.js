class levelOne {
  constructor() {
    this.background = BackgroundManager.createRepeatingBackground();
    this.groundTiles = LevelManager.createGroundTiles();
    this.platformTiles = this.createPlatformTiles();
    this.decorationTiles = this.createDecorationTiles();
    this.coins = this.createCoins();
    this.keys = this.createKeys();
    this.healthPotions = this.createHealthPotions();
    this.chests = this.createChests();
    this.doors = this.createDoors();
    this.levers = this.createLevers();
    this.spikes = this.createSpikes();
    this.lava = this.createLava();
    this.movingPlatforms = this.createMovingPlatforms();
    this.trees = this.createTrees();
    this.bushes = this.createBushes();
    this.rocks = this.createRocks();
    this.enemies = [new goblin()];
    this.endboss = new endboss();
  }

  createPlatformTiles() {
    return [
      ...LevelManager.createThreePlatformGroup(400, 400),
      ...LevelManager.createFourPlatformGroup(600, 350),
      ...LevelManager.createThreePlatformGroup(800, 300),
    ];
  }

  createDecorationTiles() {
    return [
      LevelManager.createDecorationTile(800, 450),
      LevelManager.createDecorationTile(832, 450),
    ];
  }

  createCoins() {
    return [
      LevelManager.createCoin(450, 280),
      LevelManager.createCoin(650, 340),
      LevelManager.createCoin(850, 410),
      LevelManager.createCoin(1200, 500),
      LevelManager.createCoin(1800, 450),
    ];
  }

  createKeys() {
    return [
      LevelManager.createKey(1500, 400),
      LevelManager.createKey(2800, 350),
    ];
  }

  createHealthPotions() {
    return [
      LevelManager.createHealthPotion(1000, 500),
      LevelManager.createHealthPotion(2200, 450),
    ];
  }

  createChests() {
    return [
      LevelManager.createChest(750, 500),
      LevelManager.createChest(2500, 480),
    ];
  }

  createDoors() {
    return [LevelManager.createDoor(3000, 456)];
  }

  createLevers() {
    return [LevelManager.createLever(1800, 500)];
  }

  createSpikes() {
    return [
      LevelManager.createSpike(1400, 520),
      LevelManager.createSpike(1432, 520),
      LevelManager.createSpike(2000, 520),
    ];
  }

  createLava() {
    return [
      LevelManager.createLava(1600, 520),
      LevelManager.createLava(1664, 520),
    ];
  }

  createMovingPlatforms() {
    return [
      LevelManager.createMovingPlatform(900, 400, 1100),
      LevelManager.createMovingPlatform(2000, 350, 2300),
    ];
  }

  createTrees() {
    return [
      LevelManager.createTree(300, 424),
      LevelManager.createTree(1200, 424),
      LevelManager.createTree(2400, 424),
    ];
  }

  createBushes() {
    return [
      LevelManager.createBush(200, 520),
      LevelManager.createBush(500, 520),
      LevelManager.createBush(1600, 520),
    ];
  }

  createRocks() {
    return [
      LevelManager.createRock(350, 520),
      LevelManager.createRock(1150, 520),
      LevelManager.createRock(2350, 520),
    ];
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
