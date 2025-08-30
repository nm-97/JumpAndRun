class demon extends MoveableObject {
  y = 610 - this.height;
  speed = 1;

  img_idle = [
    "../assets/enemy/enemyTwo/Imp1/With_shadow/idle/idle-0.png",
    "../assets/enemy/enemyTwo/Imp1/With_shadow/idle/idle-1.png",
    "../assets/enemy/enemyTwo/Imp1/With_shadow/idle/idle-2.png",
    "../assets/enemy/enemyTwo/Imp1/With_shadow/idle/idle-3.png",
  ];

  constructor() {
    super();
    this.loadImage("../assets/enemy/enemyTwo/Imp1/With_shadow/idle/idle-0.png");
    this.loadImages(this.img_idle);
    this.animate();
    this.speed = 1 + Math.random() * 2;
    this.x = 500 + Math.random() * 300;
  }
}
