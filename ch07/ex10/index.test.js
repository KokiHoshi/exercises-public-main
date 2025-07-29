import { DynamicSizeArray } from "./index.js";

describe("DynamicSizeArray", () => {
  test("initial length is 0", () => {
    const arr = new DynamicSizeArray();
    expect(arr.length()).toBe(0);
  });

  test("push and get elements", () => {
    const arr = new DynamicSizeArray();
    arr.push("a");
    arr.push("b");
    arr.push("c");

    expect(arr.length()).toBe(3);
    expect(arr.get(0)).toBe("a");
    expect(arr.get(1)).toBe("b");
    expect(arr.get(2)).toBe("c");
  });

  test("set modifies element", () => {
    const arr = new DynamicSizeArray();
    arr.push("x");
    arr.push("y");

    arr.set(0, "z");
    expect(arr.get(0)).toBe("z");
    expect(arr.get(1)).toBe("y");
  });

  test("push expands underlying fixed array", () => {
    const arr = new DynamicSizeArray();

    for (let i = 0; i < 10; i++) {
      arr.push(i);
    }

    expect(arr.length()).toBe(10);
    expect(arr.get(0)).toBe(0);
    expect(arr.get(9)).toBe(9);
  });

  test("get throws on out-of-bounds", () => {
    const arr = new DynamicSizeArray();
    arr.push("only");

    expect(() => arr.get(-1)).toThrow();
    expect(() => arr.get(1)).toThrow();
  });

  test("set throws on out-of-bounds", () => {
    const arr = new DynamicSizeArray();
    arr.push("only");

    expect(() => arr.set(-1, "bad")).toThrow();
    expect(() => arr.set(1, "bad")).toThrow();
  });
});
