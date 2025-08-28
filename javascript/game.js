let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  world = new World(canvas, keyboard);

  console.log("My Character: ", world.char);
}

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "KeyA":
      keyboard.KeyA = true;
      break;
    case "KeyD":
      keyboard.KeyD = true;
      break;
    case "KeyS":
      keyboard.KeyS = true;
      break;
    case "KeyF":
      keyboard.KeyF = true;
      break;
    case "KeyW":
      keyboard.KeyW = true;
      break;
    case "Enter":
      keyboard.Enter = true;
      break;
    case "Space":
      keyboard.Space = true;
      break;
    case "Escape":
      keyboard.Escape = true;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.code) {
    case "KeyA":
      keyboard.KeyA = false;
      break;
    case "KeyD":
      keyboard.KeyD = false;
      break;
    case "KeyS":
      keyboard.KeyS = false;
      break;
    case "KeyF":
      keyboard.KeyF = false;
      break;
    case "KeyW":
      keyboard.KeyW = false;
      break;
    case "Enter":
      keyboard.Enter = false;
      break;
    case "Space":
      keyboard.Space = false;
      break;
    case "Escape":
      keyboard.Escape = false;
      break;
  }
});
