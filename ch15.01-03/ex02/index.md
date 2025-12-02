ブラウザで動的 import（await import()）を試すため、HTML に script type="module" を記述し、jQuery モジュールを import して全要素の文字色を red に変更した。
ブラウザでページを開くと、動的に読み込まれたモジュールによって画面のすべての文字が赤色に変化することが確認できた。
さらに開発者ツールの Network タブで jQuery モジュールがネットワーク経由で読み込まれていることも確認できた。
