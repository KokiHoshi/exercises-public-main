## 予想
undefined: undefined
null: null
オブジェクト: object
NaN: number
数値: number
関数: function

## 結果
undefined: undefined
null: object
オブジェクト: object
NaN: number
数値: number
関数: function

## なぜnullはオブジェクトなのか？
JavaScript の初期実装時のバグが仕様として残ったとのこと。
null は実際にはオブジェクトではないが、バイナリ上の値（タグ付きポインタ表現）として 0 に近く扱われていたため 
typeof null === "object" になっている。