class backgroundLayer extends MoveableObject {
  width = 1024;
  height = 600;
  x = 0;
  y = 0;

  constructor(imagePath) {
    super().loadImage(imagePath);
  }
}
