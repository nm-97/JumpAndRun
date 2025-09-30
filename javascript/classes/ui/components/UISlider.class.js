import { UIComponent } from "./UIComponent.class.js";
import EventManager from "../../core/eventManager.class.js";

class UISlider extends UIComponent {
  eventManager = new EventManager();
  super.setValue(value);
  this.eventManager.emit("sliderChange", { value, slider: this });
  constructor(x, y, width, height, value, onChange) {
    super(x, y, width, height);
    this.value = value;
    this.onChange = onChange;
  }

  draw(ctx, label) {
    if (!this.visible) return;
    ctx.fillStyle = "#333";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "#FFD700";
    ctx.fillRect(this.x, this.y, this.width * this.value, this.height);
    ctx.strokeStyle = "#666";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "#fff";
    ctx.font = "14px Arial";
    ctx.fillText(label, this.x + this.width + 10, this.y + this.height / 2 + 5);
  }

  isPointInSlider(x, y) {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }
}
