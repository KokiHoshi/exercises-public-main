## マルチスレッドとは

1つのプロセス(アプリ)の中で、複数のスレッドを同時並行に動かす仕組み

### マルチスレッドの目的

- 並行性
  待ち(I/O待ちなど)の間に別のタスクを進める
- 並列性
  CPUコアが複数ある環境で、同時に計算して速度を上げる

## mFib.jsの実行結果 (項数：45)

- 「CPU」は実行直後のCPU列の値を記載

### スレッド数 1のとき

- コンソール

  $ node mFib.js 45 1
  Worker 0 execution time: 17.955s
  Total execution time: 17.962s
  Fibonacci number: 1836311902

- OS機能

  スレッド 17 CPU 8

### スレッド数 2のとき

- コンソール

  $ node mFib.js 45 2
  Worker 1 execution time: 7.962s
  Worker 0 execution time: 11.796s
  Total execution time: 11.801s
  Fibonacci number: 1836311902

- OS機能

  スレッド 18 CPU 16

### スレッド数 3のとき

- コンソール

  $ node mFib.js 45 3
  Worker 1 execution time: 5.024s
  Worker 2 execution time: 7.843s
  Worker 0 execution time: 11.537s
  Total execution time: 11.542s
  Fibonacci number: 1836311902

- OS機能

  スレッド 19 CPU 24

### スレッド数 4のとき

- コンソール

  $ node mFib.js 45 4
  Worker 0 execution time: 3.561s
  Worker 1 execution time: 5.449s
  Worker 2 execution time: 7.785s
  Worker 3 execution time: 11.058s
  Total execution time: 11.066s
  Fibonacci number: 1836311902

- OS機能

  スレッド 20 CPU 33

### スレッド数 6のとき

- コンソール

  $ node mFib.js 45 6
  Worker 2 execution time: 856.174ms
  Worker 1 execution time: 1.681s
  Worker 3 execution time: 3.053s
  Worker 5 execution time: 4.991s
  Worker 4 execution time: 7.962s
  Worker 0 execution time: 11.511s
  Total execution time: 11.515s
  Fibonacci number: 1836311902

- OS機能

  スレッド 22 CPU 35

### スレッド数 8のとき

- コンソール

  $ node mFib.js 45 8
  Worker 1 execution time: 469.934ms
  Worker 0 execution time: 787.95ms
  Worker 4 execution time: 1.450s
  Worker 3 execution time: 2.322s
  Worker 7 execution time: 3.782s
  Worker 2 execution time: 5.406s
  Worker 6 execution time: 7.458s
  Worker 5 execution time: 10.271s
  Total execution time: 10.279s
  Fibonacci number: 1836311902

- OS機能

  スレッド 24 CPU 37

### スレッド数 10のとき

- コンソール

  $ node mFib.js 45 10
  Worker 8 execution time: 216.674ms
  Worker 7 execution time: 377.055ms
  Worker 9 execution time: 679.966ms
  Worker 4 execution time: 1.180s
  Worker 6 execution time: 1.785s
  Worker 0 execution time: 2.727s
  Worker 3 execution time: 4.231s
  Worker 1 execution time: 6.049s
  Worker 2 execution time: 8.479s
  Worker 5 execution time: 11.977s
  Total execution time: 11.985s
  Fibonacci number: 1836311902

- OS機能

  スレッド 26 CPU 40

### スレッド数 12のとき

- コンソール

  $ node mFib.js 45 12
  Worker 4 execution time: 112.677ms
  Worker 1 execution time: 145.938ms
  Worker 0 execution time: 216.654ms
  Worker 10 execution time: 294.391ms
  Worker 9 execution time: 428.742ms
  Worker 8 execution time: 645.248ms
  Worker 3 execution time: 1.027s
  Worker 6 execution time: 1.905s
  Worker 7 execution time: 3.149s
  Worker 2 execution time: 4.938s
  Worker 11 execution time: 6.762s
  Worker 5 execution time: 9.727s
  Total execution time: 9.735s
  Fibonacci number: 1836311902

- OS機能

  スレッド 28 CPU 44

### スレッド数 16のとき

- コンソール

  $ node mFib.js 45 16
  Worker 9 execution time: 96.193ms
  Worker 5 execution time: 111.517ms
  Worker 14 execution time: 106.674ms
  Worker 13 execution time: 112.281ms
  Worker 11 execution time: 124.381ms
  Worker 8 execution time: 134.541ms
  Worker 3 execution time: 245.047ms
  Worker 1 execution time: 305.817ms
  Worker 7 execution time: 523.493ms
  Worker 6 execution time: 916.307ms
  Worker 4 execution time: 1.631s
  Worker 12 execution time: 2.450s
  Worker 15 execution time: 3.800s
  Worker 0 execution time: 5.415s
  Worker 2 execution time: 7.492s
  Worker 10 execution time: 10.345s
  Total execution time: 10.357s
  Fibonacci number: 1836311902

- OS機能

  スレッド 32 CPU 54

## 適切なスレッド数

### CPUスペック

- コア：10
- 論理プロセッサ数：12

適切なスレッド数は、CPUの論理プロセッサ数=12を基準として決まる。
また、mFib.jsのような計算量が多い場合、同時に実行可能な数は論理コア数が上限であり、それ以上増やしてもオーバーヘッドが増えるだけで性能向上は期待できない。
ゆえに最適なスレッド数は10~12であると考えられる。
