class CoinCounter extends drawableObject {
  width = 32;
  height = 32;
  coinCount = 0;

  constructor() {
    super();
    this.x = 950;
    this.y = 20;
    this.loadImage("../assets/coin/coin1_16x16-0.png");
  }

  draw(ctx) {
    super.draw(ctx);

    ctx.fillStyle = "#FFD700";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.font = "bold 24px Arial";

    const text = `x ${this.coinCount}`;

    ctx.strokeText(text, this.x + 40, this.y + 25);
    ctx.fillText(text, this.x + 40, this.y + 25);
  }

  incrementCoin() {
    this.coinCount++;
  }

  setCoinCount(count) {
    this.coinCount = count;
  }

  getCoinCount() {
    return this.coinCount;
  }
}
