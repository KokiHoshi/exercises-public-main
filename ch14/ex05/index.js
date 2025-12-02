export function template(strings, ...values) {
  let result = "";

  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) {
      result += typeof values[i];
    }
  }
  return result;
}

//console.log(template``);
// ""

//console.log(template`test`);
// "test"

//console.log(template`Hello, ${"A"}`);
// "Hello, string"

//console.log(template`${1} ${null} ${() => {}}`);
// "number object function"

//console.log(template`type of 'A' is ${"A"}`);
// "type of 'A' is string"
