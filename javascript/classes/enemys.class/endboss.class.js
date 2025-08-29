class endboss extends MoveableObject {
  y = 492 - this.height;
  speed = 1;
  height = 360;
  width = 360;

  img_idle = [
    "../assets/enemy/endoss/endboss_2/idle/Demon3_Idle_without_shadow-1.png",
    "../assets/enemy/endoss/endboss_2/idle/Demon3_Idle_without_shadow-2.png",
    "../assets/enemy/endoss/endboss_2/idle/Demon3_Idle_without_shadow-3.png",
  ];

  constructor() {
    super();
    this.loadImage(
      "../assets/enemy/endoss/endboss_2/idle/Demon3_Idle_without_shadow-0.png"
    );
    this.loadImages(this.img_idle);
    this.animate();
    this.attack();
    this.death();
    this.hurt();
    this.speed = 1 + Math.random() * 3;
    this.x = 200 + Math.random() * 400;
  }
}
