class LevelManager {
  static createGroundTiles() {
    const tiles = [];
    for (let i = 0; i < 160; i++) {
      tiles.push(new GroundTile(i * 64, 550));
    }
    return tiles;
  }

  static createThreePlatformGroup(startX, startY, width = 32, height = 32) {
    const positions = [
      { x: startX, y: startY, width: width, height: height },
      { x: startX + 32, y: startY, width: width, height: height },
      { x: startX + 64, y: startY, width: width, height: height },
    ];
    return PlatformTile.platformGroup(
      PlatformTile.platformTemplate.createPlatformOfThree,
      positions
    );
  }

  static createPlatformSpike(startX, startY, width = 32, height = 32) {
    const positions = [{ x: startX, y: startY, width: width, height: height }];
    return PlatformTile.platformGroup(
      PlatformTile.platformTemplate.createPlatformSpike,
      positions
    );
  }

  static createFourPlatformGroup(startX, startY, width = 32, height = 32) {
    const positions = [
      { x: startX, y: startY, width: width, height: height },
      { x: startX + 32, y: startY, width: width, height: height },
      { x: startX + 64, y: startY, width: width, height: height },
      { x: startX + 96, y: startY, width: width, height: height },
    ];
    return PlatformTile.platformGroup(
      PlatformTile.platformTemplate.createPlatformOfFour,
      positions
    );
  }

  static createDecorationTile(x, y) {
    return new DecorationTile(x, y);
  }

  static createCoin(x, y) {
    return new Coin(x, y);
  }

  static createKey(x, y) {
    return new Key(x, y);
  }

  static createHealthPotion(x, y) {
    return new HealthPotion(x, y);
  }

  static createChest(x, y) {
    return new Chest(x, y);
  }

  static createDoor(x, y) {
    return new Door(x, y);
  }

  static createLever(x, y) {
    return new Lever(x, y);
  }

  static createSpike(x, y) {
    return new Spike(x, y);
  }

  static createLava(x, y) {
    return new Lava(x, y);
  }

  static createMovingPlatform(x, y, endX) {
    return new MovingPlatform(x, y, endX);
  }

  static createTree(x, y) {
    return new Tree(x, y);
  }

  static createBush(x, y) {
    return new Bush(x, y);
  }

  static createRock(x, y) {
    return new Rock(x, y);
  }
}
