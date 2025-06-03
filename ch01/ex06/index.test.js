import { fib } from "./index.js";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
  describe("fib", () => {
    it("returns 0 for 0", () => {
        expect(fib(0)).toBe(0);
    });

    it("returns 5 for 5", () => {
        expect(fib(5)).toBe(5);
    });

    it("returns 2111485077978050 for 75", () => {
        expect(fib(75)).toBe(2111485077978050);
    });

  });
});