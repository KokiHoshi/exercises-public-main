import { newHashTable } from './index.js';
import { jest } from '@jest/globals';

describe('ハッシュテーブルの基本操作', () => {
  let table;

  beforeEach(() => {
    table = newHashTable(10);
  });

  test('put & get', () => {
    table.put('key1', 'value1');
    table.put('key2', { value: 'value2' });

    expect(table.size).toBe(2);
    expect(table.get('key1')).toBe('value1');
    expect(table.get('key2')).toEqual({ value: 'value2' });
  });

  test('put overwrite', () => {
    table.put('key1', 'value1');
    table.put('key1', 'new value');

    expect(table.size).toBe(1);
    expect(table.get('key1')).toBe('new value');
  });

  test('remove existing', () => {
    table.put('key1', 'value1');
    table.remove('key1');

    expect(table.get('key1')).toBeUndefined();
    expect(table.size).toBe(0);
  });

  test('remove non-existing', () => {
    table.put('key1', 'value1');
    table.remove('keyX');

    expect(table.get('key1')).toBe('value1');
    expect(table.size).toBe(1);
  });
});

describe('ハッシュ衝突時の動作', () => {
  test('colliding keys should be handled with chaining', () => {
    const mockHash = jest.fn((key) => {
      if (key === 'a' || key === 'b') return 1; // 同じインデックスに衝突
      return 0;
    });

    const table = newHashTable(3, mockHash);
    table.put('a', 'A');
    table.put('b', 'B');
    table.put('x', 'X');

    expect(table.size).toBe(3);
    expect(table.get('a')).toBe('A');
    expect(table.get('b')).toBe('B');
    expect(table.get('x')).toBe('X');

    table.remove('a');
    expect(table.get('a')).toBeUndefined();
    expect(table.get('b')).toBe('B');
  });
});
