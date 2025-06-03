import { equalArrays } from "./index.js";

test("ch03-ex07", () => {
  const x = {0: "a", 1: "b", length: 2}; // ここを変更
  const y = ["a", "b"]; // ここを変更

  expect(equalArrays(x, y)).toBe(true);
  expect(x).not.toEqual(y);
});
