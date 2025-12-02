// 書き換え不可 + 削除不可（= writable:false, configurable:false）
export function unwritableAndUnconfigurableObj() {
  const obj = {};
  Object.defineProperty(obj, "a", {
    value: 1,
    writable: false,
    configurable: false,
    enumerable: true,
  });
  return obj;
}

// 書き換え可能 + 削除不可（= writable:true, configurable:false）
export function writableAndUnconfigurableObj() {
  const obj = {};
  Object.defineProperty(obj, "b", {
    value: 2,
    writable: true,
    configurable: false,
    enumerable: true,
  });
  return obj;
}

// ネストされたすべてのプロパティ追加禁止（= 拡張不可 + deep freeze）
export function nestedUnwritableObj() {
  const obj = { c: { d: { e: 3 } } };

  // Object.preventExtensions() で新規プロパティ追加を禁止
  // 中のオブジェクトもすべて再帰的に禁止
  function deepFreezeNoExtensions(o) {
    Object.preventExtensions(o); // プロパティ追加禁止
    for (const key of Object.keys(o)) {
      const val = o[key];
      if (typeof val === "object" && val !== null) {
        deepFreezeNoExtensions(val);
      }
    }
    return o;
  }

  return deepFreezeNoExtensions(obj);
}
