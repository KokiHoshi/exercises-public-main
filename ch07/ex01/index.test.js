import { addMatrices, multiplyMatrices } from './index.js';

describe('行列演算', () => {
  describe('addMatrices()', () => {
    test('2x2行列の加算が正しくできる', () => {
      const A = [[1, 2], [3, 4]];
      const B = [[5, 6], [7, 8]];
      const expected = [[6, 8], [10, 12]];
      expect(addMatrices(A, B)).toEqual(expected);
    });

    test('次元不一致でエラーを投げる', () => {
      const A = [[1, 2], [3, 4]];
      const B = [[5, 6, 7], [8, 9, 10]];
      expect(() => addMatrices(A, B)).toThrow("行列の次元が一致しません");
    });
  });

  describe('multiplyMatrices()', () => {
    test('2x2行列の積が正しく計算される', () => {
      const A = [[1, 2], [3, 4]];
      const B = [[5, 6], [7, 8]];
      const expected = [[19, 22], [43, 50]];
      expect(multiplyMatrices(A, B)).toEqual(expected);
    });

    test('aの列数とbの行数が一致しないとエラーを投げる', () => {
      const A = [[1, 2, 3], [4, 5, 6]];
      const B = [[7, 8], [9, 10]];
      expect(() => multiplyMatrices(A, B)).toThrow("行列の積が定義できません（aの列数 ≠ bの行数）");
    });

    test('2x3 * 3x2 の行列の積を正しく計算できる', () => {
      const A = [
        [1, 2, 3],
        [4, 5, 6]
      ];
      const B = [
        [7, 8],
        [9, 10],
        [11, 12]
      ];
      const expected = [
        [58, 64],
        [139, 154]
      ];
      expect(multiplyMatrices(A, B)).toEqual(expected);
    });
  });
});
