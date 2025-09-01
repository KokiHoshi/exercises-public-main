// 1)
// 渡された関数のどれかが true を返したら true。1つも無ければ常に false
export const any = (...predicates) =>
  function (...args) {
    for (const p of predicates) {
      if (typeof p !== "function") {
        throw new TypeError("any: all arguments must be functions");
      }
      if (p.apply(this, args)) return true;
    }
    return false;
  };

// 2
// 1つ目の関数で発生した例外を 2 つ目の関数の引数として処理し結果を返す
export const catching = (tryFn, handler) =>
  function (...args) {
    if (typeof tryFn !== "function" || typeof handler !== "function") {
      throw new TypeError("catching: both arguments must be functions");
    }
    try {
      return tryFn.apply(this, args);
    } catch (e) {
      return handler.call(this, e);
    }
  };
