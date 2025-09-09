class Fireblazer extends MoveableObject {
  width = 32;
  height = 48;

  traps_firebox = [
    "../../../../assets/traps/Fireblazer/FireBox-0.png",
    "../../../../assets/traps/Fireblazer/FireBox-1.png",
    "../../../../assets/traps/Fireblazer/FireBox-2.png",
    "../../../../assets/traps/Fireblazer/FireBox-3.png",
    "../../../../assets/traps/Fireblazer/FireBox-4.png",
    "../../../../assets/traps/Fireblazer/FireBox-5.png",
    "../../../../assets/traps/Fireblazer/FireBox-6.png",
    "../../../../assets/traps/Fireblazer/FireBox-7.png",
    "../../../../assets/traps/Fireblazer/FireBox-8.png",
    "../../../../assets/traps/Fireblazer/FireBox-9.png",
    "../../../../assets/traps/Fireblazer/FireBox-10.png",
    "../../../../assets/traps/Fireblazer/FireBox-11.png",
    "../../../../assets/traps/Fireblazer/FireBox-12.png",
  ];

  traps_fire = [
    "../../../../assets/traps/Fireblazer/Fire-0.png",
    "../../../../assets/traps/Fireblazer/Fire-1.png",
    "../../../../assets/traps/Fireblazer/Fire-2.png",
    "../../../../assets/traps/Fireblazer/Fire-3.png",
  ];

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.currentFireboxFrame = 0;
    this.currentFireFrame = 0;

    this.loadImage(this.traps_firebox[0]);
    this.loadImages(this.traps_firebox);
    this.loadImages(this.traps_fire);

    this.setCustomHitbox(40, 50, 12, 7);

    Animation.animateFireblazerDual(this);
  }

  draw(ctx) {
    this.drawFireblazer(ctx);
  }

  static fireblazerTemplate = {
    createFireblazerOfTwo: [
      "../../../../assets/traps/Fireblazer/Fire-0.png",
      "../../../../assets/traps/Fireblazer/Fire-0.png",
    ],
    createFireblazerOfThree: [
      "../../../../assets/traps/Fireblazer/Fire-0.png",
      "../../../../assets/traps/Fireblazer/Fire-0.png",
      "../../../../assets/traps/Fireblazer/Fire-0.png",
    ],
    createFireblazerOfFour: [
      "../../../../assets/traps/Fireblazer/Fire-0.png",
      "../../../../assets/traps/Fireblazer/Fire-0.png",
      "../../../../assets/traps/Fireblazer/Fire-0.png",
      "../../../../assets/traps/Fireblazer/Fire-0.png",
    ],
  };

  static fireblazerGroup(templateArray, positions) {
    const fireblazers = [];
    positions.forEach((pos, index) => {
      const fireblazer = new Fireblazer(pos.x, pos.y);
      if (pos.width) fireblazer.width = pos.width;
      if (pos.height) fireblazer.height = pos.height;
      if (templateArray[index]) {
        fireblazer.loadImage(templateArray[index]);
      }
      fireblazers.push(fireblazer);
    });
    return fireblazers;
  }
}
