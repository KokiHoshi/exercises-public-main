import { retryWithExponentialBackoff } from "./index.js";
import { jest } from "@jest/globals";

describe("retryWithExponentialBackoff (Promise版)", () => {
  test("一定回数後に成功する場合、最終的に resolve される", async () => {
    let count = 0;
    const fn = () => {
      count++;
      return count < 3 ? Promise.reject("fail") : Promise.resolve("ok");
    };

    const result = await retryWithExponentialBackoff(fn, 5, 10);
    expect(result).toBe("ok");
    expect(count).toBe(3);
  });

  test("すべて失敗した場合は reject される", async () => {
    const fn = jest.fn(() => Promise.reject("fail"));
    await expect(retryWithExponentialBackoff(fn, 2, 10)).rejects.toBe("fail");
    // 初回 + 2回リトライ = 3回呼ばれる
    expect(fn).toHaveBeenCalledTimes(3);
  });

  test("リトライ間隔が指数的に増加していることを確認（タイミング差のみ確認）", async () => {
    let calls = 0;
    const start = Date.now();
    const fn = () => {
      calls++;
      return calls < 3 ? Promise.reject("fail") : Promise.resolve("done");
    };
    const result = await retryWithExponentialBackoff(fn, 5, 10);
    const elapsed = Date.now() - start;
    expect(result).toBe("done");
    // 10 + 20 = 30ms 以上経過しているはず（多少の誤差あり）
    expect(elapsed).toBeGreaterThanOrEqual(25);
  });
});
