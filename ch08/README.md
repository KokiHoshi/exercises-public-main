# 練習問題: 8 章

## 問題 8.1 💻🧪

以下のアロー関数を簡潔に記載しなさい。なお、引数や戻り値の括弧の要否などをコードコメントで説明しなさい。

1. 自然数`n`と英数文字`c`を引数にとり、文字`c`を`n`回コンソール出力してから文字`c`を`n`個含む配列を返す
2. 数値`x`を引数にとり、`x`の二乗の数値を返す
3. 引数なしで、現在時刻のプロパティ`now`を含むオブジェクトを返す

**出題範囲**: 8.1.3

## 問題 8.2 💻🧪

べき乗 ($x^n$) を計算する関数を、べき乗演算子 (`**`) を使わずに再帰およびループでぞれぞれ実装しなさい。

可能なら再帰・ループの回数を少なくする工夫をしなさい。

**出題範囲**: 8.2.1

## 問題 8.3 🖋️

書籍 8.2.1 の 「再帰関数とスタック」には、関数が自身を数千回呼び出した場合はエラーが発生すると書かれている。

1. プログラミング言語や処理系によっては、再帰呼び出しを関数の処理の末尾にする(末尾再帰)ことで、スタックオーバーフローが起こらないよう最適化できるものがある。末尾再帰は何故そのような最適化ができるのか答えなさい。

2. JavaScript で末尾再帰最適化を実装している処理系を答えなさい。  
   利用できる環境があれば、実際に以下の URL を表示・実行してエラーが発生しないことを確認しなさい。  
   https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABMAhtOAnGKA2AKMALkTBAFsAjAUwwEpEBvAWAChFlxp4kYoa8ADhjgATENGKlKNADSIIccHwyTy1Oo1bt2MYIjwKlNRAD4S9Zm23sMVKCAxIho8VADcW7QF9PNuw55lQWExaEQAKnlFMGU5QxjjAGpEAEZaDysfK1t7R0RefhS5NIys1gUwAGc4HCoAOhw4AHM8VHQsXDwUgAZe3tp01iA

**出題範囲**: 8.2.1

## 問題 8.4 🖋️

以下の入れ子の関数とアロー関数のコード実行結果を予想してから実行し、結果を説明しなさい。

```js
const obj = {
  om: function () {
    const nest = {
      nm: function () {
        console.log(this === obj, this === nest);
      },
      arrow: () => {
        console.log(this === obj, this === nest);
      },
    };
    nest.nm();
    nest.arrow();
  },
};
obj.om();
```

**出題範囲**: 8.2.2

## 問題 8.5 💻🧪

可変長引数を受け取り、以下の仕様でオブジェクトを返却する関数 `sequenceToObject(...values)`を作成しなさい。

1. 奇数番に string の値を受け取り偶数番に任意の値を受け取り、各偶数奇数のペアで `{奇数番の値: 偶数番の値}`の形式になるオブジェクトを返却する。例えば`sequenceToObject("a", 1, "b", 2)`は`{a: 1, b: 2}`を返却する
2. いずれかの奇数番の値が string でない場合、または値の個数の合計が偶数ではない場合は例外を発生させる

また作成した sequenceToObject に対してスプレッド演算子で配列を与えられることを確認しなさい。

**出題範囲**: 8.3.2, 8.3.4

## 問題 8.6 💻

以下の関数の引数を修正しなさい。また、修正した関数をアロー関数に書き直しなさい。

```js
const m = function (arg) {
  console.log(arg[1]);
};
m("a", "b");
```

**出題範囲**: 8.3.2

## 問題 8.7 🖋️

https://www.ricoh.co.jp を開き、ロードされている js ファイル中で名前空間としての関数の即時関数実行式を使っている js ファイルを 1 つ以上見つけて URL を記載しなさい。

ヒント: ロードされている js ファイル一覧は Chrome ではデベロッパーツールを開き"ソース"タブから確認できる

**出題範囲**: 8.5

## 問題 8.8 💻📄

文中の counter をグループ化したクロージャを持つ関数 counterGroup を実装しなさい。
具体的には counterGroup は以下のメソッドを持つオブジェクトを返却しなさい。

- counterGroup#newCounter(): 文中の count と reset 同等の機能を持つ counter オブジェクトを返却する
- counterGroup#total(): これまで返却された counter が保持しているカウントの合計を返却する
- counterGroup#average(): これまで返却された counter が保持しているカウントの平均を返却する。counterGroup に属する counter が 1 つ以上存在していない場合 TypeError をスローする
- counterGroup#variance(): これまで返却された counter が保持しているカウントの分散を返却する。counterGroup に属する counter が 2 つ以上存在していない場合 TypeError をスローする

**出題範囲**: 8.6

## 問題 8.9 💻📄

