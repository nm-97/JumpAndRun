class char extends MoveableObject {
  y = 550 - this.height;
  speed = 15;
  jumpSpeed = 3;
  isJumping = false;
  acceleration = 1;
  speedY = 0;
  otherDirection = false;
  animationSpeed = 4;

  img_idle = [
    "../assets/char/idle/idle-1.png",
    "../assets/char/idle/idle-2.png",
    "../assets/char/idle/idle-3.png",
    "../assets/char/idle/idle-4.png",
  ];

  img_walk = [
    "../assets/char/run/run-1.png",
    "../assets/char/run/run-2.png",
    "../assets/char/run/run-3.png",
    "../assets/char/run/run-4.png",
    "../assets/char/run/run-5.png",
    "../assets/char/run/run-6.png",
    "../assets/char/run/run-7.png",
  ];

  img_jump = [
    "../assets/char/jump/jump-1.png",
    "../assets/char/jump/jump-2.png",
    "../assets/char/jump/jump-3.png",
    "../assets/char/jump/jump-4.png",
    "../assets/char/jump/jump-5.png",
    "../assets/char/jump/jump-6.png",
    "../assets/char/jump/jump-7.png",
    "../assets/char/jump/jump-8.png",
    "../assets/char/jump/jump-9.png",
    "../assets/char/jump/jump-10.png",
    "../assets/char/jump/jump-11.png",
    "../assets/char/jump/jump-12.png",
    "../assets/char/jump/jump-13.png",
    "../assets/char/jump/jump-14.png",
    "../assets/char/jump/jump-15.png",
  ];

  img_attack = [
    "../assets/char/attack/attackl-1.png",
    "../assets/char/attack/attackl-2.png",
    "../assets/char/attack/attackl-3.png",
    "../assets/char/attack/attackl-4.png",
    "../assets/char/attack/attackl-5.png",
  ];

  img_death = [
    "../assets/char/death/death-1.png",
    "../assets/char/death/death-2.png",
    "../assets/char/death/death-3.png",
    "../assets/char/death/death-4.png",
    "../assets/char/death/death-5.png",
    "../assets/char/death/death-6.png",
    "../assets/char/death/death-7.png",
    "../assets/char/death/death-8.png",
    "../assets/char/death/death-9.png",
    "../assets/char/death/death-10.png",
    "../assets/char/death/death-11.png",
  ];

  constructor() {
    super();
    this.loadImage("../assets/char/idle/idle-0.png");
    this.loadImages(this.img_idle);
    this.loadImages(this.img_walk);
    this.loadImages(this.img_jump);
    this.loadImages(this.img_attack);
    this.loadImages(this.img_death);
    this.animate();
    this.walk();
    this.jump();
    this.applyGravity();
  }

  applyGravity() {
    setInterval(() => {
      if (this.y < 50) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 60);
  }

  walk() {
    setInterval(() => {
      if (this.world.keyboard.KeyD && this.x < 9216) {
        this.x += this.speed;
        this.otherDirection = false;
      }
      if (this.world.keyboard.KeyA && this.x > 120) {
        this.x -= this.speed;
        this.otherDirection = true;
      }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.KeyD || this.world.keyboard.KeyA) {
        let i =
          Math.floor(this.currentFrame / this.animationSpeed) %
          this.img_walk.length;
        let path = this.img_walk[i];
        if (this.imageCache[path]) {
          this.img = this.imageCache[path];
          this.currentFrame++;
        }
      }
    }, 1000 / 60);
  }

<<<<<<< HEAD
  jump() {}
=======
  jump() {
    setInterval(() => {
      if (this.world.keyboard.Space && !this.isJumping) {
        this.isJumping = true;
        this.jumpCounter = 0;
      }
      if (this.isJumping) {
        this.jumpCounter++;
        this.y += this.jumpCounter <= 15 ? -this.jumpSpeed : this.jumpSpeed;
        let i = Math.floor(this.jumpCounter / 4) % this.img_jump.length;
        this.img = this.imageCache[this.img_jump[i]];
        if (this.jumpCounter >= 30) {
          this.isJumping = false;
        }
      }
    }, 1000 / 60);
  }
>>>>>>> feba7f516d0f5cb010c0a6a6aebf5801193bffc1
}
