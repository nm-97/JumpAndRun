class HealthPotion extends MoveableObject {
  width = 24;
  height = 32;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage("../../../../assets/items/health-potion.png");
  }
}
