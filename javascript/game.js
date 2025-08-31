let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  world = new World(canvas, keyboard);
}
