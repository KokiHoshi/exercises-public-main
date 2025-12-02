## React の場合

### React が自動で行う XSS 対策

- JSX 内に埋め込んだ値は 自動でエスケープされる
  - `<div>{userInput}</div>` は `<` や `script` を無害化して表示
- DOM 直接操作をしないため、攻撃者が勝手にイベントハンドラなどを挿入しづらい

### React を使っていても残る XSS の危険

- `dangerouslySetInnerHTML` や `innerHTML` に未サニタイズの HTML を挿入すると、React の自動エスケープが無効化され XSS が発生する
  ```jsx
  <div dangerouslySetInnerHTML={{ __html: userInput }} />
  ```
  例のように userInput に <img onerror="alert(1)"> などが入っていると、そのまま実行されてしまう
