class GameLoop {
  constructor(update, render) {
    this.update = update;
    this.render = render;
    this.running = false;
    this.lastTime = 0;
  }

  start() {
    this.running = true;
    this.lastTime = performance.now();
    requestAnimationFrame(this.loop.bind(this));
  }

  stop() {
    this.running = false;
  }

  loop(time) {
    if (!this.running) return;
    const delta = time - this.lastTime;
    this.lastTime = time;
    if (typeof this.update === "function") this.update(delta);
    if (typeof this.render === "function") this.render();
    requestAnimationFrame(this.loop.bind(this));
  }
}

export default GameLoop;
