# 練習問題: 7 章

## 問題 7.1 💻🧪

2次元配列を行列として扱い、行列の加算・乗算を行う関数を作成しなさい。

**出題範囲**: 7.7

## 問題 7.2 💻

以下の関数を繰り返し (`for`, `while`) や条件分岐 (`if`) を利用せず `map`, `filter`, `reduce`, `forEach` 等のメソッドを利用して書き直しなさい。

```js
function fizzbuzz(n) {
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) {
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
}

function sumOfSquaredDifference(f, g) {
  let result = 0;
  for (let i = 0; i < f.length; i++) {
    result += (f[i] - g[i]) ** 2;
  }
  return result;
}

function sumOfEvensIsLargerThan42(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 !== 0) {
      continue;
    }
    sum += array[i];
  }
  return sum >= 42;
}
```

**出題範囲**: 7.8.1

## 問題 7.3 💻📄

reduce を使って関数 (sum, join, reverse, every, some) を実装しなさい。

**出題範囲**: 7.8.1

## 問題 7.4 💻

以下のデータを使い、下記の各値を求めなさい。
ただし、配列イテレータメソッドを利用し、ループ文(for, while)を使わないこと。

``` ts
const data = [
    { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
    { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
    { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
    { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
    { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
    { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
    { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
    { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
    { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];
```

1. `math`の全員の合計点
2. クラスAの`chemistry`の平均点
3. 3科目合計点のクラスC内での平均点
4. 3科目合計点が最も高い人の`name`
5. 全体の`geography`の標準偏差


**出題範囲**: 7.8.1

## 問題 7.5 💻🧪

