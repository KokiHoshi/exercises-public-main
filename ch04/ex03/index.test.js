import { sub } from "./index.js";

describe("Bitwise Subtraction", () => {
  test("sub(8, 3) => 5", () => {
    const result = sub(8, 3);
    expect(result).toBe(5);
  });

  test("sub(10, 0) => 10", () => {
    const result = sub(10, 0);
    expect(result).toBe(10);
  });

  test("sub(0, 10) => -10", () => {
    const result = sub(0, 10);
    expect(result).toBe(-10);
  });

  test("sub(-5, -3) => -2", () => {
    const result = sub(-5, -3);
    expect(result).toBe(-2);
  });

  test("sub(-5, 3) => -8", () => {
    const result = sub(-5, 3);
    expect(result).toBe(-8);
  });

  test("sub(5, -3) => 8", () => {
    const result = sub(5, -3);
    expect(result).toBe(8);
  });
});

describe("Bitwise Subtraction - error cases", () => {
  test("sub() => throw", () => {
    expect(() => sub()).toThrow();
  });

  test("sub(undefined, 5) => throw", () => {
    expect(() => sub(undefined, 5)).toThrow();
  });

  test("sub(5, undefined) => throw", () => {
    expect(() => sub(5, undefined)).toThrow();
  });

  test("sub(null, 5) => throw", () => {
    expect(() => sub(null, 5)).toThrow();
  });

  test('sub("8", 3) => throw', () => {
    expect(() => sub("8", 3)).toThrow();
  });

  test("sub({}, []) => throw", () => {
    expect(() => sub({}, [])).toThrow();
  });

  test("sub(NaN, 3) => throw", () => {
    expect(() => sub(NaN, 3)).toThrow();
  });

  test("sub(3, NaN) => throw", () => {
    expect(() => sub(3, NaN)).toThrow();
  });

  test("sub(Infinity, 1) => throw", () => {
    expect(() => sub(Infinity, 1)).toThrow();
  });

  test("sub(1, -Infinity) => throw", () => {
    expect(() => sub(1, -Infinity)).toThrow();
  });
});

describe("Bitwise Subtraction - boundary values", () => {
  const MAX = 0x7FFFFFFF;
  const MIN = -0x80000000;

  test("sub(MAX, 1)", () => {
    expect(sub(MAX, 1)).toBe(MAX - 1);
  });

  test("sub(MAX, MAX)", () => {
    expect(sub(MAX, MAX)).toBe(0);
  });

  test('sub(MAX - 1, -1)', () => {
    expect(sub(MAX - 1, -1)).toBe(MAX);
  });

  test('sub(MIN + 1, 1)', () => {
    expect(sub(MIN + 1, 1)).toBe(MIN);
  });

  test('sub(-1, MAX - 1)', () => {
    expect(sub(-1, MAX - 1)).toBe(-MAX);
  });

  test('sub(MAX - 1, MAX)', () => {
    expect(sub(MAX - 1, MAX)).toBe(-1);
  });

  test('sub(MIN + 1, MIN)', () => {
    expect(sub(MIN + 1, MIN)).toBe(1);
  });

  test("sub(0, MAX)", () => {
    expect(sub(0, MAX)).toBe(-MAX);
  });

  test('sub(0, MIN + 1)', () => {
    expect(sub(0, MIN + 1)).toBe(-(MIN + 1));
  });

  test("sub(-1, -1)", () => {
    expect(sub(-1, -1)).toBe(0);
  });

  test("sub(-0, 0)", () => {
    const result = sub(-0, 0);
    expect(Object.is(result, -0)).toBe(true);
  });
});
