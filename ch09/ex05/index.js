export const instanceOf = (object, constructor) => {
    // 右辺が Symbol.hasInstance を実装している場合はそれに従う
    if (
      constructor != null &&
      typeof constructor === 'function' &&
      typeof constructor[Symbol.hasInstance] === 'function'
    ) {
      return constructor[Symbol.hasInstance](object);
    }
  
    // null/undefined は常に false
    if (object == null) return false;
  
    // 右辺の妥当性チェック（ネイティブ instanceof 同様の例外系を近似）
    if (constructor == null || (typeof constructor !== 'function' && typeof constructor !== 'object')) {
      throw new TypeError('Right-hand side of instanceOf is not an object');
    }
  
    const proto = constructor.prototype;
    if (typeof proto !== 'object' || proto === null) {
      // 例: prototype を持たない関数を RHS にした場合など
      throw new TypeError('Function has non-object prototype in instanceOf check');
    }
  
    // プロトタイプチェーンをたどって一致を探す
    let cur = Object.getPrototypeOf(object);
    while (cur !== null) {
      if (cur === proto) return true;
      cur = Object.getPrototypeOf(cur);
    }
    return false;
  };
  