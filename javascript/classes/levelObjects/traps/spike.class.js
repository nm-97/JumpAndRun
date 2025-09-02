class Spike extends MoveableObject {
  width = 128;
  height = 128;

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
    this.currentFrame = 0; // Reset frame counter
    console.log("Spike created at", x, y); // Debug
    this.loadImage(this.traps_spike[0]); // Load first image
    this.loadImages(this.traps_spike); // Alle Frames in Cache laden
    
    // Clear any existing intervals before starting spike animation
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
    
    this.animateSpike(); // Spike-spezifische Animation starten
    console.log("Spike animation started"); // Debug
  }

  // Override draw method to add visual debugging
  draw(ctx) {
    // Draw the actual spike image
    super.draw(ctx);
    
    // Draw a border around the spike so we can see where it is
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    
    // Draw frame number to see animation progress
    ctx.fillStyle = 'red';
    ctx.font = '16px Arial';
    ctx.fillText(`S:${this.currentFrame % this.traps_spike.length}`, this.x, this.y - 5);
  }
}
