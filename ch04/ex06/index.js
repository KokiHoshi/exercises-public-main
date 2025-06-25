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
  
  