class World {
  char = new char_lvl1();
  enemy = [new goblin()];
  background = [new backgroundLayerOne()];

  ctx;
  canvas;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(
      this.char.img,
      this.char.x,
      this.char.y,
      this.char.width,
      this.char.height
    );
    this.enemy.forEach((enemy) => {
      this.ctx.drawImage(
        enemy.img,
        enemy.x,
        enemy.y,
        enemy.enemyWidth,
        enemy.enemyHeight
      );
    });
    this.background.forEach((background) => {
      this.ctx.drawImage(
        background.img,
        background.x,
        background.y,
        background.width,
        background.height
      );
    });
    requestAnimationFrame(this.draw.bind(this));
  }
}
