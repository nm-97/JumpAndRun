let canvas;
let ctx;
let world;

function init() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  world = new World(canvas);

  console.log("My Character: ", world.char);
}
