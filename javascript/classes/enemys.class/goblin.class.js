class goblin extends MoveableObject {
  y = 610 - this.height;
  img_idle = [
    "../assets/enemy/enemyOne/Goblin2/idle/idle-1.png",
    "../assets/enemy/enemyOne/Goblin2/idle/idle-2.png",
    "../assets/enemy/enemyOne/Goblin2/idle/idle-3.png",
  ];
  currentFrame = 0;

  constructor() {
    super();
    this.loadImage("../assets/enemy/enemyOne/Goblin2/idle/idle-0.png");
    this.loadImages(this.img_idle);
    this.animate();
    this.speed = 1 + Math.random() * 3;
    this.x = 200 + Math.random() * 400;
  }

  animate() {
    this.moveLeft();

    setInterval(() => {
      let i = this.currentFrame % this.img_idle.length;
      let path = this.img_idle[i];
      this.img = this.charImageCache[path];
      this.currentFrame++;
    }, 9000 / 60);
  }
}
