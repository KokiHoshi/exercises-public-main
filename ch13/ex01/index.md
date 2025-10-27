## 予想

longRunningFunction()内の無限ループでスタックし何も出力されない

## 結果

何も出力されない

### 理由

ブラウザやNodeは「現在実行中の仕事（1つのタスク）」が終わったら、キューに溜まっている次のタスクを取り出して実行する。
setTimeout(fn, 1000) は、少なくとも1秒後に fn をタスクキューに入れるので、現在のタスクが完了してから初めて取り出されて実行される。
最初のタスク内で longRunningFunction() が呼ばれるが、このタスクが終わらないためsetTimeout が投入した次のタスクに進めない。よって console.log("Hello, world!") は永遠に実行されない。

- タスク（macrotask）：setTimeout/setInterval、I/O、ユーザーイベント処理などでキューに積まれる実行単位
