function resize1(params) {
  let maxWidth = 600;
  let maxHeight = 480;

  // && 演算子は左から右に評価し、すべて truthy なら最後の値を返す
  // 左の条件を満たす場合のみ、代入式が実行される
  params && params.maxWidth && (maxWidth = params.maxWidth);
  params && params.maxHeight && (maxHeight = params.maxHeight);

  console.log({ maxWidth, maxHeight });
}

function resize2(params) {
  // params?.maxWidth は params が undefined や null のとき undefined を返す
  // ?? は nullish 合体演算子：左辺が null または undefined のとき右辺を返す
  let maxWidth = params?.maxWidth ?? 600;
  let maxHeight = params?.maxHeight ?? 480;

  console.log({ maxWidth, maxHeight });
}

function resize(params) {
  let maxWidth = 600;
  let maxHeight = 480;

  if (params && params.maxWidth) {
    maxWidth = params.maxWidth;
  }

  if (params && params.maxHeight) {
    maxHeight = params.maxHeight;
  }

  console.log({ maxWidth, maxHeight });
}

console.log("resize");
resize({ maxWidth: 100, maxHeight: 200 }); //{ maxWidth: 100, maxHeight: 200
resize({ maxWidth: 100 }); //{ maxWidth: 100, maxHeight: 480 }
resize({ maxHeight: 200 }); //{ maxWidth: 600, maxHeight: 200 }
resize({}); //{ maxWidth: 600, maxHeight: 480 }
resize(undefined); //{ maxWidth: 600, maxHeight: 480 }

console.log("resize1");
resize1({ maxWidth: 100, maxHeight: 200 }); //{ maxWidth: 100, maxHeight: 200 }
resize1({ maxWidth: 100 }); //{ maxWidth: 100, maxHeight: 480 }
resize1({ maxHeight: 200 }); //{ maxWidth: 600, maxHeight: 200 }
resize1({}); //{ maxWidth: 600, maxHeight: 480 }
resize1(undefined); //{ maxWidth: 600, maxHeight: 480 }

console.log("resize2");
resize2({ maxWidth: 100, maxHeight: 200 }); //{ maxWidth: 100, maxHeight: 200 }
resize2({ maxWidth: 100 }); //{ maxWidth: 100, maxHeight: 480 }
resize2({ maxHeight: 200 }); //{ maxWidth: 600, maxHeight: 200 }
resize2({}); //{ maxWidth: 600, maxHeight: 480 }
resize2(undefined); //{ maxWidth: 600, maxHeight: 480 }
