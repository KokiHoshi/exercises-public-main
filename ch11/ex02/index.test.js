import { jest } from '@jest/globals';
import { cache } from "./index.js";

describe("cache(slowFn)", () => {
  test("同じオブジェクト引数では slowFn が一度しか呼ばれない", () => {
    const calls = [];
    const slowFn = jest.fn((obj) => {
      calls.push(obj);
      return { out: obj.x * 2 };
    });

    const cachedSlowFn = cache(slowFn);
    const key = { x: 21 };

    const r1 = cachedSlowFn(key);
    const r2 = cachedSlowFn(key);

    expect(slowFn).toHaveBeenCalledTimes(1);
    expect(r2).toBe(r1); // 同じキャッシュ結果を返す
    expect(r1).toEqual({ out: 42 });
  });

  test("異なるオブジェクトは別キャッシュとして扱われる", () => {
    const slowFn = jest.fn((obj) => ({ out: obj.x }));
    const cachedSlowFn = cache(slowFn);

    const a = { x: 1 };
    const b = { x: 1 };

    const ra = cachedSlowFn(a);
    const rb = cachedSlowFn(b);

    expect(slowFn).toHaveBeenCalledTimes(2);
    expect(ra).not.toBe(rb);
    expect(ra).toEqual({ out: 1 });
    expect(rb).toEqual({ out: 1 });
  });

  test("複数キーを混在させても各々でキャッシュされる", () => {
    const slowFn = jest.fn((obj) => ({ id: obj.id, t: Date.now() }));
    const cachedSlowFn = cache(slowFn);

    const k1 = { id: "A" };
    const k2 = { id: "B" };

    const r1a = cachedSlowFn(k1);
    const r2a = cachedSlowFn(k2);
    const r1b = cachedSlowFn(k1);
    const r2b = cachedSlowFn(k2);

    expect(slowFn).toHaveBeenCalledTimes(2);
    expect(r1b).toBe(r1a);
    expect(r2b).toBe(r2a);
  });
});
