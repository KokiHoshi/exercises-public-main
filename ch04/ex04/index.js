export function bitCount(n) {
  if (typeof n !== "number" || !Number.isFinite(n)) {
    throw new TypeError("Argument must be a finite number");
  }
  // 32ビット整数に変換（符号付き）
  n = n >>> 0;

  let count = 0;
  while (n !== 0) {
    // 最下位の1ビットを落とす Brian Kernighan's Algorithm
    n = n & (n - 1);
    count++;
  }
  return count;
}
