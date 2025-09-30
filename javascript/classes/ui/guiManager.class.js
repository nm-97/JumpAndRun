class GUIManager {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.buttons = [];
    this.isMouseOver = false;
    this.hoveredButton = null;
    this.assets = {};
    this.backgroundAssets = {};
    this.fontLoaded = false;
    this.currentScreen = "welcome";
    this.soundEffectsVolume = 1.0;
    this.musicVolume = 1.0;
    this.loadAssets();
    this.loadBackgroundAssets();
    this.loadCustomFont();
  }

  loadAssets() {
    const assetNames = [
      "Game Over",
      "Try Again",
      "Quit",
      "Play",
      "Exit",
      "Continue",
      "Options",
      "Settings",
      "New Game",
      "Restart",
      "Yes",
      "No",
    ];

    assetNames.forEach((name) => {
      const img = new Image();
      img.src = `../assets/GUI/Pixel Game UI/Assets/${name}.png`;
      this.assets[name] = img;
    });
  }

  loadBackgroundAssets() {
    const backgroundAssets = {
      layerOne: "../assets/tileSets/oak_woods_v1.0/background/layerOne.png",
      layerTwo: "../assets/tileSets/oak_woods_v1.0/background/layerTwo.png",
      layerThree: "../assets/tileSets/oak_woods_v1.0/background/layerThree.png",
    };

    Object.keys(backgroundAssets).forEach((key) => {
      const img = new Image();
      img.src = backgroundAssets[key];
      this.backgroundAssets[key] = img;
    });
  }

  loadCustomFont() {
    // Prüfe ob Font bereits verfügbar ist (über CSS geladen)
    if (document.fonts.check("16px ByteBounce")) {
      this.fontLoaded = true;
      console.log("ByteBounce font already available");
      return;
    }

    // Fallback: Lade die ByteBounce Font programmatisch
    const font = new FontFace(
      "ByteBounce",
      "url(../assets/font/ByteBounce.ttf)"
    );

    font
      .load()
      .then((loadedFont) => {
        document.fonts.add(loadedFont);
        this.fontLoaded = true;
        console.log("ByteBounce font loaded successfully");
      })
      .catch((error) => {
        console.error("Error loading ByteBounce font:", error);
        this.fontLoaded = false;
      });

    // Warte auf Font-Loading
    document.fonts.ready.then(() => {
      if (document.fonts.check("16px ByteBounce")) {
        this.fontLoaded = true;
        console.log("ByteBounce font ready");
      }
    });
  }

  createButton(id, x, y, width, height, assetName, onClick) {
    const button = {
      id: id,
      x: x,
      y: y,
      width: width,
      height: height,
      assetName: assetName,
      onClick: onClick,
      isHovered: false,
      scale: 1.0,
    };

    this.buttons.push(button);
    return button;
  }

  drawButton(button) {
    const asset = this.assets[button.assetName];

    if (asset && asset.complete) {
      this.ctx.save();

      if (button.isHovered) {
        button.scale = Math.min(button.scale + 0.02, 1.1);
      } else {
        button.scale = Math.max(button.scale - 0.02, 1.0);
      }

      const drawWidth = button.width * button.scale;
      const drawHeight = button.height * button.scale;
      const drawX = button.x - (drawWidth - button.width) / 2;
      const drawY = button.y - (drawHeight - button.height) / 2;

      this.ctx.drawImage(asset, drawX, drawY, drawWidth, drawHeight);

      this.ctx.restore();
    } else {
      this.ctx.fillStyle = button.isHovered ? "#555" : "#333";
      this.ctx.fillRect(button.x, button.y, button.width, button.height);
      this.ctx.strokeStyle = "#fff";
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(button.x, button.y, button.width, button.height);
    }
  }

  drawAllButtons() {
    this.buttons.forEach((button) => {
      this.drawButton(button);
    });
  }

  handleClick(x, y) {
    // Prüfe Slider-Interaktionen zuerst (für Options und InGameOptions)
    if (
      (this.currentScreen === "options" ||
        this.currentScreen === "inGameOptions") &&
      this.sliders
    ) {
      for (let sliderType in this.sliders) {
        const slider = this.sliders[sliderType];
        if (
          x >= slider.x &&
          x <= slider.x + slider.width &&
          y >= slider.y &&
          y <= slider.y + slider.height
        ) {
          // Berechne neue Volume basierend auf Click-Position
          const relativeX = x - slider.x;
          const newVolume = Math.max(0, Math.min(1, relativeX / slider.width));

          if (sliderType === "soundEffects") {
            this.soundEffectsVolume = newVolume;
            this.applySoundEffectsVolume(newVolume);
          } else if (sliderType === "music") {
            this.musicVolume = newVolume;
            this.applyMusicVolume(newVolume);
          }

          return; // Slider wurde geklickt, keine Button-Prüfung nötig
        }
      }
    }

    // Prüfe Button-Clicks
    this.buttons.forEach((button) => {
      if (this.isPointInButton(x, y, button)) {
        if (button.onClick) {
          button.onClick();
        }
      }
    });
  }

  handleMouseMove(x, y) {
    let foundHover = false;

    this.buttons.forEach((button) => {
      if (this.isPointInButton(x, y, button)) {
        button.isHovered = true;
        this.hoveredButton = button;
        foundHover = true;
        this.canvas.style.cursor = "pointer";
      } else {
        button.isHovered = false;
      }
    });

    if (!foundHover) {
      this.hoveredButton = null;
      this.canvas.style.cursor = "default";
    }
  }

  isPointInButton(x, y, button) {
    return (
      x >= button.x &&
      x <= button.x + button.width &&
      y >= button.y &&
      y <= button.y + button.height
    );
  }

  clearButtons() {
    this.buttons = [];
    this.hoveredButton = null;
    this.canvas.style.cursor = "default";
  }

  drawGameOverScreen(restartCallback, quitCallback) {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const gameOverAsset = this.assets["Game Over"];
    if (gameOverAsset && gameOverAsset.complete) {
      const gameOverWidth = 400;
      const gameOverHeight = 150;
      this.ctx.drawImage(
        gameOverAsset,
        this.canvas.width / 2 - gameOverWidth / 2,
        this.canvas.height / 2 - 150,
        gameOverWidth,
        gameOverHeight
      );
    } else {
      this.ctx.fillStyle = "#ff4444";
      this.ctx.font = "bold 72px Arial";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText(
        "GAME OVER",
        this.canvas.width / 2,
        this.canvas.height / 2 - 100
      );
    }

    this.clearButtons();

    this.createButton(
      "tryAgain",
      this.canvas.width / 2 - 150,
      this.canvas.height / 2 + 20,
      140,
      60,
      "Try Again",
      restartCallback
    );

    this.createButton(
      "quit",
      this.canvas.width / 2 + 10,
      this.canvas.height / 2 + 20,
      140,
      60,
      "Quit",
      quitCallback
    );

    this.drawAllButtons();
  }

  drawWelcomeScreen(playCallback, optionsCallback) {
    // Zeichne den Spielhintergrund
    this.drawGameBackground();

    // Semi-transparente Overlay für bessere Textlesbarkeit
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Titel mit Schatten für bessere Sichtbarkeit
    this.ctx.save();

    // Verwende ByteBounce Font wenn geladen, sonst Fallback
    const titleFont = this.fontLoaded
      ? "bold 64px ByteBounce, Arial"
      : "bold 64px Arial";
    const subtitleFont = this.fontLoaded
      ? "28px ByteBounce, Arial"
      : "24px Arial";

    // Titel Schatten
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    this.ctx.font = titleFont;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(
      "JUMP & RUN",
      this.canvas.width / 2 + 4,
      this.canvas.height / 2 - 96
    );

    // Titel
    this.ctx.fillStyle = "#FFD700";
    this.ctx.strokeStyle = "#B8860B";
    this.ctx.lineWidth = 2;
    this.ctx.strokeText(
      "JUMP & RUN",
      this.canvas.width / 2,
      this.canvas.height / 2 - 100
    );
    this.ctx.fillText(
      "JUMP & RUN",
      this.canvas.width / 2,
      this.canvas.height / 2 - 100
    );

    // Untertitel Schatten
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    this.ctx.font = subtitleFont;
    this.ctx.fillText(
      "Adventure Awaits!",
      this.canvas.width / 2 + 2,
      this.canvas.height / 2 - 48
    );

    // Untertitel
    this.ctx.fillStyle = "#ffffff";
    this.ctx.strokeStyle = "#cccccc";
    this.ctx.lineWidth = 1;
    this.ctx.strokeText(
      "Adventure Awaits!",
      this.canvas.width / 2,
      this.canvas.height / 2 - 50
    );
    this.ctx.fillText(
      "Adventure Awaits!",
      this.canvas.width / 2,
      this.canvas.height / 2 - 50
    );

    this.ctx.restore();

    this.clearButtons();

    // Verwende GUI-Assets für professionelles Aussehen
    this.createButton(
      "play",
      this.canvas.width / 2 - 70,
      this.canvas.height / 2 + 20,
      140,
      60,
      "Play",
      playCallback
    );

    this.createButton(
      "options",
      this.canvas.width / 2 - 70,
      this.canvas.height / 2 + 90,
      140,
      60,
      "Options",
      optionsCallback
    );

    this.drawAllButtons();
  }

  drawOptionsScreen(backCallback) {
    this.currentScreen = "options";

    // Zeichne den Spielhintergrund
    this.drawGameBackground();

    // Semi-transparente Overlay
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Titel
    this.ctx.save();
    const titleFont = this.fontLoaded
      ? "bold 48px ByteBounce, Arial"
      : "bold 48px Arial";
    const contentFont = this.fontLoaded
      ? "24px ByteBounce, Arial"
      : "20px Arial";
    const smallFont = this.fontLoaded ? "18px ByteBounce, Arial" : "16px Arial";

    // Options Titel
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    this.ctx.font = titleFont;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("OPTIONS", this.canvas.width / 2 + 3, 83);

    this.ctx.fillStyle = "#FFD700";
    this.ctx.strokeStyle = "#B8860B";
    this.ctx.lineWidth = 2;
    this.ctx.strokeText("OPTIONS", this.canvas.width / 2, 80);
    this.ctx.fillText("OPTIONS", this.canvas.width / 2, 80);

    this.ctx.restore();

    // Zeichne Options-Bereiche
    this.drawControlsSection(contentFont, smallFont);
    this.drawVolumeSection(contentFont, smallFont);

    this.clearButtons();

    // Zurück Button
    this.createButton(
      "back",
      this.canvas.width / 2 - 70,
      this.canvas.height - 80,
      140,
      50,
      "Exit",
      backCallback
    );

    this.drawAllButtons();
  }

  drawInGameMenu(
    resumeCallback,
    restartCallback,
    optionsCallback,
    quitCallback
  ) {
    this.currentScreen = "inGameMenu";

    // Zeichne den aktuellen Spielzustand im Hintergrund (unscharf/gedimmt)
    // Das wird vom World-Objekt gehandhabt, hier nur das Overlay

    // Semi-transparente dunkle Overlay für Menü-Hintergrund
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Menü-Hintergrund (leicht transparenter Kasten) - größer für 4 Buttons
    const menuWidth = 400;
    const menuHeight = 420;
    const menuX = (this.canvas.width - menuWidth) / 2;
    const menuY = (this.canvas.height - menuHeight) / 2;

    // Menü-Hintergrund Schatten
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    this.ctx.fillRect(menuX + 5, menuY + 5, menuWidth, menuHeight);

    // Menü-Hintergrund
    this.ctx.fillStyle = "rgba(40, 40, 40, 0.95)";
    this.ctx.fillRect(menuX, menuY, menuWidth, menuHeight);

    // Menü-Rahmen
    this.ctx.strokeStyle = "#FFD700";
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(menuX, menuY, menuWidth, menuHeight);

    // Titel
    this.ctx.save();
    const titleFont = this.fontLoaded
      ? "bold 48px ByteBounce, Arial"
      : "bold 48px Arial";

    // Menu Titel Schatten
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    this.ctx.font = titleFont;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("MENU", this.canvas.width / 2 + 3, menuY + 63);

    // Menu Titel
    this.ctx.fillStyle = "#FFD700";
    this.ctx.strokeStyle = "#B8860B";
    this.ctx.lineWidth = 2;
    this.ctx.strokeText("MENU", this.canvas.width / 2, menuY + 60);
    this.ctx.fillText("MENU", this.canvas.width / 2, menuY + 60);

    this.ctx.restore();

    this.clearButtons();

    // Resume Button (Continue verwenden)
    this.createButton(
      "resume",
      this.canvas.width / 2 - 70,
      menuY + 120,
      140,
      50,
      "Continue",
      resumeCallback
    );

    // Options Button
    this.createButton(
      "options",
      this.canvas.width / 2 - 70,
      menuY + 180,
      140,
      50,
      "Options",
      optionsCallback
    );

    // Restart Button
    this.createButton(
      "restart",
      this.canvas.width / 2 - 70,
      menuY + 240,
      140,
      50,
      "Restart",
      restartCallback
    );

    // Quit Button
    this.createButton(
      "quit",
      this.canvas.width / 2 - 70,
      menuY + 300,
      140,
      50,
      "Quit",
      quitCallback
    );

    this.drawAllButtons();
  }

  drawInGameOptionsScreen(backCallback) {
    this.currentScreen = "inGameOptions";
    this.clearButtons();

    // Semi-transparente dunkle Overlay für Menü-Hintergrund
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Options-Hintergrund (größer für mehr Inhalt)
    const menuWidth = 500;
    const menuHeight = 500;
    const menuX = (this.canvas.width - menuWidth) / 2;
    const menuY = (this.canvas.height - menuHeight) / 2;

    // Menü-Hintergrund Schatten
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
    this.ctx.fillRect(menuX + 5, menuY + 5, menuWidth, menuHeight);

    // Menü-Hintergrund
    this.ctx.fillStyle = "rgba(40, 40, 40, 0.95)";
    this.ctx.fillRect(menuX, menuY, menuWidth, menuHeight);

    // Menü-Rahmen
    this.ctx.strokeStyle = "#FFD700";
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(menuX, menuY, menuWidth, menuHeight);

    // Titel
    this.ctx.save();
    const titleFont = this.fontLoaded
      ? "bold 40px ByteBounce, Arial"
      : "bold 40px Arial";
    const contentFont = this.fontLoaded
      ? "20px ByteBounce, Arial"
      : "18px Arial";
    const smallFont = this.fontLoaded ? "16px ByteBounce, Arial" : "14px Arial";

    // Options Titel Schatten
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    this.ctx.font = titleFont;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("OPTIONS", this.canvas.width / 2 + 2, menuY + 42);

    // Options Titel
    this.ctx.fillStyle = "#FFD700";
    this.ctx.strokeStyle = "#B8860B";
    this.ctx.lineWidth = 2;
    this.ctx.strokeText("OPTIONS", this.canvas.width / 2, menuY + 40);
    this.ctx.fillText("OPTIONS", this.canvas.width / 2, menuY + 40);

    this.ctx.restore();

    // Zeichne Options-Bereiche mit relativen Positionen
    this.drawInGameControlsSection(menuX, menuY, contentFont, smallFont);
    this.drawInGameVolumeSection(menuX, menuY, contentFont, smallFont);

    // Erstelle den Exit Button
    this.createButton(
      "backToMenu",
      this.canvas.width / 2 - 70,
      menuY + menuHeight - 70,
      140,
      50,
      "Exit",
      backCallback
    );

    this.drawAllButtons();
  }

  drawInGameControlsSection(menuX, menuY, contentFont, smallFont) {
    const startY = menuY + 80;

    // Controls Überschrift
    this.ctx.save();
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = contentFont;
    this.ctx.textAlign = "center";
    this.ctx.fillText("CONTROLS", this.canvas.width / 2, startY);

    // Control-Mappings
    const controls = [
      { action: "Move Left", key: "A or ←" },
      { action: "Move Right", key: "D or →" },
      { action: "Jump", key: "W or ↑ or SPACE" },
      { action: "Attack", key: "F" },
      { action: "Pause Menu", key: "ESC" },
    ];

    this.ctx.font = smallFont;
    this.ctx.textAlign = "left";

    controls.forEach((control, index) => {
      const y = startY + 30 + index * 22;

      // Action
      this.ctx.fillStyle = "#cccccc";
      this.ctx.fillText(control.action + ":", menuX + 50, y);

      // Key
      this.ctx.fillStyle = "#FFD700";
      this.ctx.fillText(control.key, menuX + 200, y);
    });

    this.ctx.restore();
  }

  drawInGameVolumeSection(menuX, menuY, contentFont, smallFont) {
    const startY = menuY + 250;

    // Volume Überschrift
    this.ctx.save();
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = contentFont;
    this.ctx.textAlign = "center";
    this.ctx.fillText("VOLUME", this.canvas.width / 2, startY);

    // Sound Effects Volume
    this.drawVolumeSlider(
      "Sound Effects:",
      this.canvas.width / 2,
      startY + 40,
      this.soundEffectsVolume,
      "soundEffects"
    );

    // Music Volume
    this.drawVolumeSlider(
      "Background Music:",
      this.canvas.width / 2,
      startY + 90,
      this.musicVolume,
      "music"
    );

    this.ctx.restore();
  }

  drawControlsSection(contentFont, smallFont) {
    const startY = 140;
    const leftColumn = this.canvas.width / 4;
    const rightColumn = (this.canvas.width * 3) / 4;

    // Controls Überschrift
    this.ctx.save();
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = contentFont;
    this.ctx.textAlign = "center";
    this.ctx.fillText("CONTROLS", this.canvas.width / 2, startY);

    // Control-Mappings
    const controls = [
      { action: "Move Left", key: "A or ←" },
      { action: "Move Right", key: "D or →" },
      { action: "Jump", key: "W or ↑ or SPACE" },
      { action: "Attack", key: "F" },
    ];

    this.ctx.font = smallFont;
    this.ctx.textAlign = "left";

    controls.forEach((control, index) => {
      const y = startY + 40 + index * 25;

      // Action
      this.ctx.fillStyle = "#cccccc";
      this.ctx.fillText(control.action + ":", leftColumn - 120, y);

      // Key
      this.ctx.fillStyle = "#FFD700";
      this.ctx.fillText(control.key, leftColumn + 20, y);
    });

    this.ctx.restore();
  }

  drawVolumeSection(contentFont, smallFont) {
    const startY = 300;

    // Volume Überschrift
    this.ctx.save();
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = contentFont;
    this.ctx.textAlign = "center";
    this.ctx.fillText("VOLUME", this.canvas.width / 2, startY);

    // Sound Effects Volume
    this.drawVolumeSlider(
      "Sound Effects:",
      this.canvas.width / 2,
      startY + 50,
      this.soundEffectsVolume,
      "soundEffects"
    );

    // Music Volume
    this.drawVolumeSlider(
      "Background Music:",
      this.canvas.width / 2,
      startY + 100,
      this.musicVolume,
      "music"
    );

    this.ctx.restore();
  }

  drawVolumeSlider(label, x, y, volume, type) {
    const sliderWidth = 200;
    const sliderHeight = 20;
    const sliderX = x - sliderWidth / 2;

    // Label
    this.ctx.fillStyle = "#cccccc";
    this.ctx.font = this.fontLoaded ? "18px ByteBounce, Arial" : "16px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText(label, x, y - 20);

    // Slider Hintergrund
    this.ctx.fillStyle = "#333333";
    this.ctx.fillRect(sliderX, y, sliderWidth, sliderHeight);

    // Slider Fortschritt
    this.ctx.fillStyle = "#FFD700";
    this.ctx.fillRect(sliderX, y, sliderWidth * volume, sliderHeight);

    // Slider Rahmen
    this.ctx.strokeStyle = "#666666";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(sliderX, y, sliderWidth, sliderHeight);

    // Slider Handle
    const handleX = sliderX + sliderWidth * volume - 5;
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(handleX, y - 5, 10, sliderHeight + 10);
    this.ctx.strokeStyle = "#cccccc";
    this.ctx.strokeRect(handleX, y - 5, 10, sliderHeight + 10);

    // Volume Prozent
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = this.fontLoaded ? "14px ByteBounce, Arial" : "12px Arial";
    this.ctx.fillText(
      Math.round(volume * 100) + "%",
      x + sliderWidth / 2 + 30,
      y + sliderHeight / 2 + 5
    );

    // Slider Click-Bereich speichern für Interaktion
    if (!this.sliders) this.sliders = {};
    this.sliders[type] = {
      x: sliderX,
      y: y,
      width: sliderWidth,
      height: sliderHeight,
      volume: volume,
    };
  }

  drawGameBackground() {
    // Zeichne Hintergrund-Layer in der richtigen Reihenfolge für Tiefeneffekt

    // Layer 1 (Himmel/Ferne) - großflächig
    if (
      this.backgroundAssets["layerOne"] &&
      this.backgroundAssets["layerOne"].complete
    ) {
      this.ctx.drawImage(
        this.backgroundAssets["layerOne"],
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    }

    // Layer 2 (Mittlere Ebene) - leicht parallax
    if (
      this.backgroundAssets["layerTwo"] &&
      this.backgroundAssets["layerTwo"].complete
    ) {
      const img = this.backgroundAssets["layerTwo"];
      const scale = this.canvas.height / img.naturalHeight;
      const scaledWidth = img.naturalWidth * scale;

      // Wiederhole das Bild horizontal wenn nötig
      for (let x = 0; x < this.canvas.width; x += scaledWidth) {
        this.ctx.drawImage(img, x, 0, scaledWidth, this.canvas.height);
      }
    }

    // Layer 3 (Vordergrund) - statisch
    if (
      this.backgroundAssets["layerThree"] &&
      this.backgroundAssets["layerThree"].complete
    ) {
      const img = this.backgroundAssets["layerThree"];
      const scale = this.canvas.height / img.naturalHeight;
      const scaledWidth = img.naturalWidth * scale;

      // Wiederhole das Bild horizontal wenn nötig
      for (let x = 0; x < this.canvas.width; x += scaledWidth) {
        this.ctx.drawImage(img, x, 0, scaledWidth, this.canvas.height);
      }
    }
  }

  applySoundEffectsVolume(volume) {
    console.log(
      `Setting sound effects volume to: ${Math.round(volume * 100)}%`
    );

    // Speichere Volume-Wert in GUIManager
    this.soundEffectsVolume = volume;

    // Setze Volume für Sound Effects AudioManager (World)
    if (
      window.world &&
      window.world.soundEffects &&
      typeof window.world.soundEffects.setSoundEffectsVolume === "function"
    ) {
      console.log("Applying sound effects volume to World...");
      window.world.soundEffects.setSoundEffectsVolume(volume);
    } else {
      console.log("World soundEffects not available");
    }
  }

  applyMusicVolume(volume) {
    console.log(
      `Setting background music volume to: ${Math.round(volume * 100)}%`
    );

    // Speichere Volume-Wert in GUIManager
    this.musicVolume = volume;

    // Setze Volume für Background Music AudioManager (World)
    if (
      window.world &&
      window.world.backgroundMusic &&
      typeof window.world.backgroundMusic.setMusicVolume === "function"
    ) {
      console.log("Applying music volume to World...");
      window.world.backgroundMusic.setMusicVolume(volume);
    } else {
      console.log("World backgroundMusic not available");
    }

    // Setze Volume für WelcomeScreen Background Music
    if (
      window.welcomeScreen &&
      window.welcomeScreen.backgroundMusic &&
      typeof window.welcomeScreen.backgroundMusic.setMusicVolume === "function"
    ) {
      console.log("Applying music volume to WelcomeScreen...");
      window.welcomeScreen.backgroundMusic.setMusicVolume(volume);
    }
  }

  getSoundEffectsVolume() {
    return this.soundEffectsVolume;
  }

  getMusicVolume() {
    return this.musicVolume;
  }

  startLandingMusic() {
    // Starte Landing Music über das WelcomeScreen BackgroundMusic System
    if (
      window.welcomeScreen &&
      window.welcomeScreen.backgroundMusic &&
      !window.welcomeScreen.musicStarted
    ) {
      console.log("Starting landing music...");
      window.welcomeScreen.backgroundMusic.playMusic(
        window.welcomeScreen.backgroundMusic.music_menu
      );
      window.welcomeScreen.musicStarted = true;
    }
  }

  stopLandingMusic() {
    // Stoppe Landing Music
    if (window.welcomeScreen && window.welcomeScreen.backgroundMusic) {
      console.log("Stopping landing music...");
      window.welcomeScreen.backgroundMusic.stopCurrentMusic();
      window.welcomeScreen.musicStarted = false;
    }
  }
}
