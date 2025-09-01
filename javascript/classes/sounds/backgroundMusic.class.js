class BackgroundMusic extends AudioManager {
  music_menu = [
    "../assets/sounds/backgroundMusic/8 bit Retro Game - 1 - Red Octopus IPI 00366181942 ZAIKS-Poland.wav",
  ];
  music_level1 = ["../assets/sounds/backgroundMusic/Bit Bouncer Loop 1.wav"];
  music_boss = [
    "../assets/sounds/backgroundMusic/8 bit Retro Game - 3 - Red Octopus IPI 00366181942 ZAIKS-Poland.wav",
  ];

  constructor() {
    super();
    this.loadMusic(this.music_menu);
    this.loadMusic(this.music_level1);
    this.loadMusic(this.music_boss);
  }
}
