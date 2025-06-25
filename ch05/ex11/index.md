# Node で debugger 文を使ってデバッグする方法

## 1. debugger 文をコードに記述する

``` javaScript
function sum(a, b) {
  debugger; // ← ここで一時停止
  return a + b;
}

console.log(sum(2, 3));
```

## 2. デバッガを使って Node を実行する

### ターミナルで実行する場合

ターミナルで以下を実行

``` bash
node inspect sample.js
```

| コマンド | 説明 |
| ---- | ---- |
| n | 次の行へ進む（next） |
| c | 次のブレークポイントまで継続 |
| repl | 対話モードで変数の確認 |
| exit | デバッガを終了 |

### Chrome DevTools を使う場合


``` bash
node --inspect-brk sample.js
```
