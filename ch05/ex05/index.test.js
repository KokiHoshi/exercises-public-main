import { f } from './index.js';

describe('f - filter object to even number properties only', () => {
  test('filters out odd values', () => {
    const input = { x: 1, y: 2, z: 3 };
    const result = f(input);
    expect(result).toEqual({ y: 2 });
  });

  test('includes multiple even values', () => {
    const input = { a: 4, b: 6, c: 7 };
    expect(f(input)).toEqual({ a: 4, b: 6 });
  });

  test('returns empty object if no even numbers', () => {
    const input = { a: 1, b: 3, c: 5 };
    expect(f(input)).toEqual({});
  });

  test('ignores non-numeric values', () => {
    const input = { a: 2, b: '4', c: null, d: true, e: 6 };
    expect(f(input)).toEqual({ a: 2, e: 6 });
  });

  test('original object is not mutated', () => {
    const input = { a: 2, b: 3 };
    const copy = { ...input };
    f(input);
    expect(input).toEqual(copy); 
  });

  test('empty object returns empty object', () => {
    expect(f({})).toEqual({});
  });
});
