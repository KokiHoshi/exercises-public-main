## なぜhashbang（#!/）という書き方が存在したのか

「サーバを変更できない／SEOも捨てたくない時代」にJavaScript主体の高速なページ遷移を実現するための折衷案だった。

### hashbang が使われていた 2008〜2012年頃の制約

- History API（pushState）がまだ使えなかった
  JavaScriptで安全に変更できたのは # 以降（hash）だけ

- サーバ側を自由に変更できないケースが多かった

- AJAXで部分更新すると「SEOが死ぬ」問題
  #/profile のようなURLは 検索エンジンが中身を理解できない→SPAは高速だが、検索に引っかからない問題があった

### hashbang

- #：サーバには送られない（= SPAが壊れない）

- !：「これはクローラ向けに意味のあるURLだ」と示す記号

これにより人間用SPAと検索エンジン用HTMLを両立した

### 今は使われなくなった理由

- History API が標準化・普及

  - pushState / popstate が使える
  - URLを自然な形（/users/123）で扱える

- 検索エンジンが JavaScript を実行できるようになった

  - Googleは SPA をかなり理解できる
  - SSR / SSG（Next.jsなど）も一般化

- hashbang 自体が非推奨になった
  - Googleは _escaped_fragment_ の仕組みを廃止
  - hashbangは「過去の互換技術」扱い
