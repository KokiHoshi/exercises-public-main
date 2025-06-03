## 問題 6.1 💻 🧪

p.141 では、文字列から値へのマッピングの構造として、「ハッシュ」や「ハッシュテーブル」の記載がある。
文字列をハッシュ値（数値）に変換する[ハッシュ関数](https://ja.wikipedia.org/wiki/%E3%83%8F%E3%83%83%E3%82%B7%E3%83%A5%E9%96%A2%E6%95%B0)と、
ハッシュ関数を用いて文字列から値へのマッピングを行う[ハッシュテーブル](https://ja.wikipedia.org/wiki/%E3%83%8F%E3%83%83%E3%82%B7%E3%83%A5%E3%83%86%E3%83%BC%E3%83%96%E3%83%AB) オブジェクトを実装しなさい。
ハッシュテーブルは下記のコードを参考に、以下の要件を満たすようにしなさい。

- マッピングの追加、取得、削除を行うメソッドおよびマッピング数を示すプロパティをもつこと。
- ハッシュテーブルは生成時に配列のサイズを受け取り、固定長の配列にマッピング情報を保持する
  - 配列のインデックスとして利用できるよう、ハッシュ値をサイズに合わせて変換すること（ハッシュ値に対して配列サイズの剰余を用いる）
  - 異なる key でハッシュ値を変換したインデックスが衝突した場合は、リンクリスト形式で複数のマッピングを保持すること。  
    例えば、capacity が 3 のハッシュテーブルに `"key1": "value1"` , `"key2": "value2"` , `"key3": "value3"` という順にマッピングを追加し、key1 のハッシュ値を変換したインデックスが 0 、key2 と key3 のインデックスが 1 だった場合、entries の値は以下と等しくなる。

    ```js
    [
      { key: "key1", value: "value1", next: undefined },
      { key: "key2", value: "value2", next: { key: "key3", value: "value3", next: undefined } },
      undefined,
    ];
    ```

- リハッシュ/リサイズについては考慮しなくてよいものとする。

```js
function newHashTable(capacity) {
  return {
    size: 0, // マッピング数を示すプロパティ
    entries: new Array(capacity) // マッピングを格納する固定長の配列
    get(key) {
      // keyにマップされた値を取得する
    },
    put(key, value) {
      // key, valueのマッピングを追加する(keyが存在する場合はvalueを上書きする)
    },
    remove(key) {
      // keyのマッピングを削除する
    },
  };
}

function sample() {
  const hashTable = newHashTable(10);
  hashTable.put("key1", "value1");
  hashTable.put("key2", { value: "value2" });

  console.log(`size=${hashTable.size}`); // => size=2
  console.log(`key1=${hashTable.get("key1")}`); // => key1=value1
  console.log(`key2=${JSON.stringify(hashTable.get("key2"))}`); // => key2={"value":"value2"}

  hashTable.put("key2", "new value");

  console.log(`key2=${hashTable.get("key2")}`); // => key2=new value

  hashTable.remove("key2");

  console.log(`key2=${hashTable.get("key2")}`); // => key2=undefined
  console.log(`size=${hashTable.size}`); // => size=1
}
```

**出題範囲**: 6.1

## 問題 6.2 💻

オブジェクトリテラルで独自プロパティを持つオブジェクトを定義し、`Object.create` を使用してそのオブジェクトをプロトタイプとして持つ新しいオブジェクト生成しなさい。
[Object.getPrototypeOf()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)
を利用して、生成したオブジェクトのプロトタイプが `Object.create` で渡したオブジェクトになっていることを確認しなさい。

**出題範囲**: 6.2.4

## 問題 6.3 💻

[Object.prototype.isPrototypeOf()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf) は、オブジェクトが別のオブジェクトのプロトタイプチェーンに存在するかどうかを判定できる。
このメソッドを使って、P149 冒頭のコードにおいて、` o` が `p` および `q` のプロトタイプチェーン上に存在すること、および、`p` が `q` のプロトタイプチェーン上に存在することを確認しなさい。

また同様に、`Object`, `Array`, `Date`, `Map` のプロトタイプチェーンの継承関係を確認するためのコードも書きなさい。

**出題範囲**: 6.3.2

## 問題 6.4 💻

[Object.defineProperty()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) を使うと、writable 属性/enumerable 属性/configurable 属性を設定してオブジェクトのプロパティを定義できる。
このメソッドを使って明示的に各属性を設定したプロパティを定義し、プロパティの変更、削除、`hasOwnProperty` と `propertyIsEnumerable` の結果に対してどのように影響するか確認するコードを書きなさい。

**出題範囲**: 6.3 - 6.6

## 問題 6.5 💻

次の条件を満たすオブジェクトを作成し、for/in ループで順番を確認しなさい。

- 以下のプロパティを持つオブジェクトをプロトタイプとして持つ
  - プロパティ名が数値のプロパティ
  - プロパティ名が文字列のプロパティ
  - 列挙可能なプロパティ
- 以下のプロパティを持つ
  - プロパティ名が数値かつプロトタイプの数値プロパティと同名のプロパティ
  - プロパティ名が数値かつプロトタイプの数値プロパティと同名でないプロパティ
  - プロパティ名が文字列かつプロトタイプの文字列プロパティと同名のプロパティ
  - プロパティ名が文字列かつプロトタイプの文字列プロパティと同名でないプロパティ
  - 列挙不可かつプロトタイプの列挙可能プロパティと同名のプロパティ

**出題範囲**: 6.6.1

## 問題 6.6 💻🧪

任意のオブジェクトを受け取り、そのオブジェクトのすべての独自プロパティ（列挙不可、プロパティ名が `Symbol` のものを含む）および列挙可能な継承プロパティのプロパティ名の配列を返す関数を作成しなさい。
継承プロパティのプロパティ名については `Symbol` のものは必須とはしない。

**出題範囲**: 6.6

## 問題 6.7 💻 📄

`Object.assign()`と等価な関数 `assign()` を作成しなさい。
与えられたテストを全てパスすること。

**出題範囲**: 6.7

## 問題 6.8 💻 📄

p.157 下部で記載されているテンプレートオブジェクトに存在しないプロパティをあるオブジェクトから削除する `restrict()` 、あるオブジェクトのプロパティを別のオブジェクトから削除する `substract()` 関数を以下の通り実装しなさい。
与えられたテストを全てパスすること。

Symbol と継承プロパティは考慮しなくてよい。

```js
function restrict(target, template);
```

**引数**

`target` 削除先オブジェクト — 削除対象プロパティを適用するもので、オリジナル変更後に返されます。Symbol と継承プロパティは削除対象外です。

`template` テンプレートオブジェクト — このオブジェクトに存在しないプロパティは削除先オブジェクトから削除されます。継承プロパティはテンプレートオブジェクトに存在していても削除先オブジェクトが継承プロパティ以外で同名をもつ場合削除対象になります。

**返値**

削除先オブジェクトです。

```js
function substract(target, ...sources);
```

**引数**

`target` 削除先オブジェクト — 削除対象プロパティを適用するもので、オリジナル変更後に返されます。Symbol と継承プロパティは削除対象外です。

`sources` 削除対象指定オブジェクト (単数または複数) — 削除したいプロパティを含むオブジェクトです。Symbol と継承プロパティは削除対象になりません。

**返値**

削除先オブジェクトオブジェクトです。

**出題範囲**: 6.7

## 問題 6.9 🧪

以下のコードの `// ここに１行のコードを書く` の部分に１行だけコードを書いて、最後のマッチャーに成功するようなテストを作成しなさい。

```js
const mock = jest.fn();

const obj = {
  x: 0,
  y: 0,
  sum() {
    mock();
    return this.x + this.y;
  },
};

// ここに１行のコードを書く

obj.x = 1;
obj.y = 2;
expect(JSON.stringify(obj)).toBe(`{"x":1,"y":2,"sum":3}`);
expect(mock).toHaveBeenCalled();
```

**出題範囲**: 6.9.4

## 問題 6.10 🧪

以下のコードの `// ここにコードを書く` の部分を実装し、 `obj` と等価なオブジェクト `answer` をプロパティの簡略記法とスプレッド演算子を使ってなるべくシンプルな記述で作成し、最後のマッチャーに成功するようなテストを作成しなさい。

```js
const obj1 = {
  foo: Math.random(),
  bar: Math.random(),
};

const obj2 = {
  fizz: Math.random(),
  buzz: Math.random(),
};

const obj3 = {
  bar: Math.random(),
  buzz: Math.random(),
};

const num1 = Math.random();
const num2 = Math.random();

const arr1 = [Math.random(), Math.random(), Math.random()];
const arr2 = [Math.random(), Math.random()];

const obj = {
  num1: num1,
  num2: num2,
  foo: obj1.foo,
  bar: obj3.bar,
  fizz: obj2.fizz,
  buzz: obj2.buzz,
  arr: [arr1[0], arr1[1], arr1[2], num1, arr2[0], arr2[1]],
};

const answer = {
  // ここにコードを書く
};

expect(answer).toEqual(obj);
```

**出題範囲**: 6.10.1, 6.10.4

## 問題 6.11 💻 🧪

極座標 `r` と `theta` をプロパティにもち、ゲッターとセッターをもつ読み書き可のアクセサプロパティとしてデカルト座標 `x` と `y` をもつオブジェクトを実装しなさい。

セッターメソッドにおいて `x` と `y` それぞれに `NaN` が設定される場合にはエラーにしなさい。

**出題範囲**: 6.10.6
