import { bitCount } from "./index.js";

describe("bitCount - normal cases", () => {
  test("bitCount(0b00000000) => 0", () => {
    expect(bitCount(0b00000000)).toBe(0);
  });

  test("bitCount(0b00000001) => 1", () => {
    expect(bitCount(0b00000001)).toBe(1);
  });

  test("bitCount(0b00000111) => 3", () => {
    expect(bitCount(0b00000111)).toBe(3);
  });

  test("bitCount(0b10101010) => 4", () => {
    expect(bitCount(0b10101010)).toBe(4);
  });

  test("bitCount(0b11111111) => 8", () => {
    expect(bitCount(0b11111111)).toBe(8);
  });

  test("bitCount(0b1111111111111111111111111111111) => 31", () => {
    expect(bitCount(0b1111111111111111111111111111111)).toBe(31);
  });

  test("bitCount(0xFFFFFFFF) => 32", () => {
    expect(bitCount(0xffffffff)).toBe(32);
  });

  test("bitCount(-1) => 32", () => {
    expect(bitCount(-1)).toBe(32); // 32bit すべて1になるため
  });
});

describe("bitCount - boundary values", () => {
  test("bitCount(Number.MAX_SAFE_INTEGER)", () => {
    const result = bitCount(Number.MAX_SAFE_INTEGER);
    expect(typeof result).toBe("number");
    expect(result).toBeGreaterThan(0);
  });

  test("bitCount(Number.MIN_SAFE_INTEGER)", () => {
    const result = bitCount(Number.MIN_SAFE_INTEGER);
    expect(typeof result).toBe("number");
  });

  test("bitCount(0x80000000) => 1", () => {
    expect(bitCount(0x80000000)).toBe(1); // MSBのみ1
  });
});

describe("bitCount - error cases", () => {
  test("bitCount() => should throw", () => {
    expect(() => bitCount()).toThrow();
  });

  test('bitCount("1010") => should throw', () => {
    expect(() => bitCount("1010")).toThrow();
  });

  test("bitCount(null) => should throw", () => {
    expect(() => bitCount(null)).toThrow();
  });

  test("bitCount(undefined) => should throw", () => {
    expect(() => bitCount(undefined)).toThrow();
  });

  test("bitCount(NaN) => should throw", () => {
    expect(() => bitCount(NaN)).toThrow();
  });
});
