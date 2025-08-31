class AudioManager {
  audioCache = {};
  currentAudio = null;
  musicStarted = false;

  constructor() {
    this.backgroundMusic = new BackgroundMusic();
    this.soundEffects = new SoundEffects();

    this.loadMusic(this.backgroundMusic.music_level1);
    this.loadMusic(this.backgroundMusic.music_boss);
    this.loadSounds(this.soundEffects.sounds_jump);
    this.loadSounds(this.soundEffects.sounds_hurt);
    this.loadSounds(this.soundEffects.sounds_coin);
    this.loadSounds(this.soundEffects.sounds_attack);
  }

  setupCanvasClickHandler() {
    if (this.canvas) {
      this.canvas.addEventListener("click", () => {
        if (!this.musicStarted) {
          this.playMusic(this.backgroundMusic.music_level1);
          this.musicStarted = true;
        }
      });
    }
  }

  loadMusic(array) {
    array.forEach((path) => {
      let audio = new Audio();
      audio.src = path;
      audio.loop = true;
      audio.volume = 0.2;
      this.audioCache[path] = audio;
    });
  }

  loadSounds(array) {
    array.forEach((path) => {
      let audio = new Audio();
      audio.src = path;
      audio.loop = false;
      audio.volume = 0.5;
      this.audioCache[path] = audio;
    });
  }

  playMusic(musicArray) {
    let path = musicArray[0];
    let audio = this.audioCache[path];

    if (audio && this.currentAudio !== audio) {
      this.stopCurrentMusic();
      this.currentAudio = audio;
      audio.play();
    }
  }

  playSound(soundArray) {
    let path = soundArray[0];
    let audio = this.audioCache[path];

    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  }

  stopCurrentMusic() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }
  }

  pause() {
    if (this.currentAudio) {
      this.currentAudio.pause();
    }
  }

  resume() {
    if (this.currentAudio) {
      this.currentAudio.play();
    }
  }

  setVolume(value) {
    if (this.currentAudio) {
      this.currentAudio.volume = value;
    }
  }
}
