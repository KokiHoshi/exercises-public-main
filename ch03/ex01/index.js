const values = [Infinity, NaN];
const operators = ['+', '-', '*', '/'];

for (const v1 of values) {
  for (const v2 of values) {
    for (const op of operators) {
      let result;
      try {
        switch (op) {
          case '+':
            result = v1 + v2;
            break;
          case '-':
            result = v1 - v2;
            break;
          case '*':
            result = v1 * v2;
            break;
          case '/':
            result = v1 / v2;
            break;
        }
      } catch (e) {
        result = 'Error: ' + e.message;
      }
      console.log(`${v1} ${op} ${v2} = ${result}`);
    }
  }
}
