# 出力結果

node index.js
PS C:\Users\r00528332\AndroidStudioProjects\exercises-public-main\exercises\exercises-public-main\ch12\ex01> node index.js

---

イテレータ: next()
counterIter
counterIter: next
{ value: 1, done: false }
counterIter: next
{ value: 2, done: false }
counterIter: next
{ value: 3, done: false }
counterIter: next
{ value: undefined, done: true }

---

イテレータ: return()
counterIter
counterIter: next
{ value: 1, done: false }
counterIter: return: 終了
{ value: '終了', done: true }

---

イテレータ: throw()
counterIter
counterIter: throw: Error: エラー発生
at file:///C:/Users/r00528332/AndroidStudioProjects/exercises-public-main/exercises/exercises-public-main/ch12/ex01/index.js:70:14
at ModuleJob.run (node:internal/modules/esm/module_job:222:25)
at async ModuleLoader.import (node:internal/modules/esm/loader:323:24)
at async loadESM (node:internal/process/esm_loader:28:7)
at async handleMainPromise (node:internal/modules/run_main:113:12)
caught: エラー発生

---

イテレータ: for-of
counterIter
counterIter: Symbol.iterator
counterIter: next
body: 1
counterIter: next
body: 2
counterIter: next
body: 3
counterIter: next

---

イテレータ: for-of 途中でbreak
counterIter
counterIter: Symbol.iterator
counterIter: next
body: 1
counterIter: next
body: 2
counterIter: return: undefined
counterIter
counterIter: Symbol.iterator
counterIter: next
body: 1
counterIter: next
body: 2
counterIter: return: undefined
caught: ループ内エラー

---

イテレータ: next()
counterGen
counterGen: next
{ value: 1, done: false }
counterGen: next
{ value: 2, done: false }
counterGen: next
{ value: 3, done: false }
counterGen: finally
{ value: undefined, done: true }

---

イテレータ: return()
counterGen
counterGen: next
{ value: 1, done: false }
counterGen: finally
{ value: '終了', done: true }

---

イテレータ: throw()
counterGen
counterGen: next
{ value: 1, done: false }
counterGen: catch: Error: エラー発生
at file:///C:/Users/r00528332/AndroidStudioProjects/exercises-public-main/exercises/exercises-public-main/ch12/ex01/index.js:130:15
at ModuleJob.run (node:internal/modules/esm/module_job:222:25)
at async ModuleLoader.import (node:internal/modules/esm/loader:323:24)
at async loadESM (node:internal/process/esm_loader:28:7)
at async handleMainPromise (node:internal/modules/run_main:113:12)
counterGen: finally
caught: エラー発生

---

イテレータ: for-of
counterGen
counterGen: next
body: 1
counterGen: next
body: 2
counterGen: next
body: 3
counterGen: finally

---

イテレータ: for-of 途中でbreak
counterGen
counterGen: next
body: 1
counterGen: next
body: 2
counterGen: finally
counterGen
counterGen: next
body: 1
counterGen: next
body: 2
counterGen: finally
caught: ループ内エラー

# 調査対象の操作と結果

## イテレータ

### 明示的に[イテレータプロトコル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Iteration_protocols)の next() を呼び出す

next が都度実行され値を返す（Symbol.iterator は呼ばれない）

### 明示的に[イテレータプロトコル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Iteration_protocols)の return() を呼び出す

return(<値>) が呼ばれ、即 {value:<値>, done:true} でクローズする

### 明示的に[イテレータプロトコル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Iteration_protocols)の throw() を呼び出す

throw(<err>) が実行され、その例外がそのまま外へ再スロー

### for-of ループを実行

開始時に Symbol.iterator、各反復で next、終了時は return() は呼ばれない

### for-of ループを実行途中で break

Symbol.iterator → next… → 途中終了時に IteratorClose により return(undefined)

### for-of ループを実行中に例外発生

Symbol.iterator → next… → 例外伝播前に IteratorClose で return(undefined)

## ジェネレータ

### 明示的に[イテレータプロトコル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Iteration_protocols)の next() を呼び出す

最初の next() で初めて本体が動き（counterGen ログ）、以後 next、取り尽くすと finally

### 明示的に[イテレータプロトコル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Iteration_protocols)の return() を呼び出す

呼出しで即終了し、必ず finally 実行後に {value:<値>, done:true}

### 明示的に[イテレータプロトコル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Iteration_protocols)の throw() を呼び出す

内部に例外が投げ込まれ catch → finally → 再スロー（外で捕捉）

### for-of ループを実行

各反復で next、最後に finally（自然終了でも必ず実行）

### for-of ループを実行途中で break

途中終了時に finally が必ず実行

### for-of ループを実行中に例外発生

例外伝播前に finally が必ず実行
