class World {
  ctx;
  canvas;
  keyboard;
  char = new char();
  enemy = [new goblin()];
  level;
  world;
  camera_x = 0;
  camera_y = 0;

  background = BackgroundManager.createRepeatingBackground();
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.level = new lvl(canvas);
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.char.world = this;
    this.char.keyboard = this.keyboard;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, this.camera_y);
    this.addObjectsToMap(this.background);
    this.level.draw();
    this.addToMap(this.char);
    this.addObjectsToMap(this.enemy);
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
