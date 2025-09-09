class Animation {
  static playAnimation(obj, images) {
    let i = obj.currentFrame % images.length;
    let path = images[i];
    obj.img = obj.imageCache[path];
    obj.currentFrame++;
  }

  static playAttackAnimation(obj, images) {
    if (obj.isAttackAnimationPlaying) {
      let i = obj.currentFrame % images.length;
      let path = images[i];
      obj.img = obj.imageCache[path];
      obj.currentFrame++;

      if (obj.currentFrame >= images.length) {
        obj.isAttacking = false;
        obj.isAttackAnimationPlaying = false;
        obj.currentFrame = 0;

        if (obj.normalHitbox) {
          obj.setCustomHitbox(
            obj.normalHitbox.width,
            obj.normalHitbox.height,
            obj.normalHitbox.offsetX,
            obj.normalHitbox.offsetY
          );
        }

        if (obj.canDealDamage !== undefined) {
          obj.canDealDamage = false;
        }
      }
    }
  }

  static animate(obj) {
    obj.animationInterval = setInterval(() => {
      if (obj.isDead) {
        Animation.playAnimation(obj, obj.img_death);
      } else if (obj.isJumping) {
        Animation.playAnimation(obj, obj.img_jump);
      } else if (obj.isMoving) {
        Animation.playAnimation(obj, obj.img_walk);
      } else if (!obj.isAttacking && !obj.isHurt) {
        Animation.playAnimation(obj, obj.img_idle);
      }
    }, 150);
  }

  static animateAttack(obj) {
    if (obj.attackAnimationInterval) {
      clearInterval(obj.attackAnimationInterval);
    }

    let attackSpeed = 60;

    if (obj.constructor.name === "demon") {
      attackSpeed = 150;
    } else if (obj.constructor.name === "goblin") {
      attackSpeed = 100;
    }

    obj.attackAnimationInterval = setInterval(() => {
      if (obj.isAttacking) {
        Animation.playAttackAnimation(obj, obj.img_attack);
      } else {
        clearInterval(obj.attackAnimationInterval);
        obj.attackAnimationInterval = null;
      }
    }, attackSpeed);
  }

  static playHurtAnimation(obj, images) {
    if (obj.isHurtAnimationPlaying) {
      let i = obj.hurtFrameCount;
      if (i < images.length) {
        let path = images[i];
        obj.img = obj.imageCache[path];
        obj.hurtFrameCount++;
      } else {
        obj.isHurt = false;
        obj.isHurtAnimationPlaying = false;
        obj.hurtFrameCount = 0;
      }
    }
  }

  static animateHurt(obj) {
    if (obj.hurtAnimationInterval) {
      clearInterval(obj.hurtAnimationInterval);
    }

    obj.hurtAnimationInterval = setInterval(() => {
      if (obj.isHurt) {
        Animation.playHurtAnimation(obj, obj.img_hurt);
      } else {
        clearInterval(obj.hurtAnimationInterval);
        obj.hurtAnimationInterval = null;
      }
    }, 120);
  }

  static animateSpike(obj) {
    obj.animationInterval = setInterval(() => {
      if (obj.traps_spike) {
        Animation.playAnimation(obj, obj.traps_spike);
      }
    }, 800);
  }

  static animateSpeer(obj) {
    obj.animationInterval = setInterval(() => {
      if (obj.traps_speer && obj.isExtended) {
        Animation.playAnimation(obj, obj.traps_speer);
      }
    }, 180);
  }

  static animateFireblazer(obj) {
    obj.animationInterval = setInterval(() => {
      if (obj.traps_fire) {
        Animation.playAnimation(obj, obj.traps_fire);
      }
    }, 120);
  }

  static animateJumper(obj) {
    obj.animationInterval = setInterval(() => {
      if (obj.traps_jumper && obj.isActivated) {
        Animation.playAnimation(obj, obj.traps_jumper);
      }
    }, 200);
  }

  static animateFireblazerDual(obj) {
    obj.animationInterval = setInterval(() => {
      obj.currentFireboxFrame =
        (obj.currentFireboxFrame + 1) % obj.traps_firebox.length;

      obj.currentFireFrame = (obj.currentFireFrame + 1) % obj.traps_fire.length;
    }, 8000 / 60);
  }

  static animateSpikeCustom(obj) {
    obj.animationInterval = setInterval(() => {
      Animation.playAnimation(obj, obj.traps_spike);
    }, 1000 / 10);
  }

  static animateJumperCustom(obj) {
    obj.animationInterval = setInterval(() => {
      Animation.playAnimation(obj, obj.traps_jumper);
    }, 1000 / 6);
  }

  static animateSpeerCustom(obj) {
    obj.animationInterval = setInterval(() => {
      Animation.playAnimation(obj, obj.traps_speer);
    }, 1000 / 8);
  }

  static animateCoin(obj) {
    obj.animationInterval = setInterval(() => {
      Animation.playAnimation(obj, obj.img_coin);
    }, 1000 / 8);
  }

  static animateProjectile(obj) {
    obj.animationInterval = setInterval(() => {
      Animation.playAnimation(obj, obj.img_projectile);
    }, 200);
  }
}
