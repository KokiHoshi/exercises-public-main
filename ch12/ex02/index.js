export function fibonacciIterator() {
  let x = 0,
    y = 1;
  return {
    // for...of で使えるようにする
    [Symbol.iterator]() {
      return this;
    },
    next() {
      const value = y;
      [x, y] = [y, x + y];
      return { value, done: false }; // 無限列なので done:false
    },
  };
}
