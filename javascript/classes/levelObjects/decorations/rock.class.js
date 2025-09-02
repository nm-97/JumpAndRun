class Rock extends MoveableObject {
  width = 32;
  height = 32;

  rock_one = ["../assets/tileSets/oak_woods_v1.0/decorations/rock_1.png"];

  rock_two = ["../assets/tileSets/oak_woods_v1.0/decorations/rock_2.png"];

  rock_three = ["../assets/tileSets/oak_woods_v1.0/decorations/rock_3.png"];
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage(this.rock_one);
    this.loadImage(this.rock_two);
    this.loadImage(this.rock_three);
  }
}
