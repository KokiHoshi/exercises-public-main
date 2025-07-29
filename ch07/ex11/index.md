## 7.10 で作成した動的配列の push の平均時間計算量
```javaScript
if (this.len >= this.array.length()) {
  const old = this.array;
  this.array = makeFixedSizeArray(old.length() * 2);
  for (let i = 0; i < this.len; i++) {
    this.array.set(i, old.get(i)); // 要素をコピー
  }
}
```
pushをn回呼び出すと、要素コピーは1+2+4+8+...+2^{log_2 n} 
=> 合計2n-1回実施される。

これは等比数列の和でO(n)となるので一回当たりの平均は
O(n) / n = O(1)

## `copyA` と `copyB` に対し、`array.length` を `n` とした時の時間計算量
```javaScript
function copyA(array) {
  const result = Array(array.length);
  for (let i = 0; i < array.length; i++) {
    result[i] = array[i];
  }
  return result;
}

// NOTE: copyB よりも copyA の方が効率的に見えるが計算量の観点ではどうだろうか
function copyB(array) {
  const result = [];
  for (const v of array) {
    result.push(v);
  }
  return result;
}
```

### copyA
配列を長さnで確保後、n回のコピー
→全てO(1)の動作のため、全体ではO(n)となる

### copyB
配列はpushで動的に拡張される
pushをn回するためO(n)となる