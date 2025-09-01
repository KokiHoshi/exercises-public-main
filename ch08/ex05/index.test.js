import { sequenceToObject } from './index.js';

describe('sequenceToObject', () => {
  describe('正常系', () => {
    test('偶数個の [string, any] ペアの場合', () => {
      expect(sequenceToObject('a', 1, 'b', 2)).toEqual({ a: 1, b: 2 });
    });

    test('引数が空の場合', () => {
      expect(sequenceToObject()).toEqual({});
    });

    test('スプレッド演算子の場合', () => {
      const arr = ['x', 10, 'y', 20, 'z', 30];
      expect(sequenceToObject(...arr)).toEqual({ x: 10, y: 20, z: 30 });
    });

    test('値が number, string, object など混在している場合', () => {
      const objVal = { nested: true };
      expect(sequenceToObject('key1', 123, 'key2', objVal))
        .toEqual({ key1: 123, key2: objVal });
    });
  });

  describe('異常系', () => {
    test('値の個数が奇数の場合', () => {
      expect(() => sequenceToObject('a', 1, 'b')).toThrow('値の個数は偶数である必要があります');
    });

    test('キーが string でない場合', () => {
      expect(() => sequenceToObject(100, 'value')).toThrow(TypeError);
      expect(() => sequenceToObject(true, 'value')).toThrow(TypeError);
      expect(() => sequenceToObject({}, 'value')).toThrow(TypeError);
    });
  });
});