本章に登場した push/pop/shift/unshift/sort 等のメソッドは配列自体を変更する。
このようなメソッドは「破壊的」であると呼ばれる ([参考](<https://ja.wikipedia.org/wiki/%E5%89%AF%E4%BD%9C%E7%94%A8_(%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%A0)>))。

破壊的なメソッドは注意して利用しなければならない。例えば以下の `displayUsers` 関数を考える。

```js
function displayUsers(users) {
  const sorted = users.sort((a, b) => a.name.localeCompare(b.name));
  for (const u of sorted) {
    console.log(`${u.name}`);
  }
}

const users = [{ name: "hoge" }, { name: "fuga" }, { name: "piyo" }];
displayUsers(users);

// 注意: 以下の行は hoge ではなく fuga を表示する！
// (displayUsers 内の sort で引数の users が変更されるため)
console.log(users[0].name);
```

関数が引数に対して破壊的な操作を行う場合、上記のように関数の利用者が驚く結果になることがある。そのようなコードは当然避けるべきである。

また昨今では React のようなライブラリを利用する場合、破壊的な操作を避けることが推奨されるシーンがある ([参考](https://react.dev/learn/updating-arrays-in-state))。
これはライブラリが「値が変更されたかどうか」を参照で比較するためである。

```js
// users という状態を変更する処理を考える
const [users, setUsers] = useState([]);

const addNewUser = () => {
  // 以下は NG (値が変更されていないと React が判断してしまう)
  users.push({ name: "new user" });
  setUsers(users);

  // 以下は OK
  setUsers([...users, { name: "new user" }]);
};
```

このように破壊的な操作を避けて配列の操作を行いたいシーンは多々考えられる。
そこで以下のように push/pop/shift/unshift/sort の非破壊的版関数を書きなさい。各関数は返り値に変更後の新しい配列を返しなさい。

```js
const seq = [1, 2, 3, 4, 5];

console.log(pop(seq)); // [1, 2, 3, 4]
console.log(push(seq, 6)); // [1, 2, 3, 4, 5, 6]
console.log(shift(seq)); // [2, 3, 4, 5]
console.log(unshift(seq, 0)); // [0, 1, 2, 3, 4, 5]
console.log(sort(seq, (a, b) => b - a)); // [5, 4, 3, 2, 1]

// 元の配列は変更されていない
console.log(seq); // [1, 2, 3, 4, 5]
```

**出題範囲**: 7.8.4

## 問題 7.6 💻

問題7.4のデータを`math`の点数が高い順にソートしなさい。
ただし、`math`が同点数の場合は`chemistry`の点数が高い順に、さらに同点数の場合は`geography`の点数が高い順にソートされること。

**出題範囲**: 7.8.6.3

## 問題 7.7 💻🧪🖋️

本章で登場した sort 関数について考えてみよう。配列をソートする方法は色々なものが考えられる。例えば以下は「挿入ソート」と呼ばれるソートである。

```js
function sort(
  array,
  compare = (lhs, rhs) => (lhs < rhs ? -1 : lhs > rhs ? +1 : 0)
) {
  // array[0 ... i-1] が常にソート済みになるように処理を進める
  // (0 <= j < i-1 に対して compare(array[j], array[j + 1]) <= 0 が成り立つ)
  for (let i = 1; i < array.length; i++) {
    const v = array[i];

    // array[i] を array[0 ... i] の適切な場所に挿入する
    let j = i;
    while (j > 0 && compare(array[j - 1], v) > 0) {
      array[j] = array[j - 1];
      j--;
    }
    array[j] = v;
  }
  return array;
}
```

問題を解決するための計算方法や処理の手順のことを [アルゴリズム](https://ja.wikipedia.org/wiki/%E3%82%BD%E3%83%BC%E3%83%88) と呼ぶ。
ソートのアルゴリズムには様々なものが存在している ([参考](https://ja.wikipedia.org/wiki/%E3%82%BD%E3%83%BC%E3%83%88))。

問題に対して複数のアルゴリズムが存在する場合、アルゴリズムをどうやって比較すべきだろうか。
具体的な計算時間は計算機によって結果が異なるため比較が難しい。
一般的にはアルゴリズムを [O-記法](https://ja.wikipedia.org/wiki/%E3%83%A9%E3%83%B3%E3%83%80%E3%82%A6%E3%81%AE%E8%A8%98%E5%8F%B7#%E4%B8%80%E8%88%AC%E7%9A%84%E3%81%AA%E3%82%AA%E3%83%BC%E3%83%80%E3%83%BC) を用いた [時間計算量](https://ja.wikipedia.org/wiki/%E8%A8%88%E7%AE%97%E8%A4%87%E9%9B%91%E6%80%A7%E7%90%86%E8%AB%96#%E8%A8%88%E7%AE%97%E5%95%8F%E9%A1%8C%E3%81%A8%E8%A8%88%E7%AE%97%E9%87%8F%E3%83%BB%E8%A4%87%E9%9B%91%E6%80%A7) で評価する。
例えば上記の「挿入ソート」のアルゴリズムは配列の長さの二乗に計算時間が比例するため、配列の長さを $`n`$ とした時の時間計算量は $`O(n^2)`$ と表現される。

挿入ソート以外のソート関数を実装しなさい。また実装したアルゴリズムの入力の配列長 `n` に対する時間計算量を O-記法で説明しなさい。

**参考**: [計算量](https://atcoder.jp/contests/apg4b/tasks/APG4b_w)

**出題範囲**: 7.8.6.3

## 問題 7.8 💻📄

文字列の書記素を反転させる関数を実装しなさい。例えば "家族 👨‍👨‍👧‍👧" が与えられれば "👨‍👨‍👧‍👧 族家" を返しなさい。
ヒント: [Intl.Segmenter](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter)
を使うか ゼロ幅接合子 について調べて実装しなさい。( [Intl.Segmenter](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter)を使う場合 tsconfig.js で ES2022 以上であることを確認して使用してください。)

**出題範囲**: 7.8.7

## 問題 7.9 🖋

`"𠮷野家"[0]`や `"👨‍👨‍👧‍👧"[0]` が何を返す調べなさい。それぞれの結果について説明しなさい。問題 7.8 で得た絵文字に対する知見も述べなさい。

**出題範囲**: 7.10

## 問題 7.10 💻🧪

JavaScript の配列は動的配列である。一般的に動的配列は固定長の配列を用いて実装される。実際に作成してみよう。

以下の `makeFixedSizeArray` は固定長の配列を返す関数だと考えなさい。この関数を用いて動的配列 `DynamicSizeArray` を作成しなさい。

```js
function makeFixedSizeArray(size) {
  const array = new Array(size);
  return {
    get(index) {
      if (index < 0 || array.length <= index) {
        throw new Error(`Array index out of range: ${index}`);
      }
      return array[index];
    },
    set(index, value) {
      if (index < 0 || array.length <= index) {
        throw new Error(`Array index out of range: ${index}`);
      }
      array[index] = value;
    },
    length() {
      return array.length;
    },
  };
}

class DynamicSizeArray {
  static INITIAL_SIZE = 4; // 初期サイズ

  constructor() {
    this.len = 0;
    this.array = makeFixedSizeArray(DynamicSizeArray.INITIAL_SIZE);
  }
  get(index) {
    /* TODO */
  }
  set(index, value) {
    /* TODO */
  }
  length() {
    /* TODO */
  }
  push(value) {
    /* TODO */
  }
}
```

ヒント: `push` の中では固定長の配列に要素を追加する空きが無い場合、倍サイズの固定長配列を作成しなさい

```js
// this.array に空が無い場合は「再配置」を行う
if (this.len >= this.array.length()) {
  // 新しい固定長配列を作成
  const old = this.array;
  this.array = makeFixedSizeArray(old.length() * 2);
  // 古い配列 (old) の要素を新しい配列にコピー
  // ...
}
// ...
```

## 問題 7.11 🖋️

7.10 で作成した動的配列の push の平均時間計算量を説明しなさい。またその結果を用いて以下の関数 `copyA` と `copyB` に対し、`array.length` を `n` とした時の時間計算量を求めなさい。

```js
function copyA(array) {
  const result = Array(array.length);
  for (let i = 0; i < array.length; i++) {
    result[i] = array[i];
  }
  return result;
}

// NOTE: copyB よりも copyA の方が効率的に見えるが計算量の観点ではどうだろうか
function copyB(array) {
  const result = [];
  for (const v of array) {
    result.push(v);
  }
  return result;
}
```

ヒント: `push` を $`n`$ 回呼び出したとき、7.10 の実装では配列を倍々にしていくので再配置は $`log_2 n`$ 回発生する。各再配置で要素のコピーは $`1, 2, 4, 8, ..., 2^{log_2 n}`$ 回発生する。再配置の際にコピー回数の総和は $`2^0 + 2^1 + 2^2 + ... + 2^{log_2 n} = ...`$ (等比数列の和の公式を思い出すこと)。この値を $`n`$ で割れば各 `push` の平均時間計算量が求められる。

**参考**: [計算量](https://atcoder.jp/contests/apg4b/tasks/APG4b_w)

**出題範囲**: なし
