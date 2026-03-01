import net from "net";
import { URLSearchParams } from "url";

const PORT = 8080;

const FORM_HTML = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Greeting Form</title>
  </head>
  <body>
    <form action="/greeting" method="POST">
      <label for="greeting">Name:</label>
      <input type="text" id="name" name="name" />
      <input type="text" id="greeting" name="greeting" />
      <button type="submit">Submit</button>
    </form>
  </body>
</html>`;

function response(status, statusText, headers, body) {
  return `HTTP/1.1 ${status} ${statusText}\r
${Object.entries(headers)
  .map(([k, v]) => `${k}: ${v}`)
  .join("\r\n")}\r
Content-Length: ${Buffer.byteLength(body)}\r
\r
${body}`;
}

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const request = data.toString();
    const [headerPart, body] = request.split("\r\n\r\n");

    const [requestLine] = headerPart.split("\r\n");
    const [method, path] = requestLine.split(" ");

    // GET /
    if (method === "GET" && path === "/") {
      const res = response(
        200,
        "OK",
        { "Content-Type": "text/html; charset=utf-8" },
        FORM_HTML,
      );
      socket.end(res);
      return;
    }

    // POST /greeting
    if (method === "POST" && path === "/greeting") {
      const params = new URLSearchParams(body);
      const name = params.get("name") ?? "";
      const greeting = params.get("greeting") ?? "";

      const resultHtml = `<!doctype html>
<html lang="ja">
  <head><meta charset="UTF-8"><title>Greeting</title></head>
  <body>
    <p>${name}</p>
    <p>${greeting}</p>
  </body>
</html>`;

      const res = response(
        200,
        "OK",
        { "Content-Type": "text/html; charset=utf-8" },
        resultHtml,
      );
      socket.end(res);
      return;
    }

    // 404 / 405
    if (path === "/" || path === "/greeting") {
      const res = response(
        405,
        "Method Not Allowed",
        { "Content-Type": "text/plain" },
        "405 Method Not Allowed",
      );
      socket.end(res);
    } else {
      const res = response(
        404,
        "Not Found",
        { "Content-Type": "text/plain" },
        "404 Not Found",
      );
      socket.end(res);
    }
  });
});

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
