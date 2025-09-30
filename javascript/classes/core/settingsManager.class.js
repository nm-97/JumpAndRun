class SettingsManager {
  constructor() {
    this.settings = {
      musicVolume: 1.0,
      soundEffectsVolume: 1.0,
      difficulty: "normal",
      controls: {
        left: "ArrowLeft",
        right: "ArrowRight",
        jump: "Space",
        attack: "KeyF",
      },
    };
  }

  get(key) {
    return this.settings[key];
  }

  set(key, value) {
    this.settings[key] = value;
  }

  getAll() {
    return this.settings;
  }
}

export default SettingsManager;
