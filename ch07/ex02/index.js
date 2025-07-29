function newfizzbuzz(n) {
  Array.from({ length: n }, (_, i) => i + 1).forEach((i) =>
    console.log(
      i % 15 === 0
        ? "FizzBuzz"
        : i % 3 === 0
        ? "Fizz"
        : i % 5 === 0
        ? "Buzz"
        : i
    )
  );
}

function newsumOfSquaredDifference(f, g) {
  return f.reduce((sum, val, i) => sum + (val - g[i]) ** 2, 0);
}


function newsumOfEvensIsLargerThan42(array) {
  return array.filter(x => x % 2 === 0).reduce((sum, x) => sum + x, 0) >= 42;
}

function fizzbuzz(n) {
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) {
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
}

function sumOfSquaredDifference(f, g) {
  let result = 0;
  for (let i = 0; i < f.length; i++) {
    result += (f[i] - g[i]) ** 2;
  }
  return result;
}

function sumOfEvensIsLargerThan42(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 !== 0) {
      continue;
    }
    sum += array[i];
  }
  return sum >= 42;
}


// 出力確認
console.log("=== fizzbuzz(16) ===");
fizzbuzz(16);
console.log("=== newfizzbuzz(16) ===");
newfizzbuzz(16);

console.log("\n=== sumOfSquaredDifference ===");
console.log(sumOfSquaredDifference([1, 2, 3], [4, 0, 6])); // → 22
console.log("\n=== newsumOfSquaredDifference ===");
console.log(newsumOfSquaredDifference([1, 2, 3], [4, 0, 6])); // → 22

console.log("\n=== sumOfEvensIsLargerThan42 ===");
console.log(sumOfEvensIsLargerThan42([10, 20, 30])); // → true
console.log(sumOfEvensIsLargerThan42([1, 3, 5, 6])); // → false
console.log("\n=== newsumOfEvensIsLargerThan42 ===");
console.log(newsumOfEvensIsLargerThan42([10, 20, 30])); // → true
console.log(newsumOfEvensIsLargerThan42([1, 3, 5, 6])); // → false