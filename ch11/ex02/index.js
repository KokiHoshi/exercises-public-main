// f はオブジェクトを1つ引数に取る関数
function cache(f) {
  // この関数を実装する
}

function slowFn(obj) {
  // 時間のかかる処理
}

// cachedSlowFnを同じ引数で複数回呼び出すと、2回目以降はキャッシュが返る
const cachedSlowFn = cache(slowFn);
