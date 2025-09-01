export function f(body) {
  if (typeof body !== "string") throw new TypeError("f expects a string");

  // $10 を先に、その後 $1〜$9 を arguments[...] に置換
  const replaced = body.replace(/\$10|\$[1-9]/g, (m) =>
    m === "$10" ? "arguments[9]" : `arguments[${Number(m.slice(1)) - 1}]`
  );

  // 先頭が { ならステートメントブロックとしてそのまま、そうでなければ return を付ける
  const src = replaced.trim().startsWith("{") ? replaced : `return ${replaced};`;

  // 引数名なしで arguments を使う
  return new Function(src);
}
