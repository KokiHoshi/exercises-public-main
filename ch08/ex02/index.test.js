import { powRec, powIter } from './index.js';

describe('powRec / powIter', () => {
  const cases = [
    { b: 2, n: 1, expected: 2 },
    { b: 2, n: 2, expected: 4 },
    { b: 2, n: 10, expected: 1024 },
    { b: 3, n: 5, expected: 243 },
    { b: 5, n: 0, expected: 1 },
    { b: 7, n: 1, expected: 7 },
    { b: 10, n: 3, expected: 1000 },
    { b: -2, n: 3, expected: -8 },
    { b: -2, n: 4, expected: 16 }
  ];

  describe('powRec', () => {
    test.each(cases)('powRec($b, $n) === $expected', ({ b, n, expected }) => {
      expect(powRec(b, n)).toBe(expected);
    });
  });

  describe('powIter', () => {
    test.each(cases)('powIter($b, $n) === $expected', ({ b, n, expected }) => {
      expect(powIter(b, n)).toBe(expected);
    });
  });

  describe('powRecと powIterは同じ結果になる', () => {
    test.each(cases)('powRec($b, $n) === powIter($b, $n)', ({ b, n }) => {
      expect(powRec(b, n)).toBe(powIter(b, n));
    });
  });
});
