## webpack のソースマップ設定

`ch17/ex05/webpack.config.js` に、以下を追加

```js
devtool: 'source-map';
```

```bash
npx webpack --config webpack.config.js
```

生成物として `ex05/dist/bundle.js.map` が出力され、`bundle.js` の末尾に `//# sourceMappingURL=bundle.js.map` が付与された。

## 開発者ツールでの表示

ソースマップ有効状態で `ex05/bundled.html` を確認したところ、開発者ツールの `ソース` タブではバンドル済みの `bundle.js` だけでなく、以下のバンドル前ファイルが表示される。

- `webpack://src/index.js`
- `webpack://src/constants.js`
- `webpack://src/renderGrid.js`
- `webpack://src/updateGrid.js`

## デバッグ可否の確認結果

`webpack://src/updateGrid.js`にブレークポイントを設定し、ライフゲームのStartを押下すると、実行中にその位置で停止した。  
停止中に `row` / `col` / `aliveNeighbors` などのローカル変数を確認でき、ステップ実行もバンドル前ソース基準で実施できた。

→バンドル後コードでも元ソースに基づくデバッグが可能であることを確認できた。
