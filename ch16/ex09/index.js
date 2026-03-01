import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 拡張子に基づいてファイルのコンテンツタイプを推測する
 */
function guessContentType(filename) {
  switch (path.extname(filename)) {
    case ".html":
    case ".htm":
      return "text/html";
    case ".js":
      return "text/javascript";
    case ".css":
      return "text/css";
    case ".png":
      return "image/png";
    case ".txt":
      return "text/plain";
    default:
      return "application/octet-stream";
  }
}

/**
 * rootDirectory:serve(rootDirectory, port) の rootDirectory
 */
export function createApp(rootDirectory) {
  const app = express();

  // filename = path.resolve(rootDirectory, filename) をするためにrootDirectory を絶対パス化して保持しておく
  const rootAbs = path.resolve(rootDirectory);

  // /test/mirror エンドポイント
  // if (endpoint === "/test/mirror") { ... request.pipe(response) }
  app.all("/test/mirror", (req, res) => {
    // response.setHeader("Content-Type", "text/plain; charset=UTF-8");
    res.set("Content-Type", "text/plain; charset=UTF-8");

    // response.writeHead(200);
    res.status(200);

    // response.write(`${request.method} ${request.url} HTTP/${request.httpVersion}\r\n`);
    res.write(`${req.method} ${req.originalUrl} HTTP/${req.httpVersion}\r\n`);

    // let headers = request.rawHeaders; ループで出力
    // rawHeaders は [key, value, key, value, ...]
    const headers = req.rawHeaders ?? [];
    for (let i = 0; i < headers.length; i += 2) {
      res.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
    }

    // response.write("\r\n");
    res.write("\r\n");

    // request.pipe(response);
    // リクエストボディをそのままレスポンスにコピー（ストリーム）
    req.pipe(res);
  });

  // それ以外は静的ファイル配信
  // else { ... fs.createReadStream(filename) ... }
  app.use((req, res) => {
    // endpoint = url.parse(request.url).pathname;
    const endpoint = req.path;

    // let filename = endpoint.substring(1);
    let filename = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;

    // filename = filename.replace(/\.\.\//g, "");
    // 「../」を禁止
    filename = filename.replace(/\.\.\//g, "");

    // filename = path.resolve(rootDirectory, filename);
    // 相対→絶対へ変換
    const abs = path.resolve(rootAbs, filename);

    // サンプルは ../ を置換するだけだが、URLエンコードなど別経路の回避もあるので
    // 念のため rootAbs の外をブロックする
    const rootPrefix = rootAbs.endsWith(path.sep)
      ? rootAbs
      : rootAbs + path.sep;
    if (!(abs + path.sep).startsWith(rootPrefix)) {
      res
        .status(404)
        .set("Content-Type", "text/plain; charset=UTF-8")
        .send("Not Found");
      return;
    }

    //switch(path.extname(filename)) で type 推測
    const type = guessContentType(abs);

    //let stream = fs.createReadStream(filename);
    const stream = fs.createReadStream(abs);

    //stream.once("readable", () => { setHeader, writeHead(200), stream.pipe(response) })
    stream.once("readable", () => {
      // response.setHeader("Content-Type", type);
      res.set("Content-Type", type);

      // response.writeHead(200);
      res.status(200);

      // stream.pipe(response);
      stream.pipe(res);
    });

    // stream.on("error", (err) => { 404 + err.message })
    stream.on("error", (err) => {
      res
        .status(404)
        .set("Content-Type", "text/plain; charset=UTF-8")
        .send(err.message);
    });
  });

  return app;
}

// コマンドラインから起動された場合のみ listen する
// serve(process.argv[2] || "/tmp", parseInt(process.argv[3]) || 8000);
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = process.argv[2] || "/tmp";
  const port = Number.parseInt(process.argv[3] || "8000", 10);

  const app = createApp(root);

  // [サンプル対応] server.listen(port); console.log("Listening on port", port);
  app.listen(port, () => {
    console.log("Listening on port", port);
  });
}
