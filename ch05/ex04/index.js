export function fibonacciWhile() {
    const result = [1, 1];
    while (result.length < 10) {
      const len = result.length;
      result.push(result[len - 1] + result[len - 2]);
    }
    return result;
  }
  
  export function fibonacciDoWhile() {
    const result = [1, 1];
    do {
      const len = result.length;
      result.push(result[len - 1] + result[len - 2]);
    } while (result.length < 10);
    return result;
  }
  
  export function fibonacciFor() {
    const result = [1, 1];
    for (let i = 2; i < 10; i++) {
      result.push(result[i - 1] + result[i - 2]);
    }
    return result;
  }
  