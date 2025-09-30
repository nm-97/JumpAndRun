class demon extends MoveableObject {
  y = 610 - this.height;
  height = 128;
  width = 128;
  speed = 1;

  img_idle = [
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/idle/Imp2_Idle_without_shadow-0.png",
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/idle/Imp2_Idle_without_shadow-1.png",
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/idle/Imp2_Idle_without_shadow-2.png",
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/idle/Imp2_Idle_without_shadow-3.png",
  ];

  img_walk = [
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/walk/Imp2_Walk_without_shadow-0.png",
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/walk/Imp2_Walk_without_shadow-1.png",
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/walk/Imp2_Walk_without_shadow-2.png",
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/walk/Imp2_Walk_without_shadow-3.png",
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/walk/Imp2_Walk_without_shadow-4.png",
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/walk/Imp2_Walk_without_shadow-5.png",
  ];

  img_death = [
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/death/Imp2_Death_without_shadow-0.png",
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/death/Imp2_Death_without_shadow-1.png",
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/death/Imp2_Death_without_shadow-2.png",
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/death/Imp2_Death_without_shadow-3.png",
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/death/Imp2_Death_without_shadow-4.png",
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/death/Imp2_Death_without_shadow-5.png",
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/death/Imp2_Death_without_shadow-6.png",
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/death/Imp2_Death_without_shadow-7.png",
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/death/Imp2_Death_without_shadow-8.png",
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/death/Imp2_Death_without_shadow-9.png",
  ];

  img_hurt = [
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/hurt/Imp2_Hurt__without_shadow-0.png",
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/hurt/Imp2_Hurt__without_shadow-1.png",
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/hurt/Imp2_Hurt__without_shadow-2.png",
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/hurt/Imp2_Hurt__without_shadow-3.png",
  ];

  img_attack = [
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/attack/Imp2_Attack_without_shadow-1.png",
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/attack/Imp2_Attack_without_shadow-2.png",
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/attack/Imp2_Attack_without_shadow-3.png",
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/attack/Imp2_Attack_without_shadow-4.png",
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/attack/Imp2_Attack_without_shadow-5.png",
  ];

  img_projectile = [
    "../assets/enemy/enemyTwo/Imp2/Without_shadow/projektile/Fire_loop-1-0.png",
  ];

  constructor() {
    super();
    this.energy = 3;
    this.hurtFrameCount = 0;
    this.isHurtAnimationPlaying = false;
    this.attackFrameCount = 0;
    this.isAttackAnimationPlaying = false;
    this.canDealDamage = false;
    this.projectiles = [];
    this.lastShotTime = 0;
    this.shootCooldown = 2000;

    this.loadImage(
      "../assets/enemy/enemyTwo/Imp2/Without_shadow/idle/Imp2_Idle_without_shadow-0.png"
    );
    this.loadImages(this.img_idle);
    this.loadImages(this.img_walk);
    this.loadImages(this.img_attack);
    this.loadImages(this.img_death);
    this.loadImages(this.img_hurt);
    this.loadImages(this.img_projectile);

    Animation.animate(this);
    this.speed = 1 + Math.random() * 2;
    this.x = 500 + Math.random() * 300;

    this.setCustomHitbox(50, 70, 25, 15);
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

    // Spiele Demon Attack Sound
    if (this.world && this.world.soundEffects) {
      this.world.soundEffects.playDemonAttackSound();
    }

    this.shootProjectile();
    Animation.animateAttack(this);
  }

  shootProjectile() {
    const currentTime = Date.now();
    if (currentTime - this.lastShotTime >= this.shootCooldown) {
      const projectile = new DemonProjectile(
        this.x - 10,
        this.y + this.height / 2 - 16
      );

      // Setze World-Referenz für Pause-Funktionalität
      projectile.world = this.world;

      this.projectiles.push(projectile);
      this.lastShotTime = currentTime;

      if (this.world && this.world.demonProjectiles) {
        this.world.demonProjectiles.push(projectile);
      }
    }
  }

  updateProjectiles() {
    this.projectiles = this.projectiles.filter((projectile) => {
      if (projectile.isOffScreen()) {
        projectile.destroy();
        return false;
      }
      return true;
    });
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

    if (!this.isHurt && !this.isDead) {
      this.updateProjectiles();

      if (this.isVisible()) {
        if (!this.isAttacking) {
          this.startAttackAnimation();
        }
      }
    }
  }

  isVisible() {
    if (this.world && this.world.camera_x !== undefined) {
      const screenLeft = -this.world.camera_x;
      const screenRight = screenLeft + 1024;
      return this.x + this.width > screenLeft && this.x < screenRight;
    }
    return true;
  }
}
