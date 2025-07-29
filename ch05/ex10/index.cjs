{
    let a = 1;
    let b = 2;
    let obj = { a: 3, b: 4 };
    with (obj) {
      a = b;
    }
    console.log({ a, b, obj });
    // console.log の出力: { a: 1, b: 2, obj: { a: 4, b: 4 }}
    // with 文を使わずに同じ処理を書く場合: obj.a = obj.b
  }
  {
    let a = 1;
    let b = 2;
    let obj = { b: 4 };
    with (obj) {
      a = b;
    }
    console.log({ a, b, obj });
  }
  {
    let a = 1;
    let b = 2;
    let obj = { a: 3 };
    with (obj) {
      a = b;
    }
    console.log({ a, b, obj });
  }
  {
    let a = 1;
    let b = 2;
    let obj = {};
    with (obj) {
      a = b;
    }
    console.log({ a, b, obj });
  }
  