// 1. nav 要素内のリンク (<a>)
console.log("1:", document.querySelectorAll("nav a"));

// 2. 商品リスト (.product-list) 内の最初の商品 (.product-item)
console.log("2:", document.querySelector(".product-list .product-item"));

// 3. カートアイコンの画像 (<img>)
console.log("3:", document.querySelector("header .cart img"));

// 4. 商品リスト (.product-list) 内の価格 (.price) を表示する要素
console.log("4:", document.querySelectorAll(".product-list .price"));

// 5. 商品リスト (.product-list) 内の全ての商品 (.product-item) の画像 (<img>)
console.log("5:", document.querySelectorAll(".product-list .product-item img"));

// 6. 検索バー (.search-bar) 内の検索ボタン (<button>)
console.log("6:", document.querySelector(".search-bar button"));

// 7. フッター (footer) 内のパラグラフ (<p>) 要素
console.log("7:", document.querySelectorAll("footer p"));

// 8. 商品リスト (.product-list) 内の偶数番目の商品 (.product-item)
console.log(
  "8:",
  document.querySelectorAll(".product-list .product-item:nth-child(even)")
);

// 9. ヘッダー (header) 内のアカウントリンク (.account) の画像 (<img>)
console.log("9:", document.querySelector("header .account img"));

// 10. ナビゲーションリンクのうち、"会社情報" のリンク
console.log(
  "10:",
  [...document.querySelectorAll("nav a")].find(
    (a) => a.textContent.trim() === "会社情報"
  )
);
