class SoundEffects extends AudioManager {
  sounds_char_jump = ["../assets/char/soundEffects/jump.wav"];
  sounds_char_hurt = [];
  sounds_char_attack = ["../assets/char/soundEffects/attack.mp3"];
  sounds_char_death = ["../assets/char/soundEffects/death.mp3"];
  sounds_char_walk = [];

  sounds_coin = ["../assets/coin/retro-coin-4-236671.mp3"];

  sounds_goblin_attack = [
    "../assets/enemy/enemyOne/soundEffects/goblinAttack.wav",
  ];
  sounds_goblin_death = ["../assets/enemy/enemyOne/soundEffects/death.mp3"];
  sounds_goblin_laugh = ["../assets/enemy/enemyOne/soundEffects/laugh.mp3"];

  sounds_demon_attack = ["../assets/enemy/enemyTwo/sounds/demonAttack.wav"];
  sounds_demon_death = [];

  sounds_endboss_attack = [];
  sounds_endboss_death = [];

  sounds_fireBlazer = ["../assets/traps/flame.wav"];
  sounds_spike = ["../assets/traps/spikeTrap.wav"];
  sounds_jumper = ["../assets/traps/srpringTrap.wav"];

  constructor() {
    super();

    this.loadSounds(this.sounds_char_jump);
    this.loadSounds(this.sounds_char_hurt);
    this.loadSounds(this.sounds_char_attack);
    this.loadSounds(this.sounds_char_death);
    this.loadSounds(this.sounds_coin);

    this.loadSounds(this.sounds_goblin_attack);
    this.loadSounds(this.sounds_goblin_death);
    this.loadSounds(this.sounds_goblin_laugh);
    this.loadSounds(this.sounds_demon_attack);
    this.loadSounds(this.sounds_demon_death);

    this.loadSounds(this.sounds_fireBlazer);
    this.loadSounds(this.sounds_spike);
    this.loadSounds(this.sounds_jumper);
  }

  playHitSound() {
    if (this.sounds_char_hurt && this.sounds_char_hurt.length > 0) {
      this.playSound(this.sounds_char_hurt);
    } else if (this.sounds_char_attack && this.sounds_char_attack.length > 0) {
      this.playSound(this.sounds_char_attack);
    }
  }

  playJumpSound() {
    if (this.sounds_char_jump && this.sounds_char_jump.length > 0) {
      this.playSound(this.sounds_char_jump);
    }
  }

  playAttackSound() {
    if (this.sounds_char_attack && this.sounds_char_attack.length > 0) {
      this.playSound(this.sounds_char_attack);
    }
  }

  playCoinSound() {
    if (this.sounds_coin && this.sounds_coin.length > 0) {
      this.playSound(this.sounds_coin);
    }
  }

  playDeathSound() {
    if (this.sounds_char_death && this.sounds_char_death.length > 0) {
      this.playSound(this.sounds_char_death);
    }
  }

  playFireBlazerSound() {
    if (this.sounds_fireBlazer && this.sounds_fireBlazer.length > 0) {
      this.playSoundWithVolume(this.sounds_fireBlazer, 0.15);
    }
  }

  playSpikeSound() {
    if (this.sounds_spike && this.sounds_spike.length > 0) {
      this.playSoundWithVolume(this.sounds_spike, 0.15);
    }
  }

  playJumperSound() {
    if (this.sounds_jumper && this.sounds_jumper.length > 0) {
      this.playSoundWithVolume(this.sounds_jumper, 0.2);
    }
  }

  playGoblinLaughSound() {
    if (this.sounds_goblin_laugh && this.sounds_goblin_laugh.length > 0) {
      this.playSound(this.sounds_goblin_laugh);
    }
  }
}
