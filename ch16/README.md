# 練習問題 16 章

## 問題 16.1 🖋💻

用語「マルチスレッド」について調べなさい。

次にフィボナッチ数を計算するmFib.jsをスレッド数を変更しながら実行し(*1)、
コンソール出力とOS機能(*2)で結果とスレッド数を確認しなさい。

最後にあなたのPCのCPUスペックを調査し、適切なスレッド数についての考察を記しなさい。

*1 mFib.jsは第一引数で項数、第二引数でスレッド数を指定。コンソールには実行時間とフィボナッチ数が出力される。講師PCでは `node mFib.js 45 4` の実行に15秒程かかる。

*2 OSがwindowsの場合"リソースモニター"（"`Winキー+r`"の後"`resmon`"で起動）で実行中プログラムのスレッド数を確認できる。

**出題範囲 16.2**

## 問題 16.2 💻🖋️

index.js は一定確率で終了する子プロセスを spawn するようになっている。index.js に対して以下の処理を実装しなさい。

1. 子プロセスが異常終了した場合、再起動する
2. シグナルを 2 種類以上トラップし、そのシグナルと同じシグナルを子プロセスに通知し、子プロセスがそのシグナルによって終了したことを確認し、自身も終了する

また、主にクラウド上で動作するプログラムは、いわゆる Graceful Shutdown という動作が求められ、上記のような処理が必要な場合がある。Kubernetes や Amazon ECS などの Docker ランタイム上でコンテナの Graceful Shutdown のために送信されるシグナルの種類は何か書きなさい。

**出題範囲: 16.10.3**

## 問題 16.3 🖋💻

用語`AES`、`Base64`を調べて記しなさい。

以下は、暗号化と`Base64`エンコード、`Base64`デコードと復号のサンプルコードです。穴埋めして完成させなさい。なお、穴埋め箇所では`crypto.Cipher`と`Buffer.from`を使用しなさい。

なお、暗号化のアルゴリズムは`aes-256-cbc`を指定しなさい。

```
import crypto from "crypto";
// ここを埋める

// 鍵を生成する
function generateKey() {
  // 32バイトの暗号論的疑似乱数を生成する
  // ここを埋める
}

// 平文を鍵とAES-256-CBCで暗号化する。次に、暗号文と初期化ベクトル(IV)を、Base64エンコードして返す。
function encrypt64(text, key) {
  // 16バイトの暗号論的疑似乱数を初期化ベクトル (IV) とする
  // ここを埋める

  // 暗号化とBase64エンコード
  // ここを埋める

  // 暗号文とIVをbase64で返す
  return {
    value: encryptedBase64,
    iv: iv.toString("base64"),
  };
}

// generateKeyの返り値を、JSON形式でファイルに保存する(非同期)
async function writeKey(key) {
  // ここを埋める（fs.promisesで鍵を保存）
}

// encrypt64の返り値を、JSON形式でファイルに保存する(非同期)
async function writeEncrypt64(data) {
  // ここを埋める（fs.promisesで暗号データを保存）
}

async function readKey() {
  // ここを埋める（return Promise<鍵>）
}

// ファイルから暗号データを読み込む (非同期)
async function readEncrypt64() {
  // ここを埋める（return Promise<data>）
}

// 復号して平文を返す
function decrypt64(data, key) {
  // ここを埋める
}

// 指定の平文を暗号化とBase64エンコードし、後に復号する一連の処理
(async () => {
  // 平文
  const text = "Hello, World!";

  // 暗号化とBase64エンコード
  const key = generateKey();
  const encryptedData = encrypt64(text, key);

  // 鍵と暗号データをJSONで保存
  await writeKey(key);
  await writeEncrypt64(encryptedData);

  console.log("Encrypted Text (Base64):", encryptedData.value);

  // Base64デコードと復号
  const storedKey = await readKey();
  const storedEncryptedData = await readEncrypt64();
  const decryptedText = decrypt64(storedEncryptedData, storedKey);

  console.log("Decrypted Text:", decryptedText);
})();

```

**出題範囲 16.3,16.5**

## 問題 16.4 💻

Shift_JIS で保存されたテキストファイル hello.txt を読み込み、文字化けしないようにコンソールに表示しなさい。

