// 1.自然数nと英数文字cを引数にとり、文字cをn回コンソール出力してから文字cをn個含む配列を返す
// 引数が2つ以上ある場合はかっこが必要
export const repeatChar = (n, c) => {
  for (let i = 0; i < n; i++) console.log(c);
  return Array(n).fill(c);
};

// 2.数値xを引数にとり、xの二乗の数値を返す
// 引数1つのためかっこ省略、関数内もreturnのみのためかっこ省略
export const square = x => x ** 2;

// 3.引数なしで、現在時刻のプロパティnowを含むオブジェクトを返す
// 引数なしの場合も()は必要
// オブジェクトリテラルを直接返す場合は{}がブロックと区別されるように全体を()で囲む
export const getNow = () => ({ now: Date.now() });


//const a = repeatChar(5, "test");
//console.log(a);

//console.log(square(5));

//console.log(getNow());