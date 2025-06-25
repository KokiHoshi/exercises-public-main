// Symbol() を使って同じ文字列で2つ作成
const sym1 = Symbol("mySymbol");
const sym2 = Symbol("mySymbol");

// オブジェクトを作成して、それぞれのSymbolをキーにプロパティをセット
const obj = {
  [sym1]: "value1",
  [sym2]: "value2"
};

// 作成したSymbolを使ってプロパティの値を取得
console.log(obj[sym1]); 
console.log(obj[sym2]); 

// Symbol.for() を使って同じ名前で作成
const sym3 = Symbol.for("sharedSymbol");
const sym4 = Symbol.for("sharedSymbol");

// 同じレジストリに登録されるのでsym3とsym4は同じ
console.log(sym3 === sym4);

// Symbol.for() の挙動確認
const sharedObj = {
  [sym3]: "sharedValue"
  // [sym4]: "sharedValue2" と追加すると下のconsole.logはどうなるか？
};

console.log(sharedObj[sym3]);
console.log(sharedObj[sym4]); // sym3,sym4共にsharedValue2となる
