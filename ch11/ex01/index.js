export class TypeMap {
  #map = new Map();

  get(key) {
    return this.#map.get(key);
  }

  set(key, value) {
    if (typeof key !== "function") {
      throw new TypeError("TypeMap key must be a constructor function/class.");
    }
    if (!TypeMap.#isAcceptableValue(key, value)) {
      const kname = key.name || "<anonymous>";
      throw new TypeError(`Value is not acceptable for key ${kname}.`);
    }
    this.#map.set(key, value);
    return this;
  }

  static #isAcceptableValue(key, value) {
    if (key === String)
      return typeof value === "string" || value instanceof String;
    if (key === Number)
      return typeof value === "number" || value instanceof Number;
    if (key === Boolean)
      return typeof value === "boolean" || value instanceof Boolean;
    if (key === Symbol) return typeof value === "symbol";
    if (key === BigInt) return typeof value === "bigint";

    if (key === Date) {
      return Object.prototype.toString.call(value) === "[object Date]";
    }

    try {
      return value instanceof key;
    } catch {
      return false;
    }
  }
}
