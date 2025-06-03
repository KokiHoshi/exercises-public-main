# 練習問題: 10 章

## 問題 10.1 🖋️💻

以下のページに対応する sets.cjs、stats.cjs、index.cjs を書き写して作成し、それらを Webpack で mode を none、developemnt、production のそれぞれでバンドルし、各結果が、p.276 の上のコードに対してどの様な差異があるかを、それぞれ 1 行程度で記述しなさい。

| ページ                                    | ファイル名 |
| :---------------------------------------- | :--------- |
| p.266-271 (BitSet の export の追記が必要) | sets.cjs   |
| p.277                                     | stats.cjs  |
| p.276 の下                                | index.cjs  |

なお、Webpack での各 mode でのバンドルは package.json のあるディレクトリで以下の手順で実行できます。

```sh
npm i -D webpack webpack-cli # Webpackインストール
# 以下それぞれ ./ch10/ex01/dist/main.jsが出力される
npx webpack --mode=none ./ch10/ex01/index.cjs -o ./ch10/ex01/dist
npx webpack --mode=development ./ch10/ex01/index.cjs -o ./ch10/ex01/dist
npx webpack --mode=production ./ch10/ex01/index.cjs -o ./ch10/ex01/dist
```

**出題範囲**: 10.1 10.2

## 問題 10.2 🖋️

CommonJS と ES Module 以外の JavaScript のモジュール方式名を調べて記述しなさい

**出題範囲**: 10.2

## 問題 10.3 💻

任意の関数とクラスを作成し、「Nodeのモジュール」方式で別ファイルから利用するコードを実装しなさい。

**出題範囲**: 10.2

## 問題 10.4 💻

任意の関数とクラスを作成し、「ES6のモジュール」方式で別ファイルから利用するコードを実装しなさい。
ただし、デフォルトのエクスポート、名前変更を伴うインポート、再エクスポートをそれぞれ実施すること。

**出題範囲**: 10.3

## 問題 10.5 🖋️

問題10.3, 10.4で作成したそれぞれのモジュールで、エクスポート元の関数・クラスをエディタのリファクタ機能で名前変更した際、インポート側で名前変更がどう追随されるか確認しなさい。
また、デフォルトエクスポート、名前変更を伴うインポート、再エクスポートについても名前変更時の挙動を確認すること。

**出題範囲**: 10.2 10.3

## 問題 10.6 🖋️💻

エクスポートしないjsファイルを複数回importする場合、import文の前後やimport先のコードの実行順序はどうなりますか。実証コードを作成し、予想してから実行結果を確認しなさい。

**出題範囲**: 10.3.2

## 問題 10.7 🖋️

JavaScript/TypeScript の有名な日付操作の OSS リポジトリである[date-fns](https://github.com/date-fns/date-fns)、[Luxon](https://github.com/moment/luxon)、[Day.js](https://github.com/iamkun/dayjs)のそれぞれが、src ディレクトリ以下がどのようなまとまりでモジュール分割されているか分析して、それぞれ 2、3 段落程度で記述しなさい。

**出題範囲**: 10.4
