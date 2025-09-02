class Physics {
  static gravity = 0.9;
  static groundLevel = 550;

  /**
   * Handles gravity and ground collision for an object
   * @param {MoveableObject} object - The object to apply physics to
   */
  static handleGravity(object) {
    if (!object.isOnGround) {
      object.velocityY += this.gravity;
    }

    object.y += object.velocityY;

    // Ground collision
    if (object.y >= this.groundLevel - object.height) {
      object.y = this.groundLevel - object.height;
      object.isOnGround = true;
      object.isJumping = false;
      object.velocityY = 0;
    }
  }

  /**
   * Checks platform collisions for an object
   * @param {MoveableObject} object - The object to check
   */
  static handlePlatformCollisions(object) {
    this.checkPlatformLanding(object);
    this.checkPlatformFalling(object);
  }

  /**
   * Checks if object should land on any platform
   * @param {MoveableObject} object - The object to check
   */
  static checkPlatformLanding(object) {
    if (!object.world?.level || object.velocityY <= 0) return;

    const platforms = object.world.level.getAllTiles();
    platforms.forEach((platform) => {
      if (
        this.isAbovePlatform(object, platform) &&
        this.isLandingOnPlatform(object, platform)
      ) {
        this.landOnPlatform(object, platform);
      }
    });
  }

  /**
   * Checks if object should fall off platforms
   * @param {MoveableObject} object - The object to check
   */
  static checkPlatformFalling(object) {
    if (!object.isOnGround || object.y >= this.groundLevel - object.height)
      return;

    const platforms = object.world.level.getAllTiles();
    const stillOnPlatform = platforms.some((platform) =>
      this.isStandingOnPlatform(object, platform)
    );

    if (!stillOnPlatform) {
      object.isOnGround = false;
      object.isJumping = true;
    }
  }

  /**
   * Checks if object is horizontally above a platform
   * @param {MoveableObject} object - The object to check
   * @param {Platform} platform - The platform to check against
   */
  static isAbovePlatform(object, platform) {
    return (
      object.x < platform.x + platform.width &&
      object.x + object.width > platform.x
    );
  }

  /**
   * Checks if object is landing on a platform (vertically)
   * @param {MoveableObject} object - The object to check
   * @param {Platform} platform - The platform to check against
   */
  static isLandingOnPlatform(object, platform) {
    return (
      object.y + object.height >= platform.y &&
      object.y + object.height <= platform.y + 10
    );
  }

  /**
   * Checks if object is currently standing on a platform
   * @param {MoveableObject} object - The object to check
   * @param {Platform} platform - The platform to check against
   */
  static isStandingOnPlatform(object, platform) {
    return (
      object.x + object.width > platform.x &&
      object.x < platform.x + platform.width &&
      Math.abs(object.y + object.height - platform.y) < 5
    );
  }

  /**
   * Makes object land on a platform
   * @param {MoveableObject} object - The object to land
   * @param {Platform} platform - The platform to land on
   */
  static landOnPlatform(object, platform) {
    object.y = platform.y - object.height;
    object.isOnGround = true;
    object.isJumping = false;
    object.velocityY = 0;
  }

  /**
   * Complete physics update for an object
   * @param {MoveableObject} object - The object to update
   */
  static update(object) {
    this.handleGravity(object);
    this.handlePlatformCollisions(object);
  }

  /**
   * Legacy method for compatibility
   * @param {MoveableObject} object - The object to update
   */
  static handlePhysics(object) {
    this.update(object);
  }
}
