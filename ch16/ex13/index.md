## `node path/to/shell.js` の実行結果

- コマンドラインに`>`が出て入力待ちになる
- パイプ・リダイレクト無しのコマンドは動く
- `> / < / | `を含むコマンドは未実装なので動かず、何も起きない

## 修正後の実行結果

```bash
$ echo HELLO | tr [:upper:] [:lower:] > hello.txt
```

- hello.txt が生成
- hello.txtにはhelloと記載
