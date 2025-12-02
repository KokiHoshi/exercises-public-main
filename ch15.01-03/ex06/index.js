document.addEventListener("DOMContentLoaded", () => {
  const data = [
    ["ユーザーエージェント", navigator.userAgent],
    ["ブラウザ言語", navigator.language],
    ["対応言語一覧", navigator.languages.join(", ")],
    ["OS / プラットフォーム", navigator.platform],
    ["クッキー有効", navigator.cookieEnabled ? "はい" : "いいえ"],
    ["オンライン状態", navigator.onLine ? "オンライン" : "オフライン"],
    ["CPU 論理コア数", navigator.hardwareConcurrency ?? "不明"],
    ["ブラウザ製品名", navigator.product],
    ["リファラー", document.referrer || "(なし)"],
    [
      "画面解像度",
      `${window.screen.width} x ${window.screen.height} (${window.devicePixelRatio}x)`,
    ],
  ];

  const tbody = document.querySelector("#info-table tbody");

  for (const [label, value] of data) {
    const tr = document.createElement("tr");

    const th = document.createElement("th");
    th.textContent = label;

    const td = document.createElement("td");
    td.textContent = String(value);

    tr.appendChild(th);
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
});
