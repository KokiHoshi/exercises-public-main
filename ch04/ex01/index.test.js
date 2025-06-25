import { add, sub, mul, div } from './index.js';

describe('Complex Number Operations', () => {
    const a = { real: 3, imag: 2 };
    const b = { real: 1, imag: 4 };
  
    test('add(a, b) => { real: 4, imag: 6 }', () => {
      const result = add(a, b);
      expect(result).toEqual({ real: 4, imag: 6 });
    });
  
    test('sub(a, b) => { real: 2, imag: -2 }', () => {
      const result = sub(a, b);
      expect(result).toEqual({ real: 2, imag: -2 });
    });
  
    test('mul(a, b) => { real: -5, imag: 14 }', () => {
      const result = mul(a, b);
      expect(result).toEqual({ real: -5, imag: 14 });
    });
  
    test('div(a, b) => { real: approx 0.647, imag: approx -0.588 }', () => {
      const result = div(a, b);
      // 誤差許容のため toBeCloseTo を使用
      expect(result.real).toBeCloseTo(0.647, 3);
      expect(result.imag).toBeCloseTo(-0.588, 3);
    });
  });