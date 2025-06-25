# 結果
## 1つ目の出力
0 1 0
## 2つ目の出力
1 1 0

# 挙動について
プログラムは以下のように解釈され、動作していると考えられる。

```Typescript:index.ts
let a = 0, b = 0;

const c = a; // c = 0
++b; // b = 1

console.log(a, b, c);

const e = a++; // e = 0(インクリメント前のaが代入される), a = 1
b; // b = 1

console.log(a, b, e);
```
