// 再帰版
// n が偶数なら (b^(n/2))^2、奇数なら b * b^(n-1)
export const powRec = (() => {
  const rec = function rec(b, n) {
    if (n === 0) return 1;
    if (n === 1) return b;
    if (n % 2 === 0) {
      const half = rec(b, Math.floor(n / 2));
      return half * half;
    } else {
      return b * rec(b, n - 1);
    }
  };
  return rec;
})();

// ループ版
export const powIter = (() => {
  return (b, n) => {
    let result = 1;
    let base = b;
    let exp = n;
    while (exp > 0) {
      if (exp & 1) result *= base; // exp の最下位ビットが 1 なら掛ける
      base *= base; // 底を二乗して次の桁へ
      exp = Math.floor(exp / 2); // 指数を右シフト
    }
    return result;
  };
})();

console.log(powRec(2, 10)); // 1024
console.log(powIter(3, 11)); //  177147
