import { Equal } from './index.js';

describe('Equal', () => {
  test('0.3 - 0.2 , 0.1', () => {
    expect(Equal(0.3 - 0.2, 0.1)).toBe(true);
  });

  test('0.2 - 0.1 , 0.1', () => {
    expect(Equal(0.2 - 0.1, 0.1)).toBe(true);
  });

  test('large error', () => {
    expect(Equal(0.3, 0.3001)).toBe(false);
  });
});
