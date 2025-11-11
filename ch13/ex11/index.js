/**
 * 指数バックオフ付きリトライ
 * @param {Function} func - Promise を返す関数
 * @param {number} retries - 最大リトライ回数
 * @param {number} [baseDelay=100] - 初期待機時間（ミリ秒）
 * @returns {Promise<any>} func の返り値を解決／拒否する Promise
 */
export function retryWithExponentialBackoff(func, retries, baseDelay = 100) {
  return new Promise((resolve, reject) => {
    const attempt = (count) => {
      func()
        .then(resolve)
        .catch((err) => {
          if (count >= retries) {
            reject(err);
            return;
          }
          const delay = baseDelay * 2 ** count;
          setTimeout(() => attempt(count + 1), delay);
        });
    };
    attempt(0);
  });
}
