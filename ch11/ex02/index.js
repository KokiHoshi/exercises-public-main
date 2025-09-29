export function cache(f) {
  const wm = new WeakMap();

  return function (obj) {
    if (wm.has(obj)) {
      return wm.get(obj);
    }

    const result = f(obj);
    wm.set(obj, result);
    return result;
  };
}

export function slowFn(obj) {
  let sum = 0;
  for (let i = 0; i < 1e6; i++) {
    sum += i;
  }
  return { value: obj.value, sum };
}

const cachedSlowFn = cache(slowFn);
