export function sub(a, b) {
  if (
    typeof a !== "number" ||
    typeof b !== "number" ||
    !Number.isFinite(a) ||
    !Number.isFinite(b)
  ) {
    throw new TypeError("Arguments must be finite numbers");
  }

  // bの2の補数を求める → ~b + 1
  let negB = add(~b, 1); // ~b: ビット反転, 1を加えて2の補数

  // a + (-b) を計算する
  return add(a, negB);
}

// 加算
function add(x, y) {
  while (y !== 0) {
    // 各ビットの繰り上がりを求める
    let carry = x & y;

    // ビットごとの加算（繰り上がりなし）
    x = x ^ y;

    // キャリーを左に1ビットシフト
    y = carry << 1;
  }
  return x;
}
