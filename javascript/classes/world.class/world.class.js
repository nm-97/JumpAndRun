class World {
  camera_x = 0;
  camera_y = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.level = new lvl(this.ctx);
    this.enemies = this.level.getEnemies();
    this.background = this.level.getBackground();
    this.endboss = this.level.getEndboss();
    this.keyboard = keyboard;
    this.char = new char();
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
    this.addToMap(this.char);
    this.addObjectsToMap(this.enemies);
    this.addToMap(this.endboss);
    this.ctx.translate(-this.camera_x, -this.camera_y);
    requestAnimationFrame(this.draw.bind(this));
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
    this.ctx.drawImage(
      MoveableObject.img,
      MoveableObject.x,
      MoveableObject.y,
      MoveableObject.width,
      MoveableObject.height
    );
    if (MoveableObject.otherDirection) {
      MoveableObject.x = MoveableObject.x * -1;
      this.ctx.restore();
    }
  }
}
