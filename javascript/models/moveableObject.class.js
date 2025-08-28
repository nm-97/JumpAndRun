class MoveableObject {
  x = 120;
  y = 240;
  img;
  height = 160;
  width = 160;
  enemyWidth = 160;
  enemyHeight = 160;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {}

  moveLeft() {}
}
