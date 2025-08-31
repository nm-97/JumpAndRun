class SoundEffects extends AudioManager {
  sounds_char_jump = [
    "../assets/sounds/soundEff/effects/ZEKAVEO - MOD & SFX PACK 1/ZEKAVEO - SFX Pack 1 (Retro, 2D, Side Scroller)/WAV_ZEKAVEO_Jump_SFX.wav",
  ];
  sounds_char_hurt = ["../assets/sounds/effects/hurt.wav"];
  sounds_char_attack = ["../assets/sounds/effects/sword-sound-260274.mp3"];
  sounds_char_death = [
    "../assets/sounds/effects/088543_cheesy-death-noise-82782.mp3",
  ];
  sounds_char_walk = [];

  sounds_coin = [
    "../assets/sounds/soundEff/effects/ZEKAVEO - MOD & SFX PACK 1/ZEKAVEO - SFX Pack 1 (Retro, 2D, Side Scroller)/WAV_ZEKAVEO_Coin_SFX_1.wav",
  ];

  sounds_goblin_attack = [];
  sounds_goblin_death = ["../assets/sounds/effects/goblin-scream-87564.mp3"];
  sounds_goblin_laugh = ["../assets/sounds/effects/goblin-cackle-87566.mp3"];

  sounds_demon_attack = ["../assets/sounds/effects/magic-spell-6005.mp3"];
  sounds_demon_death = [
    "../assets/sounds/soundEff/effects/ZEKAVEO - MOD & SFX PACK 1/ZEKAVEO - SFX Pack 1 (Retro, 2D, Side Scroller)/WAV_ZEKAVEO_Goblin_Death_SFX.wav",
  ];

  sounds_endboss_attack = [];
  sounds_endboss_death = [
    "../assets/sounds/effects/088543_cheesy-death-noise-82782.mp3",
  ];

  constructor() {
    super();

    this.loadSounds(this.sounds_char_jump);
    this.loadSounds(this.sounds_char_hurt);
    this.loadSounds(this.sounds_char_attack);
    this.loadSounds(this.sounds_char_death);

    this.loadSounds(this.sounds_coin);

    this.loadSounds(this.sounds_goblin_death);
    this.loadSounds(this.sounds_goblin_laugh);
    this.loadSounds(this.sounds_demon_attack);
    this.loadSounds(this.sounds_demon_death);
    this.loadSounds(this.sounds_endboss_death);
  }
}
