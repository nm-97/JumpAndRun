class Keyboard {
  KeyA = false;
  KeyS = false;
  KeyD = false;
  KeyW = false;
  KeyF = false;
  Space = false;
  Enter = false;
  Escape = false;

  constructor() {
    this.bindKeyPressEvents();
  }

  bindKeyPressEvents() {
    window.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "KeyA":
          this.KeyA = true;
          break;
        case "KeyS":
          this.KeyS = true;
          break;
        case "KeyD":
          this.KeyD = true;
          break;
        case "KeyW":
          this.KeyW = true;
          break;
        case "KeyF":
          this.KeyF = true;
          break;
        case "Space":
          this.Space = true;
          break;
        case "Enter":
          this.Enter = true;
          break;
        case "Escape":
          this.Escape = true;
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      switch (e.code) {
        case "KeyA":
          this.KeyA = false;
          break;
        case "KeyS":
          this.KeyS = false;
          break;
        case "KeyD":
          this.KeyD = false;
          break;
        case "KeyW":
          this.KeyW = false;
          break;
        case "KeyF":
          this.KeyF = false;
          break;
        case "Space":
          this.Space = false;
          break;
        case "Enter":
          this.Enter = false;
          break;
        case "Escape":
          this.Escape = false;
          break;
      }
    });
  }
}
