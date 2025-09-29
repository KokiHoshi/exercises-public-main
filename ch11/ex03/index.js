/**
 * 32bit のエンディアン変換を行うヘルパー
 * @param {number} x - Uint32 の値
 * @returns {number} - バイト順を逆にした値
 */
function swapEndian32(x) {
  return (
    ((x >>> 24) & 0xff) | // 最上位 → 最下位
    ((x >>> 8) & 0xff00) | // 2番目 → 2番目
    ((x << 8) & 0xff0000) | // 3番目 → 3番目
    ((x << 24) & 0xff000000) // 最下位 → 最上位
  );
}

/**
 * リトルエンディアン として読んで ビッグエンディアン に変換
 * @param {Uint32Array} arr
 * @returns {Uint32Array}
 */
export function littleToBig(arr) {
  const result = new Uint32Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    result[i] = swapEndian32(arr[i]);
  }
  return result;
}

/**
 * ビッグエンディアン として読んで リトルエンディアン に変換
 * @param {Uint32Array} arr
 * @returns {Uint32Array}
 */
export function bigToLittle(arr) {
  const result = new Uint32Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    result[i] = swapEndian32(arr[i]);
  }
  return result;
}
