# void 0を使っていた理由
ES3 以前（2009年以前）の JavaScript では、undefined は予約語ではなく、単なる書き換え可能な変数だった。
対してvoid 演算子は、与えられた式を評価したあと undefined を返す演算子であり、undefined が書き換えられていても安全に比較できるため使われていた。
# 今ではこのような書き方をしないのは何故か
ES5（2009年）以降、undefined はグローバルスコープで non-writable, non-configurable な値（書き換え不可の定数） になったため。