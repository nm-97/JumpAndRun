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

  canMove() {
    return !(this.world && this.world.isPaused);
  }

  startMovement(direction = "left") {
    this.stopMovement();
    this.movementInterval = setInterval(() => {
      if (!this.canMove()) return;
      if (direction === "left") {
        this.x -= this.speed;
      } else if (direction === "right") {
        this.x += this.speed;
      }
    }, 8000 / 60);
  }

  stopMovement() {
    if (this.movementInterval) {
      clearInterval(this.movementInterval);
      this.movementInterval = null;
    }
  }

  moveRight() {
    this.startMovement("right");
  }

  moveLeft() {
    this.startMovement("left");
  }

  destroy() {
    this.stopMovement();
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }

  /**
   * Setzt die Hitbox für das Objekt zentral
   * @param {number} width
   * @param {number} height
   * @param {number} offsetX
   * @param {number} offsetY
   */
  setCustomHitbox(width, height, offsetX, offsetY) {
    this.hitbox = {
      width,
      height,
      offsetX,
      offsetY,
    };
  }
  /**
   * Pausiert alle relevanten Intervals (Bewegung, Animation, Attacke, Hurt, etc.)
   */
  pauseAllIntervals() {
    if (this.movementInterval) {
      clearInterval(this.movementInterval);
      this.movementInterval = null;
    }
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
    if (this.attackAnimationInterval) {
      clearInterval(this.attackAnimationInterval);
      this.attackAnimationInterval = null;
    }
    if (this.hurtAnimationInterval) {
      clearInterval(this.hurtAnimationInterval);
      this.hurtAnimationInterval = null;
    }
  }

  /**
   * Setzt alle pausierten Intervals wieder fort (sofern Logik vorhanden)
   * Diese Methode muss ggf. in Kindklassen überschrieben werden, um Animationen neu zu starten.
   */
  resumeAllIntervals() {
    if (typeof this.startMovement === "function") {
      this.startMovement();
    }
    if (
      typeof Animation !== "undefined" &&
      typeof Animation.animate === "function"
    ) {
      Animation.animate(this);
    }
    // Attacke/Hurt ggf. in Kindklassen
  }
}
