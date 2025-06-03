export function Equal(a, b, epsilon = 1e-10) {
    return Math.abs(a - b) < epsilon;
  }