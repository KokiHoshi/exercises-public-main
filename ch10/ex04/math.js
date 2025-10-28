function add(a, b) {
  return a + b;
}
export default add;
export { add };

export class Calculator {
  multiply(a, b) {
    return a * b;
  }
}

export { default as Greeter } from "./util.js";
