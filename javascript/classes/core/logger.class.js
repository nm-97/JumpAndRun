class Logger {
  static log(message) {
    console.log(`[LOG] ${message}`);
  }

  static error(message) {
    console.error(`[ERROR] ${message}`);
  }

  static warn(message) {
    console.warn(`[WARN] ${message}`);
  }
}

export default Logger;
