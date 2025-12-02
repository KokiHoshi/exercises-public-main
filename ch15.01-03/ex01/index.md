script タグから type="module" を削除すると ES モジュールとして実行されなくなる。
その場合、import/export が使えないため、index.js を通常スクリプト向けに書き換える必要がある。
モジュール構文（import/export）を削除し、必要なコードをグローバルスコープで実行するように変更する。
