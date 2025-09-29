export default class Greeter {
  constructor(name = "world") {
    this.name = name;
  }
  greet() {
    return `Hello, ${this.name}!`;
  }
}
