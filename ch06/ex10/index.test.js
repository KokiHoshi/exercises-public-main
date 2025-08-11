import { jest } from "@jest/globals";
test("ex10", () => {
  const obj1 = {
    foo: Math.random(),
    bar: Math.random(),
  };

  const obj2 = {
    fizz: Math.random(),
    buzz: Math.random(),
  };

  const obj3 = {
    bar: Math.random(),
    buzz: Math.random(),
  };

  const num1 = Math.random();
  const num2 = Math.random();

  const arr1 = [Math.random(), Math.random(), Math.random()];
  const arr2 = [Math.random(), Math.random()];

  const obj = {
    num1: num1,
    num2: num2,
    foo: obj1.foo,
    bar: obj3.bar,
    fizz: obj2.fizz,
    buzz: obj2.buzz,
    arr: [arr1[0], arr1[1], arr1[2], num1, arr2[0], arr2[1]],
  };

  const answer = {
    // ここにコードを書く
    num1, // プロパティ名と変数名が同じときは省略
    num2, // プロパティ名と変数名が同じときは省略
    foo: obj1.foo, // obj1 の中の foo を明示的に使いたい、
    bar: obj3.bar, // obj1.bar と obj3.bar が 異なる値 を持っている
    ...obj2, //スプレッド可能
    arr: [...arr1, num1, ...arr2], // 値の順序を保ちながら 6要素の配列を構成

  };

  expect(answer).toEqual(obj);
});
