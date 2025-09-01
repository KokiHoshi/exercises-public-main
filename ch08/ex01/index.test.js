import { jest } from "@jest/globals";
import { repeatChar, square, getNow } from "./index.js";

describe("repeatChar", () => {
  const origLog = console.log;

  beforeEach(() => {
    console.log = jest.fn();
  });

  afterEach(() => {
    console.log = origLog;
    jest.clearAllMocks();
  });

  test("n回ログ出力し、cをn個含む配列を返す", () => {
    const n = 5;
    const c = "A";
    const result = repeatChar(n, c);

    expect(console.log).toHaveBeenCalledTimes(n);
    // すべて 'A' が出力されていること
    for (let i = 0; i < n; i++) {
      expect(console.log).toHaveBeenNthCalledWith(i + 1, c);
    }

    expect(result).toHaveLength(n);
    expect(result.every((v) => v === c)).toBe(true);
  });

  test("n=0 ならログ出力なしで空配列", () => {
    const result = repeatChar(0, "Z");
    expect(console.log).not.toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});

describe("square", () => {
  test("x^2 を返す（代表値）", () => {
    expect(square(0)).toBe(0);
    expect(square(1)).toBe(1);
    expect(square(2)).toBe(4);
    expect(square(-3)).toBe(9);
    expect(square(10)).toBe(100);
  });

  test("整数でない値も数値演算として動作", () => {
    expect(square(2.5)).toBeCloseTo(6.25);
  });
});

describe("getNow", () => {
  test("now プロパティを持つオブジェクトを返す", () => {
    const result = getNow();

    expect(result).toHaveProperty("now");
    expect(typeof result.now).toBe("number");
  });
  test("now の値は現在時刻である", () => {
    const t0 = Date.now();
    const { now } = getNow();
    const t1 = Date.now();

    expect(now).toBeGreaterThanOrEqual(t0);
    expect(now).toBeLessThanOrEqual(t1);
  });
});
