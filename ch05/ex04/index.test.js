import { fibonacciWhile, fibonacciDoWhile, fibonacciFor } from './index.js';

describe('Fibonacci sequence (first 10 terms)', () => {
  const expected = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

  test('fibonacciWhile returns correct sequence', () => {
    expect(fibonacciWhile()).toEqual(expected);
  });

  test('fibonacciDoWhile returns correct sequence', () => {
    expect(fibonacciDoWhile()).toEqual(expected);
  });

  test('fibonacciFor returns correct sequence', () => {
    expect(fibonacciFor()).toEqual(expected);
  });
});
