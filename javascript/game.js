// Stellt sicher, dass window.keyboard existiert
if (!window.keyboard) {
  window.keyboard = new Keyboard();
}
// Touch-UI Event-Handling inkl. Menü-Button
window.addEventListener("DOMContentLoaded", () => {
  const leftBtn = document.getElementById("touch-left");
  const rightBtn = document.getElementById("touch-right");
  const jumpBtn = document.getElementById("touch-jump");
  const attackBtn = document.getElementById("touch-attack");
  const menuBtn = document.getElementById("touch-menu");

  if (leftBtn) {
    leftBtn.addEventListener(
      "touchstart",
      () => (window.keyboard.KeyLeft = true)
    );
    leftBtn.addEventListener(
      "touchend",
      () => (window.keyboard.KeyLeft = false)
    );
  }
  if (rightBtn) {
    rightBtn.addEventListener(
      "touchstart",
      () => (window.keyboard.KeyRight = true)
    );
    rightBtn.addEventListener(
      "touchend",
      () => (window.keyboard.KeyRight = false)
    );
  }
  if (jumpBtn) {
    jumpBtn.addEventListener(
      "touchstart",
      () => (window.keyboard.Space = true)
    );
    jumpBtn.addEventListener("touchend", () => (window.keyboard.Space = false));
  }
  if (attackBtn) {
    attackBtn.addEventListener(
      "touchstart",
      () => (window.keyboard.KeyF = true)
    );
    attackBtn.addEventListener(
      "touchend",
      () => (window.keyboard.KeyF = false)
    );
  }
  if (menuBtn) {
    menuBtn.addEventListener("touchstart", () => {
      if (window.world && typeof window.world.pauseGame === "function") {
        window.world.pauseGame();
      }
    });
  }
});
// Removed Touch-UI Event-Handling
window.addEventListener("DOMContentLoaded", () => {
  const leftBtn = document.getElementById("touch-left");
  const rightBtn = document.getElementById("touch-right");
  const jumpBtn = document.getElementById("touch-jump");
  const attackBtn = document.getElementById("touch-attack");

  if (leftBtn) {
    leftBtn.addEventListener(
      "touchstart",
      () => (window.keyboard.KeyLeft = true)
    );
    leftBtn.addEventListener(
      "touchend",
      () => (window.keyboard.KeyLeft = false)
    );
  }
  if (rightBtn) {
    rightBtn.addEventListener(
      "touchstart",
      () => (window.keyboard.KeyRight = true)
    );
    rightBtn.addEventListener(
      "touchend",
      () => (window.keyboard.KeyRight = false)
    );
  }
  if (jumpBtn) {
    jumpBtn.addEventListener(
      "touchstart",
      () => (window.keyboard.Space = true)
    );
    jumpBtn.addEventListener("touchend", () => (window.keyboard.Space = false));
  }
  if (attackBtn) {
    attackBtn.addEventListener(
      "touchstart",
      () => (window.keyboard.KeyF = true)
    );
    attackBtn.addEventListener(
      "touchend",
      () => (window.keyboard.KeyF = false)
    );
  }
});
let canvas;
let ctx;
let world;
let welcomeScreen;
let keyboard = new Keyboard();

// Neue zentrale Manager
let gameStateManager = new GameStateManager();
let audioService = new AudioService();

// Import zentrale Manager-Klassen
function init() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  ctx.imageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;

  // Starte mit Welcome Screen anstatt direkt ins Spiel
  welcomeScreen = new WelcomeScreen(
    canvas,
    ctx,
    gameStateManager,
    audioService
  );
  window.welcomeScreen = welcomeScreen; // Global verfügbar machen
  welcomeScreen.animate();
}

// Globale Funktion für Rückkehr zum Welcome Screen
window.returnToWelcomeScreen = function () {
  console.log("Returning to welcome screen...");

  // Stoppe und entferne World-Instanz
  if (world) {
    world.stopAllIntervals();
    world = null;
  }

  // Erstelle neuen Welcome Screen mit zentralen Managern
  welcomeScreen = new WelcomeScreen(
    canvas,
    ctx,
    gameStateManager,
    audioService
  );
  window.welcomeScreen = welcomeScreen; // Global verfügbar machen
  welcomeScreen.animate();
};
