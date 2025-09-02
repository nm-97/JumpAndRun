class ShatteredRock extends MoveableObject {
  width = 56;
  height = 56;
  stability = 100;
  isShaking = false;

  traps_rock = [
    "../../../../assets/traps/shatteredRock/FallingRock-10.png",
    "../../../../assets/traps/shatteredRock/FallingRock-9.png",
    "../../../../assets/traps/shatteredRock/FallingRock-8.png",
    "../../../../assets/traps/shatteredRock/FallingRock-7.png",
    "../../../../assets/traps/shatteredRock/FallingRock-6.png",
    "../../../../assets/traps/shatteredRock/FallingRock-5.png",
    "../../../../assets/traps/shatteredRock/FallingRock-4.png",
    "../../../../assets/traps/shatteredRock/FallingRock-3.png",
    "../../../../assets/traps/shatteredRock/FallingRock-2.png",
    "../../../../assets/traps/shatteredRock/FallingRock-1.png",
    "../../../../assets/traps/shatteredRock/FallingRock-0.png",
  ];

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.currentFrame = 0;
    console.log("ShatteredRock created at", x, y); // Debug-Log
    this.loadImage(this.traps_rock); // Erstes Bild laden
    this.loadImages(this.traps_rock);
    console.log("ShatteredRock calling animateShatteredRock"); // Debug-Log
    this.animateShatteredRock(); // ShatteredRock-spezifische Animation starten
  }

  static shatteredRockGroup(templateArray, positions) {
    const rocks = [];
    positions.forEach((pos, index) => {
      const rock = new ShatteredRock(pos.x, pos.y);
      if (pos.width) rock.width = pos.width;
      if (pos.height) rock.height = pos.height;
      if (templateArray[index]) {
        rock.loadImage(templateArray[index]);
      }
      rocks.push(rock);
    });
    return rocks;
  }

  stepOn(char) {
    this.stability -= 20;
    if (this.stability <= 50 && !this.isShaking) {
      this.startShaking();
    }
    if (this.stability <= 0) {
      this.collapse();
    }
  }

  startShaking() {
    this.isShaking = true;
  }

  collapse() {
    console.log("Rock collapsed!");
  }
}
