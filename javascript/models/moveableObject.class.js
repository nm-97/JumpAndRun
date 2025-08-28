class MoveableObject {
  x = 120;
  y = 390;
  img;
  height = 160;
  width = 160;
  charImageCache = [];
  currentFrame = 0;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.charImageCache[path] = img;
    });
  }

  moveRight() {}

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
