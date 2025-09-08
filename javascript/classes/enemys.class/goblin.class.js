class goblin extends MoveableObject {
  y = 610 - this.height;
  speed = 1;

  img_idle = [
    "../assets/enemy/enemyOne/Goblin2/idle/Idle-0.png",
    "../assets/enemy/enemyOne/Goblin2/idle/Idle-1.png",
    "../assets/enemy/enemyOne/Goblin2/idle/Idle-2.png",
    "../assets/enemy/enemyOne/Goblin2/idle/Idle-3.png",
  ];

  img_attack = [
    "../assets/enemy/enemyOne/Goblin2/attack/walkLeftAttack-0.png",
    "../assets/enemy/enemyOne/Goblin2/attack/walkLeftAttack-1.png",
    "../assets/enemy/enemyOne/Goblin2/attack/walkLeftAttack-2.png",
    "../assets/enemy/enemyOne/Goblin2/attack/walkLeftAttack-3.png",
    "../assets/enemy/enemyOne/Goblin2/attack/walkLeftAttack-4.png",
  ];

  img_death = [
    "../assets/enemy/enemyOne/Goblin2/death/deathLeft-0.png",
    "../assets/enemy/enemyOne/Goblin2/death/deathLeft-1.png",
    "../assets/enemy/enemyOne/Goblin2/death/deathLeft-2.png",
    "../assets/enemy/enemyOne/Goblin2/death/deathLeft-3.png",
    "../assets/enemy/enemyOne/Goblin2/death/deathLeft-4.png",
    "../assets/enemy/enemyOne/Goblin2/death/deathLeft-5.png",
  ];

  img_hurt = [
    "../assets/enemy/enemyOne/Goblin2/hurt/hurtLeft-0.png",
    "../assets/enemy/enemyOne/Goblin2/hurt/hurtLeft-1.png",
    "../assets/enemy/enemyOne/Goblin2/hurt/hurtLeft-2.png",
    "../assets/enemy/enemyOne/Goblin2/hurt/hurtLeft-3.png",
  ];

  img_walk = [
    "../assets/enemy/enemyOne/Goblin2/walk/walkLeft-0.png",
    "../assets/enemy/enemyOne/Goblin2/walk/walkLeft-1.png",
    "../assets/enemy/enemyOne/Goblin2/walk/walkLeft-2.png",
    "../assets/enemy/enemyOne/Goblin2/walk/walkLeft-3.png",
    "../assets/enemy/enemyOne/Goblin2/walk/walkLeft-4.png",
    "../assets/enemy/enemyOne/Goblin2/walk/walkLeft-5.png",
  ];

  constructor() {
    super();
    this.loadImage("../assets/enemy/enemyOne/Goblin2/idle/Idle-0.png");
    this.loadImages(this.img_idle);
    this.loadImages(this.img_walk);
    this.loadImages(this.img_attack);
    this.loadImages(this.img_death);
    this.loadImages(this.img_hurt);

    this.speed = 1 + Math.random() * 3;
    this.x = 200 + Math.random() * 400;

    this.setCustomHitbox(80, 120, 40, 20);

    this.animate();
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
