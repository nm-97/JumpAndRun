class Tree extends MoveableObject {
  width = 64;
  height = 128;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage("../../../../assets/decorations/tree.png");
  }
}
