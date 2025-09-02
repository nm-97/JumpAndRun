class Spike extends MoveableObject {
  width = 32;
  height = 32;

  traps_spike = [
    "../../../../assets/traps/spike/Spike_B-0.png",
    "../../../../assets/traps/spike/Spike_B-1.png",
    "../../../../assets/traps/spike/Spike_B-2.png",
    "../../../../assets/traps/spike/Spike_B-3.png",
    "../../../../assets/traps/spike/Spike_B-4.png",
    "../../../../assets/traps/spike/Spike_B-5.png",
    "../../../../assets/traps/spike/Spike_B-6.png",
    "../../../../assets/traps/spike/Spike_B-7.png",
    "../../../../assets/traps/spike/Spike_B-8.png",
    "../../../../assets/traps/spike/Spike_B-9.png",
  ];

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage("../../../../assets/traps/spike/Spike_B-0.png"); // Erstes Frame laden
    this.loadImages(this.traps_spike); // Alle Frames in Cache laden
    this.animateSpike(); // Spike-spezifische Animation starten
  }
}
