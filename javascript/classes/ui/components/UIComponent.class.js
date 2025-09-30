class UIComponent {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.visible = true;
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  setValue(value) {
    this.value = value;
  }

  onChange(callback) {
    this.onChange = callback;
  }
}
