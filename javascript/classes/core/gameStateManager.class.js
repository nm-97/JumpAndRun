class GameStateManager {
  constructor() {
    this.state = "welcome"; // welcome, running, paused, gameOver, options
  }

  setState(newState) {
    this.state = newState;
    // Hier könnte man Events triggern
  }

  getState() {
    return this.state;
  }

  isRunning() {
    return this.state === "running";
  }

  isPaused() {
    return this.state === "paused";
  }

  isGameOver() {
    return this.state === "gameOver";
  }

  isWelcome() {
    return this.state === "welcome";
  }

  isOptions() {
    return this.state === "options";
  }
}
