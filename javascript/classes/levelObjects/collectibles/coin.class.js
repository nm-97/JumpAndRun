class Coin extends MoveableObject {
  width = 24;
  height = 24;

  img_coin = [
    "../assets/coin/coin1_16x16-0.png",
    "../assets/coin/coin1_16x16-1.png",
    "../assets/coin/coin1_16x16-2.png",
    "../assets/coin/coin1_16x16-3.png",
    "../assets/coin/coin1_16x16-4.png",
    "../assets/coin/coin1_16x16-5.png",
    "../assets/coin/coin1_16x16-6.png",
    "../assets/coin/coin1_16x16-7.png",
    "../assets/coin/coin1_16x16-8.png",
    "../assets/coin/coin1_16x16-9.png",
    "../assets/coin/coin1_16x16-10.png",
    "../assets/coin/coin1_16x16-11.png",
    "../assets/coin/coin1_16x16-12.png",
    "../assets/coin/coin1_16x16-13.png",
    "../assets/coin/coin1_16x16-14.png",
  ];

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage("../assets/coin/coin1_16x16-0.png");
    this.loadImages(this.img_coin);

    Animation.animateCoin(this);
  }
}
