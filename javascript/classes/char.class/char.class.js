class char extends MoveableObject {
  static speed = 9;
  static jumpSpeed = 15;
  static energy = 8;
  static worldBoundaries = { minX: 120, maxX: 9216 };
  static hitboxes = {
    normal: { width: 80, height: 90, offsetX: 40, offsetY: 70 },
    attack: { width: 130, height: 128, offsetX: 10, offsetY: 32 },
  };

  y = 550 - this.height;
  speed = char.speed;
  jumpSpeed = char.jumpSpeed;
  jumpCounter = 0;
  otherDirection = false;
  animationSpeed = 4;

  attackFrameCount = 0;
  isAttackAnimationPlaying = false;
  fKeyPressed = false;

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
    this.energy = char.energy;
    this.normalHitbox = char.hitboxes.normal;
    this.attackHitbox = char.hitboxes.attack;

    this.initializeImages();
    this.setupHitbox();
    this.startSystems();
  }

  // === INITIALISIERUNG ===
  initializeImages() {
    this.loadImage("../assets/char/animation/idle/idle-0.png");
    this.loadImages(this.img_idle);
    this.loadImages(this.img_walk);
    this.loadImages(this.img_jump);
    this.loadImages(this.img_attack);
    this.loadImages(this.img_death);
    this.loadImages(this.img_hurt);
  }

  setupHitbox() {
    this.setCustomHitbox(
      this.normalHitbox.width,
      this.normalHitbox.height,
      this.normalHitbox.offsetX,
      this.normalHitbox.offsetY
    );
  }

  startSystems() {
    Animation.animate(this);
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
    Physics.initializePhysics(this);
    this.isMoving = false;

    this.handleMovement();
    this.handleJump();
    this.handleAttack();
  }

  handleMovement() {
    const { minX, maxX } = char.worldBoundaries;

    if (this.world.keyboard.KeyD && this.x < maxX) {
      this.x += this.speed;
      this.otherDirection = false;
      this.isMoving = this.isOnGround;
    }
    if (this.world.keyboard.KeyA && this.x > minX) {
      this.x -= this.speed;
      this.otherDirection = true;
      this.isMoving = this.isOnGround;
    }
  }

  handleJump() {
    if (this.world.keyboard.Space && this.isOnGround) {
      this.velocityY = -this.jumpSpeed;
      this.isOnGround = false;
      this.isJumping = true;

      if (this.world && this.world.soundEffects) {
        this.world.soundEffects.playJumpSound();
      }
    }
  }

  handleAttack() {
    if (
      this.world.keyboard.KeyF &&
      !this.fKeyPressed &&
      !this.isAttackAnimationPlaying
    ) {
      this.startAttackAnimation();
    }

    this.fKeyPressed = this.world.keyboard.KeyF;
  }

  startAttackAnimation() {
    this.isAttacking = true;
    this.isAttackAnimationPlaying = true;
    this.attackFrameCount = 0;
    this.currentFrame = 0;

    if (this.world && this.world.soundEffects) {
      this.world.soundEffects.playAttackSound();
    }

    this.setCustomHitbox(
      this.attackHitbox.width,
      this.attackHitbox.height,
      this.attackHitbox.offsetX,
      this.attackHitbox.offsetY
    );

    Animation.animateAttack(this);
  }

  takeDamage() {
    this.energy -= 1;
    if (this.energy <= 0) {
      this.energy = 0;
      this.isDead = true;

      if (this.world && this.world.soundEffects) {
        this.world.soundEffects.playDeathSound();
      }
    } else {
      this.lastHurtTime = new Date().getTime();
    }
  }

  updateAttackAnimation() {
    if (this.isAttackAnimationPlaying) {
      this.attackFrameCount++;
      if (this.attackFrameCount >= this.img_attack.length) {
        this.isAttacking = false;
        this.isAttackAnimationPlaying = false;
        this.attackFrameCount = 0;
      }
    }
  }
}
