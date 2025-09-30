class goblin extends MoveableObject {
  y = 610 - this.height;
  speed = 1;

  img_idle = [
    "../assets/enemy/enemyOne/Goblin2/idle/Idle-0.png",
    "../assets/enemy/enemyOne/Goblin2/idle/Idle-1.png",
    "../assets/enemy/enemyOne/Goblin2/idle/Idle-2.png",
    "../assets/enemy/enemyOne/Goblin2/idle/Idle-3.png",
  ];

  img_attack = [
    "../assets/enemy/enemyOne/Goblin2/attack/walkLeftAttack-0.png",
    "../assets/enemy/enemyOne/Goblin2/attack/walkLeftAttack-1.png",
    "../assets/enemy/enemyOne/Goblin2/attack/walkLeftAttack-2.png",
    "../assets/enemy/enemyOne/Goblin2/attack/walkLeftAttack-3.png",
    "../assets/enemy/enemyOne/Goblin2/attack/walkLeftAttack-4.png",
  ];

  img_death = [
    "../assets/enemy/enemyOne/Goblin2/death/deathLeft-0.png",
    "../assets/enemy/enemyOne/Goblin2/death/deathLeft-1.png",
    "../assets/enemy/enemyOne/Goblin2/death/deathLeft-2.png",
    "../assets/enemy/enemyOne/Goblin2/death/deathLeft-3.png",
    "../assets/enemy/enemyOne/Goblin2/death/deathLeft-4.png",
    "../assets/enemy/enemyOne/Goblin2/death/deathLeft-5.png",
  ];

  img_hurt = [
    "../assets/enemy/enemyOne/Goblin2/hurt/hurtLeft-0.png",
    "../assets/enemy/enemyOne/Goblin2/hurt/hurtLeft-1.png",
    "../assets/enemy/enemyOne/Goblin2/hurt/hurtLeft-2.png",
    "../assets/enemy/enemyOne/Goblin2/hurt/hurtLeft-3.png",
  ];

  img_walk = [
    "../assets/enemy/enemyOne/Goblin2/walk/walkLeft-0.png",
    "../assets/enemy/enemyOne/Goblin2/walk/walkLeft-1.png",
    "../assets/enemy/enemyOne/Goblin2/walk/walkLeft-2.png",
    "../assets/enemy/enemyOne/Goblin2/walk/walkLeft-3.png",
    "../assets/enemy/enemyOne/Goblin2/walk/walkLeft-4.png",
    "../assets/enemy/enemyOne/Goblin2/walk/walkLeft-5.png",
  ];

  constructor() {
    super();
    this.energy = 3;
    this.hurtFrameCount = 0;
    this.isHurtAnimationPlaying = false;
    this.attackFrameCount = 0;
    this.isAttackAnimationPlaying = false;
    this.canDealDamage = false;
    this.lastLaughTime = 0;
    this.loadImage("../assets/enemy/enemyOne/Goblin2/idle/Idle-0.png");
    this.loadImages(this.img_idle);
    this.loadImages(this.img_walk);
    this.loadImages(this.img_attack);
    this.loadImages(this.img_death);
    this.loadImages(this.img_hurt);

    this.speed = 1 + Math.random() * 3;
    this.x = 200 + Math.random() * 400;

    this.setCustomHitbox(60, 60, 42, 42);

    Animation.animate(this);
    this.startAI();
  }

  startHurtAnimation() {
    this.isHurt = true;
    this.isHurtAnimationPlaying = true;
    this.hurtFrameCount = 0;

    Animation.animateHurt(this);
  }

  startAttackAnimation() {
    this.isAttacking = true;
    this.isAttackAnimationPlaying = true;
    this.attackFrameCount = 0;
    this.currentFrame = 0;
    this.canDealDamage = true;

    // Spiele Goblin Attack Sound
    if (this.world && this.world.soundEffects) {
      this.world.soundEffects.playGoblinAttackSound();
    }

    Animation.animateAttack(this);
  }

  startAI() {
    setInterval(() => {
      this.aiLogic();
    }, 100);
  }

  aiLogic() {
    // Blockiere AI wenn das Spiel pausiert ist
    if (this.world && this.world.isPaused) {
      return;
    }

    if (!this.isAttacking && !this.isHurt && !this.isDead) {
      const currentTime = Date.now();
      // Goblin lacht alle 4 Sekunden
      if (currentTime - this.lastLaughTime > 4000) {
        if (this.world && this.world.soundEffects) {
          this.world.soundEffects.playGoblinLaughSound();
        }
        this.lastLaughTime = currentTime;
      }

      // Zufällige Aktion: 0 = stehen, 1 = links, 2 = rechts, 3 = springen, 4 = angreifen
      const action = Math.floor(Math.random() * 5);
      switch (action) {
        case 0:
          // Stehen bleiben
          this.isMoving = false;
          break;
        case 1:
          // Nach links laufen
          this.otherDirection = false;
          this.isMoving = true;
          this.moveLeft();
          break;
        case 2:
          // Nach rechts laufen
          this.otherDirection = true;
          this.isMoving = true;
          this.moveRight();
          break;
        case 3:
          // Springen (wenn Methode vorhanden)
          if (typeof this.jump === 'function') {
            this.jump();
          }
          break;
        case 4:
          // Angreifen
          this.startAttackAnimation();
          break;
      }
    }
  }
}
