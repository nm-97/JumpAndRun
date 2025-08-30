class MoveableObject {
  x = 120;
  y = 390;
  img;
  height = 160;
  width = 160;
  imageCache = {};
  currentFrame = 0;
  speed = 2;
  energy = 1;
  deathAnimationComplete = false;

  isMoving = false;
  isAttacking = false;
  isDead = false;
  isHurt = false;

  img_idle = [];
  img_walk = [];
  img_attack = [];
  img_death = [];
  img_hurt = [];
  img_jump = [];
  otherDirection = false;

  takeDamage(amount) {
    this.energy -= amount;
    if (this.energy <= 0) {
      this.energy = 0;
      this.isDead = true;
    }
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this instanceof char ||
      this instanceof goblin ||
      this instanceof endboss ||
      this instanceof PlatformTile
    ) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  isColliding(MoveableObject) {
    return (
      this.x < MoveableObject.x + MoveableObject.width &&
      this.x + this.width > MoveableObject.x &&
      this.y < MoveableObject.y + MoveableObject.height &&
      this.y + this.height > MoveableObject.y
    );
  }

  playAnimation(imageArray, speed = 150) {
    if (imageArray && imageArray.length > 0) {
      let i = this.currentFrame % imageArray.length;
      let path = imageArray[i];
      if (this.imageCache[path]) {
        this.img = this.imageCache[path];
        this.currentFrame++;
      }
    }
  }

  animate() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
    this.animationInterval = setInterval(() => {
      if (this.isDead) {
        if (this.deathAnimationComplete) {
          return;
        }
        this.playAnimation(this.img_death);
        if (this.currentFrame >= this.img_death.length) {
          this.deathAnimationComplete = true;
        }
      } else if (this.isHurt) {
        this.playAnimation(this.img_hurt);
      } else if (this.isAttacking) {
        this.playAnimation(this.img_attack, 120);
      } else if (this.isJumping) {
        this.playAnimation(this.img_jump, 100);
      } else if (this.isMoving) {
        this.playAnimation(this.img_walk, 100);
      } else {
        this.playAnimation(this.img_idle);
      }
    }, 8000 / 60);
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
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
