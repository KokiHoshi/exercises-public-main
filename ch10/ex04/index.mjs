import { add as plus, Calculator as Calc, Greeter } from "./math.mjs";

console.log(plus(2, 3)); // 5
const calc = new Calc();
console.log(calc.multiply(4, 5)); // 20
const greeter = new Greeter("Java Script");
console.log(greeter.greet()); // "Hello, Java Script!"
