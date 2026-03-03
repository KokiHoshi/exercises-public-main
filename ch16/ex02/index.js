import { spawn } from "child_process";
import path from "path";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
  const childPath = path.join(__dirname, "child.js");
  child = spawn("node", [childPath]);

  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise((res) => {
    child.on("close", (code, signal) => {
      res([code, signal]);
    });
  });
}

// TODO: ここに処理を書く
// 2種類以上トラップ（例：SIGINT, SIGTERM）
const TRAP_SIGNALS = ["SIGINT", "SIGTERM"];

// 親がシグナルを受けたとき子にも同じシグナルを送って、子がそのシグナルで終了したのを確認し、親も終了
async function handleSignal(sig) {
  if (shuttingDown) return;
  shuttingDown = true;

  console.log(`[parent] received ${sig}`);

  // 子が生きていれば同じシグナルを転送
  if (child && child.pid) {
    console.log(`[parent] forwarding ${sig} to child (pid=${child.pid})`);
    try {
      child.kill(sig);
    } catch (e) {
      console.error("[parent] failed to signal child:", e);
    }
  }

  // 子の終了を待つ（childClosePromise が無い場合は念のため即終了）
  const [code, signal] = (await childClosePromise) ?? [null, null];

  // 子がそのシグナルで終了したことを確認
  if (signal === sig) {
    console.log(`[parent] confirmed: child terminated by ${signal}`);
  } else {
    console.log(
      `[parent] child terminated (code=${code}, signal=${signal}); expected signal=${sig}`,
    );
  }

  // 親も終了
  // 該当シグナルのハンドラを外してから自分に送る
  process.removeAllListeners(sig);
  process.kill(process.pid, sig);
}

for (const sig of TRAP_SIGNALS) {
  process.on(sig, () => {
    void handleSignal(sig);
  });
}

// 子プロセス監視：異常終了なら再起動
(async () => {
  while (true) {
    const [code, signal] = await startChild();

    // シグナルで落ちたなら親も終了側に寄せる
    if (signal) {
      console.log(`[parent] child closed by signal=${signal}`);
      if (!shuttingDown) {
        // 何らかの外部要因で子がシグナル終了したケースも、親も終了する
        await handleSignal(signal);
      }
      break;
    }

    // code !== 0 を「異常終了」とみなして再起動
    if (code !== 0) {
      console.log(`[parent] child exited abnormally (code=${code}) -> restart`);
      if (shuttingDown) break;
      continue;
    }

    // 正常終了
    console.log("[parent] child exited normally -> parent exits");
    break;
  }
})();
