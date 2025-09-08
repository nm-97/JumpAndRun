class World {
  camera_x = 0;
  camera_y = 0;
  statusBar = new statusBar();
  backgroundMusic = new BackgroundMusic();
  soundEffects = new SoundEffects();

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.level = new levelOne();
    this.enemies = this.level.getEnemies();
    this.background = this.level.getBackground();
    this.endboss = this.level.getEndboss();
    this.keyboard = keyboard;
    this.char = new char();
    this.backgroundMusic.setupCanvasClickHandler();
    this.setWorld();
    this.draw();
  }

  setWorld() {
    this.char.world = this;
    this.char.keyboard = this.keyboard;
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
    this.addToMap(this.endboss);
    this.checkCollisions();
    this.ctx.translate(-this.camera_x, -this.camera_y);
    this.addToMap(this.statusBar);
    requestAnimationFrame(this.draw.bind(this));
  }

  checkCollisions() {
    setInterval(() => {
      this.checkEnemyCollisions();
      this.checkTrapCollisions();
    }, 8000 / 60);
  }

  checkEnemyCollisions() {
    let isColliding = false;

    this.enemies.forEach((enemy) => {
      if (this.char.isCollidingWithCustomHitbox(enemy)) {
        this.handleEnemyHit();
        isColliding = true;
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

  handleTrapHit(trap) {
    if (this.canCharTakeDamage()) {
      this.char.isHurt = true;

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
    if (MoveableObject.otherDirection) {
      MoveableObject.x = MoveableObject.x * -1;
      this.ctx.restore();
    }
  }
}
