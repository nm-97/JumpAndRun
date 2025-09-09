class World {
  camera_x = 0;
  camera_y = 0;
  statusBar = new statusBar();
  coinCounter = new CoinCounter();
  backgroundMusic = new BackgroundMusic();
  soundEffects = new SoundEffects();
  debugMode = true;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.level = new levelOne();
    this.enemies = this.level.getEnemies();
    this.background = this.level.getBackground();
    this.endboss = this.level.getEndboss();
    this.keyboard = keyboard;
    this.char = new char();
    this.demonProjectiles = [];
    this.backgroundMusic.setupCanvasClickHandler();
    this.setWorld();
    this.draw();
  }

  setWorld() {
    this.char.world = this;
    this.char.keyboard = this.keyboard;

    this.enemies.forEach((enemy) => {
      if (enemy instanceof demon) {
        enemy.world = this;
      } else if (enemy instanceof goblin) {
        enemy.world = this;
      }
    });

    this.level.getAllTraps().forEach((trap) => {
      trap.world = this;
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, this.camera_y);
    this.addObjectsToMap(this.background);
    this.addObjectsToMap(this.level.getAllTiles());
    this.addObjectsToMap(this.level.getAllDecorations());
    this.addObjectsToMap(this.level.getAllCollectibles());
    this.addObjectsToMap(this.level.getAllTraps());
    this.addToMap(this.char);
    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.demonProjectiles);
    // this.addToMap(this.endboss);
    this.checkCollisions();
    this.ctx.translate(-this.camera_x, -this.camera_y);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinCounter);
    requestAnimationFrame(this.draw.bind(this));
  }

  checkCollisions() {
    setInterval(() => {
      this.checkEnemyCollisions();
      this.checkTrapCollisions();
      this.checkCoinCollisions();
      this.checkAttackCollisions();
      this.checkProjectileCollisions();
    }, 8000 / 60);
  }

  checkEnemyCollisions() {
    let isColliding = false;

    this.enemies.forEach((enemy) => {
      if (this.char.isCollidingWithCustomHitbox(enemy)) {
        if (
          (enemy instanceof goblin || enemy instanceof demon) &&
          enemy.canDealDamage
        ) {
          this.handleEnemyHit();
          isColliding = true;
        } else if (!(enemy instanceof goblin) && !(enemy instanceof demon)) {
          this.handleEnemyHit();
          isColliding = true;
        }
      }
    });

    if (!isColliding) {
      this.handleNoCollision();
    }
  }

  checkTrapCollisions() {
    this.level.getAllTraps().forEach((trap) => {
      if (this.char.isCollidingWithCustomHitbox(trap)) {
        this.handleTrapHit(trap);
      }
    });
  }

  checkCoinCollisions() {
    this.level.getAllCollectibles().forEach((collectible, index) => {
      if (
        collectible instanceof Coin &&
        this.char.isCollidingWithCustomHitbox(collectible)
      ) {
        this.handleCoinCollection(collectible, index);
      }
    });
  }

  handleCoinCollection(coin, index) {
    this.level.coins.splice(index, 1);
    this.coinCounter.incrementCoin();

    if (this.soundEffects) {
      this.soundEffects.playCoinSound();
    }
  }

  checkAttackCollisions() {
    if (this.char.isAttacking) {
      this.enemies.forEach((enemy, index) => {
        if (
          this.char.isCollidingWithCustomHitbox(enemy) &&
          this.canEnemyTakeDamage(enemy)
        ) {
          this.handleEnemyDamage(enemy, index);
        }
      });
    }
  }

  handleEnemyDamage(enemy, index) {
    enemy.startHurtAnimation();
    enemy.takeDamage();
    enemy.lastHurtTime = new Date().getTime();

    if (enemy.energy <= 0) {
      enemy.isDead = true;

      setTimeout(() => {
        this.enemies.splice(index, 1);
      }, 1500);
    }
  }

  canEnemyTakeDamage(enemy) {
    const timePassed = new Date().getTime() - enemy.lastHurtTime;
    return timePassed > 1000;
  }

  handleTrapHit(trap) {
    if (this.canCharTakeDamage()) {
      this.char.isHurt = true;

      // Spiele spezifische Trap-Sounds ab bei Kollision
      if (this.soundEffects) {
        if (trap instanceof Jumper) {
          this.soundEffects.playJumperSound();
          // Jumper aktivieren anstatt Schaden
          if (!trap.isActivated) {
            this.char.velocityY = -20;
            trap.isActivated = true;
            setTimeout(() => {
              trap.isActivated = false;
            }, 1000);
            return; // Kein Schaden für Jumper
          }
        }
      }

      this.char.takeDamage(1);
      this.statusBar.setHealth(this.char.energy);
    }
  }

  handleEnemyHit() {
    if (this.canCharTakeDamage()) {
      this.char.isHurt = true;
      this.char.takeDamage(1);
      this.statusBar.setHealth(this.char.energy);
    }
  }

  handleNoCollision() {
    if (this.canCharTakeDamage()) {
      this.char.isHurt = false;
    }
  }

  canCharTakeDamage() {
    const timePassed = new Date().getTime() - this.char.lastHurtTime;
    return timePassed > 1750;
  }

  addObjectsToMap(Objects) {
    Objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(MoveableObject) {
    if (MoveableObject.otherDirection) {
      this.ctx.save();
      this.ctx.translate(MoveableObject.width, 0);
      this.ctx.scale(-1, 1);
      MoveableObject.x = MoveableObject.x * -1;
    }
    MoveableObject.draw(this.ctx);

    if (
      this.debugMode &&
      (MoveableObject instanceof char ||
        MoveableObject instanceof goblin ||
        MoveableObject instanceof demon ||
        MoveableObject instanceof endboss ||
        MoveableObject instanceof DemonProjectile)
    ) {
      MoveableObject.drawFrame(this.ctx);
    }

    if (MoveableObject.otherDirection) {
      MoveableObject.x = MoveableObject.x * -1;
      this.ctx.restore();
    }
  }

  checkProjectileCollisions() {
    for (let i = this.demonProjectiles.length - 1; i >= 0; i--) {
      const projectile = this.demonProjectiles[i];

      if (this.char.isCollidingWithCustomHitbox(projectile)) {
        this.handleProjectileHit();
        projectile.destroy();
        this.demonProjectiles.splice(i, 1);
      } else if (projectile.isOffScreen()) {
        projectile.destroy();
        this.demonProjectiles.splice(i, 1);
      }
    }
  }

  handleProjectileHit() {
    if (this.canCharTakeDamage()) {
      this.char.isHurt = true;
      this.char.takeDamage(1);
      this.statusBar.setHealth(this.char.energy);
      this.soundEffects.playHitSound();
    }
  }
}
