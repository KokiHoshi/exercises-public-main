import { quickSort } from './index.js';

describe('quickSort', () => {
  test('空配列をソートできる', () => {
    expect(quickSort([])).toEqual([]);
  });

  test('すでにソート済みの配列', () => {
    expect(quickSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  test('逆順の配列', () => {
    expect(quickSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  test('ランダムな配列', () => {
    const arr = [3, 1, 4, 1, 5, 9, 2];
    expect(quickSort(arr)).toEqual([1, 1, 2, 3, 4, 5, 9]);
  });

  test('文字列配列の辞書順ソート', () => {
    const names = ['Charlie', 'Alice', 'Bob'];
    expect(quickSort(names)).toEqual(['Alice', 'Bob', 'Charlie']);
  });

  test('比較関数を使った降順ソート', () => {
    const arr = [5, 2, 9, 1];
    const sorted = quickSort(arr, (a, b) => b - a);
    expect(sorted).toEqual([9, 5, 2, 1]);
  });
});
