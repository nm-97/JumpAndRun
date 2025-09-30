// Beispiel-Unit-Test für ObjectFactory
const assert = require("assert");
const ObjectFactory = require("../javascript/classes/core/objectFactory.class.js");

describe("ObjectFactory", () => {
  it("should create a char object", () => {
    const char = ObjectFactory.createChar({ x: 10, y: 20 });
    assert(char);
    assert.strictEqual(char.x, 10);
    assert.strictEqual(char.y, 20);
  });
});
