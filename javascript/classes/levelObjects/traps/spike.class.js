class Spike extends MoveableObject {
  width = 96;
  height = 96;

  traps_spike = [
    "../../../../assets/traps/spike/Spike_B-9.png",
    "../../../../assets/traps/spike/Spike_B-8.png",
    "../../../../assets/traps/spike/Spike_B-7.png",
    "../../../../assets/traps/spike/Spike_B-6.png",
    "../../../../assets/traps/spike/Spike_B-5.png",
    "../../../../assets/traps/spike/Spike_B-4.png",
    "../../../../assets/traps/spike/Spike_B-3.png",
    "../../../../assets/traps/spike/Spike_B-1.png",
    "../../../../assets/traps/spike/Spike_B-2.png",
    "../../../../assets/traps/spike/Spike_B-0.png",
  ];

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.currentFrame = 0;
    this.loadImage(this.traps_spike[0]);
    this.loadImages(this.traps_spike);

    this.setCustomHitbox(60, 40, 34, 20);

    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }

    this.animateSpike();
  }

  animateSpike() {
    this.animationInterval = setInterval(() => {
      this.playAnimation(this.traps_spike);
    }, 8000 / 60);
  }
}
