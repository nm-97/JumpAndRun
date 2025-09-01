class Coin extends MoveableObject {
  width = 24;
  height = 24;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage("../../../../assets/coins/coin-gold.png");
  }
}
