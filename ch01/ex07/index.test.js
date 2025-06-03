import { Point } from "./index.js";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
    describe("Point", () => {
        it("adds coordinates from another Point", () => {
          let p1 = new Point(1, 2);
          let p2 = new Point(3, 4);
          p1.add(p2);
          expect(p1.x).toBe(4);
          expect(p1.y).toBe(6);
        });
      });
  });