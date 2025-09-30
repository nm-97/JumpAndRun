class AudioManager {
  audioCache = {};
  currentAudio = null;
  musicStarted = false;
  masterVolume = 1.0;
  soundEffectsVolume = 1.0;
  musicVolume = 1.0;

  constructor() {}

  setupCanvasClickHandler() {
    if (this.canvas) {
      this.canvas.addEventListener("click", () => {
        if (!this.musicStarted) {
          if (this.music_level1) {
            this.playMusic(this.music_level1);
            this.musicStarted = true;
          }
        }
      });
    }
  }

  loadMusic(array) {
    array.forEach((path) => {
      let audio = new Audio();
      audio.src = path;
      audio.loop = true;
      audio.volume = this.masterVolume * this.musicVolume * 0.2;
      this.audioCache[path] = audio;
    });
  }

  loadSounds(array) {
    array.forEach((path) => {
      let audio = new Audio();
      audio.src = path;
      audio.loop = false;
      audio.volume = this.masterVolume * this.soundEffectsVolume * 0.5;
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

  playSoundWithVolume(soundArray, volume) {
    let path = soundArray[0];
    let audio = this.audioCache[path];

    if (audio) {
      const originalVolume = audio.volume;
      audio.volume = volume;
      audio.currentTime = 0;
      audio.play();

      setTimeout(() => {
        audio.volume = originalVolume;
      }, 100);
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

  stopAllSounds() {
    // Stoppe alle Audio-Elemente im Cache
    Object.values(this.audioCache).forEach((audio) => {
      if (audio && !audio.loop) {
        // Nur Sound-Effekte stoppen, nicht Musik
        audio.pause();
        audio.currentTime = 0;
      }
    });
  }

  stopEverything() {
    console.log("AudioManager: Stopping everything...");

    // Stoppe absolut alles - Musik und Sound-Effekte
    Object.values(this.audioCache).forEach((audio, index) => {
      if (audio) {
        try {
          audio.pause();
          audio.currentTime = 0;
          audio.volume = 0; // Setze Volume auf 0 als zusätzliche Sicherheit
          console.log(`Stopped audio ${index}`);
        } catch (e) {
          console.log(`Error stopping audio ${index}:`, e);
        }
      }
    });

    // Stoppe auch die aktuelle Musik
    this.stopCurrentMusic();
    this.currentAudio = null;
    this.musicStarted = false; // Reset music started flag

    console.log("AudioManager: Everything stopped");
  }

  setVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    this.updateAllVolumes();
  }

  setSoundEffectsVolume(volume) {
    this.soundEffectsVolume = Math.max(0, Math.min(1, volume));
    this.updateAllVolumes();
  }

  setMusicVolume(volume) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    this.updateMusicVolume();
  }

  updateAllVolumes() {
    // Update Sound Effects Volume
    Object.keys(this.audioCache).forEach((key) => {
      const audio = this.audioCache[key];
      if (audio && !audio.loop) {
        // Sound effects (nicht looping)
        audio.volume = this.masterVolume * this.soundEffectsVolume * 0.5; // Base volume 0.5
      }
    });
  }

  updateMusicVolume() {
    // Update Music Volume
    Object.keys(this.audioCache).forEach((key) => {
      const audio = this.audioCache[key];
      if (audio && audio.loop) {
        // Background Music (looping)
        audio.volume = this.masterVolume * this.musicVolume * 0.2; // Base volume 0.2
      }
    });

    // Update current playing music
    if (this.currentAudio) {
      this.currentAudio.volume = this.masterVolume * this.musicVolume * 0.2;
    }
  }

  getVolume() {
    return this.masterVolume;
  }

  getSoundEffectsVolume() {
    return this.soundEffectsVolume;
  }

  getMusicVolume() {
    return this.musicVolume;
  }

  setSoundEffectsVolume(volume) {
    this.soundEffectsVolume = Math.max(0, Math.min(1, volume));
    console.log(
      `AudioManager: Sound effects volume set to ${Math.round(
        this.soundEffectsVolume * 100
      )}%`
    );

    // Update volume für alle Sound-Effects im Cache
    Object.keys(this.audioCache).forEach((path) => {
      const audio = this.audioCache[path];
      if (!audio.loop) {
        // Sound effects haben loop = false
        audio.volume = this.masterVolume * this.soundEffectsVolume * 0.5;
      }
    });
  }

  setMusicVolume(volume) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    console.log(
      `AudioManager: Music volume set to ${Math.round(this.musicVolume * 100)}%`
    );

    // Update volume für alle Musik im Cache und aktuell spielende Musik
    Object.keys(this.audioCache).forEach((path) => {
      const audio = this.audioCache[path];
      if (audio.loop) {
        // Musik hat loop = true
        audio.volume = this.masterVolume * this.musicVolume * 0.2;
      }
    });

    // Update auch die aktuell spielende Musik
    if (this.currentAudio) {
      this.currentAudio.volume = this.masterVolume * this.musicVolume * 0.2;
    }
  }
}
