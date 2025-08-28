class World {
  ctx;
  canvas;
  char = new char();
  enemy = [new goblin()];
  level;
  background = [
    new backgroundLayer(
      "../assets/tileSets/oak_woods_v1.0/background/layerOne.png"
    ),
    new backgroundLayer(
      "../assets/tileSets/oak_woods_v1.0/background/layerTwo.png"
    ),
    new backgroundLayer(
      "../assets/tileSets/oak_woods_v1.0/background/layerThree.png"
    ),
  ];

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.level = new lvl(canvas);
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addObjectsToMap(this.background);
    this.level.draw();
    this.addToMap(this.char);
    this.addObjectsToMap(this.enemy);

    requestAnimationFrame(this.draw.bind(this));
  }

  addObjectsToMap(Objects) {
    Objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(MoveableObject) {
    this.ctx.drawImage(
      MoveableObject.img,
      MoveableObject.x,
      MoveableObject.y,
      MoveableObject.width,
      MoveableObject.height
    );
  }
}
