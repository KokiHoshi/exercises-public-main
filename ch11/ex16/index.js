/**
 * 指数バックオフ付きリトライ
 * @param {() => boolean} func   試行する関数（true で成功, false で失敗）
 * @param {number} maxRetry      最大リトライ回数
 * @param {(result: boolean) => void} callback   コールバック
 */
export function retryWithExponentialBackoff(func, maxRetry, callback) {
  let attempt = 0;

  function tryOnce() {
    attempt++;
    try {
      const result = func();
      if (result) {
        callback(true);
        return;
      }
    } catch (e) {
      // func 内でエラーが出た場合も失敗扱い
    }

    if (attempt > maxRetry) {
      callback(false);
      return;
    }

    const delay = 1000 * Math.pow(2, attempt - 1);
    setTimeout(tryOnce, delay);
  }

  setTimeout(tryOnce, 0);
}
