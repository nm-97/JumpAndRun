class goblin extends MoveableObject {
  y = 610 - this.height;
  speed = 1;

  img_idle = [
    "../assets/enemy/enemyOne/Goblin2/idle/idle-0.png",
    "../assets/enemy/enemyOne/Goblin2/idle/idle-1.png",
    "../assets/enemy/enemyOne/Goblin2/idle/idle-2.png",
    "../assets/enemy/enemyOne/Goblin2/idle/idle-3.png",
  ];

  constructor() {
    super();
    this.loadImage("../assets/enemy/enemyOne/Goblin2/idle/idle-0.png");
    this.loadImages(this.img_idle);
    this.animate();
    this.speed = 1 + Math.random() * 3;
    this.x = 200 + Math.random() * 400;
    this.startAI();
  }

  startAI() {
    setInterval(() => {
      this.aiLogic();
    }, 100);
  }

  aiLogic() {
    this.isMoving = true;
    this.moveLeft();
  }
}
