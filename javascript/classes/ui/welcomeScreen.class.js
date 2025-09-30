class WelcomeScreen {
  constructor(canvas, ctx, gameStateManager, audioService) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.isVisible = true;
    this.gameStarted = false;
    this.keyboard = new Keyboard();
    this.world = null;
    this.guiManager = new GUIManager(canvas, ctx);
    this.currentScreen = "welcome"; // 'welcome' oder 'options'
    this.gameStateManager = gameStateManager;
    this.audioService = audioService;
    this.musicStarted = false;

    // Setze initiale Volume-Werte
    this.initializeVolumeSettings();

    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener("keydown", (event) => {
      this.handleKeyPress(event);
    });

    this.canvas.addEventListener("click", (event) => {
      this.handleClick(event);
      // Starte Landing Music beim ersten Click (für Browser-Autoplay-Policy)
      this.startLandingMusicOnClick();
    });

    this.canvas.addEventListener("mousemove", (event) => {
      this.handleMouseMove(event);
    });
  }

  draw() {
    if (!this.isVisible) return;

    this.drawWelcomeScreen();
  }

  drawWelcomeScreen() {
    if (this.currentScreen === "welcome") {
      this.guiManager.drawWelcomeScreen(
        () => this.startGame(),
        () => this.showOptions()
      );
    } else if (this.currentScreen === "options") {
      this.guiManager.drawOptionsScreen(() => this.showWelcome());
    }
  }

  showOptions() {
    this.currentScreen = "options";
    this.gameStateManager.setState("options");
    console.log("Showing options screen");
  }

  showWelcome() {
    this.currentScreen = "welcome";
    this.gameStateManager.setState("welcome");
    console.log("Showing welcome screen");
    // Starte Landing Music wieder
    this.audioService.backgroundMusic.playMusic(
      this.audioService.backgroundMusic.music_menu
    );
    this.musicStarted = true;
  }

  animate() {
    if (!this.gameStarted) {
      this.draw();
      requestAnimationFrame(() => this.animate());
    }
  }

  startGame() {
    this.gameStarted = true;
    this.isVisible = false;
    this.gameStateManager.setState("running");

    // Stoppe Landing Music
    if (this.musicStarted) {
      console.log("Stopping landing music...");
      this.audioService.backgroundMusic.stopCurrentMusic();
      this.musicStarted = false;
    }

    // Erstelle World-Instanz und übergebe zentrale Manager
    this.world = new World(
      this.canvas,
      this.keyboard,
      this.gameStateManager,
      this.audioService
    );

    // Übertrage Volume-Einstellungen auf World-System
    this.transferVolumeSettingsToWorld();
  }

  restart() {
    this.gameStarted = false;
    this.isVisible = true;
    this.world = null;
    this.currentScreen = "welcome";
    this.musicStarted = false; // Reset music state

    // Starte Animation wieder
    this.animate();
  }

  handleKeyPress(event) {
    if (!this.isVisible || this.gameStarted) return;

    if (event.code === "Space" && this.currentScreen === "welcome") {
      this.startGame();
    } else if (event.code === "Escape") {
      if (this.currentScreen === "options") {
        this.showWelcome();
      }
    }
  }

  handleClick(event) {
    if (!this.isVisible) return;

    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.guiManager.handleClick(x, y);
  }

  handleMouseMove(event) {
    if (!this.isVisible) return;

    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.guiManager.handleMouseMove(x, y);
  }

  startLandingMusicOnClick() {
    if (!this.musicStarted && this.currentScreen === "welcome") {
      console.log("Starting landing music on user interaction...");
      this.audioService.backgroundMusic.playMusic(
        this.audioService.backgroundMusic.music_menu
      );
      this.musicStarted = true;
    }
  }

  initializeVolumeSettings() {
    // Setze Volume-Werte aus GUIManager
    const soundEffectsVolume = this.guiManager.getSoundEffectsVolume();
    const musicVolume = this.guiManager.getMusicVolume();

    console.log(
      `Initializing volumes: Sound Effects=${Math.round(
        soundEffectsVolume * 100
      )}%, Music=${Math.round(musicVolume * 100)}%`
    );

    // Setze Volume für AudioService
    this.audioService.setMusicVolume(musicVolume);
    this.audioService.setSoundEffectsVolume(soundEffectsVolume);
  }

  transferVolumeSettingsToWorld() {
    if (this.world) {
      const soundEffectsVolume = this.guiManager.getSoundEffectsVolume();
      const musicVolume = this.guiManager.getMusicVolume();

      console.log(
        `Transferring volumes to World: Sound Effects=${Math.round(
          soundEffectsVolume * 100
        )}%, Music=${Math.round(musicVolume * 100)}%`
      );

      // Setze Volume für AudioService
      this.audioService.setSoundEffectsVolume(soundEffectsVolume);
      this.audioService.setMusicVolume(musicVolume);
    }
  }

  hide() {
    this.isVisible = false;
  }

  show() {
    this.isVisible = true;
  }
}
