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
    this.startProjectileMovement();
  }

  startProjectileMovement() {
    // Nutze die zentrale startMovement Methode, aber mit eigener Logik
    this.stopMovement();
    this.movementInterval = setInterval(() => {
      if (!this.canMove()) return;
      this.x += this.speedX;
    }, 1000 / 60);
  }

  isOffScreen() {
    return this.x < -this.width - 200;
  }

  destroy() {
    super.destroy(); // zentrale Stopplogik
  }
}
