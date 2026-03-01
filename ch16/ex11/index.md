## HTTPリクエストを送信せず接続を維持した場合の挙動

- 何接続で接続が確立できなくなるか
  15342

- 理由
  ENOBUFS = No buffer space available

  OS が TCP 接続を維持するために使う カーネルメモリ（送受信バッファ、ソケット用メモリ、制御ブロック等） が不足して、新規ソケット（接続）を作れなくなった

### ログ

connected: 100
connected: 200
connected: 300
…
FAILED at: 15342
reason: ENOBUFS
holding connections...
