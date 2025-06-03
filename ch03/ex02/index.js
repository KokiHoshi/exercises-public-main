let max = Number.MAX_SAFE_INTEGER;
let min = Number.MIN_SAFE_INTEGER;

console.log('最大値:', max);
console.log('最小値:', min);

let maxPlus1 = max + 1;
console.log('最大値+1:', maxPlus1);

let isEqual = (maxPlus1 === maxPlus1 + 1);
console.log('最大値+1 === 最大値+2:', isEqual);
console.log("理由: 最大最小範囲を超えると、整数の精度が保証されず同じ値として丸められるため。");
