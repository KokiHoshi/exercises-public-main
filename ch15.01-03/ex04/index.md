## グローバルオブジェクトを参照する方法

- **ブラウザ / Node 共通**
  - `globalThis`
- **ブラウザ専用**
  - `window`
- **Node.js 専用**
  - `global`

| 実行環境       | グローバルオブジェクト |
| -------------- | ---------------------- |
| ブラウザ       | `window`, `globalThis` |
| Node.js        | `global`, `globalThis` |
| 共通で使用可能 | `globalThis`           |

---

## ブラウザ（window）独自のプロパティ・メソッド

1. `document`
2. `location`
3. `navigator`
4. `alert()`
5. `confirm()`
6. `prompt()`
7. `localStorage`
8. `sessionStorage`
9. `history`
10. `XMLHttpRequest`
11. `screen`
12. `fetch()`（Node v17 以前非対応）
13. `addEventListener()`

※この中から 10 個記載すれば条件を満たす。

---

## グローバルオブジェクトに `undefined` が定義されていることの確認

```js
"undefined" in globalThis; // true
globalThis.undefined; // undefined
```

## 過去の ES 仕様で発生していた問題（undefined の書き換え）

ES3 以前では `undefined` がグローバルオブジェクトのプロパティとして存在し、書き換え可能だった。

```js
undefined = 123;
console.log(undefined); // 123（上書きされてしまう）
var undefined; // 未初期化変数 = 読み取り専用の undefined を意図的に作る
```
