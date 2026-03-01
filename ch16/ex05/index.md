## 単語の意味

### 標準入力（stdin）

プログラムが入力を受け取るための既定の入口。
ターミナルからのキーボード入力や、パイプで渡されたデータが入ってくる。
Node.js では process.stdin。

### 標準出力（stdout）

プログラムが通常の結果を出力するための既定の出口。ターミナルに表示される（またはリダイレクトされる）。
Node.js では process.stdout。

### 標準エラー出力（stderr）

プログラムがエラーや警告を出すための既定の出口。
stdout と別経路なので、結果とエラーを分離できる。
Node.js では process.stderr。

### リダイレクト（redirect）

標準出力/標準エラー出力を、ターミナル表示ではなくファイルなどへ向け替えること。

- `>` : stdout をファイルへ（上書き）

- `2>` : stderr をファイルへ（上書き）

### パイプ（pipe）

あるコマンドの stdout を、別のコマンドの stdin に直結して渡すこと。

- `A | B` : A の出力 → B の入力

## cat.mjsの動作

### 予想

- `node cat.mjs`
  入力待ちになる。入力した文字がそのまま表示される。
- `echo FOO | node cat.mjs`
  FOO が表示されてすぐ終了。
- `node cat.mjs > output.txt`
  入力待ちになる（ターミナルには何も表示されない）。入力した内容が output.txt に書かれる。
- `node cat.mjs file`
  file の内容がターミナルに表示されて終了。
- `node cat.mjs file > output.txt`
  output.txt がfileの内容で書き換えられ、ターミナルには出ない。
- `node cat.mjs invalid-file > output.txt`
  ファイルが無いのでエラーが出る。stdout はファイルに向いているが、エラーは stderr なのでターミナルに表示される。output.txt は空。
- `node cat.mjs invalid-file 2> error.txt`
  エラーが error.txt に保存され、ターミナルには出ない。

### 結果

- `node cat.mjs`
  入力待ちになり、入力した文字がそのまま表示された。
- `echo FOO | node cat.mjs`
  FOO が表示されてすぐ終了した。
- `node cat.mjs > output.txt`
  入力待ちになり、入力した内容が output.txt に書かれる。
- `node cat.mjs file`
  file の内容がターミナルに表示されて終了。
- `node cat.mjs file > output.txt`
  output.txt がfileの内容で書き換えられ、ターミナルには出ない。
- `node cat.mjs invalid-file > output.txt`
  ファイルが無いのでエラーが出る。stdout はファイルに向いているが、エラーは stderr なのでターミナルに表示される。output.txt は空。
- `node cat.mjs invalid-file 2> error.txt`
  エラーが error.txt に保存され、ターミナルには出ない。
