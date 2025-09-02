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
    } else if (this.energy === 0) {
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

  playAnimation(images) {
    let i = this.currentFrame % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentFrame++;
  }

  animate() {
    this.animationInterval = setInterval(() => {
      if (this.isDead) {
        this.playAnimation(this.img_death);
      } else if (this.isHurt) {
        this.playAnimation(this.img_hurt);
      } else if (this.isAttacking) {
        this.playAnimation(this.img_attack);
      } else if (this.isJumping) {
        this.playAnimation(this.img_jump);
      } else if (this.isMoving) {
        this.playAnimation(this.img_walk);
      } else {
        this.playAnimation(this.img_idle);
      }
    }, 150);
  }

  animateSpike() {
    console.log("animateSpike called, starting interval"); // Debug
    this.animationInterval = setInterval(() => {
      if (this.traps_spike) {
        this.playAnimation(this.traps_spike);
      }
    }, 800); // Viel langsamer - 800ms pro Frame für sichtbare Animation
  }

  animateSpeer() {
    this.animationInterval = setInterval(() => {
      if (this.traps_speer && this.isExtended) {
        this.playAnimation(this.traps_speer);
      }
    }, 180);
  }

  animateFireblazer() {
    this.animationInterval = setInterval(() => {
      if (this.traps_fire) {
        this.playAnimation(this.traps_fire);
      }
    }, 120);
  }

  animateJumper() {
    this.animationInterval = setInterval(() => {
      if (this.traps_jumper && this.isActivated) {
        this.playAnimation(this.traps_jumper);
      }
    }, 200);
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
