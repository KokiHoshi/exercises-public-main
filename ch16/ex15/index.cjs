const threads = require("worker_threads");

const N = 10_000_000;

if (threads.isMainThread) {
  // sharedArray を number 型の変数 num にする
  let num = 0;

  const worker = new threads.Worker(__filename);

  // サブスレッドからincrementせよとメッセージを受けたら num++
  worker.on("message", (msg) => {
    if (msg === "inc") {
      num++;
      return;
    }
    if (msg === "done") {
      // workerが自分のループを終えたのでメインのループも終わっている前提で結果表示
      console.log(num);
    }
  });

  worker.on("online", () => {
    // メインスレッドの for ループで Atomics.add の代わりに num をインクリメント
    for (let i = 0; i < N; i++) {
      num++;
    }

    // メイン側のループ完了をworkerに知らせる（表示タイミングを揃えるため）
    worker.postMessage("main_done");
  });
} else {
  // Worker側
  let mainDone = false;

  threads.parentPort.on("message", (msg) => {
    if (msg === "main_done") {
      mainDone = true;
      // 自分の処理も終えていればdoneを返す（先にループを回すのでここで送る）
      threads.parentPort.postMessage("done");
    }
  });

  // サブスレッドの for ループで Atomics.add の代わりに「num をインクリメントせよ」メッセージをメインへ送る
  for (let i = 0; i < N; i++) {
    threads.parentPort.postMessage("inc");
  }
}
