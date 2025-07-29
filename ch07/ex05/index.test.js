import { pop, push, shift, unshift, sort } from './index.js';

describe("非破壊的配列操作関数", () => {
  let original;

  beforeEach(() => {
    original = [1, 2, 3, 4, 5];
  });

  test("pop: 末尾を除いた新配列を返す", () => {
    const result = pop(original);
    expect(result).toEqual([1, 2, 3, 4]);
    expect(original).toEqual([1, 2, 3, 4, 5]);
  });

  test("push: 値を末尾に追加した新配列を返す", () => {
    const result = push(original, 6);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    expect(original).toEqual([1, 2, 3, 4, 5]);
  });

  test("shift: 先頭を除いた新配列を返す", () => {
    const result = shift(original);
    expect(result).toEqual([2, 3, 4, 5]);
    expect(original).toEqual([1, 2, 3, 4, 5]);
  });

  test("unshift: 値を先頭に追加した新配列を返す", () => {
    const result = unshift(original, 0);
    expect(result).toEqual([0, 1, 2, 3, 4, 5]);
    expect(original).toEqual([1, 2, 3, 4, 5]);
  });

  test("sort: 比較関数に従って並び替えた新配列を返す", () => {
    const result = sort(original, (a, b) => b - a);
    expect(result).toEqual([5, 4, 3, 2, 1]);
    expect(original).toEqual([1, 2, 3, 4, 5]);
  });
});
