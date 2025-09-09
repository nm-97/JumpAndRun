class MoveableObject extends drawableObject {
  speed = 2;
  energy = 8;
  deathAnimationComplete = false;
  lastHurtTime = 1;

  isMoving = false;
  isAttacking = false;
  isDead = false;
  isHurt = false;
  otherDirection = false;

  updateCamera() {
    if (this.world) {
      this.world.camera_x = -this.x + 100;
    }
  }

  takeDamage() {
    this.energy -= 1;
    if (this.energy <= 0) {
      this.energy = 0;
      this.isDead = true;
    } else {
      this.lastHurtTime = new Date().getTime();
    }
  }

  /**
   * Updates physics for this object using the Physics class
   */
  handlePhysics() {
    Physics.handlePhysics(this);
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHurtTime;
    timePassed = timePassed / 1000;
    return timePassed < 1.75;
  }

  moveRight() {
    setInterval(() => {
      this.x += this.speed;
    }, 8000 / 60);
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 8000 / 60);
  }
}
