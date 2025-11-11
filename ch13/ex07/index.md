## h1

### 予想

A → B → C

### 結果

A → B → C

### 理由

await により順に wait3 → wait2 → wait1 が実行され、すべて成功するため例外は発生しない。

---

## h2

### 予想

X

### 結果

X

### 理由

new Promise の実行中に errX() が同期的に投げられ、その例外が即座に reject され catch に渡される。

---

## h3

### 予想

何も出力されない

### 結果

Error: Xが投げられる

file:///C:/Users/r00528332/AndroidStudioProjects/exercises-public-main/exercises/exercises-public-main/ch13/ex07/index.js:24
throw new Error("X");
^

Error: X
at errX (file:///C:/Users/r00528332/AndroidStudioProjects/exercises-public-main/exercises/exercises-public-main/ch13/ex07/index.js:24:9)
at file:///C:/Users/r00528332/AndroidStudioProjects/exercises-public-main/exercises/exercises-public-main/ch13/ex07/index.js:53:5
at new Promise (<anonymous>)
at h3 (file:///C:/Users/r00528332/AndroidStudioProjects/exercises-public-main/exercises/exercises-public-main/ch13/ex07/index.js:52:3)
at file:///C:/Users/r00528332/AndroidStudioProjects/exercises-public-main/exercises/exercises-public-main/ch13/ex07/index.js:82:3

Node.js v20.12.1

### 理由

async 関数内で発生した errX() の reject は外側の new Promise に伝わらず、外側が未完了のまま catch も呼ばれない。

---

## h4

### 予想

X

### 結果

Error: Yが投げられる

file:///C:/Users/r00528332/AndroidStudioProjects/exercises-public-main/exercises/exercises-public-main/ch13/ex07/index.js:27
throw new Error("Y");
^

Error: Y
at errY (file:///C:/Users/r00528332/AndroidStudioProjects/exercises-public-main/exercises/exercises-public-main/ch13/ex07/index.js:27:9)
at file:///C:/Users/r00528332/AndroidStudioProjects/exercises-public-main/exercises/exercises-public-main/ch13/ex07/index.js:64:7

Node.js v20.12.1

### 理由

p1 が errX() により先に reject され、catch により X が出力される。p2 の errY() は未処理のまま残る。
