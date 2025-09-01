class statusBar extends drawableObject {
  img_health = [
    "../assets/healthbar/healing/LifeBar-0.png",
    "../assets/healthbar/healing/LifeBar-1.png",
    "../assets/healthbar/healing/LifeBar-2.png",
    "../assets/healthbar/healing/LifeBar-3.png",
    "../assets/healthbar/healing/LifeBar-4.png",
    "../assets/healthbar/healing/LifeBar-5.png",
    "../assets/healthbar/healing/LifeBar-6.png",
    "../assets/healthbar/healing/LifeBar-7.png",
    "../assets/healthbar/healing/LifeBar-8.png",
  ];

  constructor() {
    super();
    this.loadImages(this.img_health);
    this.maxHealth = 8;
    this.currentHealth = 8;
    this.y = 30;
    this.x = 30;
    this.height = 60;
    this.width = 200;
  }

  setHealth(health) {
    this.currentHealth = Math.max(0, Math.min(health, this.maxHealth));
  }

  getHealthPercentage() {
    return (this.currentHealth / this.maxHealth) * 100;
  }

  getHealthImageIndex() {
    return Math.max(
      0,
      Math.min(this.currentHealth, this.img_health.length - 1)
    );
  }

  draw(ctx) {
    let imageIndex = this.getHealthImageIndex();
    let healthImg = this.imageCache[this.img_health[imageIndex]];

    if (healthImg && healthImg.complete && healthImg.naturalHeight !== 0) {
      ctx.drawImage(healthImg, this.x, this.y, this.width, this.height);
    }
  }
}
