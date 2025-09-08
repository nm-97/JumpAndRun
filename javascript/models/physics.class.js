class Physics {
  static gravity = 0.9;
  static groundLevel = 550;

  /**
   * Initializes physics properties for an object
   * @param {MoveableObject} object - The object to initialize
   */
  static initializePhysics(object) {
    if (object.velocityY === undefined) object.velocityY = 0;
    if (object.isOnGround === undefined) object.isOnGround = true;
    if (object.isJumping === undefined) object.isJumping = false;
  }

  /**
   * Handles gravity and ground collision for an object
   * @param {MoveableObject} object - The object to apply physics to
   */
  static handleGravity(object) {
    this.initializePhysics(object);

    if (!object.isOnGround) {
      object.velocityY += this.gravity;
    }

    object.y += object.velocityY;

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
    if (!platform.hitboxWidth || !platform.hitboxHeight) {
      if (object.hitboxWidth && object.hitboxHeight) {
        const objectHitbox = object.getHitbox();
        return (
          objectHitbox.x < platform.x + platform.width &&
          objectHitbox.x + objectHitbox.width > platform.x
        );
      }
      return (
        object.x < platform.x + platform.width &&
        object.x + object.width > platform.x
      );
    }

    const objectHitbox = object.getHitbox();
    const platformHitbox = platform.getHitbox();

    return (
      objectHitbox.x < platformHitbox.x + platformHitbox.width &&
      objectHitbox.x + objectHitbox.width > platformHitbox.x
    );
  }

  /**
   * Checks if object is landing on a platform (vertically)
   * @param {MoveableObject} object - The object to check
   * @param {Platform} platform - The platform to check against
   */
  static isLandingOnPlatform(object, platform) {
    if (!platform.hitboxWidth || !platform.hitboxHeight) {
      if (object.hitboxWidth && object.hitboxHeight) {
        const objectHitbox = object.getHitbox();
        return (
          objectHitbox.y + objectHitbox.height >= platform.y &&
          objectHitbox.y + objectHitbox.height <= platform.y + 10
        );
      }
      return (
        object.y + object.height >= platform.y &&
        object.y + object.height <= platform.y + 10
      );
    }

    const objectHitbox = object.getHitbox();
    const platformHitbox = platform.getHitbox();

    return (
      objectHitbox.y + objectHitbox.height >= platformHitbox.y &&
      objectHitbox.y + objectHitbox.height <= platformHitbox.y + 10
    );
  }

  /**
   * Checks if object is currently standing on a platform
   * @param {MoveableObject} object - The object to check
   * @param {Platform} platform - The platform to check against
   */
  static isStandingOnPlatform(object, platform) {
    if (!platform.hitboxWidth || !platform.hitboxHeight) {
      if (object.hitboxWidth && object.hitboxHeight) {
        const objectHitbox = object.getHitbox();
        return (
          objectHitbox.x + objectHitbox.width > platform.x &&
          objectHitbox.x < platform.x + platform.width &&
          Math.abs(objectHitbox.y + objectHitbox.height - platform.y) < 5
        );
      }
      return (
        object.x + object.width > platform.x &&
        object.x < platform.x + platform.width &&
        Math.abs(object.y + object.height - platform.y) < 5
      );
    }

    const objectHitbox = object.getHitbox();
    const platformHitbox = platform.getHitbox();

    return (
      objectHitbox.x + objectHitbox.width > platformHitbox.x &&
      objectHitbox.x < platformHitbox.x + platformHitbox.width &&
      Math.abs(objectHitbox.y + objectHitbox.height - platformHitbox.y) < 5
    );
  }

  /**
   * Makes object land on a platform
   * @param {MoveableObject} object - The object to land
   * @param {Platform} platform - The platform to land on
   */
  static landOnPlatform(object, platform) {
    if (!platform.hitboxWidth || !platform.hitboxHeight) {
      if (object.hitboxWidth && object.hitboxHeight) {
        const objectHitbox = object.getHitbox();

        object.y =
          platform.y - objectHitbox.height - (objectHitbox.y - object.y);
      } else {
        object.y = platform.y - object.height;
      }
      object.isOnGround = true;
      object.isJumping = false;
      object.velocityY = 0;
      return;
    }

    const objectHitbox = object.getHitbox();
    const platformHitbox = platform.getHitbox();

    object.y =
      platformHitbox.y - objectHitbox.height - (objectHitbox.y - object.y);
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
