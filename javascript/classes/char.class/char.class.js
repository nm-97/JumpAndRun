class char extends MoveableObject {
  y = 550 - this.height;
  speed = 15;
  jumpSpeed = 3;
  isJumping = false;
  jumpCounter = 0;
  acceleration = 1;
  speedY = 0;
  otherDirection = false;
  animationSpeed = 4;

  img_idle = [
    "../assets/char/idle/idle-0.png",
    "../assets/char/idle/idle-1.png",
    "../assets/char/idle/idle-2.png",
    "../assets/char/idle/idle-3.png",
    "../assets/char/idle/idle-4.png",
    "../assets/char/idle/idle-5.png",
  ];

  img_walk = [
    "../assets/char/run/run-0.png",
    "../assets/char/run/run-1.png",
    "../assets/char/run/run-2.png",
    "../assets/char/run/run-3.png",
    "../assets/char/run/run-4.png",
    "../assets/char/run/run-5.png",
    "../assets/char/run/run-6.png",
    "../assets/char/run/run-7.png",
  ];

  img_jump = [
    "../assets/char/jump/jump-0.png",
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
    "../assets/char/attack/attackl-0.png",
    "../assets/char/attack/attackl-1.png",
    "../assets/char/attack/attackl-2.png",
    "../assets/char/attack/attackl-3.png",
    "../assets/char/attack/attackl-4.png",
    "../assets/char/attack/attackl-5.png",
  ];

  img_death = [
    "../assets/char/death/death-0.png",
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

  img_hurt = [
    "../assets/char/death/death-0.png",
    "../assets/char/death/death-1.png",
    "../assets/char/death/death-2.png",
    "../assets/char/death/death-1.png",
    "../assets/char/death/death-0.png",
  ];

  constructor() {
    super();
    this.loadImage("../assets/char/idle/idle-0.png");
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
        this.updateCamera();
      }
    }, 1000 / 60);
  }

  handleInput() {
    this.isMoving = false;

    // Debug: Prüfe ob Tasten erkannt werden
    if (this.world.keyboard.KeyD || this.world.keyboard.KeyA) {
      console.log("Taste gedrückt:", {
        KeyD: this.world.keyboard.KeyD,
        KeyA: this.world.keyboard.KeyA,
      });
    }

    if (this.world.keyboard.KeyD && this.x < 9216) {
      this.x += this.speed;
      this.otherDirection = false;
      this.isMoving = true;
    }
    if (this.world.keyboard.KeyA && this.x > 120) {
      this.x -= this.speed;
      this.otherDirection = true;
      this.isMoving = true;
    }
    if (this.world.keyboard.Space && !this.isJumping) {
      this.isJumping = true;
      this.jumpCounter = 0;
    }
    if (this.isJumping) {
      this.jumpCounter++;
      this.y += this.jumpCounter <= 15 ? -this.jumpSpeed : this.jumpSpeed;
      if (this.jumpCounter >= 30) {
        this.isJumping = false;
      }
    }
  }

  updateCamera() {
    if (this.world) {
      this.world.camera_x = -this.x + 100;
    }
  }
}
