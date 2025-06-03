# 練習問題: 1 章

## 問題 1.1 💻

hello.js を作成し Node.js で実行し「Hello, World!」が表示されることを確認しなさい。

**出題範囲**: 1.2

## 問題 1.2 💻

hello.html および hello.js を作成し、hello.html を Web ブラウザで開くと開発者ツールのコンソール上に「Hello, World!」が表示されることを確認しなさい。

**出題範囲**: 1.2

## 問題 1.3 🖋️

Web ブラウザに以下の URL のブックマークを追加しなさい。追加したブックマークを開くと何が起こるか確認し結果を記載しなさい。

```text
javascript:alert("Hello, World!")
```

**参考**: [Bookmarklet という一番身近な自動化技術](https://blog.jxck.io/entries/2018-01-12/let-it-bookmarklet.html#bookmarklet)

## 問題 1.4 🖋️

以下の内容を index.html に保存し、Web ブラウザで開きなさい。
開発者ツール (Chrome の場合 F12) のコンソール上に何が表示されるか予想し、結果が一致するか確認しなさい。
開発者ツールを開いた状態のタブで HTML を開く場合と、HTML を開いた状態のタブで開発者ツールを開く場合とで、結果を比較しなさい。
また、常に期待した結果を得るためにはどのようにコードを修正すべきか答えなさい。

```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      let life = { answer: 42 };
      console.log(life);
      life.answer = 0;
      console.log(life);
    </script>
  </body>
</html>
```

**出題範囲**: なし

## 問題 1.5 💻📄🧪

本問題の ch01/ex05 以下に含まれるコードを利用し `abs` 関数のテストを実行しなさい。

```sh
> npm install
> npm test ch01/ex05
```

`abs` を参考に `sum` および `factorial` の実装およびテストコードを作成し、テストしなさい。

**出題範囲**: 1.3

## 問題 1.6 💻🧪

`abs` や `factorial` のコードを参考にし、フィボナッチ数を計算する関数 `fib` を作成しなさい。例えば `fib(5)` は `5` を返し、`fib(75)` は `2111485077978050` を返さなければならない。

**出題範囲**: 1.3

## 問題 1.7 💻🧪

`Point` クラスに対し、引数として渡された `Point` クラスのインスタンスの座標を自分の座標に加算するメソッド `add` を定義しなさい。

**出題範囲**: 1.3

## 問題 1.8 💻🖋️

文字頻度ヒストグラムのプログラムを書き写し [青空文庫](https://www.aozora.gr.jp/) の適当な書籍に対して実行し、結果を記載しなさい。

青空文庫のテキストは Shift_JIS で符号化されているものが多い。適当な方法で UTF-8 に変換したものをプログラムに与えてよいものとする。

文字列頻度ヒストグラムのプログラムは標準入力からデータを読み込む。
PowerShell の場合はファイルをメモ帳などで BOM 付きの UTF-8 として保存し、以下のコマンドで実行すればよい。

```sh
> $OutputEncoding = [System.Text.Encoding]::UTF8

# プログラムを実行 (JS)
> cat path/to/file.txt | node ch01/ex08/index.js

# プログラムを実行 (TS)
> cat path/to/file.txt | npx ts-node ch01/ex08/index.ts

# プログラムを実行 (TS, Node.js >= 20)
> cat path/to/file.txt | npx node --loader ts-node/esm ch01/ex08/index.ts
```

**出題範囲**: 1.4

## 問題 1.9 💻💪

文字頻度ヒストグラムのプログラムを参考にし、単語頻度を計算するクラス `WordHistogram` を作成しなさい。

文字列を単語に分割する際は以下のようなコードにしなさい:

```js
const matches = text.toLowerCase().matchAll(/\w+|\$[\d.]+|\S+/g);
const words = [...matches].map((r) => r[0]);
```

また `toString()` の一部を以下のように書き換えなさい:

```js
// 出現頻度 0.5% 以上を取得
entries = entries.filter((entry) => entry[1] >= 0.5);
// padStart で表示幅を揃える / # の数を n ではなく 10 * n に変更
const lines = entries.map(
  ([l, n]) =>
    `${l.padStart(10)}: ${"#".repeat(Math.round(10 * n))} ${n.toFixed(2)}%`
);
```

出来上がったプログラムに [ハムレット](https://www.folger.edu/explore/shakespeares-works/download/#hamlet) を読み込ませヒストグラムを表示しなさい。
結果を見ると出現頻度と出現順位がおおよそ反比例の関係にあることが分かる。他の小説でも実験し結果を確認しなさい。また、この経験則にどのような名前がついているか調べなさい。

**出題範囲**: 1.4
