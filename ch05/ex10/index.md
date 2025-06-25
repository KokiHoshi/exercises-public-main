## console.logの出力
with 文が構文エラー（SyntaxError）となり実行できず

### 拡張子をcjsとして実行した場合
PS C:\Users\r00528332\AndroidStudioProjects\exercises-public-main\exercises\exercises-public-main\ch05\ex10> node index.cjs
{ a: 1, b: 2, obj: { a: 4, b: 4 } }
{ a: 4, b: 2, obj: { b: 4 } }
{ a: 1, b: 2, obj: { a: 2 } }

## with文を使わない場合

```
{
  let a = 1;
  let b = 2;
  let obj = { a: 3, b: 4 };

  // with (obj) { a = b; }
  obj.a = obj.b;

  console.log({ a, b, obj }); // { a: 1, b: 2, obj: { a: 4, b: 4 } }
}

{
  let a = 1;
  let b = 2;
  let obj = { b: 4 };

  // with (obj) { a = b; }
  a = obj.b;

  console.log({ a, b, obj }); // { a: 4, b: 2, obj: { b: 4 } }
}

{
  let a = 1;
  let b = 2;
  let obj = { a: 3 };

  // with (obj) { a = b; }
  obj.a = b;

  console.log({ a, b, obj }); // { a: 1, b: 2, obj: { a: 2 } }
}

{
  let a = 1;
  let b = 2;
  let obj = {};

  // with (obj) { a = b; }
  a = b;

  console.log({ a, b, obj }); // { a: 2, b: 2, obj: {} }
}

```