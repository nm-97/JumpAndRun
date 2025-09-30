class AudioService {
  constructor() {
    this.backgroundMusic = new BackgroundMusic();
    this.soundEffects = new SoundEffects();
  }

  setMusicVolume(volume) {
    this.backgroundMusic.setMusicVolume(volume);
  }

  setSoundEffectsVolume(volume) {
    this.soundEffects.setSoundEffectsVolume(volume);
  }

  stopAll() {
    this.backgroundMusic.stopEverything();
    this.soundEffects.stopEverything();
  }

  stopEffects() {
    this.soundEffects.stopAllSounds();
  }

  playCoinSound() {
    if (
      this.soundEffects &&
      typeof this.soundEffects.playCoinSound === "function"
    ) {
      this.soundEffects.playCoinSound();
    }
  }

  playHitSound() {
    if (
      this.soundEffects &&
      typeof this.soundEffects.playHitSound === "function"
    ) {
      this.soundEffects.playHitSound();
    }
  }
}
