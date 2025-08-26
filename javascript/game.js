let canvas;
let ctx;
let world;

function init() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  // Erstelle die Welt erst hier, nachdem alle Klassen geladen sind
  world = new World();

  console.log("My Character: ", world.char);
}
