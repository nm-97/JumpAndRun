class Spike extends MoveableObject {
  width = 32;
  height = 32;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage("../../../../assets/hazards/spike.png");
  }
}
