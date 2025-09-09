class LevelManager {
  static createPositionArray(groupCount, startX, startY, width, height) {
    const positions = [];
    for (let i = 0; i < groupCount; i++) {
      positions.push({
        x: startX + i * width,
        y: startY,
        width: width,
        height: height,
      });
    }
    return positions;
  }

  static getTemplate(groupClass, templateKey) {
    const templateName = Object.keys(groupClass).find((key) =>
      key.includes("Template")
    );
    return groupClass[templateName][templateKey];
  }

  static getGroupMethod(groupClass) {
    const methodName = Object.getOwnPropertyNames(groupClass).find((key) =>
      key.includes("Group")
    );
    return groupClass[methodName];
  }

  static createObjectGroup(
    groupClass,
    templateKey,
    groupCount,
    startX,
    startY,
    width,
    height
  ) {
    const positions = this.createPositionArray(
      groupCount,
      startX,
      startY,
      width,
      height
    );
    const template = this.getTemplate(groupClass, templateKey);
    const groupMethod = this.getGroupMethod(groupClass);

    return groupMethod(template, positions);
  }

  static createSingleObject(objectClass, x, y, ...additionalParams) {
    return new objectClass(x, y, ...additionalParams);
  }

  static createFourGroundTileGroup(startX, startY, width = 64, height = 64) {
    const tiles = [];
    for (let i = 0; i < 4; i++) {
      const tile = new GroundTile(startX + i * width, startY, width, height);
      tiles.push(tile);
    }
    return tiles;
  }

  static createThreePlatformGroup(startX, startY, width = 32, height = 32) {
    return this.createObjectGroup(
      PlatformTile,
      "createPlatformOfThree",
      3,
      startX,
      startY,
      width,
      height
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
    return this.createObjectGroup(
      PlatformTile,
      "createPlatformOfFour",
      4,
      startX,
      startY,
      width,
      height
    );
  }

  static createGoblin(x, y) {
    let goblinEnemy = new goblin();
    goblinEnemy.x = x;
    goblinEnemy.y = y;
    goblinEnemy.startAI();
    return goblinEnemy;
  }

  static createDemon(x, y) {
    let demonEnemy = new demon();
    demonEnemy.x = x;
    demonEnemy.y = y;
    demonEnemy.startAI();
    return demonEnemy;
  }

  static createDecorationTile(x, y) {
    return this.createSingleObject(DecorationTile, x, y);
  }

  static createCoin(x, y) {
    return this.createSingleObject(Coin, x, y);
  }

  static createSpike(x, y) {
    return this.createSingleObject(Spike, x, y);
  }

  static createFireblazer(x, y) {
    return this.createSingleObject(Fireblazer, x, y);
  }

  static createJumper(x, y) {
    return this.createSingleObject(Jumper, x, y);
  }

  static createHealthPotion(x, y) {
    return this.createSingleObject(HealthPotion, x, y);
  }

  static createMovingPlatform(x, y, endX) {
    return this.createSingleObject(MovingPlatform, x, y, endX);
  }

  static createTree(x, y) {
    return this.createSingleObject(Tree, x, y);
  }

  static createBush(x, y) {
    return this.createSingleObject(Bush, x, y);
  }

  static createRock(x, y) {
    return this.createSingleObject(Rock, x, y);
  }
}
