class char extends MoveableObject {
  y = 550 - this.height;
  img_idle = [
    "../assets/char/idle/idle-1.png",
    "../assets/char/idle/idle-2.png",
    "../assets/char/idle/idle-3.png",
    "../assets/char/idle/idle-4.png",
  ];

  img_Run_Right = [
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
    this.loadImages(this.img_Run_Right);
    this.loadImages(this.img_jump);
    this.loadImages(this.img_attack);
    this.loadImages(this.img_death);
    this.animateIdle();
    this.animateDeath();
    this.animateAttack();
    this.animateWalkRight();
    this.animateJump();
  }

  jump() {
    // Implement jump logic here
  }

  animateDeath() {
    setInterval(() => {
      if (this.world.keyboard.Enter) {
        let i = this.currentFrame % this.img_death.length;
        let path = this.img_death[i];
        this.img = this.charImageCache[path];
        this.currentFrame++;
      }
    }, 8000 / 60);
  }

  animateAttack() {
    setInterval(() => {
      if (this.world.keyboard.KeyF) {
        let i = this.currentFrame % this.img_attack.length;
        let path = this.img_attack[i];
        this.img = this.charImageCache[path];
        this.currentFrame++;
      }
    }, 8000 / 60);
  }

  animateJump() {
    setInterval(() => {
      if (this.world.keyboard.Space) {
        let i = this.currentFrame % this.img_jump.length;
        let path = this.img_jump[i];
        this.img = this.charImageCache[path];
        this.currentFrame++;
      }
    }, 8000 / 60);
  }

  animateWalkRight() {
    setInterval(() => {
      if (this.world.keyboard.KeyD) {
        let i = this.currentFrame % this.img_Run_Right.length;
        let path = this.img_Run_Right[i];
        this.img = this.charImageCache[path];
        this.currentFrame++;
      }
    }, 8000 / 60);
  }

  animateIdle() {
    setInterval(() => {
      let i = this.currentFrame % this.img_idle.length;
      let path = this.img_idle[i];
      this.img = this.charImageCache[path];
      this.currentFrame++;
    }, 8000 / 60);
  }
}
