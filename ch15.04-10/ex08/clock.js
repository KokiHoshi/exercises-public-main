(function updateClock() {
  // SVG 時計の画像を更新して現在時刻を表示する。
  let now = new Date(); // 現在時刻。
  let sec = now.getSeconds(); // 秒。
  let min = now.getMinutes() + sec / 60; // 小数部を持つ分。
  let hour = (now.getHours() % 12) + min / 60; // 小数部を持つ時。

  let secangle = sec * 6; // 1秒あたり6度。
  let minangle = min * 6; // 1分あたり6度。
  let hourangle = hour * 30; // 1時間あたり30度。

  // 時計の針の SVG 要素を取得する。
  let minhand = document.querySelector("#clock .minutehand");
  let hourhand = document.querySelector("#clock .hourhand");

  // 秒針（存在しなければ作成）
  let sechand = document.querySelector("#clock .secondhand");
  if (!sechand) {
    sechand = document.createElementNS("http://www.w3.org/2000/svg", "line");
    sechand.setAttribute("class", "secondhand");
    sechand.setAttribute("x1", "50");
    sechand.setAttribute("y1", "50");
    sechand.setAttribute("x2", "50");
    sechand.setAttribute("y2", "15"); // 秒針は長め
    sechand.setAttribute("stroke", "red");
    sechand.setAttribute("stroke-width", "1");

    document.querySelector("#clock .hands").appendChild(sechand);
  }

  // SVG 属性を設定して、時計盤の中で回転する。
  minhand.setAttribute("transform", `rotate(${minangle},50,50)`);
  hourhand.setAttribute("transform", `rotate(${hourangle},50,50)`);
  sechand.setAttribute("transform", `rotate(${secangle},50,50)`);

  // 1秒後にこの関数を再度実行する（秒針用）
  setTimeout(updateClock, 1000);
})(); // 即時実行
