class backgroundLayer extends MoveableObject {
  width = 1024;
  height = 600;
  y = 0;

  constructor(imagePath, x = 0) {
    super();
    this.loadImage(imagePath);
    this.x = x;
  }
}

class BackgroundManager {
  static createRepeatingBackground() {
    const backgrounds = [];
    const layers = [
      "../assets/tileSets/oak_woods_v1.0/background/layerOne.png",
      "../assets/tileSets/oak_woods_v1.0/background/layerTwo.png",
      "../assets/tileSets/oak_woods_v1.0/background/layerThree.png",
    ];
    for (let i = 0; i < 10; i++) {
      const x = i * 1024;
      layers.forEach((layerPath) => {
        backgrounds.push(new backgroundLayer(layerPath, x));
      });
    }

    return backgrounds;
  }
}
