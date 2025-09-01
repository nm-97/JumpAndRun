class Door extends MoveableObject {
  width = 64;
  height = 96;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage("../../../../assets/items/door.png");
  }
}
