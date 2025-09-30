import EventManager from "../../core/eventManager.class.js";

class UIButton {
  eventManager = new EventManager();
  constructor(x, y, width, height, assetName, onClick) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.assetName = assetName;
    this.onClick = onClick;
    this.isHovered = false;
    this.scale = 1.0;
  }
  click() {
    if (typeof this.onClick === "function") {
      this.onClick();
    }
    this.eventManager.emit("buttonClick", { button: this });
  }

  draw(ctx, assets) {
    const asset = assets[this.assetName];
    if (asset && asset.complete) {
      ctx.save();
      const drawWidth = this.width * this.scale;
      const drawHeight = this.height * this.scale;
      const drawX = this.x - (drawWidth - this.width) / 2;
      const drawY = this.y - (drawHeight - this.height) / 2;
      ctx.drawImage(asset, drawX, drawY, drawWidth, drawHeight);
      ctx.restore();
    } else {
      ctx.fillStyle = this.isHovered ? "#555" : "#333";
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }

  isPointInButton(x, y) {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }
}
