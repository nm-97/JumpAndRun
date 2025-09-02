class SoundEffects extends AudioManager {
  sounds_char_jump = ["../assets/char/soundEffects/jump.wav"];
  sounds_char_hurt = ["../assets/char/soundEffects/death.wav"];
  sounds_char_attack = ["../assets/char/soundEffects/attack.mp3"];
  sounds_char_death = ["../assets/char/soundEffects/death.mp3"];
  sounds_char_walk = [];

  sounds_coin = ["../assets/char/soundEffects/collectCoin.wav"];

  sounds_goblin_attack = [
    "../assets/enemy/enemyOne/soundEffects/goblinAttack.wav",
  ];
  sounds_goblin_death = [
    "../assets/enemy/enemyOne/soundEffects/goblinDeath.wav",
  ];
  sounds_goblin_laugh = [
    "../assets/enemy/enemyOne/soundEffects/goblinLaugh.wav",
  ];

  sounds_demon_attack = [
    "../assets/enemy/enemyTwo/soundEffects/demonAttack.wav",
  ];
  sounds_demon_death = [
    "../assets/enemy/enemyTwo/soundEEffects/demonDeath.wav",
  ];

  sounds_endboss_attack = ["../assets/enemy/endboss/sounds/bossAttack.mp3"];
  sounds_endboss_death = ["../assets/enemy/endboss/sounds/bossDeath.mp3"];

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
