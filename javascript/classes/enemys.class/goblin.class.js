class goblin extends MoveableObject {
  constructor() {
    super();
    this.loadImage(
      "../assets/enemy/enemyOne/Goblin1/With_shadow/idle/idle-0.png"
    );
    this.x = 200 + Math.random() * 400;
  }
}
