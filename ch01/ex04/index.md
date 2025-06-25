# 予想
一つ目のログにanswer:42、二つ目のログにanswer:0が表示される。

# 結果
## 開発者ツールを開いた状態のタブで HTML を開く場合
一つ目のログにanswer:42、二つ目のログにanswer:0が表示される。

## HTMLを開いた状態のタブで開発者ツールを開く場合
どちらのログにもanswer:0が表示される。

# 常に期待した結果を得るためには
structuredClone()を使う。
structuredClone()はオブジェクトをディープコピー(完全に別データとして複製)する関数。


```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      let life = { answer: 42 };
      console.log(structuredClone(life));
      life.answer = 0;
      console.log(life);
    </script>
  </body>
</html>
```

# 回答
前は文字列化→数値とかしていた
最近はstructuredCloneを使用
...lifeを使うと深い階層のオブジェクトがコピーされない
