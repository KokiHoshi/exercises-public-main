const { add, Calculator } = require("./index.cjs");

console.log(add(2, 3)); // 5
const calc = new Calculator();
console.log(calc.multiply(4, 5)); // 20
