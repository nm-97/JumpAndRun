class DemonProjectile extends MoveableObject {
  width = 32;
  height = 32;
  speed = 5;

  img_projectile = [
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/projektile/Fire_loop-1-0.png",
  ];

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage(this.img_projectile[0]);
    this.loadImages(this.img_projectile);

    Animation.animateProjectile(this);
    this.setCustomHitbox(20, 20, 6, 6);

    this.speedX = -this.speed;

    this.startMovement();
  }

  startMovement() {
    this.movementInterval = setInterval(() => {
      this.x += this.speedX;
    }, 1000 / 60);
  }

  isOffScreen() {
    return this.x < -this.width - 200;
  }

  destroy() {
    if (this.movementInterval) {
      clearInterval(this.movementInterval);
    }
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }
}
