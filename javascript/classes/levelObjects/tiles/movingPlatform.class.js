class MovingPlatform extends MoveableObject {
  width = 96;
  height = 24;
  speed = 2;
  direction = 1;
  startX;
  endX;

  constructor(x, y, endX) {
    super();
    this.x = x;
    this.y = y;
    this.startX = x;
    this.endX = endX;
    this.loadImage(
      "../../../../assets/tileSets/oak_woods_v1.0/tileSet/oak_woods_tileset-8.png"
    );
  }

  update() {
    this.x += this.speed * this.direction;
    if (this.x >= this.endX || this.x <= this.startX) {
      this.direction *= -1;
    }
  }
}
