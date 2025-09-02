class char extends MoveableObject {
  y = 550 - this.height;
  speed = 8;
  jumpSpeed = 12;
  isJumping = false;
  jumpCounter = 0;
  otherDirection = false;
  animationSpeed = 4;
  isOnGround = true;
  groundY = 550 - this.height;
  velocityY = 0;
  gravity = 0.5;

  img_idle = [
    "../assets/char/animation/idle/idle-0.png",
    "../assets/char/animation/idle/idle-1.png",
    "../assets/char/animation/idle/idle-2.png",
    "../assets/char/animation/idle/idle-3.png",
    "../assets/char/animation/idle/idle-4.png",
    "../assets/char/animation/idle/idle-5.png",
  ];

  img_walk = [
    "../assets/char/animation/run/run-0.png",
    "../assets/char/animation/run/run-1.png",
    "../assets/char/animation/run/run-2.png",
    "../assets/char/animation/run/run-3.png",
    "../assets/char/animation/run/run-4.png",
    "../assets/char/animation/run/run-5.png",
    "../assets/char/animation/run/run-6.png",
    "../assets/char/animation/run/run-7.png",
  ];

  img_jump = [
    "../assets/char/animation/jump/jump-0.png",
    "../assets/char/animation/jump/jump-1.png",
    "../assets/char/animation/jump/jump-2.png",
    "../assets/char/animation/jump/jump-3.png",
    "../assets/char/animation/jump/jump-4.png",
    "../assets/char/animation/jump/jump-5.png",
    "../assets/char/animation/jump/jump-6.png",
    "../assets/char/animation/jump/jump-7.png",
    "../assets/char/animation/jump/jump-8.png",
    "../assets/char/animation/jump/jump-9.png",
    "../assets/char/animation/jump/jump-10.png",
    "../assets/char/animation/jump/jump-11.png",
    "../assets/char/animation/jump/jump-12.png",
    "../assets/char/animation/jump/jump-13.png",
    "../assets/char/animation/jump/jump-14.png",
    "../assets/char/animation/jump/jump-15.png",
  ];

  img_attack = [
    "../assets/char/animation/attack/attackl-0.png",
    "../assets/char/animation/attack/attackl-1.png",
    "../assets/char/animation/attack/attackl-2.png",
    "../assets/char/animation/attack/attackl-3.png",
    "../assets/char/animation/attack/attackl-4.png",
    "../assets/char/animation/attack/attackl-5.png",
  ];

  img_death = [
    "../assets/char/animation/death/death-0.png",
    "../assets/char/animation/death/death-1.png",
    "../assets/char/animation/death/death-2.png",
    "../assets/char/animation/death/death-3.png",
    "../assets/char/animation/death/death-4.png",
    "../assets/char/animation/death/death-5.png",
    "../assets/char/animation/death/death-6.png",
    "../assets/char/animation/death/death-7.png",
    "../assets/char/animation/death/death-8.png",
    "../assets/char/animation/death/death-9.png",
    "../assets/char/animation/death/death-10.png",
    "../assets/char/animation/death/death-11.png",
  ];

  img_hurt = [
    "../assets/char/animation/death/death-0.png",
    "../assets/char/animation/death/death-1.png",
    "../assets/char/animation/death/death-2.png",
    "../assets/char/animation/death/death-1.png",
    "../assets/char/animation/death/death-0.png",
  ];

  constructor() {
    super();
    this.energy = 8;
    this.loadImage("../assets/char/animation/idle/idle-0.png");
    this.loadImages(this.img_idle);
    this.loadImages(this.img_walk);
    this.loadImages(this.img_jump);
    this.loadImages(this.img_attack);
    this.loadImages(this.img_death);
    this.loadImages(this.img_hurt);
    this.animate();
    this.startInputHandler();
  }

  startInputHandler() {
    setInterval(() => {
      if (this.world && this.world.keyboard) {
        this.handleInput();
        this.handlePhysics();
        this.updateCamera();
      }
    }, 1000 / 60);
  }

  handleInput() {
    this.isMoving = false;

    if (this.world.keyboard.KeyD && this.x < 9216) {
      this.x += this.speed;
      this.otherDirection = false;
      this.isMoving = this.isOnGround;
    }
    if (this.world.keyboard.KeyA && this.x > 120) {
      this.x -= this.speed;
      this.otherDirection = true;
      this.isMoving = this.isOnGround;
    }

    if (this.world.keyboard.Space && this.isOnGround) {
      this.velocityY = -this.jumpSpeed;
      this.isOnGround = false;
      this.isJumping = true;
    }

    this.isAttacking = this.world.keyboard.KeyF;
  }
}
