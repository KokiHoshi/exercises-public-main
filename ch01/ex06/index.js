export function fib(x) {
    if (x < 0) throw new Error("Negative");
    if (x === 0) return 0;
    if (x === 1) return 1;

    let a = 0, b = 1;


    // 各項が前の2つの項の和となる
    for(let i = 2; i <= x; i++){
        [a , b] = [b, a + b];
    }
    return b;
  }