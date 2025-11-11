## f3

### 予想

C → A → Error: X の警告

### 結果

C
A
(Warning) UnhandledPromiseRejection: Error: X

### 理由

.then(errX)で発生したエラーは非同期側で起きるため、このtry/catchでは捕まらない。
finallyがすぐ動いてC、次にAが出たあと、捕まえられていないエラーとして警告が出る。

## f4

### 予想

A → B → 100

### 結果

A
B
100

### 理由

2つ目のthenがPromise（wait1 の結果）を返しているので順番待ちになる。
A →（1秒）→ B のあと、その結果の値 100 が出力される。

## f5

### 予想

B → A → 40

### 結果

B
A
40

### 理由

2つ目のthenに関数ではなくPromiseを渡すミス。チェーン上は何も返らず素通りし、直前の値 40 がそのまま次へ。
一方で渡したwait1()は別で先に進むため、Bが先に出る。

## f6

### 予想

A → B → C

### 結果

A
B
C

### 理由

最初のpが解決（A）したあと、そこから分岐した2本が同時並行で進む。
1本目は1秒後にB、2本目は2秒後にC。

## f7

### 予想

A → （2秒地点で）B → 直後に C

### 結果

A
B
C

### 理由

2秒待ってからp.then(logB)を呼ぶ時には、pはすでに終わっている。
終わったPromiseにthenするとすぐ次のタイミングで実行されるため、BのあとすぐCが続く。

## f8

### 予想

X → A

### 結果

X
A

### 理由

then(errX)でエラーが起き、次のthen(errY)はスキップされる。
catchで"X"が出て、最後にfinallyでAが出る。。

## f9

### 予想

Y → A

### 結果

Y
A

### 理由

最初は成功（42）だが、その次のthen(errY)でわざとエラーにする。
そのエラーをcatchで"Y"と出して、最後にfinallyでA。

## f10

### 予想

A → Error: Y

### 結果

A
(Warning) UnhandledPromiseRejection: Error: Y

### 理由

then(成功時, 失敗時)の2番目は「元のPromiseが失敗したとき」しか動かない。
今回のエラーは「成功時の中で投げたエラー」なので拾われず、Aが出たあとに捕まえられていないエラーの警告になる。

## f11

### 予想

X

### 結果

X

### 理由

new Promiseの中でその場でthrowしているので、Promiseはすぐエラー扱いになる。
直後のcatchで"X"を出力できる。

## f12

### 予想

Error: X

### 結果

Error: X

### 理由

setTimeoutの中でのthrowは、Promiseの外側で起こる。
だからcatchに届かず、普通の未捕捉エラーとして落ちる。

## 出力

node --unhandled-rejections=warn index.js

> >

=== f3 ===
C
A
(node:8260) UnhandledPromiseRejectionWarning: Error: X
at errX (file:///C:/Users/r00528332/AndroidStudioProjects/exercises-public-main/exercises/exercises-public-main/ch13/ex02/index.js:179:9)
(Use `node --trace-warnings ...` to show where the warning was created)
(node:8260) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or
by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)  
=== f4 ===
A
B
100

=== f5 ===
B
A
40

=== f6 ===
A
B
C

=== f7 ===
A
B
C

=== f8 ===
X
A

=== f9 ===
Y
A

=== f10 ===
A
(node:8260) UnhandledPromiseRejectionWarning: Error: Y
at errY (file:///C:/Users/r00528332/AndroidStudioProjects/exercises-public-main/exercises/exercises-public-main/ch13/ex02/index.js:182:9)
(node:8260) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or
by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 3)  
=== f11 ===
X

=== f12 ===
file:///C:/Users/r00528332/AndroidStudioProjects/exercises-public-main/exercises/exercises-public-main/ch13/ex02/index.js:179
throw new Error("X");
^

Error: X
at errX (file:///C:/Users/r00528332/AndroidStudioProjects/exercises-public-main/exercises/exercises-public-main/ch13/ex02/index.js:179:9)
at Timeout.\_onTimeout (file:///C:/Users/r00528332/AndroidStudioProjects/exercises-public-main/exercises/exercises-public-main/ch13/ex02/index.js:156:22)
at listOnTimeout (node:internal/timers:573:17)
at process.processTimers (node:internal/timers:514:7)
