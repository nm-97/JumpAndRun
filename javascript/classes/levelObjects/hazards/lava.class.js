class Lava extends MoveableObject {
  width = 64;
  height = 32;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage("../../../../assets/hazards/lava.png");
  }
}
