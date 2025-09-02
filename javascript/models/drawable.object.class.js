class drawableObject {
  img;
  imageCache = {};
  currentFrame = 0;
  x = 120;
  y = 390;

  height = 160;
  width = 160;

  draw(ctx) {
    if (this.img && this.img.complete && this.img.naturalWidth > 0) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  drawFrame(ctx) {
    if (
      this instanceof char ||
      this instanceof goblin ||
      this instanceof endboss ||
      this instanceof PlatformTile
    ) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  isColliding(MoveableObject) {
    return (
      this.x < MoveableObject.x + MoveableObject.width &&
      this.x + this.width > MoveableObject.x &&
      this.y < MoveableObject.y + MoveableObject.height &&
      this.y + this.height > MoveableObject.y
    );
  }

  loadImage(path) {
    this.img = new Image();
    this.img.onerror = () => {
      console.warn(`Failed to load image: ${path}`);
      this.img = null;
    };
    this.img.src = path;
  }

  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