以下のようなクラス `Resource` を考える。このクラスを利用する際は、必ず最後に `close` を呼ぶ必要がある。

```js
class Resource {
  ...
  /** リソース解放のため利用終了時に呼び出すこと */
  close() { ... }
}

const resource = new Resource(...);
resource.doA();
resource.doB();
resource.close(); // これを忘れるとリソースがリークする
```

解放処理の呼び出し忘れによるリソースのリークにを防ぐため、終了時に必ず close が呼ばれるようにする `withResource` 関数を書きなさい

```js
withResource(new Resource(), resource => {
  resource.doA();
  resource.doB():
}); // 終了時に resource.close が自動で呼ばれる
```

**出題範囲**: 8.6

## 問題 8.10 💻📄

関数を引数に受け取り、 call 相当の動きをするプロパティ myCall を追加する関数 addMyCall(f)を実装しなさい。実装には bind を使い call や apply は使わないこと

**出題範囲**: 8.7.4, 8.7.5

## 問題 8.11 🖋️

組み込み関数と自作関数の `toString()` の出力内容を確認しなさい

**出題範囲**: 8.7.6

## 問題 8.12 💻📄

プログラミング言語によっては無名関数の引数名を省略し、短く書けるものがある。  
例えば以下のような処理の場合、 `(a, b) => a + b` 相当の無名関数を、 Swift では `{ $0 + $1 }` 、 Elixir では `&(&1 + &2)` のように書ける。

```js
console.log(arr.reduce((a, b) => a + b, 0));
console.log(arr.sort((a, b) => a - b));
```

JavaScript で同様の書き方ができるよう、 `Function` コンストラクタを用いて以下のコードが動作するような 関数 `f` を作成しなさい。

```js
console.log(arr.reduce(f("$1 + $2"), 0));
console.log(arr.sort(f("$1 - $2")));
```

- `f` は引数に関数の本体を文字列として受け取る
- 関数の本体で使用する引数は `$1`, `$2`, ... のように記載し、 `$10` までサポートする

**出題範囲**: 8.7.7

## 問題 8.13 🖋(💻)

以下のコードが Web サービスの一部で使われており、引数の `input` には Web サービスの利用者が入力した文字列が渡されるものとする。

```js
function f(input) {
  const f = new Function(`return "Hello, " + ${input}`);
  console.log(f());
}
```

このコードには重大な問題が含まれている。何が問題と考えられるか記述しなさい。
可能なら問題を実証できるコードも記載しなさい。

**出題範囲**: 8.7.7

## 問題 8.14 💻🧪

以下の高階関数を実装しなさい

1. 残余パラメータとして任意の数の関数を受け取り、いずれかの関数が true を返せば true を返す新たな関数を返す`any` 関数

```js
const isNonZero = any(
  (n) => n > 0,
  (n) => n < 0
);

console.log(isNonZero(0)); // => false
console.log(isNonZero(42)); // => true
console.log(isNonZero(-0.5)); // => true
```

2.  引数として 2 つの関数を受け取り、1 つ目の関数で発生した例外を 2 つ目の関数の引数として処理し結果を返す新たな関数を返す`catching` 関数

```js
const safeJsonParse = catching(JSON.parse, (e) => {
  return { error: e.toString() };
});

console.log(safeJsonParse('{"a": 1}')); // => {a: 1}
console.log(safeJsonParse("{Invalid Json}")); // => {error: "SyntaxError: ..."}
```

**出題範囲**: 8.8.2

## 問題 8.15 💪💻

メジャーなフロントエンドライブラリである React 利用の上級者を目指すチュートリアルとして、[Build Your Own React](https://pomb.us/build-your-own-react/)がある。あるライブラリ利用の上級者を目指して本質的な理解を深めるための学習方法として、ライブラリと同等の機能を実装するという方法があるが、このチュートリアルではそのような体験ができる。本チュートリアルを通して React が強く関数型プログラミングの考え方を導入していることを実感できる。

Build Your Own React では簡素化した React の実装を 300 行ほどのファイルとして書く。本章までの JavaScript の知識や関数型プログラミングの考え方と、(書籍では 15 章の情報である)基礎的な DOM 操作 API の知識があれば文法上は理解できる。ただし、一般に広く使われるライブラリの実装は難易度が高い(低かったら保守性等から自分で実装したほうが早いという判断になる)ものであり、本チュートリアルが説明している概念も簡単なものではない。

チュートリアルを完了すると完成する成果物 https://github.com/pomber/didact に対して、メモ化の機能を持つフックである [useMemo](https://ja.react.dev/reference/react/useMemo) を追加しなさい。

なお、./ex15 で `npm install && npm start` すると https://github.com/pomber/didact の didact.js がトランスパイルされて http://localhost:5000/index.html で動作確認できるようになっている。

**出題範囲**: 8.8.4、**15.1.2**
