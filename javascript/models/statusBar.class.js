class statusBar extends drawableObject {
  img_health = [
    "../assets/GUI/Pixel Game UI/Assets/Heart_3.png",
    "../assets/GUI/Pixel Game UI/Assets/Heart_2.png",
    "../assets/GUI/Pixel Game UI/Assets/Heart.png",
  ];

  constructor() {
    super();
    this.loadImages(this.img_health);
    this.hearts = 6;
    this.y = 20;
    this.x = 20;
    this.height = 40;
    this.width = 40;
    this.heartSpacing = 50;
  }

  setHearts(hearts) {
    this.hearts = hearts;
  }

  draw(ctx) {
    for (let i = 0; i < 3; i++) {
      let heartState = this.getHeartState(i);
      let heartImg = this.imageCache[this.img_health[heartState]];

      if (heartImg) {
        ctx.drawImage(
          heartImg,
          this.x + i * this.heartSpacing,
          this.y,
          this.width,
          this.height
        );
      }
    }
  }

  getHeartState(heartIndex) {
    let heartsLeft = this.hearts - heartIndex * 2;

    if (heartsLeft >= 2) {
      return 2;
    } else if (heartsLeft == 1) {
      return 1;
    } else {
      return 0;
    }
  }
}
