class ObjectFactory {
  static createChar(options = {}) {
    return new char(options.x || 0, options.y || 0);
  }

  static createGoblin(options = {}) {
    return new goblin(options.x || 0, options.y || 0);
  }

  static createDemon(options = {}) {
    return new demon(options.x || 0, options.y || 0);
  }

  static createCollectible(type, options = {}) {
    // Beispiel: type = 'coin'
    // Hier können weitere Typen ergänzt werden
    if (type === "coin") {
      return new Coin(options.x || 0, options.y || 0);
    }
    // ...weitere Typen
  }

  static createTrap(type, options = {}) {
    if (type === "spike") {
      return new Spike(options.x || 0, options.y || 0);
    }
    if (type === "fireblazer") {
      return new Fireblazer(options.x || 0, options.y || 0);
    }
    if (type === "jumper") {
      return new Jumper(options.x || 0, options.y || 0);
    }
    // ...weitere Typen
  }

  static createProjectile(options = {}) {
    return new DemonProjectile(options.x || 0, options.y || 0);
  }
}

export default ObjectFactory;
