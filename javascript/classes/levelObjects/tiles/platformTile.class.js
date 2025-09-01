class PlatformTile extends drawableObject {
  width = 32;
  height = 32;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage();
  }

  static platformTemplate = {
    createPlatformOfThree: [
      "../assets/tileSets/oak_woods_v1.0/tileSet/oak_woods_tileset-2.png",
      "../assets/tileSets/oak_woods_v1.0/tileSet/oak_woods_tileset-2.png",
      "../assets/tileSets/oak_woods_v1.0/tileSet/oak_woods_tileset-2.png",
    ],
    createPlatformOfFour: [
      "../assets/tileSets/oak_woods_v1.0/tileSet/oak_woods_tileset-2.png",
      "../assets/tileSets/oak_woods_v1.0/tileSet/oak_woods_tileset-2.png",
      "../assets/tileSets/oak_woods_v1.0/tileSet/oak_woods_tileset-2.png",
      "../assets/tileSets/oak_woods_v1.0/tileSet/oak_woods_tileset-2.png",
    ],
    createPlatformSpike: [
      "../assets/tileSets/oak_woods_v1.0/tileSet/oak_woods_tileset-12.png",
    ],
  };

  static platformGroup(templateArray, positions) {
    const platforms = [];
    positions.forEach((pos, index) => {
      const platform = new PlatformTile(pos.x, pos.y);
      if (pos.width) platform.width = pos.width;
      if (pos.height) platform.height = pos.height;
      if (templateArray[index]) {
        platform.loadImage(templateArray[index]);
      }
      platforms.push(platform);
    });
    return platforms;
  }
}
