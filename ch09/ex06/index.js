export class TypedMap {
  #map;
  #keyType;
  #valType;

  constructor(keyType, valueType, iterable) {
    this.#map = new Map();
    this.#keyType = keyType;   // 例: 'string' / Number / Date / Array
    this.#valType = valueType; // 同上
    if (iterable != null) {
      for (const [k, v] of iterable) this.set(k, v); // set経由で型チェック
    }
  }

  static #isOfType(T, x) {
    if (T === undefined) return true; 
    if (typeof T === 'string') {
      return T === 'object' ? (x !== null && typeof x === 'object') : typeof x === T;
    }
    if (T === Array) return Array.isArray(x);
    if (typeof T === 'function') return x instanceof T; // Date/RegExp/自作クラスなど
    return false;

  }

  #assert(k, v) {
    if (!TypedMap.#isOfType(this.#keyType, k))  throw new TypeError('Invalid key type');
    if (!TypedMap.#isOfType(this.#valType, v))  throw new TypeError('Invalid value type');
  }

  set(k, v) { this.#assert(k, v); this.#map.set(k, v); return this; }
  get(k)    { return this.#map.get(k); }
  has(k)    { return this.#map.has(k); }
  delete(k) { return this.#map.delete(k); }
  clear()   { this.#map.clear(); }
  get size(){ return this.#map.size; }
  [Symbol.iterator]() { return this.#map[Symbol.iterator](); }
}
