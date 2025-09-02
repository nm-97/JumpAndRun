class Speer extends MoveableObject {
  width = 40;
  height = 80;
  isExtended = false;
  extendSpeed = 8;

  traps_speer = [
    "../../../../assets/traps/speer/Spear-0.png",
    "../../../../assets/traps/speer/Spear-1.png",
    "../../../../assets/traps/speer/Spear-2.png",
    "../../../../assets/traps/speer/Spear-3.png",
    "../../../../assets/traps/speer/Spear-4.png",
    "../../../../assets/traps/speer/Spear-5.png",
    "../../../../assets/traps/speer/Spear-6.png",
    "../../../../assets/traps/speer/Spear-7.png",
    "../../../../assets/traps/speer/Spear-8.png",
    "../../../../assets/traps/speer/Spear-9.png",
    "../../../../assets/traps/speer/Spear-10.png",
    "../../../../assets/traps/speer/Spear-11.png",
  ];

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage(this.traps_speer[0]); // Erstes Frame laden
    this.loadImages(this.traps_speer);
    this.animateSpeer(); // Speer-spezifische Animation starten
  }

  static speerTemplate = {
    createSpeerOfTwo: [
      "../../../../assets/traps/speer/Spear-0.png",
      "../../../../assets/traps/speer/Spear-0.png",
    ],
    createSpeerOfThree: [
      "../../../../assets/traps/speer/Spear-0.png",
      "../../../../assets/traps/speer/Spear-0.png",
      "../../../../assets/traps/speer/Spear-0.png",
    ],
    createSpeerOfFour: [
      "../../../../assets/traps/speer/Spear-0.png",
      "../../../../assets/traps/speer/Spear-0.png",
      "../../../../assets/traps/speer/Spear-0.png",
      "../../../../assets/traps/speer/Spear-0.png",
    ],
  };

  static speerGroup(templateArray, positions) {
    const speers = [];
    positions.forEach((pos, index) => {
      const speer = new Speer(pos.x, pos.y);
      if (pos.width) speer.width = pos.width;
      if (pos.height) speer.height = pos.height;
      if (templateArray[index]) {
        speer.loadImage(templateArray[index]);
      }
      speers.push(speer);
    });
    return speers;
  }

  // Speer schießt aus dem Boden/Wand
  triggerTrap() {
    if (!this.isExtended) {
      this.extend();
      setTimeout(() => {
        this.retract();
      }, 2000);
    }
  }

  extend() {
    this.isExtended = true;
    // Animation: Speer fährt aus
  }

  retract() {
    this.isExtended = false;
    // Animation: Speer fährt ein
  }
}
