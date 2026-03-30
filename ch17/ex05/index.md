## webpackを利用したバンドル

`ch17/ex05/webpack.config.js` を作成し、`src/index.js` をエントリに `dist/bundle.js` を生成した。

```bash
npx webpack --config ex05/webpack.config.js
```

### 結果

- 複数モジュールが 1 ファイルに結合された
- import/export が解決され、実行可能な即時実行関数形式に変換された
- 変数名短縮・空白除去などが行われた

## ローカルサーバ配信とネットワーク比較

- 比較ページ
  - バンドル前: `ch17/ex05/unbundled.html`
  - バンドル後: `ch17/ex05/bundled.html`
- 配信: `npx serve -l 4173 .`
- 項目: スクリプトダウンロード時間(index.js + constants.js + rendergrid.js + updateGrid.js/bundle.js)、ページ読み込み完了時間(DOMContentLoaded,Load)

### 結果

- バンドル前
  - スクリプトダウンロード時間: 48ms
  - ページ読み込み完了時間:
    - DOMContentLoaded:221.10000038146973ms
    - Load:384.40000009536743ms

- バンドル後
  - スクリプトダウンロード時間: 29ms
  - ページ読み込み完了時間:
    - DOMContentLoaded:224.30000019073486ms
    - Load:424.30000019073486ms

スクリプトダウンロード時間はバンドルにより短縮されたが、ページ読み込み完了時間はDOMContentLoadedはほぼ同等、Loadはバンドル前の方が短かった。

→JS取得は改善されたが、Load は他要因で悪化したと考えられる。