ライブラリ[iconv-lite](https://www.npmjs.com/package/iconv-lite)を使用してよい。

**出題範囲: 16.5.1**

## 問題 16.5 🖋️💻

1. 標準入力、標準出力、標準エラー出力、リダイレクト、パイプという単語について調べなさい
2. 以下のコードを `cat.mjs` というファイルに保存し、後述する実験の結果を予測し、実際に実験しなさい

```js
import fs from "fs";

if (process.argv.length > 2) {
  // node cat.js foo.txt といった形式ならばファイルを読み込み標準出力に出力する
  fs.createReadStream(process.argv[2]).pipe(process.stdout);
} else {
  // そうでなければ標準入力を標準出力に出力する
  process.stdin.pipe(process.stdout);
}
```

実験: `file` は適当なファイルとし `invalid-file` は存在しないファイルとしなさい

- `node cat.mjs`
- `echo FOO | node cat.mjs`
- `node cat.mjs > output.txt`
- `node cat.mjs file`
- `node cat.mjs file > output.txt`
- `node cat.mjs invalid-file > output.txt`
- `node cat.mjs invalid-file 2> error.txt`

**出題範囲**: 16.1

## 問題 16.6 🖋️💻

P.664 では `fs.truncate()` を利用してファイルを拡張した場合には拡張された部分には 0 が書き込まれる、と説明されていますが、これは ASCII の"0"が書き込まれるという意味ではありません。
実際に `fs.truncate()` を利用してファイルを拡張し、拡張されたファイルの内容をバイナリエディタ(Stirling や VSCode の HexEditor 拡張機能等)で確認しなさい。

**出題範囲**: 16.7

## 問題 16.7 💻🧪

指定のパス文字列を引数にとり、ファイルなら`file`、ディレクトリなら`directory`を返す`checkEntry`関数を`fs.stats`を利用して実装しなさい。

なお、可能なら`file`, `directory`以外を返すパターンの必要性を考えてそれも関数内に実装しなさい。

**出題範囲 16.7.5**

## 問題 16.8 💻

GitHub の REST API を利用して Issue を操作するコマンドラインツールを実装しなさい。最低限以下の要件を満たすこと。

- 入力はコマンドライン引数から受け取る
- Issue を作成できる
- 指定した Issue をクローズできる
- オープンな Issue の Id と Title の一覧を表示できる
- `-h`または`--help`オプションで使い方が確認できる
- `-v`または`--verbose`オプションで HTTP ログを出力する

**出題範囲**: 16.1, 16.8

## 問題 16.9 💻🧪

Express フレームワークを利用して P.672 のサンプルコードと同等の HTTP サーバーを実装しなさい。テストは[Supertest](https://www.npmjs.com/package/supertest)を利用しなさい。

**出題範囲**: 16.8

## 問題 16.10 💻

書籍 16.8 節の HTTP サーバを改造しファイルの取得だけでなくファイルをストリームでアップロードできるようにしなさい:

```js
// NOTE: file.txt の内容をアップロード
fetch("http://localhost:8000/foo/bar/hello.txt", {
  method: "PUT",
  body: fs.createReadStream("file.txt"),
  duplex: "half",
});
```

また大きな `file.txt` に対し `fs.createReadStream` を利用した場合と `fs.read` を利用した場合でメモリ使用量がどれだけ違うか確認しなさい。

**出題範囲**: 16.8

## 問題 16.11 💻🧪🖋️

ブラウザと以下の通信ができる HTTP サーバを net パッケージのみを用いて実装しなさい。

1. "/"が GET されたとき以下の HTML を返却する
```html
   <!doctype html>
   <html lang="ja">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Greeting Form</title>
     </head>
     <body>
       <form action="/greeting" method="POST">
         <label for="greeting">Name:</label>
         <input type="text" id="name" name="name" />
         <input type="text" id="greeting" name="greeting" />
         <button type="submit">Submit</button>
       </form>
     </body>
   </html>
```
2. 1.のフォームから`/greeting`に POST されたとき、nameとgreeting の内容をボディに含む HTML を返却する
3. 1.2.3.で非対応のパスとメソッドの組み合わせでアクセスされた場合、HTTP のプロトコルにしたがい 404 または 405 を返す

また、複数のTCPクライアント (net.Socket) でHTTPリクエストを送信せず同時に接続を維持した際、何接続で接続が確立できなくなるか確認し、確立できなかった理由を書きなさい。


**出題範囲: 16.11.9**

## 問題 16.12 🖋

用語「C10K問題」について調べて説明しなさい。

**出題範囲 16.10**

## 問題 16.13 💻

この章では何度か [シェル](https://ja.wikipedia.org/wiki/%E3%82%B7%E3%82%A7%E3%83%AB) という単語が登場した。ここまでに学んだ知識を元に簡単なシェルを作ってみよう。

[ex13/shell.js](ex13/shell.js) には作りかけのシェルの実装がある:

1. `node path/to/shell.js` と実行してみなさい
2. プログラム中の `FIXME` という箇所を修正しパイプやリダイレクトを実装しなさい

パイプやリダイレクトの例は以下:

```sh
# Linux
> echo HELLO | tr [:upper:] [:lower:] > hello.txt

# Windows (WSL が必要)
> wsl echo HELLO | wsl tr [:upper:] [:lower:] > hello.txt

# いずれも hello.txt に `hello` と書き込まれる

# Windows (WSL 不要)
# 問題: なぜ直接 dir を使わず cmd /c を書いているのだろうか？これらの意味は？
> cmd /c dir | cmd /c "findstr DIR"
```

**注意**: ここでは説明を簡単にするために `spawn` を利用したが、これは一般的なシェルの実装とは異なることに注意。

**出題範囲**: なし

## 問題 16.14 💻

読み込んだ画像に対してガウシアンフィルタ(ch15.4-10 ex09 参照)を適用するプログラムを作成しなさい。
フィルタの適用はワーカースレッドで行うこと。

**出題範囲**: 16.11

## 問題 16.15 💻🖋️

p.691-692 のサンプルコードを以下のように SharedArrayBuffer および Atomic を使わない形式に書き換えなさい。

1. sharedArray を number 型の変数 num にする
2. メインスレッドの for ループで Atomic.add の代わりに num をインクリメントする
3. サブスレッドの for ループで Atomic.add の代わりにメインスレッドに"num をインクリメントせよ"というメッセージを送り、メインスレッドではそのメッセージを受信したら num をインクリメントする

このようないわゆるメッセージパッシングによって排他制御処理相当を行う並行処理モデルを何と呼ぶか書きなさい。

**出題範囲: 16.11.5**
