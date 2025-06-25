## 予想
trueが出力される

## 結果
falseが出力される

### なぜこうなったか
tryブロック内のreturnが、finallyブロックにreturnがある場合、それに上書きされるから