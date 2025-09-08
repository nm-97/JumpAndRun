class Jumper extends MoveableObject {
  width = 48;
  height = 48;
  isActivated = false;

  traps_jumper = [
    "../../../../assets/traps/jumper/Jumper-1-0.png",
    "../../../../assets/traps/jumper/Jumper-1-1.png",
    "../../../../assets/traps/jumper/Jumper-1-2.png",
    "../../../../assets/traps/jumper/Jumper-1-3.png",
    "../../../../assets/traps/jumper/Jumper-1-4.png",
    "../../../../assets/traps/jumper/Jumper-1-5.png",
    "../../../../assets/traps/jumper/Jumper-1-6.png",
    "../../../../assets/traps/jumper/Jumper-1-7.png",
  ];

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage(this.traps_jumper[0]);
    this.loadImages(this.traps_jumper);

    this.setCustomHitbox(35, 25, 6, 10);

    this.animateJumper();
  }

  animateJumper() {
    this.animationInterval = setInterval(() => {
      this.playAnimation(this.traps_jumper);
    }, 1000 / 6);
  }

  static jumperTemplate = {
    createJumperOfTwo: [
      "../../../../assets/traps/jumper/Jumper-1-0.png",
      "../../../../assets/traps/jumper/Jumper-1-0.png",
    ],
    createJumperOfThree: [
      "../../../../assets/traps/jumper/Jumper-1-0.png",
      "../../../../assets/traps/jumper/Jumper-1-0.png",
      "../../../../assets/traps/jumper/Jumper-1-0.png",
    ],
    createJumperOfFour: [
      "../../../../assets/traps/jumper/Jumper-1-0.png",
      "../../../../assets/traps/jumper/Jumper-1-0.png",
      "../../../../assets/traps/jumper/Jumper-1-0.png",
      "../../../../assets/traps/jumper/Jumper-1-0.png",
    ],
  };

  static jumperGroup(templateArray, positions) {
    const jumpers = [];
    positions.forEach((pos, index) => {
      const jumper = new Jumper(pos.x, pos.y);
      if (pos.width) jumper.width = pos.width;
      if (pos.height) jumper.height = pos.height;
      if (templateArray[index]) {
        jumper.loadImage(templateArray[index]);
      }
      jumpers.push(jumper);
    });
    return jumpers;
  }

  activateTrap(char) {
    if (!this.isActivated) {
      char.velocityY = -20;
      this.isActivated = true;
      setTimeout(() => {
        this.isActivated = false;
      }, 1000);
    }
  }
}
