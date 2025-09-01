class Chest extends MoveableObject {
  width = 48;
  height = 32;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage("../../../../assets/items/chest-closed.png");
  }
}
