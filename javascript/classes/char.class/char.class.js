class char extends MoveableObject {
  y = 550 - this.height;
  img_idle = [
    "../assets/char/idle/idle-1.png",
    "../assets/char/idle/idle-2.png",
    "../assets/char/idle/idle-3.png",
    "../assets/char/idle/idle-4.png",
  ];
  currentFrame = 0;

  constructor() {
    super();
    this.loadImage("../assets/char/idle/idle-0.png");
    this.loadImages(this.img_idle);
    this.animate();
  }

  jump() {
    // Implement jump logic here
  }

  animate() {
    setInterval(() => {
      let i = this.currentFrame % this.img_idle.length;
      let path = this.img_idle[i];
      this.img = this.charImageCache[path];
      this.currentFrame++;
    }, 8000 / 60);
  }
}
