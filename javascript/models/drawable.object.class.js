class drawableObject {
  img;
  imageCache = {};
  currentFrame = 0;
  x = 120;
  y = 390;

  height = 160;
  width = 160;

  // Custom Hitbox-Eigenschaften (falls nicht gesetzt, verwende width/height)
  hitboxWidth = null;
  hitboxHeight = null;
  hitboxOffsetX = 0;
  hitboxOffsetY = 0;

  draw(ctx) {
    if (this.img && this.img.complete && this.img.naturalWidth > 0) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  drawCustomHitbox(ctx) {
    if (this.hitboxWidth && this.hitboxHeight) {
      const hitbox = this.getHitbox();
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      ctx.rect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
      ctx.stroke();
    }
  }

  drawFrame(ctx) {
    if (
      this instanceof char ||
      this instanceof goblin ||
      this instanceof endboss ||
      this instanceof PlatformTile ||
      this instanceof Spike ||
      this instanceof Fireblazer ||
      this instanceof Jumper ||
      this instanceof Speer
    ) {
      // Zeichne den originalen Rahmen in blau
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();

      // Zeichne die Custom-Hitbox in rot
      this.drawCustomHitbox(ctx);
    }
  }

  // Kollision mit Custom-Hitboxen
  isCollidingWithCustomHitbox(MoveableObject) {
    // Hole die Hitbox-Dimensionen (fallback auf width/height)
    const thisHitbox = this.getHitbox();
    const objHitbox = MoveableObject.getHitbox();

    return (
      thisHitbox.x < objHitbox.x + objHitbox.width &&
      thisHitbox.x + thisHitbox.width > objHitbox.x &&
      thisHitbox.y < objHitbox.y + objHitbox.height &&
      thisHitbox.y + thisHitbox.height > objHitbox.y
    );
  }

  getHitbox() {
    const hitboxWidth = this.hitboxWidth || this.width;
    const hitboxHeight = this.hitboxHeight || this.height;
    const offsetX = this.hitboxOffsetX || 0;
    const offsetY = this.hitboxOffsetY || 0;

    return {
      x: this.x + offsetX,
      y: this.y + offsetY,
      width: hitboxWidth,
      height: hitboxHeight,
    };
  }

  setCustomHitbox(width, height, offsetX = 0, offsetY = 0) {
    this.hitboxWidth = width;
    this.hitboxHeight = height;
    this.hitboxOffsetX = offsetX;
    this.hitboxOffsetY = offsetY;
  }

  isColliding(MoveableObject) {
    return (
      this.x < MoveableObject.x + MoveableObject.width &&
      this.x + this.width > MoveableObject.x &&
      this.y < MoveableObject.y + MoveableObject.height &&
      this.y + this.height > MoveableObject.y
    );
  }

  isCollidingPrecise(MoveableObject, reduction = 0.4) {
    const thisMargin = {
      x: (this.width * reduction) / 2,
      y: (this.height * reduction) / 2,
    };

    const objMargin = {
      x: (MoveableObject.width * reduction) / 2,
      y: (MoveableObject.height * reduction) / 2,
    };

    return (
      this.x + thisMargin.x <
        MoveableObject.x + MoveableObject.width - objMargin.x &&
      this.x + this.width - thisMargin.x > MoveableObject.x + objMargin.x &&
      this.y + thisMargin.y <
        MoveableObject.y + MoveableObject.height - objMargin.y &&
      this.y + this.height - thisMargin.y > MoveableObject.y + objMargin.y
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
