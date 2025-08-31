class BackgroundMusic extends AudioManager {
  music_menu = ["../assets/sounds/backgroundMusic/menu-music.wav"];
  music_level1 = ["../assets/sounds/backgroundMusic/Bit Bouncer Loop 1.wav"];
  music_boss = ["../assets/sounds/backgroundMusic/boss-music.wav"];

  constructor() {
    super();
    this.loadMusic(this.music_menu);
    this.loadMusic(this.music_level1);
    this.loadMusic(this.music_boss);
  }
}
