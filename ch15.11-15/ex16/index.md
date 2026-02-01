## 調査対象

githubの公開API(https://api.github.com/)

## 調査手順

1. ページを開く
2. F12でデベロッパーツールを開く
3. Networkタブを指定
4. ページをリロード
5. `api.github.com`を選択
6. ヘッダーのレスポンスヘッダーを確認

## 結果

`Access-Control-Allow-Origin: *`の表示が確認できた。
これは任意のオリジン(どのWebサイト)からのアクセスも許可している。

→`api.github.com`は公開APIのためこのような設定になっている。
