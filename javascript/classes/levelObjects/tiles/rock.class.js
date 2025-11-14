// Rock class for level decorations
class Rock extends drawableObject {
  constructor(x, y) {
    super(x, y);
    this.width = 64;
    this.height = 64;
    this.image = "assets/tileSets/oak_woods_v1.0/decorations/rock_1.png"; // Default image
  }
}
// For browser usage, attach to window
window.Rock = Rock;
