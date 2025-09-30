class AssetManager {
  constructor() {
    this.assets = {};
  }

  loadImage(name, src) {
    const img = new Image();
    img.src = src;
    this.assets[name] = img;
    return img;
  }

  getImage(name) {
    return this.assets[name];
  }

  loadSound(name, src) {
    const audio = new Audio(src);
    this.assets[name] = audio;
    return audio;
  }

  getSound(name) {
    return this.assets[name];
  }

  // Weitere Asset-Typen (Fonts etc.) können ergänzt werden
}

export default AssetManager;
