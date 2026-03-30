# `@babel/preset-typescript`や`tsc`の違い

## `@babel/preset-typescript`の特徴

BabelにTypeScript構文を理解させるためのプリセットである。
これは基本的に、TypeScriptの型注釈などを取り除いてJavaScriptに変換するためのものである。

Babelはtscと異なり、型チェックを行わない。つまり、型に誤りがあってもそのまま変換できてしまう。

### Babel を使うメリット

- 既存のBabel環境にTypeScriptを組み込みやすい

- @babel/preset-envなどと組み合わせて、古い実行環境向け変換をまとめて行いやすい

- Reactや各種ビルドツールとの統合がしやすい

- ビルド処理が比較的高速になる場合がある

## `tsc` の特徴

TypeScript 公式のコンパイラである。
主な役割は、TypeScript の型チェックとJavaScript への変換をまとめて行うことにある。

### tsc を使うメリット

- 型エラーを検出できる

- tsconfig.jsonによる詳細な設定が可能である

- declarationオプションにより.d.tsファイルを生成できる

- TypeScript独自機能を公式仕様に沿って扱える

- プロジェクト全体の型整合性を確認できる

## 大きな違い

最も重要な違いは、型チェックをするかどうかである。
また、tsc は TypeScript専用の正式コンパイラであり、.d.ts生成や TypeScript特有の設定に強い。
一方 Babelは、JavaScript全体の変換基盤の一部として TypeScriptを扱うため、他の Babelプラグインやプリセットと組み合わせやすい。

### 使い分け

一般に、型安全性を重視し、TypeScriptの機能を正しく活用したいなら tscを使うのが基本である。
一方、Babelベースのビルド環境をすでに使っており、TypeScriptは構文変換だけ行いたい場合には @babel/preset-typescriptが適している。
