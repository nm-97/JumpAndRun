class World {
  camera_x = 0;
  camera_y = 0;
  statusBar = new statusBar();
  coinCounter = new CoinCounter();
  debugMode = true;
  gameRunning = true;
  isGameOver = false;
  isDying = false;
  isPaused = false;
  showingInGameMenu = false;
  showingInGameOptions = false;
  collisionInterval = null;
  animationId = null;

  constructor(canvas, keyboard, gameStateManager, audioService) {
    console.log("Creating World instance...");

    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.guiManager = new GUIManager(canvas, canvas.getContext("2d"));
    this.gameStateManager = gameStateManager;
    this.audioService = audioService;
    this.backgroundMusic = audioService.backgroundMusic;
    this.soundEffects = audioService.soundEffects;

    // Wichtig: Stoppe alle vorherigen Intervals falls sie existieren
    this.stopAllIntervals();

    // Initialisiere das Spiel
    this.initializeGame();

    this.setupClickListener();
    this.startCollisionChecking();
    this.draw();
  }

  stopAllIntervals() {
    // Globale Cleanup-Funktion für alle laufenden Intervals
    console.log("Stopping all intervals...");

    // Stoppe das aktuelle Collision-Interval falls vorhanden
    if (this.collisionInterval) {
      clearInterval(this.collisionInterval);
      this.collisionInterval = null;
    }

    // Stoppe auch alle anderen möglichen Intervals
    // (falls andere Teile des Codes welche erstellt haben)
    for (let i = 1; i < 99999; i++) {
      clearInterval(i);
    }

    console.log("All intervals stopped");
  }

  initializeGame() {
    console.log("Initializing game state...");

    this.level = new levelOne();
    this.enemies = this.level.getEnemies();
    this.background = this.level.getBackground();
    this.endboss = this.level.getEndboss();
    this.char = new char();
    this.demonProjectiles = [];
    this.statusBar = new statusBar();
    this.coinCounter = new CoinCounter();

    // Reset states
    this.gameRunning = true;
    this.isGameOver = false;
    this.isDying = false;
    this.isPaused = false;
    this.showingInGameMenu = false;
    this.camera_x = 0;
    this.camera_y = 0;

    // Setze globale Referenz für Volume-Steuerung
    window.world = this;

    // Starte Level-Musik direkt (da Spiel nach Benutzerinteraktion gestartet wird)
    this.startLevelMusic();
    this.setupEscapeKeyListener();
    this.setWorld();
  }

  startLevelMusic() {
    console.log("Starting level music...");
    if (this.backgroundMusic && this.backgroundMusic.music_level1) {
      this.audioService.setMusicVolume(
        this.audioService.backgroundMusic.musicVolume
      );
      this.backgroundMusic.playMusic(this.backgroundMusic.music_level1);
      this.backgroundMusic.musicStarted = true;
    }
  }

  setWorld() {
    this.char.world = this;
    this.char.keyboard = this.keyboard;

    this.enemies.forEach((enemy) => {
      if (enemy instanceof demon) {
        enemy.world = this;
      } else if (enemy instanceof goblin) {
        enemy.world = this;
      }
    });

    this.level.getAllTraps().forEach((trap) => {
      trap.world = this;
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.gameRunning || this.isDying || this.showingInGameMenu) {
      // Normales Spiel, Death Animation oder pausiertes Spiel mit Menü zeichnen
      this.ctx.translate(this.camera_x, this.camera_y);
      this.addObjectsToMap(this.background);
      this.addObjectsToMap(this.level.getAllTiles());
      this.addObjectsToMap(this.level.getAllDecorations());
      this.addObjectsToMap(this.level.getAllCollectibles());
      this.addObjectsToMap(this.level.getAllTraps());
      this.addToMap(this.char); // Character mit Death Animation

      // Nur wenn nicht dying, zeichne auch Enemies und Projectiles
      if (!this.isDying) {
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.demonProjectiles);
      }

      this.ctx.translate(-this.camera_x, -this.camera_y);
      this.addToMap(this.statusBar);
      this.addToMap(this.coinCounter);
    }

    // Zeichne In-Game-Menü über das Spiel (außerhalb des gameRunning Blocks)
    if (this.showingInGameMenu) {
      this.guiManager.drawInGameMenu(
        () => this.resumeGame(),
        () => this.restart(),
        () => this.showInGameOptions(),
        () => this.quitToMainMenu()
      );
    }

    // Zeichne In-Game Options Screen (außerhalb des gameRunning Blocks)
    if (this.showingInGameOptions) {
      this.guiManager.drawInGameOptionsScreen(() => this.backToInGameMenu());
    }

    if (this.isGameOver) {
      // Game Over Screen zeichnen
      this.guiManager.drawGameOverScreen(
        () => this.restart(),
        () => this.quit()
      );
    }

    this.animationId = requestAnimationFrame(this.draw.bind(this));
  }

  startCollisionChecking() {
    // Stoppe vorheriges Interval falls vorhanden
    if (this.collisionInterval) {
      console.log(
        "Stopping previous collision interval:",
        this.collisionInterval
      );
      clearInterval(this.collisionInterval);
      this.collisionInterval = null;
    }

    this.collisionInterval = setInterval(() => {
      if (this.gameRunning && !this.isDying) {
        this.checkEnemyCollisions();
        this.checkTrapCollisions();
        this.checkCoinCollisions();
        this.checkAttackCollisions();
        this.checkProjectileCollisions();
      }
    }, 1000 / 60);

    console.log("Started new collision interval:", this.collisionInterval);
  }

  checkEnemyCollisions() {
    let isColliding = false;

    this.enemies.forEach((enemy) => {
      if (this.char.isCollidingWithCustomHitbox(enemy)) {
        if (
          (enemy instanceof goblin || enemy instanceof demon) &&
          enemy.canDealDamage
        ) {
          this.handleEnemyHit();
          isColliding = true;
        } else if (!(enemy instanceof goblin) && !(enemy instanceof demon)) {
          this.handleEnemyHit();
          isColliding = true;
        }
      }
    });

    if (!isColliding) {
      this.handleNoCollision();
    }
  }

  checkTrapCollisions() {
    this.level.getAllTraps().forEach((trap) => {
      if (this.char.isCollidingWithCustomHitbox(trap)) {
        this.handleTrapHit(trap);
      }
    });
  }

  checkCoinCollisions() {
    this.level.getAllCollectibles().forEach((collectible, index) => {
      if (
        collectible instanceof Coin &&
        this.char.isCollidingWithCustomHitbox(collectible)
      ) {
        this.handleCoinCollection(collectible, index);
      }
    });
  }

  handleCoinCollection(coin, index) {
    this.level.coins.splice(index, 1);
    this.coinCounter.incrementCoin();

    if (this.soundEffects) {
      console.log("Playing coin sound - Interval ID:", this.collisionInterval);
      if (
        this.audioService &&
        typeof this.audioService.playCoinSound === "function"
      ) {
        this.audioService.playCoinSound();
      }
    }
  }

  checkAttackCollisions() {
    if (this.char.isAttacking) {
      this.enemies.forEach((enemy, index) => {
        if (
          this.char.isCollidingWithCustomHitbox(enemy) &&
          this.canEnemyTakeDamage(enemy)
        ) {
          this.handleEnemyDamage(enemy, index);
        }
      });
    }
  }

  handleEnemyDamage(enemy, index) {
    enemy.startHurtAnimation();
    enemy.takeDamage();
    enemy.lastHurtTime = new Date().getTime();

    if (enemy.energy <= 0) {
      enemy.isDead = true;

      // Spiele Death Sound je nach Enemy-Typ
      if (enemy instanceof goblin && this.soundEffects) {
        this.soundEffects.playGoblinDeathSound();
      }

      setTimeout(() => {
        this.enemies.splice(index, 1);
      }, 1500);
    }
  }

  canEnemyTakeDamage(enemy) {
    const timePassed = new Date().getTime() - enemy.lastHurtTime;
    return timePassed > 1000;
  }

  handleTrapHit(trap) {
    if (this.canCharTakeDamage()) {
      this.char.isHurt = true;

      // Spiele spezifische Trap-Sounds ab bei Kollision
      if (this.soundEffects) {
        if (trap instanceof Jumper) {
          this.soundEffects.playJumperSound();
          // Jumper aktivieren anstatt Schaden
          if (!trap.isActivated) {
            this.char.velocityY = -20;
            trap.isActivated = true;
            setTimeout(() => {
              trap.isActivated = false;
            }, 1000);
            return; // Kein Schaden für Jumper
          }
        }
      }

      this.char.takeDamage(1);
      this.statusBar.setHealth(this.char.energy);
    }
  }

  handleEnemyHit() {
    if (this.canCharTakeDamage()) {
      this.char.isHurt = true;
      this.char.takeDamage(1);
      this.statusBar.setHealth(this.char.energy);
    }
  }

  handleNoCollision() {
    if (this.canCharTakeDamage()) {
      this.char.isHurt = false;
    }
  }

  canCharTakeDamage() {
    const timePassed = new Date().getTime() - this.char.lastHurtTime;
    return timePassed > 1750;
  }

  addObjectsToMap(Objects) {
    Objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(MoveableObject) {
    if (MoveableObject.otherDirection) {
      this.ctx.save();
      this.ctx.translate(MoveableObject.width, 0);
      this.ctx.scale(-1, 1);
      MoveableObject.x = MoveableObject.x * -1;
    }
    MoveableObject.draw(this.ctx);

    if (
      this.debugMode &&
      (MoveableObject instanceof char ||
        MoveableObject instanceof goblin ||
        MoveableObject instanceof demon ||
        MoveableObject instanceof endboss ||
        MoveableObject instanceof DemonProjectile)
    ) {
      MoveableObject.drawFrame(this.ctx);
    }

    if (MoveableObject.otherDirection) {
      MoveableObject.x = MoveableObject.x * -1;
      this.ctx.restore();
    }
  }

  checkProjectileCollisions() {
    for (let i = this.demonProjectiles.length - 1; i >= 0; i--) {
      const projectile = this.demonProjectiles[i];

      if (this.char.isCollidingWithCustomHitbox(projectile)) {
        this.handleProjectileHit();
        projectile.destroy();
        this.demonProjectiles.splice(i, 1);
      } else if (projectile.isOffScreen()) {
        projectile.destroy();
        this.demonProjectiles.splice(i, 1);
      }
    }
  }

  handleProjectileHit() {
    if (this.canCharTakeDamage()) {
      this.char.isHurt = true;
      this.char.takeDamage(1);
      this.statusBar.setHealth(this.char.energy);
      if (
        this.audioService &&
        typeof this.audioService.playHitSound === "function"
      ) {
        this.audioService.playHitSound();
      }
    }
  }

  startDeathSequence() {
    console.log("Starting death sequence...");

    // Aktiviere Death-Modus (Spiel läuft noch für Animation, aber keine Kollisionen)
    this.isDying = true;
    this.gameRunning = false;

    // Stoppe andere Sound-Effekte außer Death Sound
    if (
      this.soundEffects &&
      typeof this.soundEffects.stopAllSounds === "function"
    ) {
      this.soundEffects.stopAllSounds();
    }
  }

  showGameOverScreen() {
    console.log("Activating Game Over Screen...");

    // Stoppt das Spiel komplett und aktiviert Game Over Modus
    this.gameRunning = false;
    this.isDying = false;
    this.isGameOver = true;

    // Stoppe ALLE Intervals sofort
    this.stopAllIntervals();

    // Stoppe alle Sound-Effekte und Musik komplett
    console.log("Stopping all sounds...");
    if (
      this.soundEffects &&
      typeof this.soundEffects.stopEverything === "function"
    ) {
      this.soundEffects.stopEverything();
    }

    if (
      this.backgroundMusic &&
      typeof this.backgroundMusic.stopEverything === "function"
    ) {
      this.backgroundMusic.stopEverything();
    }

    // Stoppe alle Animationen der Charaktere und Feinde
    this.stopAllAnimations();

    console.log(
      "Game Over Screen activated - all sounds, animations and intervals stopped"
    );
  }

  stopAllAnimations() {
    // Stoppe Character-Animationen
    if (this.char && typeof this.char.stopAllAnimations === "function") {
      this.char.stopAllAnimations();
    }

    // Stoppe Enemy-Animationen
    if (this.enemies) {
      this.enemies.forEach((enemy) => {
        if (enemy && typeof enemy.stopAllAnimations === "function") {
          enemy.stopAllAnimations();
        }
      });
    }

    // Stoppe Projectile-Animationen
    if (this.demonProjectiles) {
      this.demonProjectiles.forEach((projectile) => {
        if (projectile && typeof projectile.stopAnimation === "function") {
          projectile.stopAnimation();
        }
      });
    }
  }

  restart() {
    console.log("Restarting game - resetting current instance...");

    // WICHTIG: Zuerst alle Intervals stoppen
    this.stopAllIntervals();

    // Stoppe alle laufenden Sound-Effekte und Musik
    if (
      this.soundEffects &&
      typeof this.soundEffects.stopEverything === "function"
    ) {
      this.soundEffects.stopEverything();
    }

    if (
      this.backgroundMusic &&
      typeof this.backgroundMusic.stopEverything === "function"
    ) {
      this.backgroundMusic.stopEverything();
    }

    // Stoppe alle Animationen
    this.stopAllAnimations();

    // Leere die Buttons
    this.guiManager.clearButtons();

    // Kurze Pause um sicherzustellen dass alles gestoppt ist
    setTimeout(() => {
      // Reinitialize das gesamte Spiel
      this.initializeGame();

      // Starte Collision Checking neu
      this.startCollisionChecking();

      console.log("Game restarted successfully");
    }, 100);
  }

  quit() {
    // Gehe zurück zum Welcome Screen
    console.log("Returning to welcome screen...");

    // Stoppe das aktuelle Spiel
    this.gameRunning = false;
    this.isGameOver = false;

    // Stoppe Musik
    if (
      this.backgroundMusic &&
      typeof this.backgroundMusic.stopCurrentMusic === "function"
    ) {
      this.backgroundMusic.stopCurrentMusic();
    }

    // Leere das Canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Zeige Welcome Screen
    if (window.welcomeScreen) {
      window.welcomeScreen.gameStarted = false;
      window.welcomeScreen.isVisible = true;
      window.welcomeScreen.world = null;
      window.welcomeScreen.animate();
    }
  }

  setupClickListener() {
    // Verwende einmalige Event Listener
    if (!this.clickHandler) {
      this.clickHandler = (event) => {
        if (
          this.isGameOver ||
          this.showingInGameMenu ||
          this.showingInGameOptions
        ) {
          const rect = this.canvas.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          console.log("Click detected at:", x, y);
          this.guiManager.handleClick(x, y);
        }
      };

      this.mouseMoveHandler = (event) => {
        if (
          this.isGameOver ||
          this.showingInGameMenu ||
          this.showingInGameOptions
        ) {
          const rect = this.canvas.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          this.guiManager.handleMouseMove(x, y);
        }
      };

      this.canvas.addEventListener("click", this.clickHandler);
      this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
    }
  }

  setupEscapeKeyListener() {
    // Verwende einmalige Event Listener für ESC-Taste
    if (!this.keyHandler) {
      this.keyHandler = (event) => {
        if (event.code === "Escape") {
          this.toggleInGameMenu();
        }
      };

      document.addEventListener("keydown", this.keyHandler);
    }
  }

  toggleInGameMenu() {
    if (this.isGameOver || this.isDying) {
      // Kein Menü während Game Over oder Death
      return;
    }

    if (this.showingInGameMenu) {
      // Menü ist offen -> schließen und Spiel fortsetzen
      this.resumeGame();
    } else {
      // Menü ist geschlossen -> öffnen und Spiel pausieren
      this.pauseGame();
    }
  }

  pauseGame() {
    console.log("Pausing game...");
    this.isPaused = true;
    this.showingInGameMenu = true;
    this.gameRunning = false;
    this.gameStateManager.setState("paused");

    // Stoppe Collision-Checking während Pause
    if (this.collisionInterval) {
      clearInterval(this.collisionInterval);
      this.collisionInterval = null;
    }

    // Pausiere alle Intervals der Spielfiguren und Objekte
    this.char.pauseAllIntervals();
    this.enemies.forEach((enemy) => enemy.pauseAllIntervals());
    this.demonProjectiles.forEach((projectile) =>
      projectile.pauseAllIntervals()
    );
    this.level
      .getAllCollectibles()
      .forEach(
        (collectible) =>
          collectible.pauseAllIntervals && collectible.pauseAllIntervals()
      );
    this.level
      .getAllTraps()
      .forEach((trap) => trap.pauseAllIntervals && trap.pauseAllIntervals());

    // Stoppe alle Sound-Effekte (aber NICHT die Hintergrundmusik)
    this.audioService.stopEffects();

    console.log(
      "Game paused - all animations and sound effects stopped, background music continues"
    );
  }

  resumeGame() {
    console.log("Resuming game...");
    this.isPaused = false;
    this.showingInGameMenu = false;
    this.showingInGameOptions = false;
    this.gameRunning = true;
    this.gameStateManager.setState("running");

    // Starte Collision-Checking wieder
    this.startCollisionChecking();

    // Setze alle Intervals der Spielfiguren und Objekte fort
    this.char.resumeAllIntervals();
    this.enemies.forEach((enemy) => enemy.resumeAllIntervals());
    this.demonProjectiles.forEach((projectile) =>
      projectile.resumeAllIntervals()
    );
    this.level
      .getAllCollectibles()
      .forEach(
        (collectible) =>
          collectible.resumeAllIntervals && collectible.resumeAllIntervals()
      );
    this.level
      .getAllTraps()
      .forEach((trap) => trap.resumeAllIntervals && trap.resumeAllIntervals());

    console.log("Game resumed - all animations and systems restarted");
  }

  showInGameOptions() {
    console.log("Showing in-game options...");
    this.showingInGameMenu = false;
    this.showingInGameOptions = true;
  }

  backToInGameMenu() {
    this.showingInGameOptions = false;
    this.showingInGameMenu = true;
  }

  pauseCharacterAnimations() {
    if (this.char.animationInterval) {
      clearInterval(this.char.animationInterval);
      this.char.animationInterval = null;
      this.char.isPausedByMenu = true;
    }
    if (this.char.attackAnimationInterval) {
      clearInterval(this.char.attackAnimationInterval);
      this.char.attackAnimationInterval = null;
      this.char.attackPausedByMenu = true;
    }
    if (this.char.hurtAnimationInterval) {
      clearInterval(this.char.hurtAnimationInterval);
      this.char.hurtAnimationInterval = null;
      this.char.hurtPausedByMenu = true;
    }
  }

  resumeCharacterAnimations() {
    if (this.char.isPausedByMenu) {
      Animation.animate(this.char);
      this.char.isPausedByMenu = false;
    }
    if (this.char.attackPausedByMenu && this.char.isAttacking) {
      Animation.animateAttack(this.char);
      this.char.attackPausedByMenu = false;
    }
    if (this.char.hurtPausedByMenu && this.char.isHurt) {
      Animation.animateHurt(this.char);
      this.char.hurtPausedByMenu = false;
    }
  }

  pauseEnemyAnimations(enemy) {
    if (enemy.animationInterval) {
      clearInterval(enemy.animationInterval);
      enemy.animationInterval = null;
      enemy.isPausedByMenu = true;
    }
    if (enemy.attackAnimationInterval) {
      clearInterval(enemy.attackAnimationInterval);
      enemy.attackAnimationInterval = null;
      enemy.attackPausedByMenu = true;
    }
    if (enemy.hurtAnimationInterval) {
      clearInterval(enemy.hurtAnimationInterval);
      enemy.hurtAnimationInterval = null;
      enemy.hurtPausedByMenu = true;
    }
    // Stoppe auch Bewegungs-Intervals (für Goblins)
    if (enemy.movementInterval) {
      clearInterval(enemy.movementInterval);
      enemy.movementInterval = null;
      enemy.movementPausedByMenu = true;
    }
  }

  resumeEnemyAnimations(enemy) {
    if (enemy.isPausedByMenu) {
      if (enemy.constructor.name === "demon") {
        Animation.animate(enemy);
      } else if (enemy.constructor.name === "goblin") {
        Animation.animate(enemy);
      }
      enemy.isPausedByMenu = false;
    }
    if (enemy.attackPausedByMenu && enemy.isAttacking) {
      Animation.animateAttack(enemy);
      enemy.attackPausedByMenu = false;
    }
    if (enemy.hurtPausedByMenu && enemy.isHurt) {
      Animation.animateHurt(enemy);
      enemy.hurtPausedByMenu = false;
    }
    // Starte Bewegungs-Intervals wieder (für Goblins)
    if (enemy.movementPausedByMenu && enemy.isMoving) {
      if (enemy.constructor.name === "goblin") {
        enemy.moveLeft();
      }
      enemy.movementPausedByMenu = false;
    }
  }

  pauseLevelAnimations() {
    // Stoppe Collectibles (Coins) Animationen
    const collectibles = this.level.getAllCollectibles();
    collectibles.forEach((collectible) => {
      if (collectible.animationInterval) {
        clearInterval(collectible.animationInterval);
        collectible.animationInterval = null;
        collectible.isPausedByMenu = true;
      }
    });

    // Stoppe Traps Animationen
    const traps = this.level.getAllTraps();
    console.log(`Pausing ${traps.length} traps...`);
    traps.forEach((trap) => {
      if (trap.animationInterval) {
        console.log(`Pausing trap: ${trap.constructor.name}`);
        clearInterval(trap.animationInterval);
        trap.animationInterval = null;
        trap.isPausedByMenu = true;
      }
    });
  }

  resumeLevelAnimations() {
    // Starte Collectibles (Coins) Animationen wieder
    const collectibles = this.level.getAllCollectibles();
    collectibles.forEach((collectible) => {
      if (collectible.isPausedByMenu) {
        Animation.animateCoin(collectible);
        collectible.isPausedByMenu = false;
      }
    });

    // Starte Traps Animationen wieder
    const traps = this.level.getAllTraps();
    console.log(`Resuming ${traps.length} traps...`);
    traps.forEach((trap) => {
      if (trap.isPausedByMenu) {
        console.log(`Resuming trap: ${trap.constructor.name}`);
        // Je nach Trap-Typ die entsprechende Animation starten
        if (trap.constructor.name === "Spike") {
          Animation.animateSpike(trap);
        } else if (trap.constructor.name === "Fireblazer") {
          Animation.animateFireblazer(trap);
        } else if (trap.constructor.name === "Jumper") {
          Animation.animateJumper(trap);
        } else if (trap.constructor.name === "Speer") {
          // Speer Animation falls verfügbar
          if (typeof Animation.animateSpeer === "function") {
            Animation.animateSpeer(trap);
          }
        } else {
          console.log(`Unknown trap type: ${trap.constructor.name}`);
        }
        trap.isPausedByMenu = false;
      }
    });
  }

  pauseProjectileAnimations() {
    this.demonProjectiles.forEach((projectile) => {
      if (projectile.animationInterval) {
        clearInterval(projectile.animationInterval);
        projectile.animationInterval = null;
        projectile.isPausedByMenu = true;
      }
      if (projectile.movementInterval) {
        clearInterval(projectile.movementInterval);
        projectile.movementInterval = null;
        projectile.movementPausedByMenu = true;
      }
    });
  }

  resumeProjectileAnimations() {
    this.demonProjectiles.forEach((projectile) => {
      if (projectile.isPausedByMenu) {
        Animation.animateProjectile(projectile);
        projectile.isPausedByMenu = false;
      }
      if (projectile.movementPausedByMenu) {
        projectile.startMovement();
        projectile.movementPausedByMenu = false;
      }
    });
  }

  quitToMainMenu() {
    console.log("Quitting to main menu...");

    // Stoppe alles
    this.stopAllIntervals();
    this.gameRunning = false;
    this.isPaused = false;
    this.showingInGameMenu = false;
    this.isGameOver = false;
    this.isDying = false;

    // Stoppe alle Sounds
    if (
      this.soundEffects &&
      typeof this.soundEffects.stopEverything === "function"
    ) {
      this.soundEffects.stopEverything();
    }

    if (
      this.backgroundMusic &&
      typeof this.backgroundMusic.stopEverything === "function"
    ) {
      this.backgroundMusic.stopEverything();
    }

    // Hier müsste man zum Welcome Screen zurückkehren
    // Das wird über eine globale Funktion oder Event gehandhabt
    if (typeof window.returnToWelcomeScreen === "function") {
      window.returnToWelcomeScreen();
    } else {
      console.log("No return to welcome screen function available");
      // Fallback: Seite neu laden
      location.reload();
    }
  }
}
