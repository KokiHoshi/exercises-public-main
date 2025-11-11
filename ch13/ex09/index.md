## i1

### 予想

42 → 100

### 結果

42 → 100

### 理由

`Promise.any` は最初に **fulfill** した値（`wait1→42`）で即決。並行していたもう一方はその後も実行され、`wait2` 後に `v=100` へ上書きされるため、2回目の `log(v)` では 100 になる。

---

## i2

### 予想

C → B → A → ["A","B","C"]

### 結果

C → B → A → ["A","B","C"]

### 理由

`wait1/2/3` の終了順で `logC`→`logB`→`logA` が先に出力。`Promise.all` の戻り配列は **入力順** を保つため、最終出力は `["A","B","C"]`。

---

## i3

### 予想

Y → 42 → B → 0

### 結果

Y → 42 → B → 0

### 理由

`Promise.all` は最初に **reject** した理由で即座に失敗（`wait1` 後の `errY`）。catch 内で `Y` と当時の `v(42)` を出力。並行処理は継続し `B` が出た後、`wait3` 後には `v` が `p1` 側の処理で 0 に更新済み。

---

## i4

### 予想

5

### 結果

5

### 理由

next = v + 1とv = nextの間にある await wait2()の間に別の処理が割り込み、両タスクが同じ値の v を読み取って上書きするため更新が失われ、最終結果が 5 になる。

### 最終結果を 10 にするには

読み取りと書き込みの間に `await` を置かないようにする。

```js
async function i4_fixed() {
  let v = 0;

  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      await wait2();
      v = v + 1;
    }
  };

  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      await wait2();
      v = v + 1;
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}
```
