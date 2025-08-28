class goblin extends MoveableObject {
  y = 610 - this.height;

  constructor() {
    super();
    this.loadImage("../assets/enemy/enemyOne/Goblin2/idle/idle-0.png");
    this.x = 200 + Math.random() * 400;
  }
}
