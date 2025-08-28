class backgroundLayerOne extends MoveableObject {
  constructor() {
    super();
    this.loadImage("../assets/tileSets/oak_woods_v1.0/background/layerOne.png");
    this.x = 200 + Math.random() * 400;
  }
}
