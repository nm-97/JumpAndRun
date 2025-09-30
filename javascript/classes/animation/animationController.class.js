class AnimationController {
  static pauseAll(world) {
    if (world.char) world.char.pauseAllIntervals();
    if (world.enemies) world.enemies.forEach((e) => e.pauseAllIntervals());
    if (world.level) {
      world.level
        .getAllCollectibles()
        .forEach((c) => c.pauseAllIntervals && c.pauseAllIntervals());
      world.level
        .getAllTraps()
        .forEach((t) => t.pauseAllIntervals && t.pauseAllIntervals());
    }
    if (world.demonProjectiles)
      world.demonProjectiles.forEach((p) => p.pauseAllIntervals());
  }

  static resumeAll(world) {
    if (world.char) world.char.resumeAllIntervals();
    if (world.enemies) world.enemies.forEach((e) => e.resumeAllIntervals());
    if (world.level) {
      world.level
        .getAllCollectibles()
        .forEach((c) => c.resumeAllIntervals && c.resumeAllIntervals());
      world.level
        .getAllTraps()
        .forEach((t) => t.resumeAllIntervals && t.resumeAllIntervals());
    }
    if (world.demonProjectiles)
      world.demonProjectiles.forEach((p) => p.resumeAllIntervals());
  }
}
