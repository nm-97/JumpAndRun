class MoveableObject {
  x = 120;
  y = 240;
  img;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {}

  moveLeft() {}
}
