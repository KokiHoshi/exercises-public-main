const obj1 = { x: 1 };
// 問題: ここに1行コードを書くことで以下の行で {x: 1, y: 2} が出力されること
obj1.y = 2;
console.log(obj1);

const obj2 = { x: 1, y: 2 };
// 問題: 以下の行では何が出力されるか、予想してから結果を確認しなさい
console.log(obj1 === obj2);

export function equals(o1, o2) {
  // 厳密等価なら true
  if (o1 === o2) return true;

  // オブジェクト以外なら false
  if (
    typeof o1 !== "object" ||
    o1 === null ||
    typeof o2 !== "object" ||
    o2 === null
  ) {
    return false;
  }

  // プロパティ数の比較
  const keys1 = Object.keys(o1);
  const keys2 = Object.keys(o2);
  if (keys1.length !== keys2.length) return false;

  // プロパティ値の比較
  for (let key of keys1) {
    // 名前の比較
    if (!keys2.includes(key)) return false;

    // オブジェクト値の比較
    if (!equals(o1[key], o2[key])) return false;
  }

  return true;
}
