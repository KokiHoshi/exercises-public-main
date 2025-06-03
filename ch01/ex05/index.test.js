import { abs, sum, factorial } from "./index.js";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
  describe("abs", () => {
    it("returns same value when positive value given", () => {
      expect(abs(42)).toBe(42);
    });

    it("returns negated value when negative value given", () => {
      expect(abs(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(abs(0)).toBe(0);
    });
  });

  // 以下に sum, factorial のテストを記載せよ
  // sum
  describe("sum", () => {
    it("add positive numbers", () => {
      expect(sum([1,3,5,7])).toBe(16);
    });

    it("add negative numbers", () => {
      expect(sum([-1,-3,-5,-7])).toBe(-16);
    });

    it("add positive and negative numbers", () => {
      expect(sum([1,3,5,-1])).toBe(8);
    });

    it("add zeros", () => {
      expect(sum([0,0,0,0])).toBe(0);
    });
  });

  // factorial
  describe("factorial", () => {
    it("returns 1 for 0", () => {
      expect(factorial(0)).toBe(1);
    });

    it("return 1 for 1", () => {
      expect(factorial(1)).toBe(1);
    });

    it("return 120 for 5", () => {
      expect(factorial(5)).toBe(120);
    });

    it("throws error for -1", () => {
      expect(() => factorial(-1)).toThrow("Negative");
    });
  });

});
