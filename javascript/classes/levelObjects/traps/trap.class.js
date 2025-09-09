class TrapLogic {
  static activateJumper(jumper, char) {
    if (!jumper.isActivated) {
      char.velocityY = -20;
      jumper.isActivated = true;
      setTimeout(() => {
        jumper.isActivated = false;
      }, 1000);
    }
  }

  static triggerSpeer(speer) {
    if (!speer.isExtended) {
      TrapLogic.extendSpeer(speer);
      setTimeout(() => {
        TrapLogic.retractSpeer(speer);
      }, 2000);
    }
  }

  static extendSpeer(speer) {
    speer.isExtended = true;
  }

  static retractSpeer(speer) {
    speer.isExtended = false;
  }

  static dealDamage(char, damage = 1) {
    if (char.canTakeDamage && char.canTakeDamage()) {
      char.isHurt = true;
      char.takeDamage(damage);
    }
  }

  static createSpikeGroup(templateArray, positions) {
    const spikes = [];
    positions.forEach((pos, index) => {
      const spike = new Spike(pos.x, pos.y);
      if (pos.width) spike.width = pos.width;
      if (pos.height) spike.height = pos.height;
      if (templateArray[index]) {
        spike.loadImage(templateArray[index]);
      }
      spikes.push(spike);
    });
    return spikes;
  }

  static createFireblazerGroup(templateArray, positions) {
    const fireblazers = [];
    positions.forEach((pos, index) => {
      const fireblazer = new Fireblazer(pos.x, pos.y);
      if (pos.width) fireblazer.width = pos.width;
      if (pos.height) fireblazer.height = pos.height;
      if (templateArray[index]) {
        fireblazer.loadImage(templateArray[index]);
      }
      fireblazers.push(fireblazer);
    });
    return fireblazers;
  }

  static createJumperGroup(templateArray, positions) {
    const jumpers = [];
    positions.forEach((pos, index) => {
      const jumper = new Jumper(pos.x, pos.y);
      if (pos.width) jumper.width = pos.width;
      if (pos.height) jumper.height = pos.height;
      if (templateArray[index]) {
        jumper.loadImage(templateArray[index]);
      }
      jumpers.push(jumper);
    });
    return jumpers;
  }

  static createSpeerGroup(templateArray, positions) {
    const speers = [];
    positions.forEach((pos, index) => {
      const speer = new Speer(pos.x, pos.y);
      if (pos.width) speer.width = pos.width;
      if (pos.height) speer.height = pos.height;
      if (templateArray[index]) {
        speer.loadImage(templateArray[index]);
      }
      speers.push(speer);
    });
    return speers;
  }

  static checkTrapCollision(char, trap) {
    if (
      char.isCollidingWithCustomHitbox &&
      char.isCollidingWithCustomHitbox(trap)
    ) {
      return true;
    }
    return char.isColliding && char.isColliding(trap);
  }

  static handleTrapHit(char, trap) {
    if (trap instanceof Jumper) {
      TrapLogic.activateJumper(trap, char);
    } else if (trap instanceof Speer) {
      TrapLogic.triggerSpeer(trap);
      TrapLogic.dealDamage(char);
    } else {
      TrapLogic.dealDamage(char);
    }
  }
}
