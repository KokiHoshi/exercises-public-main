## Active や Completed を選択後にブラウザのリロードを行うとどうなるか

404エラーを返す。

ex11ではタスクはリセットされるが正常に表示される。

### hashchange

URLが http://localhost:3000/#/active のような形式となる。

#以降は HTTPリクエストに送られないため、リロード時にブラウザが取りに行くのは、常に同じリソース→リロードしても基本的に壊れない。

### putState

URLが http://localhost:3000/active のようにActive/Completedを選ぶとURLのパスそのものが変わる。

リロード=「そのURLにGETする」なので、ブラウザは「http://localhost:3000/ch15.04-10/ex12/active 」に要求を飛ばす。

サーバー側では/ch15.04-10/ex12/index.htmlはあるが、/ch15.04-10/ex12/activeという ファイルは存在しないため404エラーを返す。

## サーバー側がどのような挙動をすればpushState を使った実装が期待通り動作するか

サーバが /active 等のパスへのリクエストでも index.html を返すSPAフォールバック挙動を作成する必要がある。
