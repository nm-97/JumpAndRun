class Lever extends MoveableObject {
  width = 32;
  height = 48;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage("../../../../assets/items/lever-off.png");
  }
}
