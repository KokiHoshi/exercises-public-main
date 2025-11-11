## 出力結果

node index.js
PS C:\Users\r00528332\AndroidStudioProjects\exercises-public-main\exercises\exercises-public-main\ch12\ex01> no
de index.js

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
at file:///C:/Users/r00528332/AndroidStudioProjects/exercises-public-main/exercises/exercises-public-main/c
h12/ex01/index.js:70:14 at ModuleJob.run (node:internal/modules/esm/module_job:222:25)
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
at file:///C:/Users/r00528332/AndroidStudioProjects/exercises-public-main/exercises/exercises-public-main/c
h12/ex01/index.js:130:15 at ModuleJob.run (node:internal/modules/esm/module_job:222:25)
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

## 調査対象の操作と結果

### イテレータ

- next()：next() 呼び出しごとに値を返し、max 超過で {done:true}。
- return()：{value:'終了',done:true} を返すが、その後も next() 可（実装依存）。
- throw()：throw() 呼び出しで例外を再送出し、外で catch。
- for-of：Symbol.iterator 呼び出し後、全値取得で終了（return() は呼ばれない）。
- for-of + break：途中終了時に自動で return(undefined) が呼ばれる。
- for-of + 例外：例外発生時も return(undefined) が自動呼出しされて後始末。

---

### ジェネレータ

- next()：yield ごとに値を返し、終了時に finally が必ず実行。
- return()：finally が実行され {value:'終了',done:true} を返しクローズ。
- throw()：catch → finally 実行後に例外再送出。
- for-of：全値取得後 finally が実行されて正常終了。
- for-of + break：途中終了時に内部で return() が呼ばれ finally 実行。
- for-of + 例外：例外でも return() 経由で finally 実行され安全に終了。
