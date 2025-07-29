export function addMatrices(a, b) {
  if (a.length !== b.length || a[0].length !== b[0].length) {
    throw new Error("行列の次元が一致しません");
  }

  return a.map((row, i) => row.map((val, j) => val + b[i][j]));
}

export function multiplyMatrices(a, b) {
  if (a[0].length !== b.length) {
    throw new Error("行列の積が定義できません（aの列数 ≠ bの行数）");
  }

  const result = [];

  for (let i = 0; i < a.length; i++) {
    result[i] = [];
    for (let j = 0; j < b[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < a[0].length; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i][j] = sum;
    }
  }

  return result;
}
