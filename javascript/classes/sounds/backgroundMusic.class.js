class BackgroundMusic extends AudioManager {
  music_menu = [
    "../assets/sounds/backgroundMusic/landingMusic/Bit Bouncer.mp3",
  ];
  music_level1 = [
    "../assets/sounds/backgroundMusic/levelMusic/8 bit Retro Game - 1 - Red Octopus IPI 00366181942 ZAIKS-Poland.mp3",
  ];
  music_boss = [
    "../assets/sounds/backgroundMusic/levelMusic/8 bit Retro Game - 3 - Red Octopus IPI 00366181942 ZAIKS-Poland.mp3",
  ];

  constructor() {
    super();
    this.loadMusic(this.music_menu);
    this.loadMusic(this.music_level1);
    this.loadMusic(this.music_boss);
  }
}
