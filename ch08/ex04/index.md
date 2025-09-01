## 予想
false true
true false

## 結果
false true
true false

### 結果の説明
obj.om() をメソッド呼び出ししているので、om 内の this は obj。
nest.nm() は通常の関数としてメソッド呼び出しされるので、nm 内の this は 呼び出し元オブジェクト nest。
→ this === obj は false、this === nest は true 
→ 一行目はfalse true
nest.arrow は アロー関数で、thisは定義時の外側のスコープのthisを継承している。 
arrow は om の内部で定義されており、外側の this は obj なので、arrow 内の this は常に obj。
→ this === obj は true、this === nest は false 
→ 二行目はtrue false