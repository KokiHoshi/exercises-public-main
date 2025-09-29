import { jest } from '@jest/globals';
import { retryWithExponentialBackoff } from './index.js';

describe('retryWithExponentialBackoff', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout'); // 使うなら追跡できるように
  });
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('最初の試行が成功したら即座に（タイマー0ms後に）callback(true) が呼ばれる', () => {
    const func = jest.fn(() => true);
    const callback = jest.fn();

    retryWithExponentialBackoff(func, 5, callback);

    // 直後はまだ（0ms タイマー未実行なので）呼ばれていない
    expect(callback).not.toHaveBeenCalled();

    // 0ms タイマー実行 → 1回目の try 実行・成功
    jest.advanceTimersByTime(0);

    expect(func).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(true);
    expect(jest.getTimerCount?.() ?? 0).toBe(0);
  });

  test('途中で成功（3回目で成功）すると callback(true) が呼ばれ、それ以降は再試行しない', () => {
    const func = jest
      .fn()
      .mockReturnValueOnce(false) // 1回目: 失敗 → 次は 1s 後
      .mockReturnValueOnce(false) // 2回目: 失敗 → 次は 2s 後
      .mockReturnValueOnce(true); // 3回目: 成功
    const callback = jest.fn();

    retryWithExponentialBackoff(func, 5, callback);

    // 0ms: 1回目
    jest.advanceTimersByTime(0);
    expect(func).toHaveBeenCalledTimes(1);
    expect(callback).not.toHaveBeenCalled();

    // +1s: 2回目
    jest.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledTimes(2);
    expect(callback).not.toHaveBeenCalled();

    // +2s: 3回目（成功）
    jest.advanceTimersByTime(2000);
    expect(func).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(true);

    // 以降の再試行はない
    expect(jest.getTimerCount?.() ?? 0).toBe(0);
  });

  test('maxRetry 回すべて失敗したら callback(false) が呼ばれる（遅延は 1s,2s,4s）', () => {
    const func = jest.fn(() => false);
    const callback = jest.fn();

    // maxRetry = 3 → 試行回数は 4 回（初回 + 3リトライ）
    retryWithExponentialBackoff(func, 3, callback);

    // 0ms: 1回目 実行
    jest.advanceTimersByTime(0);
    expect(func).toHaveBeenCalledTimes(1);
    expect(callback).not.toHaveBeenCalled();

    // +1s: 2回目 実行
    jest.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledTimes(2);
    expect(callback).not.toHaveBeenCalled();

    // +2s: 3回目 実行
    jest.advanceTimersByTime(2000);
    expect(func).toHaveBeenCalledTimes(3);
    expect(callback).not.toHaveBeenCalled();

    // +4s: 4回目 実行（ここで attempt=4 > maxRetry=3 → 失敗で終了）
    jest.advanceTimersByTime(4000);
    expect(func).toHaveBeenCalledTimes(4);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(false);

    // 残タイマーなし
    expect(jest.getTimerCount?.() ?? 0).toBe(0);
  });
});
