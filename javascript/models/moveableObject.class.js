class MoveableObject {
  x = 120;
  y = 390;
  img;
  height = 160;
  width = 160;
  imageCache = [];
  currentFrame = 0;
  speed = 2;

  isMoving = false;
  isAttacking = false;
  isDead = false;
  isHurt = false;

  img_idle = [];
  img_walk = [];
  img_attack = [];
  img_death = [];
  img_hurt = [];

  animate() {
    this.idle();
    this.hurt();
    this.death();
    this.attack();
  }

  idle() {
    setInterval(() => {
      if (this.img_idle.length > 0) {
        let i = this.currentFrame % this.img_idle.length;
        let path = this.img_idle[i];
        if (this.imageCache[path]) {
          this.img = this.imageCache[path];
          this.currentFrame++;
        }
      }
    }, 150);
  }

  walk() {
    setInterval(() => {
      if (this.isMoving && this.img_walk.length > 0) {
        let i = this.currentFrame % this.img_walk.length;
        let path = this.img_walk[i];
        if (this.imageCache[path]) {
          this.img = this.imageCache[path];
          this.currentFrame++;
        }
      }
    }, 100);
  }

  attack() {
    setInterval(() => {
      if (this.isAttacking && this.img_attack.length > 0) {
        let i = this.currentFrame % this.img_attack.length;
        let path = this.img_attack[i];
        if (this.imageCache[path]) {
          this.img = this.imageCache[path];
          this.currentFrame++;
        }
      }
    }, 120);
  }

  death() {
    setInterval(() => {
      if (this.isDead && this.img_death.length > 0) {
        let i = this.currentFrame % this.img_death.length;
        let path = this.img_death[i];
        if (this.imageCache[path]) {
          this.img = this.imageCache[path];
          this.currentFrame++;
        }
      }
    }, 150);
  }

  hurt() {
    setInterval(() => {
      if (this.isHurt && this.img_hurt.length > 0) {
        let i = this.currentFrame % this.img_hurt.length;
        let path = this.img_hurt[i];
        if (this.imageCache[path]) {
          this.img = this.imageCache[path];
          this.currentFrame++;
        }
      }
    }, 100);
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
